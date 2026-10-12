// La PERSONA: un agente BDI híbrido por capas.
//
// En cada tick:
//   1. Cuerpo:      la energía y el hambre cambian según lo que esté haciendo.
//   2. Percepción:  actualiza sus creencias.
//   3. Deliberación (capa ALTA, solo cada 15 minutos o si el plan termina/falla):
//      calcula la utilidad de cada deseo y decide si mantiene o cambia su intención.
//   4. Ejecución    (capa BAJA, cada tick): ejecuta el paso actual del plan.

import { findPath } from "../pathfinding.js";
import { segmentAt } from "../works.js";
import { createBeliefs, perceive, listenToRadio } from "./beliefs.js";
import { isOnAir } from "../radio.js";
import { DESIRES, findDesire } from "./desires.js";
import { createIntention, executeIntention, SPEED } from "./intentions.js";

const DELIBERATION_INTERVAL = 15; // minutos entre deliberaciones
const COMMITMENT = 0.1; // cuánto mejor debe ser otro deseo para abandonar el plan actual
const HISTORY_SIZE = 6;

export function createPerson(id, city, rng, homes, works) {
  const home = rng.pick(homes);
  const work = rng.pick(works);
  const commute = findPath(city, home.entrance, work.entrance);
  const workStart = 7 * 60 + rng.int(0, 10) * 15;

  return {
    id,
    homeId: home.id,
    workId: work.id,
    workStart,
    workEnd: workStart + 8 * 60,

    // Cuerpo (el estado "real", que las creencias copian al percibir)
    energy: rng.int(55, 80),
    hunger: rng.int(15, 40),
    location: home.id,
    activity: "sleep",
    x: home.entrance.x,
    y: home.entrance.y,
    route: null,
    routeIndex: 0,
    tripStart: 0,
    lastTrip: null, // { to, minutes, arrivedAt } del último viaje terminado
    listensRadio: false, // lo decide createSimulation

    // Mente BDI
    // Al principio cree que tardará lo que se tarda con las calles vacías.
    beliefs: createBeliefs(Math.ceil((commute.length - 1) / SPEED)),
    desires: [], // última evaluación: [{ id, label, utility }]
    intention: null,
    nextDeliberation: 0,
    history: [], // reconsideraciones recientes, para el panel
  };
}

export function updatePerson(person, sim) {
  updateBody(person);
  perceive(person, sim);

  // Comunicación: si suena el boletín, escucha la radio y está despierta, se entera.
  if (person.listensRadio && person.activity !== "sleep" && isOnAir(sim.radio, sim.clock.tick)) {
    const before = person.beliefs.knownWorks.size;
    listenToRadio(person.beliefs, sim.radio.bulletin);
    const after = person.beliefs.knownWorks.size;
    if (after !== before) remember(person, sim.clock.tick, `Oyó la radio: ahora cree ${after} casillas en obras (antes ${before}).`);
  }

  const tick = sim.clock.tick;
  if (!person.intention || tick >= person.nextDeliberation) deliberate(person, tick);

  const result = executeIntention(person, sim);
  if (person.lastTrip?.arrivedAt === tick) onArrival(person, person.lastTrip, sim);
  if (result === "done") {
    findDesire(person.intention.desireId).onComplete?.(person.beliefs);
    person.intention = null; // en el próximo tick delibera de nuevo
  } else if (result === "blocked") {
    // La capa reactiva escala el problema: hay una obra en mi camino.
    // La deliberativa reconsidera: actualiza creencias y busca otro plan.
    // Apunta el TRAMO entero: si una casilla está cortada, todo el tramo lo está.
    const { x, y } = person.blockedAt;
    for (const t of segmentAt(sim.city, x, y) ?? [person.blockedAt]) {
      person.beliefs.knownWorks.add(`${t.x},${t.y}`);
    }
    person.beliefs.lastWorksSeenDay = person.beliefs.day;
    sim.stats.detours++;
    remember(person, tick, `Calle cortada por obras en (${x}, ${y}): busca otro camino.`);
    person.route = null; // la ruta vieja ya no sirve
    deliberate(person, tick); // re-deliberar ya, sin esperar 15 minutos
  } else if (result === "failed") {
    remember(person, tick, `No pudo completar "${person.intention.label}"`);
    person.intention = null; // la capa reactiva escala el problema a la deliberativa
  }
}

// --- Capa deliberativa ------------------------------------------------------
function deliberate(person, tick) {
  const { beliefs } = person;
  person.nextDeliberation = tick + DELIBERATION_INTERVAL;

  // 1. Evaluar todos los deseos con las creencias actuales.
  person.desires = DESIRES.map((d) => ({ id: d.id, label: d.label, utility: d.utility(beliefs, person) }));
  const best = person.desires.reduce((a, b) => (b.utility > a.utility ? b : a));

  // 2. ¿Mantengo mi intención? Solo la cambio si otro deseo es CLARAMENTE mejor
  //    que lo que valía mi intención cuando me comprometí con ella.
  //    (Comparamos con ese valor, no con el actual: mientras como, el hambre
  //    baja y "comer" vale cada vez menos, pero no quiero dejar el plato a medias.)
  const current = person.intention;
  if (current) {
    if (best.id === current.desireId || best.utility < current.utility + COMMITMENT) return;

    remember(
      person,
      tick,
      `${current.label} (${current.utility.toFixed(2)}) → ${best.label} (${best.utility.toFixed(2)})`
    );
  }

  // 3. Comprometerse con el mejor deseo: construir su plan.
  const desire = findDesire(best.id);
  person.intention = createIntention(desire, best.utility, desire.plan(beliefs, person), tick);
  person.route = null; // si iba de camino a otro sitio, se recalcula la ruta
}

// --- Aprender de la experiencia -------------------------------------------
// Al llegar, la persona compara lo que tardó con lo que creía que tardaría.
// Aprende de forma ASIMÉTRICA, como haría alguien prudente:
//   - si tardó MÁS de lo que creía, se lo cree de inmediato (no quiere repetir);
//   - si tardó MENOS, rebaja su estimación poco a poco (puede ser un día suelto).
// Así, tras un día de atascos, sale de casa más temprano.
function onArrival(person, trip, sim) {
  sim.stats.trips++;
  sim.stats.tripMinutes += trip.minutes;
  if (trip.to !== person.workId) return;

  const beliefs = person.beliefs;
  const before = beliefs.commuteMinutes;
  beliefs.commuteMinutes =
    trip.minutes > before ? trip.minutes : Math.round(before * 0.8 + trip.minutes * 0.2);

  const late = beliefs.minuteOfDay - person.workStart;
  const learned = Math.abs(beliefs.commuteMinutes - before) >= 3
    ? ` Ahora cree que tarda ${beliefs.commuteMinutes} min (antes ${before}).`
    : "";
  if (late > 0) {
    sim.stats.lateArrivals++;
    remember(person, sim.clock.tick, `Llegó tarde al trabajo (${late} min).${learned}`);
  } else if (learned) {
    remember(person, sim.clock.tick, learned.trim());
  }
}

function remember(person, tick, text) {
  person.history.unshift({ tick, text });
  person.history.length = Math.min(person.history.length, HISTORY_SIZE);
}

// --- Cuerpo ---------------------------------------------------------------
// Cuánto cambian energía y hambre por minuto según la actividad.
const BODY = {
  sleep: { energy: +0.2, hunger: +0.03 },
  eat: { energy: -0.05, hunger: -2 },
  work: { energy: -0.08, hunger: +0.2 },
  travel: { energy: -0.07, hunger: +0.2 },
  relax: { energy: -0.05, hunger: +0.2 },
};

function updateBody(person) {
  const change = BODY[person.activity];
  person.energy = Math.max(0, Math.min(100, person.energy + change.energy));
  person.hunger = Math.max(0, Math.min(100, person.hunger + change.hunger));
}

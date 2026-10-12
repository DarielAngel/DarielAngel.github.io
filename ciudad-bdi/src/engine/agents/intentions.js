// INTENCIONES (Intentions): el plan con el que la persona se ha COMPROMETIDO.
//
// Una intención = el deseo elegido + una lista de pasos concretos.
// Solo hay dos tipos de paso:
//   goTo(edificio)          ir hasta la entrada de un edificio
//   stay(actividad, hasta)  quedarse haciendo algo hasta que se cumpla una condición
//
// Este archivo también contiene la CAPA REACTIVA: executeIntention() se llama en
// cada tick y solo ejecuta el paso actual. No piensa ni elige; si el paso falla,
// lo devuelve como "failed" para que la capa deliberativa decida qué hacer.

import { findPath } from "../pathfinding.js";
import { loadAt, delayFactor } from "../traffic.js";
import { isBlocked } from "../works.js";
import { isNight } from "./beliefs.js";

export const SPEED = 0.5; // casillas por tick
const BLOCKED_COST = 1000; // casi infinito: solo se cruza una obra si no hay otra salida

export const goTo = (buildingId) => ({ type: "goTo", buildingId });
export const stay = (activity, until) => ({ type: "stay", activity, until, elapsed: 0 });

export function createIntention(desire, utility, steps, tick) {
  return { desireId: desire.id, label: desire.label, utility, steps, stepIndex: 0, startedAt: tick };
}

// Devuelve "running", "done" (plan terminado), "failed" (no hay manera) o
// "blocked" (una obra corta el camino: la capa deliberativa debe re-planificar).
export function executeIntention(person, sim) {
  const intention = person.intention;
  const step = intention.steps[intention.stepIndex];

  const result = step.type === "goTo" ? executeGoTo(person, step, sim) : executeStay(person, step);
  if (result === "failed" || result === "blocked") return result;
  if (result === "done") {
    intention.stepIndex++;
    if (intention.stepIndex >= intention.steps.length) return "done";
  }
  return "running";
}

function executeGoTo(person, step, sim) {
  if (person.location === step.buildingId) return "done"; // ya estoy ahí
  const traffic = sim.traffic;

  if (!person.route) {
    // Ruta más RÁPIDA según el tráfico de este momento y según lo que la persona
    // CREE sobre las obras (idea de Dariel): solo esquiva las obras que conoce,
    // las de sus creencias. Las que no conoce no existen para ella al planificar.
    // Una obra conocida casi no se puede usar: solo si no hay otra manera (por
    // ejemplo, si todas las entradas del edificio están en obras).
    const destination = sim.city.buildings[step.buildingId];
    const start = { x: Math.round(person.x), y: Math.round(person.y) };
    const known = person.beliefs.knownWorks;
    const believesBlocked = (x, y) => known.has(`${x},${y}`);
    const cost = (x, y) => (believesBlocked(x, y) ? BLOCKED_COST : delayFactor(loadAt(traffic, x, y)));
    // Entramos por la primera entrada que no creemos cortada (o la principal si todas lo están).
    const door = destination.entrances.find((e) => !believesBlocked(e.x, e.y)) ?? destination.entrance;
    person.route = findPath(sim.city, start, door, cost);
    if (!person.route) return "failed";
    person.routeIndex = 1;
    if (person.location !== null) person.tripStart = sim.clock.tick; // empieza un viaje nuevo
    person.location = null; // salgo a la calle
  }

  // CAPA REACTIVA: miro la casilla siguiente. Si tiene una obra que NO está en
  // mis creencias, es una sorpresa: no sé qué hacer, aviso hacia arriba para
  // que la capa deliberativa la apunte y busque otro camino. (Las obras que ya
  // conocía las cruzo despacio: si están en mi ruta es que no había otra opción.)
  const next = person.route[person.routeIndex];
  if (next && isBlocked(sim.works, sim.city, next.x, next.y) &&
      !person.beliefs.knownWorks.has(`${next.x},${next.y}`)) {
    person.blockedAt = next;
    return "blocked";
  }

  person.activity = "travel";

  // La velocidad depende de cuántos OTROS vehículos hay en mi casilla.
  const x = Math.round(person.x);
  const y = Math.round(person.y);
  const others = Math.max(0, traffic.occupancy[y * traffic.width + x] - 1);
  const inWorks = isBlocked(sim.works, sim.city, x, y) || (next && isBlocked(sim.works, sim.city, next.x, next.y));
  const speed = (SPEED / delayFactor(others / traffic.capacity)) * (inWorks ? 0.2 : 1);

  if (moveAlongRoute(person, speed)) {
    person.route = null;
    person.location = step.buildingId;
    person.lastTrip = {
      to: step.buildingId,
      minutes: sim.clock.tick - person.tripStart,
      arrivedAt: sim.clock.tick,
    };
    return "done";
  }
  return "running";
}

function executeStay(person, step) {
  person.activity = step.activity;
  step.elapsed++;
  const beliefs = person.beliefs;
  const until = step.until;

  if (until.minutes !== undefined) return step.elapsed >= until.minutes ? "done" : "running";
  if (until.untilMinute !== undefined) return beliefs.minuteOfDay >= until.untilMinute ? "done" : "running";
  if (until.until === "fed") return person.hunger <= 5 ? "done" : "running";
  if (until.alarmAt != null && beliefs.minuteOfDay === until.alarmAt) return "done"; // ¡suena el despertador!
  if (until.until === "rested") return person.energy >= 100 && !isNight(beliefs) ? "done" : "running";
  return "done";
}

// Avanza `distance` casillas por la ruta. Devuelve true al llegar al final.
function moveAlongRoute(person, distance) {
  const route = person.route;
  while (distance > 0 && person.routeIndex < route.length) {
    const target = route[person.routeIndex];
    const dx = target.x - person.x;
    const dy = target.y - person.y;
    const gap = Math.abs(dx) + Math.abs(dy);
    if (gap <= distance) {
      person.x = target.x;
      person.y = target.y;
      person.routeIndex++;
      distance -= gap;
    } else {
      person.x += Math.sign(dx) * distance;
      person.y += Math.sign(dy) * distance;
      distance = 0;
    }
  }
  return person.routeIndex >= route.length;
}

// CREENCIAS (Beliefs): lo que la persona sabe del mundo y de sí misma ahora mismo.
//
// No es el mundo real: es la copia que la persona tiene en la cabeza.
// Se ACTUALIZA por percepción en cada tick (no se recalcula desde cero), y
// puede guardar cosas que el mundo no guarda, como "hoy ya trabajé".

import { timeOfDay, isWorkday } from "../clock.js";
import { isBlocked } from "../works.js";

export function createBeliefs(commuteMinutes) {
  return {
    day: 0,
    minuteOfDay: 0,
    isWorkday: true,
    location: null, // id del edificio donde estoy, o null si voy por la calle
    energy: 100,
    hunger: 0,
    workedToday: false, // memoria propia: el mundo no sabe esto, la persona sí
    commuteMinutes, // cuánto CREE que tarda en llegar al trabajo (aprende con la experiencia)
    knownWorks: new Set(), // casillas que CREE cortadas por obras ("x,y")
    lastWorksSeenDay: null, // último día en que una obra le cortó el paso
  };
}

// Percepción: copiamos a las creencias lo que la persona puede observar.
export function perceive(person, sim) {
  const beliefs = person.beliefs;
  const time = timeOfDay(sim.clock);

  if (time.day !== beliefs.day) beliefs.workedToday = false; // empieza un día nuevo

  beliefs.day = time.day;
  beliefs.minuteOfDay = time.minuteOfDay;
  beliefs.isWorkday = isWorkday(sim.clock);
  beliefs.location = person.location;
  beliefs.energy = person.energy;
  beliefs.hunger = person.hunger;
  forgetFinishedWorks(person, sim);
}

// OLVIDAR obras terminadas: la persona mira la casilla donde está y las 4 de
// al lado. Si cree que una está en obras pero ve que ya está libre, la borra
// de sus creencias. (Escrita por Dariel, ejercicio del paso 5b.)
export function forgetFinishedWorks(person, sim) {
  const known = person.beliefs.knownWorks;
  if (known.size === 0) return; // no cree nada: no hay nada que olvidar

  const x = Math.round(person.x);
  const y = Math.round(person.y);
  const around = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]; // mi casilla y las 4 vecinas

  for (const [dx, dy] of around) {
    const cx = x + dx;
    const cy = y + dy;
    const key = `${cx},${cy}`;
    // La creía cortada Y el mundo dice que está libre: la olvida.
    if (known.has(key) && !isBlocked(sim.works, sim.city, cx, cy)) known.delete(key);
  }
}

// ESCUCHAR LA RADIO: el boletín trae dos listas de obras, y cada obra es una
// lista de casillas { x, y }:
//   bulletin.closed  obras que terminaron  → olvidar sus casillas
//   bulletin.opened  obras nuevas          → apuntar sus casillas
// (Escrita por Dariel, ejercicio del paso 5c.)
export function listenToRadio(beliefs, bulletin) {
  const known = beliefs.knownWorks;

  // 1. Obras terminadas: olvidar todas sus casillas.
  for (const tiles of bulletin.closed) {
    for (const t of tiles) {
      const key = `${t.x},${t.y}`;
      known.delete(key);
    }
  }

  // 2. Obras nuevas: apuntar todas sus casillas.
  for (const tiles of bulletin.opened) {
    for (const t of tiles) {
      const key = `${t.x},${t.y}`;
      known.add(key);
    }
  }
}

export function isNight(beliefs) {
  return beliefs.minuteOfDay >= 22 * 60 || beliefs.minuteOfDay < 6 * 60;
}

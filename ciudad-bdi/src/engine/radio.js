// RADIO: cada mañana a las 07:00 una emisora lee el boletín de obras.
//
// Hasta ahora las creencias solo cambiaban por PERCEPCIÓN (lo que la persona ve
// con sus ojos). La radio añade otra fuente: la COMUNICACIÓN. Una persona puede
// enterarse de una obra que nunca ha visto, o de que terminó una que creía activa.
//
// El boletín cuenta lo que ha cambiado desde el anterior:
//   opened: obras que empezaron (y siguen activas)
//   closed: obras que terminaron o quitó el alcalde

export const RADIO_MINUTE = 7 * 60;

export function createRadio() {
  return { bulletin: null, lastTick: -1 };
}

// Se llama en cada tick, DESPUÉS de updateWorks (para incluir las obras de las 07:00).
export function updateRadio(radio, works, tick, day, minuteOfDay) {
  if (minuteOfDay !== RADIO_MINUTE) return;
  radio.bulletin = {
    day,
    tick,
    opened: works.list.filter((o) => o.start > radio.lastTick).map((o) => o.tiles),
    closed: works.finished.map((o) => o.tiles),
  };
  radio.lastTick = tick;
  works.finished = [];
}

// ¿Está sonando el boletín justo en este tick?
export function isOnAir(radio, tick) {
  return radio.bulletin !== null && radio.bulletin.tick === tick;
}

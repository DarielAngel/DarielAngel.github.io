// Reloj de la simulación.
//
// La simulación avanza por TICKS discretos, no por tiempo real.
// Aquí decidimos que 1 tick = 1 minuto simulado.
// El reloj solo guarda un número (el tick actual); la hora se CALCULA a partir de él.

export const MINUTES_PER_DAY = 24 * 60;

export function createClock(startMinute) {
  return { tick: 0, startMinute };
}

// Convierte el tick actual en día, hora y minuto.
export function timeOfDay(clock) {
  const total = clock.startMinute + clock.tick;
  const minuteOfDay = total % MINUTES_PER_DAY;
  return {
    day: Math.floor(total / MINUTES_PER_DAY) + 1,
    hour: Math.floor(minuteOfDay / 60),
    minute: minuteOfDay % 60,
    minuteOfDay,
  };
}

export function formatTime(clock) {
  const { hour, minute } = timeOfDay(clock);
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(hour)}:${pad(minute)}`;
}

// Devuelve true de lunes a viernes, false sábado y domingo. (Escrita por Dariel.)
export function isWorkday(clock) {
  const day = timeOfDay(clock).day; // 1, 2, 3, ... 8, 9, ...
  const dayOfWeek = (day - 1) % 7; // 0..6 que se repite: 0 = lunes ... 6 = domingo
  return dayOfWeek < 5; // true de lunes (0) a viernes (4)
}

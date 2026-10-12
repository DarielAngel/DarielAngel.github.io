// Generador de números aleatorios CON SEMILLA (algoritmo mulberry32).
//
// ¿Por qué no usar Math.random()? Porque Math.random() da números distintos
// cada vez que recargas la página. Con una semilla, la misma semilla produce
// SIEMPRE la misma secuencia de números, y por lo tanto la misma ciudad.
// Eso es "determinismo": imprescindible para depurar y para comparar algoritmos.

export function createRandom(seed) {
  let state = seed >>> 0; // ">>> 0" lo convierte en entero sin signo de 32 bits

  // Devuelve un número decimal en [0, 1), igual que Math.random().
  function next() {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  return {
    next,
    // Entero entre min y max (ambos incluidos).
    int(min, max) {
      return min + Math.floor(next() * (max - min + 1));
    },
    // Un elemento al azar de una lista.
    pick(list) {
      return list[Math.floor(next() * list.length)];
    },
  };
}

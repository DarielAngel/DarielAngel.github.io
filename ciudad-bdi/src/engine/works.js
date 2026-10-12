// OBRAS: tramos de calle cortados durante un tiempo.
//
// Un TRAMO es el trozo de calle entre dos cruces (las 4 casillas que hay entre
// una intersección y la siguiente). Cortar un tramo nunca deja la ciudad
// dividida: siempre hay otra calle para rodear la manzana.
//
// Las obras aparecen de dos maneras, y las dos pasan por el MISMO camino:
//   1. El propio motor programa obras nuevas cada mañana (con la semilla).
//   2. Tú haces clic en una calle (modo "alcalde"): la página no toca el
//      estado directamente, sino que envía un COMANDO al motor, que lo aplica
//      al principio del siguiente tick. Así todo sigue siendo determinista.

export function createWorks(city) {
  return {
    list: [], // obras activas: { id, tiles, start, end, origin }
    blocked: new Uint8Array(city.width * city.height), // 1 = casilla cortada
    since: new Uint32Array(city.width * city.height), // tick en que empezó la obra de cada casilla
    nextId: 1,
    finished: [], // obras retiradas desde el último boletín de radio
  };
}

// Las casillas del tramo que contiene (x, y), o null si (x, y) es un cruce o no es calle.
export function segmentAt(city, x, y) {
  const step = city.blockSize + 1;
  if (!city.isRoad(x, y)) return null;
  const onVertical = x % step === 0;
  const onHorizontal = y % step === 0;
  if (onVertical && onHorizontal) return null; // es un cruce

  const tiles = [];
  if (onHorizontal) {
    const startX = Math.floor(x / step) * step + 1;
    for (let i = 0; i < city.blockSize; i++) tiles.push({ x: startX + i, y });
  } else {
    const startY = Math.floor(y / step) * step + 1;
    for (let i = 0; i < city.blockSize; i++) tiles.push({ x, y: startY + i });
  }
  return tiles.filter((t) => city.isRoad(t.x, t.y));
}

export function isBlocked(works, city, x, y) {
  return works.blocked[y * city.width + x] === 1;
}

// Tick en que empezó la obra de esta casilla (0 si no hay obra).
export function blockedSince(works, city, x, y) {
  return works.since[y * city.width + x];
}

export function addWorks(works, city, tiles, start, end, origin) {
  const obra = { id: works.nextId++, tiles, start, end, origin };
  works.list.push(obra);
  for (const t of tiles) {
    works.blocked[t.y * city.width + t.x] = 1;
    works.since[t.y * city.width + t.x] = start;
  }
  return obra;
}

export function removeWorks(works, city, obra) {
  works.list = works.list.filter((o) => o !== obra);
  for (const t of obra.tiles) works.blocked[t.y * city.width + t.x] = 0;
  works.finished.push(obra); // la radio lo contará en el próximo boletín
}

// Comando "alcalde": si el tramo tiene obra, la quita; si no, pone una de 2 días.
export function toggleWorksAt(works, city, x, y, tick) {
  const tiles = segmentAt(city, x, y);
  if (!tiles) return;
  const existing = works.list.find((o) => o.tiles.some((t) => t.x === x && t.y === y));
  if (existing) removeWorks(works, city, existing);
  else addWorks(works, city, tiles, tick, tick + 2 * 24 * 60, "alcalde");
}

// Se llama en cada tick: retira las obras terminadas y, a las 07:00 de cada
// día, el ayuntamiento abre entre 1 y 3 obras nuevas que duran de 1 a 3 días.
export function updateWorks(works, city, rng, tick, minuteOfDay) {
  for (const obra of [...works.list]) {
    if (tick >= obra.end) removeWorks(works, city, obra);
  }

  if (minuteOfDay !== 7 * 60) return;
  const count = rng.int(1, 3);
  for (let i = 0; i < count; i++) {
    const x = rng.int(0, city.width - 1);
    const y = rng.int(0, city.height - 1);
    const tiles = segmentAt(city, x, y);
    if (!tiles || tiles.some((t) => isBlocked(works, city, t.x, t.y))) continue;
    addWorks(works, city, tiles, tick, tick + rng.int(1, 3) * 24 * 60, "programada");
  }
}

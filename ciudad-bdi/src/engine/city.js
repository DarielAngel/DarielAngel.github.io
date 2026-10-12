// Generación del mapa de la ciudad.
//
// El mapa es una CUADRÍCULA de casillas (tiles). Cada casilla tiene un tipo.
// Guardamos la cuadrícula en un array de una dimensión: la casilla (x, y)
// vive en la posición  y * width + x.  Es más rápido y simple que un array de arrays.

export const Tile = {
  GRASS: 0,
  ROAD: 1,
  HOME: 2,
  WORK: 3,
  PARK: 4,
};

export function createCity(config, rng) {
  const { width, height, blockSize } = config;
  const tiles = new Uint8Array(width * height); // todo empieza como GRASS (0)
  const buildings = [];

  const index = (x, y) => y * width + x;
  const setTile = (x, y, type) => (tiles[index(x, y)] = type);

  // 1. Calles: una línea cada (blockSize + 1) casillas, en horizontal y vertical.
  const step = blockSize + 1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (x % step === 0 || y % step === 0) setTile(x, y, Tile.ROAD);
    }
  }

  // 2. Manzanas: los huecos entre calles. A cada una le damos una ZONA.
  //    Los trabajos se concentran en el centro (el "downtown") y las casas en
  //    las afueras. Así, más adelante, el tráfico tendrá una dirección clara:
  //    hacia el centro por la mañana y hacia afuera por la tarde.
  const centerX = width / 2;
  const centerY = height / 2;
  const maxDist = Math.hypot(centerX, centerY);

  for (let by = 1; by + blockSize <= height; by += step) {
    for (let bx = 1; bx + blockSize <= width; bx += step) {
      const dist = Math.hypot(bx + blockSize / 2 - centerX, by + blockSize / 2 - centerY);
      const closeness = 1 - dist / maxDist; // 1 en el centro, 0 en la esquina
      const roll = rng.next();

      let zone;
      if (roll < 0.08) zone = Tile.PARK;
      else if (roll < 0.08 + closeness * 0.8) zone = Tile.WORK;
      else zone = Tile.HOME;

      if (zone === Tile.PARK) {
        fillRect(bx, by, blockSize, blockSize, Tile.PARK);
        continue;
      }

      // Dividimos la manzana en lotes de 2x2; cada lote es un edificio.
      for (let ly = by; ly < by + blockSize; ly += 2) {
        for (let lx = bx; lx < bx + blockSize; lx += 2) {
          const building = {
            id: buildings.length,
            type: zone === Tile.HOME ? "home" : "work",
            x: lx,
            y: ly,
            w: 2,
            h: 2,
            // Un valor aleatorio fijo para variar el color de cada edificio.
            shade: rng.next(),
          };
          buildings.push(building);
          fillRect(lx, ly, 2, 2, zone);
        }
      }
    }
  }

  // 3. Entradas: cada edificio necesita casillas de calle desde las que se
  //    entra y se sale. Recorremos el borde exterior del edificio y guardamos
  //    TODAS las casillas de calle (orden fijo = determinista). La primera es
  //    la entrada principal; las demás sirven si una obra corta la principal.
  for (const b of buildings) {
    b.entrances = findEntrances(b);
    b.entrance = b.entrances[0];
  }

  function findEntrances(b) {
    const found = [];
    for (let y = b.y - 1; y <= b.y + b.h; y++) {
      for (let x = b.x - 1; x <= b.x + b.w; x++) {
        const inside = x >= b.x && x < b.x + b.w && y >= b.y && y < b.y + b.h;
        const corner = (x === b.x - 1 || x === b.x + b.w) && (y === b.y - 1 || y === b.y + b.h);
        if (inside || corner) continue; // ni dentro ni en diagonal
        if (x >= 0 && y >= 0 && x < width && y < height && tiles[index(x, y)] === Tile.ROAD) {
          found.push({ x, y });
        }
      }
    }
    return found;
  }

  function fillRect(x0, y0, w, h, type) {
    for (let y = y0; y < y0 + h; y++) {
      for (let x = x0; x < x0 + w; x++) setTile(x, y, type);
    }
  }

  return {
    width,
    height,
    blockSize,
    tiles,
    buildings,
    isRoad(x, y) {
      return x >= 0 && y >= 0 && x < width && y < height && tiles[index(x, y)] === Tile.ROAD;
    },
    tileAt(x, y) {
      if (x < 0 || y < 0 || x >= width || y >= height) return null;
      return tiles[index(x, y)];
    },
    buildingAt(x, y) {
      return buildings.find((b) => x >= b.x && x < b.x + b.w && y >= b.y && y < b.y + b.h) ?? null;
    },
  };
}

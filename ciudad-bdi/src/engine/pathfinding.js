// Búsqueda de caminos por las calles: A* ("A estrella").
//
// En el paso 2 usábamos BFS, que encuentra el camino con MENOS CASILLAS.
// Ahora no todas las casillas cuestan lo mismo: una calle atascada "cuesta"
// más tiempo. Necesitamos el camino MÁS RÁPIDO, y para eso sirve A*.
//
// Idea de A*: en vez de explorar en orden de llegada (como BFS), siempre
// explora primero la casilla más prometedora, la que tiene menor
//     f = g + h
//   g = coste real acumulado desde la salida
//   h = estimación optimista de lo que falta (distancia Manhattan al destino)
// Para elegir rápido la de menor f usamos una "cola de prioridad" (MinHeap).

const DIRECTIONS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

// cost(x, y) = cuánto cuesta ENTRAR en esa casilla (mínimo 1, o Infinity si no se puede).
// Si no se pasa, todas cuestan 1 y el resultado es igual que con BFS.
export function findPath(city, start, goal, cost = () => 1) {
  const key = (x, y) => y * city.width + x;
  const goalKey = key(goal.x, goal.y);
  const heuristic = (x, y) => Math.abs(x - goal.x) + Math.abs(y - goal.y);

  const cameFrom = new Map(); // casilla -> casilla anterior
  const bestCost = new Map(); // casilla -> menor coste g encontrado hasta ahora
  const open = new MinHeap();

  const startKey = key(start.x, start.y);
  cameFrom.set(startKey, null);
  bestCost.set(startKey, 0);
  open.push(heuristic(start.x, start.y), startKey);

  while (open.size > 0) {
    const currentKey = open.pop();
    if (currentKey === goalKey) break;
    const cx = currentKey % city.width;
    const cy = Math.floor(currentKey / city.width);
    const g = bestCost.get(currentKey);

    for (const [dx, dy] of DIRECTIONS) {
      const nx = cx + dx;
      const ny = cy + dy;
      if (!city.isRoad(nx, ny)) continue;
      const k = key(nx, ny);
      const stepCost = cost(nx, ny);
      if (stepCost === Infinity) continue; // casilla intransitable
      const newCost = g + stepCost;
      if (bestCost.has(k) && newCost >= bestCost.get(k)) continue; // ya conocíamos un camino mejor
      bestCost.set(k, newCost);
      cameFrom.set(k, currentKey);
      open.push(newCost + heuristic(nx, ny), k);
    }
  }

  if (!cameFrom.has(goalKey)) return null;

  // Reconstrucción: del destino hacia atrás, y luego le damos la vuelta.
  const path = [];
  for (let k = goalKey; k !== null; k = cameFrom.get(k)) {
    path.push({ x: k % city.width, y: Math.floor(k / city.width) });
  }
  return path.reverse();
}

// Cola de prioridad mínima (montículo binario): push y pop en tiempo log(n).
// Guarda pares (prioridad, valor) en un array que se comporta como un árbol:
// el hijo izquierdo de la posición i está en 2i+1 y el derecho en 2i+2.
class MinHeap {
  constructor() {
    this.items = [];
  }
  get size() {
    return this.items.length;
  }
  push(priority, value) {
    const items = this.items;
    items.push({ priority, value });
    let i = items.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (items[parent].priority <= items[i].priority) break;
      [items[parent], items[i]] = [items[i], items[parent]];
      i = parent;
    }
  }
  pop() {
    const items = this.items;
    const top = items[0];
    const last = items.pop();
    if (items.length > 0) {
      items[0] = last;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1;
        const r = l + 1;
        let smallest = i;
        if (l < items.length && items[l].priority < items[smallest].priority) smallest = l;
        if (r < items.length && items[r].priority < items[smallest].priority) smallest = r;
        if (smallest === i) break;
        [items[smallest], items[i]] = [items[i], items[smallest]];
        i = smallest;
      }
    }
    return top.value;
  }
}

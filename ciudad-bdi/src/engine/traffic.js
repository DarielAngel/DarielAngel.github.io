// TRÁFICO: cuántos vehículos hay en cada calle y cuánto frena eso.
//
// La especificación pide NO simular la física de cada coche (aceleración,
// distancias...), sino algo más simple y razonable: cada tramo de calle tiene
// una CAPACIDAD, y su velocidad baja cuanto más lleno está.
//
// Aquí cada casilla de calle es un tramo. En cada tick hacemos una "foto":
// contamos cuántas personas hay en camino en cada casilla. Todos usan esa
// misma foto durante el tick, así el resultado no depende de en qué orden
// se actualizan las personas.

export function createTraffic(city, capacity) {
  return {
    capacity, // vehículos que caben en una casilla sin frenar mucho
    occupancy: new Uint16Array(city.width * city.height),
    width: city.width,
  };
}

// La "foto" del tick: vaciar el contador y volver a contar.
export function countVehicles(traffic, people) {
  traffic.occupancy.fill(0);
  for (const p of people) {
    if (p.activity !== "travel") continue;
    traffic.occupancy[Math.round(p.y) * traffic.width + Math.round(p.x)]++;
  }
}

// Ocupación relativa: 0 = vacía, 1 = llena, 2 = el doble de su capacidad...
export function loadAt(traffic, x, y) {
  return traffic.occupancy[y * traffic.width + x] / traffic.capacity;
}

// Cuánto más se tarda en cruzar esta casilla que con la calle vacía.
// 1 = normal; con la calle llena (load 1) se tarda el doble; con load 2, cinco veces más.
export function delayFactor(load) {
  return 1 + load * load;
}

// Devuelve la casilla con más vehículos: { x, y, vehicles }. (Escrita por Dariel.)
// Si no hay nadie en la calle, vehicles será 0.
export function busiestRoad(traffic) {
  let bestIndex = 0;
  let bestCount = 0;
  for (let i = 0; i < traffic.occupancy.length; i++) {
    if (traffic.occupancy[i] > bestCount) {
      bestCount = traffic.occupancy[i];
      bestIndex = i;
    }
  }
  return {
    x: bestIndex % traffic.width,
    y: Math.floor(bestIndex / traffic.width),
    vehicles: bestCount,
  };
}

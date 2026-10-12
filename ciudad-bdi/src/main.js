// Punto de entrada: une el motor, el renderer y los controles de la página.

import { createSimulation, step, sendCommand } from "./engine/simulation.js";
import { formatTime, timeOfDay } from "./engine/clock.js";
import { segmentAt } from "./engine/works.js";
import { createRenderer } from "./render/renderer.js";
import { createInspector } from "./ui/inspector.js";
import { busiestRoad } from "./engine/traffic.js";

// Toda la configuración en un solo sitio. Cambia la semilla y obtendrás otra ciudad.
const CONFIG = {
  seed: 42,
  startMinute: 5 * 60, // empezamos a las 05:00
  population: 300,
  roadCapacity: 2, // vehículos por casilla de calle antes de que se considere llena
  city: { width: 41, height: 26, blockSize: 4 },
};
const TILE_SIZE = 16; // píxeles por casilla

const canvas = document.getElementById("map");
const clockEl = document.getElementById("clock");
const dayEl = document.getElementById("day");
const pauseBtn = document.getElementById("pause");
const speedSelect = document.getElementById("speed");
const infoEl = document.getElementById("info");
const trafficToggle = document.getElementById("show-traffic");
const worksToggle = document.getElementById("works-mode");
worksToggle.addEventListener("change", () => canvas.classList.toggle("works-mode", worksToggle.checked));

const sim = createSimulation(CONFIG);
const renderer = createRenderer(canvas, sim.city, TILE_SIZE);
const inspector = createInspector(document.getElementById("inspector"), sim);

// --- El bucle principal ---------------------------------------------------
// requestAnimationFrame llama a frame() unas 60 veces por segundo.
// La velocidad se mide en "minutos simulados por segundo real".
// El ACUMULADOR guarda el tiempo pendiente y ejecuta tantos ticks enteros como
// toquen. Así la simulación avanza al mismo ritmo aunque los fotogramas varíen.
let paused = false;
let speed = Number(speedSelect.value);
let accumulator = 0;
let lastTime = performance.now();

function frame(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.25); // segundos desde el último fotograma
  lastTime = now;

  if (!paused) {
    accumulator += dt * speed;
    while (accumulator >= 1) {
      step(sim);
      accumulator -= 1;
    }
  }

  renderer.draw(sim, inspector.selectedId, trafficToggle.checked);
  clockEl.textContent = formatTime(sim.clock);
  dayEl.textContent = `Día ${timeOfDay(sim.clock).day}`;
  updateCounts();
  inspector.update(now);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// --- Controles -----------------------------------------------------------
function togglePause() {
  paused = !paused;
  pauseBtn.textContent = paused ? "Reanudar" : "Pausa";
  pauseBtn.setAttribute("aria-pressed", String(paused));
}
pauseBtn.addEventListener("click", togglePause);
speedSelect.addEventListener("change", () => (speed = Number(speedSelect.value)));
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && e.target === document.body) {
    e.preventDefault();
    togglePause();
  }
});

// --- Ratón sobre el mapa -------------------------------------------------
// El canvas puede verse más grande o más pequeño que su tamaño real en píxeles,
// así que convertimos la posición del ratón a coordenadas de casilla.
function mouseToTile(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    fx: ((e.clientX - rect.left) / rect.width) * sim.city.width,
    fy: ((e.clientY - rect.top) / rect.height) * sim.city.height,
  };
}

// Persona en la calle cerca del punto, o la primera que esté dentro del edificio.
function personAt(fx, fy) {
  const onRoad = sim.people.find(
    (p) => p.activity === "travel" && Math.hypot(p.x + 0.5 - fx, p.y + 0.5 - fy) < 0.7
  );
  if (onRoad) return onRoad;
  const b = sim.city.buildingAt(Math.floor(fx), Math.floor(fy));
  return b ? sim.people.find((p) => p.location === b.id) : null;
}

const NAMES = { home: "Hogar", work: "Trabajo" };
canvas.addEventListener("mousemove", (e) => {
  const { fx, fy } = mouseToTile(e);
  const b = sim.city.buildingAt(Math.floor(fx), Math.floor(fy));
  if (!b) {
    const x = Math.floor(fx);
    const y = Math.floor(fy);
    if (!sim.city.isRoad(x, y)) {
      infoEl.textContent = `Casilla (${x}, ${y})`;
      return;
    }
    const vehicles = sim.traffic.occupancy[y * sim.city.width + x];
    const obra = sim.works.list.find((o) => o.tiles.some((t) => t.x === x && t.y === y));
    const hint = obra
      ? ` · OBRA (${obra.origin}) hasta el día ${timeOfDay({ tick: obra.end, startMinute: sim.clock.startMinute }).day}, en modo obras, clic para quitarla`
      : segmentAt(sim.city, x, y)
        ? " · activa «Poner obras» y haz clic para cortar este tramo"
        : " · cruce";
    infoEl.textContent = `Casilla (${x}, ${y}) · calle con ${vehicles} vehículo(s)${hint}`;
    return;
  }
  const inside = sim.people.filter((p) => p.location === b.id).length;
  infoEl.textContent = `${NAMES[b.type]} #${b.id} · ${inside} persona(s) dentro`;
});
canvas.addEventListener("click", (e) => {
  const { fx, fy } = mouseToTile(e);
  const x = Math.floor(fx);
  const y = Math.floor(fy);

  // Modo obras (alcalde): el clic en una calle pone o quita una obra.
  // La página NO modifica el motor: le manda un comando que se aplica en el próximo tick.
  if (worksToggle.checked) {
    if (segmentAt(sim.city, x, y)) sendCommand(sim, { type: "toggleWorks", x, y });
    return;
  }

  const person = personAt(fx, fy);
  if (person) inspector.select(person.id);
});

// --- Contadores: cuántas personas hay haciendo cada actividad ---------------
const countEls = {};
for (const el of document.querySelectorAll("[data-count]")) countEls[el.dataset.count] = el;
function updateCounts() {
  const counts = { sleep: 0, relax: 0, travel: 0, work: 0, eat: 0 };
  for (const p of sim.people) counts[p.activity]++;
  for (const activity in counts) countEls[activity].textContent = counts[activity];

  // Métricas de tráfico del día.
  const { trips, tripMinutes, lateArrivals } = sim.stats;
  let full = 0;
  for (const o of sim.traffic.occupancy) if (o >= sim.traffic.capacity) full++;
  countEls.full.textContent = full;
  countEls.avgTrip.textContent = trips ? `${Math.round(tripMinutes / trips)} min` : "–";
  countEls.late.textContent = lateArrivals;

  countEls.works.textContent = sim.works.list.length;
  countEls.detours.textContent = sim.stats.detours;
  const bulletin = sim.radio.bulletin;
  countEls.radio.textContent = bulletin
    ? `día ${bulletin.day}: ${bulletin.opened.length} nuevas, ${bulletin.closed.length} terminadas`
    : "–";

  const top = busiestRoad(sim.traffic);
  countEls.busiest.textContent = top.vehicles ? `(${top.x}, ${top.y}) con ${top.vehicles}` : "–";
}

// Resumen de la ciudad generada.
const homes = sim.city.buildings.filter((b) => b.type === "home").length;
const works = sim.city.buildings.length - homes;
document.getElementById("summary").textContent =
  `Semilla ${CONFIG.seed} · ${CONFIG.population} personas · ${homes} hogares · ${works} trabajos`;

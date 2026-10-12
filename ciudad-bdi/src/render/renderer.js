// El RENDERER: dibuja en el canvas lo que hay en el motor.
//
// Solo LEE el estado de la simulación; nunca lo modifica.
// Truco de rendimiento: el mapa no cambia, así que lo dibujamos UNA vez en un
// canvas fuera de pantalla ("capa estática") y en cada fotograma solo copiamos
// esa imagen con drawImage, que es muchísimo más barato que redibujar casilla a casilla.

import { Tile } from "../engine/city.js";
import { timeOfDay } from "../engine/clock.js";

const COLORS = {
  grass: "#9cb58a",
  road: "#5b6170",
  roadLine: "#8d93a1",
  park: "#7fa66c",
  tree: "#4f7d47",
  home: ["#e2b48f", "#d99d7c", "#e8c7a0"],
  work: ["#9fb4cf", "#8aa3c4", "#b3c3d8"],
  roof: "rgba(0,0,0,0.18)",
  night: "#0d1530",
  window: "#ffd77a",
  // Color de cada persona en la calle según su intención.
  intent: { work: "#2f6fe4", eat: "#f0a020", sleep: "#e2513b", relax: "#e2513b" },
  selected: "#ffe14d",
  outline: "#ffffff",
};

export function createRenderer(canvas, city, tileSize) {
  canvas.width = city.width * tileSize;
  canvas.height = city.height * tileSize;
  const ctx = canvas.getContext("2d");

  const staticLayer = drawStaticLayer(city, tileSize);

  function draw(sim, selectedId, showTraffic) {
    ctx.drawImage(staticLayer, 0, 0);
    drawNight(ctx, sim, tileSize);
    if (showTraffic) drawTraffic(ctx, sim, tileSize);
    drawWorks(ctx, sim, tileSize);
    drawPeople(ctx, sim, tileSize, selectedId);
  }

  return { draw };
}

function drawStaticLayer(city, ts) {
  const layer = document.createElement("canvas");
  layer.width = city.width * ts;
  layer.height = city.height * ts;
  const g = layer.getContext("2d");

  // Suelo y calles, casilla por casilla.
  for (let y = 0; y < city.height; y++) {
    for (let x = 0; x < city.width; x++) {
      const t = city.tileAt(x, y);
      if (t === Tile.ROAD) {
        g.fillStyle = COLORS.road;
        g.fillRect(x * ts, y * ts, ts, ts);
      } else if (t === Tile.PARK) {
        g.fillStyle = COLORS.park;
        g.fillRect(x * ts, y * ts, ts, ts);
        // Árboles en un patrón fijo (sin azar: el renderer no debe usar aleatoriedad).
        if ((x * 7 + y * 13) % 3 === 0) {
          g.fillStyle = COLORS.tree;
          g.beginPath();
          g.arc(x * ts + ts / 2, y * ts + ts / 2, ts * 0.32, 0, Math.PI * 2);
          g.fill();
        }
      } else {
        g.fillStyle = COLORS.grass;
        g.fillRect(x * ts, y * ts, ts, ts);
      }
    }
  }

  // Líneas discontinuas en el centro de las calles.
  g.strokeStyle = COLORS.roadLine;
  g.lineWidth = 1;
  g.setLineDash([ts * 0.3, ts * 0.3]);
  for (let y = 0; y < city.height; y++) {
    for (let x = 0; x < city.width; x++) {
      if (city.tileAt(x, y) !== Tile.ROAD) continue;
      const cx = x * ts + ts / 2;
      const cy = y * ts + ts / 2;
      if (city.tileAt(x + 1, y) === Tile.ROAD) line(g, cx, cy, cx + ts, cy);
      if (city.tileAt(x, y + 1) === Tile.ROAD) line(g, cx, cy, cx, cy + ts);
    }
  }
  g.setLineDash([]);

  // Edificios: un rectángulo con un pequeño margen y una "sombra" de tejado.
  for (const b of city.buildings) {
    const palette = b.type === "home" ? COLORS.home : COLORS.work;
    const pad = ts * 0.15;
    const px = b.x * ts + pad;
    const py = b.y * ts + pad;
    const pw = b.w * ts - pad * 2;
    const ph = b.h * ts - pad * 2;
    g.fillStyle = palette[Math.floor(b.shade * palette.length)];
    g.fillRect(px, py, pw, ph);
    g.fillStyle = COLORS.roof;
    g.fillRect(px, py + ph * 0.6, pw, ph * 0.4);
  }

  return layer;
}

function line(g, x1, y1, x2, y2) {
  g.beginPath();
  g.moveTo(x1, y1);
  g.lineTo(x2, y2);
  g.stroke();
}

// Oscurece la ciudad según la hora y enciende las ventanas de las casas de noche.
function drawNight(ctx, sim, ts) {
  const { minuteOfDay } = timeOfDay(sim.clock);
  const darkness = nightAmount(minuteOfDay);
  if (darkness <= 0) return;

  ctx.globalAlpha = darkness * 0.6;
  ctx.fillStyle = COLORS.night;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.globalAlpha = darkness;

  ctx.fillStyle = COLORS.window;
  for (const b of sim.city.buildings) {
    if (b.type !== "home" || b.shade > 0.7) continue; // no todas las casas tienen luz
    ctx.fillRect(b.x * ts + ts * 0.55, b.y * ts + ts * 0.55, ts * 0.3, ts * 0.3);
    ctx.fillRect(b.x * ts + ts * 1.15, b.y * ts + ts * 0.55, ts * 0.3, ts * 0.3);
  }
  ctx.globalAlpha = 1;
}

// 0 = pleno día, 1 = noche cerrada. Transiciones suaves al amanecer y atardecer.
function nightAmount(minuteOfDay) {
  const h = minuteOfDay / 60;
  if (h >= 7 && h < 18) return 0;
  if (h >= 18 && h < 20) return (h - 18) / 2; // atardecer
  if (h >= 5 && h < 7) return 1 - (h - 5) / 2; // amanecer
  return 1;
}

// Mapa de calor del tráfico: amarillo = algo de tráfico, rojo = calle llena o más.
// Solo recorremos las casillas que tienen al menos un vehículo.
function drawTraffic(ctx, sim, ts) {
  const { occupancy, capacity, width } = sim.traffic;
  for (let i = 0; i < occupancy.length; i++) {
    if (occupancy[i] === 0) continue;
    const load = occupancy[i] / capacity; // 0.5 = media calle, 1 = llena
    ctx.fillStyle = load >= 1 ? "rgba(226, 50, 40, 0.75)" : `rgba(245, 190, 40, ${0.25 + load * 0.4})`;
    ctx.fillRect((i % width) * ts, Math.floor(i / width) * ts, ts, ts);
  }
}

// Obras: casillas naranjas con rayas blancas en diagonal, como una valla.
function drawWorks(ctx, sim, ts) {
  for (const obra of sim.works.list) {
    for (const t of obra.tiles) {
      const px = t.x * ts;
      const py = t.y * ts;
      ctx.fillStyle = "#e8772e";
      ctx.fillRect(px, py, ts, ts);
      ctx.save();
      ctx.beginPath();
      ctx.rect(px, py, ts, ts);
      ctx.clip(); // las rayas no se salen de la casilla
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = ts * 0.14;
      for (let d = -ts; d < ts * 2; d += ts * 0.45) line(ctx, px + d, py, px + d - ts, py + ts);
      ctx.restore();
    }
  }
}

// Personas que van por la calle. Las que están dentro de un edificio
// no se dibujan. La persona seleccionada lleva un anillo amarillo.
function drawPeople(ctx, sim, ts, selectedId) {
  for (const p of sim.people) {
    if (p.activity !== "travel") continue;
    const { ox, oy } = laneOffset(p);
    const cx = (p.x + 0.5 + ox) * ts;
    const cy = (p.y + 0.5 + oy) * ts;
    ctx.fillStyle = COLORS.intent[p.intention?.desireId] ?? "#999";
    ctx.strokeStyle = COLORS.outline;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, ts * 0.26, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  // La seleccionada: si está dentro de un edificio, marcamos su entrada.
  const sel = sim.people[selectedId];
  if (sel) {
    ctx.strokeStyle = COLORS.selected;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc((sel.x + 0.5) * ts, (sel.y + 0.5) * ts, ts * 0.6, 0, Math.PI * 2);
    ctx.stroke();
  }
}

// Circulamos por la derecha: desplazamos el punto hacia la derecha de su
// dirección de avance. Si la dirección es (dx, dy), su derecha es (-dy, dx).
function laneOffset(p) {
  const target = p.route?.[p.routeIndex];
  if (!target) return { ox: 0, oy: 0 };
  const dx = Math.sign(target.x - p.x);
  const dy = Math.sign(target.y - p.y);
  return { ox: -dy * 0.22, oy: dx * 0.22 };
}

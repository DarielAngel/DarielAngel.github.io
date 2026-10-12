// El MOTOR de la simulación.
//
// Regla de oro: este archivo (y todo lo que hay en src/engine/) NO sabe que
// existe una pantalla. No usa document, canvas ni Math.random. Solo datos.
// Gracias a eso, el mismo motor podrá correr más adelante en un Web Worker
// o en Node sin tocar una sola línea.

import { createRandom } from "./random.js";
import { createClock, timeOfDay } from "./clock.js";
import { createCity } from "./city.js";
import { createTraffic, countVehicles } from "./traffic.js";
import { createWorks, updateWorks, toggleWorksAt } from "./works.js";
import { createRadio, updateRadio } from "./radio.js";
import { createPerson, updatePerson } from "./agents/person.js";

export function createSimulation(config) {
  const rng = createRandom(config.seed);
  const city = createCity(config.city, rng);

  const homes = city.buildings.filter((b) => b.type === "home");
  const works = city.buildings.filter((b) => b.type === "work");
  const people = [];
  for (let i = 0; i < config.population; i++) people.push(createPerson(i, city, rng, homes, works));

  // Quién escucha la radio: la mitad, al azar. Usamos un generador APARTE con
  // otra semilla: si sacáramos números del `rng` principal, cambiaría toda la
  // secuencia que viene después y la ciudad entera se comportaría distinto.
  const radioRng = createRandom(config.seed + 1);
  for (const person of people) person.listensRadio = radioRng.next() < 0.5;

  return {
    config,
    rng,
    clock: createClock(config.startMinute),
    city,
    traffic: createTraffic(city, config.roadCapacity),
    works: createWorks(city),
    radio: createRadio(),
    commands: [], // órdenes que llegan desde fuera (la página) y se aplican en el próximo tick
    people,
    stats: newDayStats(1),
  };
}

// La única puerta para que alguien de fuera cambie el mundo: dejar un comando.
// Ejemplo: sendCommand(sim, { type: "toggleWorks", x: 12, y: 5 })
export function sendCommand(sim, command) {
  sim.commands.push(command);
}

// Avanza la simulación exactamente UN tick (1 minuto simulado).
export function step(sim) {
  sim.clock.tick += 1;
  const { day, minuteOfDay } = timeOfDay(sim.clock);
  if (day !== sim.stats.day) sim.stats = newDayStats(day);

  // 1. Comandos de fuera, en el orden en que llegaron.
  for (const command of sim.commands) {
    if (command.type === "toggleWorks") toggleWorksAt(sim.works, sim.city, command.x, command.y, sim.clock.tick);
  }
  sim.commands.length = 0;

  // 2. El mundo: obras que empiezan o terminan.
  updateWorks(sim.works, sim.city, sim.rng, sim.clock.tick, minuteOfDay);
  updateRadio(sim.radio, sim.works, sim.clock.tick, day, minuteOfDay);

  countVehicles(sim.traffic, sim.people); // foto del tráfico para este tick
  for (const person of sim.people) updatePerson(person, sim);
}

// Métricas del día: se reinician a medianoche.
function newDayStats(day) {
  return { day, trips: 0, tripMinutes: 0, lateArrivals: 0, detours: 0 };
}

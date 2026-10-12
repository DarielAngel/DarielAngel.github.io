// DESEOS (Desires): las metas que una persona PODRÍA perseguir.
//
// Cada deseo tiene:
//   - utility(beliefs, person): un número entre 0 y 1. ¿Cuánto lo quiero AHORA?
//     Solo mira las creencias, nunca el mundo directamente.
//   - plan(beliefs, person): la lista de pasos para conseguirlo.
//   - onComplete (opcional): qué cambia en mis creencias al terminarlo.
//
// La persona no persigue todos sus deseos: en cada deliberación elige el de
// mayor utilidad. Para añadir un comportamiento nuevo basta con añadir un
// objeto a esta lista, sin tocar el resto del código.

import { isNight } from "./beliefs.js";
import { goTo, stay } from "./intentions.js";

const clamp = (n) => Math.max(0, Math.min(1, n));

export const DESIRES = [
  {
    id: "sleep",
    label: "Dormir",
    utility(beliefs) {
      const tiredness = 1 - beliefs.energy / 100; // 0 descansado, 1 agotado
      if (isNight(beliefs)) return clamp(0.3 + tiredness * 0.7);
      return clamp(tiredness ** 3 * 0.9); // de día solo si está MUY cansado
    },
    plan(beliefs, person) {
      // Pone el despertador a la hora a la que cree que debe salir para el trabajo.
      // Al sonar, el plan "Dormir" termina y vuelve a deliberar: si es día
      // laborable gana "Trabajar"; si no, seguramente vuelve a dormirse.
      const alarmAt = Math.max(0, timeToLeaveForWork(beliefs, person));
      return [goTo(person.homeId), stay("sleep", { until: "rested", alarmAt })];
    },
  },

  {
    id: "work",
    label: "Trabajar",
    utility(beliefs, person) {
      if (!beliefs.isWorkday || beliefs.workedToday) return 0;
      const now = beliefs.minuteOfDay;
      const timeToLeave = timeToLeaveForWork(beliefs, person);
      if (now < timeToLeave || now >= person.workEnd) return 0;
      const late = now > person.workStart && beliefs.location !== person.workId;
      return late ? 0.75 : 0.6; // si ya va tarde, ir al trabajo le urge más
    },
    plan(beliefs, person) {
      return [goTo(person.workId), stay("work", { untilMinute: person.workEnd })];
    },
    onComplete(beliefs) {
      beliefs.workedToday = true;
    },
  },

  {
    id: "eat",
    label: "Comer",
    // Escrita por Dariel: a la hora de comer o cenar, comer apetece más.
    utility(beliefs) {
      const hour = beliefs.minuteOfDay / 60; // 13.25 = 13:15
      const isLunchTime = hour >= 12 && hour < 14;
      const isDinnerTime = hour >= 19 && hour < 21;
      const bonus = isLunchTime || isDinnerTime ? 0.25 : 0;
      return clamp(beliefs.hunger / 100 + bonus);
    },
    plan(beliefs, person) {
      // Come donde esté si es su trabajo (comedor); si no, en casa.
      const place = beliefs.location === person.workId ? person.workId : person.homeId;
      return [goTo(place), stay("eat", { until: "fed" })];
    },
  },

  {
    id: "relax",
    label: "Descansar en casa",
    utility() {
      return 0.25; // valor base: lo que hace si nada es más urgente
    },
    plan(beliefs, person) {
      return [goTo(person.homeId), stay("relax", { minutes: 30 })];
    },
  },
];

// Hora a la que CREE que debe salir de casa: entrada − lo que cree que tarda − margen.
// El margen (20 min) cubre que solo delibera cada 15 minutos.
// (Escrita por Dariel.) Si una obra le cortó el paso hoy o ayer, sale 10 minutos antes.
function timeToLeaveForWork(beliefs, person) {
  const daysSinceWorks = beliefs.day - (beliefs.lastWorksSeenDay ?? -Infinity); // Infinity si nunca vio una
  const extra = daysSinceWorks < 2 ? 10 : 0;
  return person.workStart - beliefs.commuteMinutes - 20 - extra;
}

export function findDesire(id) {
  return DESIRES.find((d) => d.id === id);
}

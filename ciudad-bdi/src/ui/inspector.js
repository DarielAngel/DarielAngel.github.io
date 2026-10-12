// Panel de inspección: muestra la mente BDI de una persona en vivo.
//
// Solo LEE el estado del motor. Se redibuja 5 veces por segundo (no 60),
// porque reconstruir HTML es más caro que pintar en el canvas y el ojo no
// necesita más.

import { formatTime } from "../engine/clock.js";

const ACTIVITY = {
  sleep: "Durmiendo",
  relax: "En casa",
  travel: "En camino",
  work: "Trabajando",
  eat: "Comiendo",
};

export function createInspector(root, sim) {
  let selectedId = 0;
  let lastRender = 0;

  const select = document.getElementById("person-id");
  select.max = sim.people.length - 1;
  select.addEventListener("change", () => inspector.select(Number(select.value)));
  document.getElementById("person-next").addEventListener("click", () =>
    inspector.select((selectedId + 1) % sim.people.length)
  );

  const inspector = {
    get selectedId() {
      return selectedId;
    },
    select(id) {
      if (Number.isNaN(id) || !sim.people[id]) return;
      selectedId = id;
      select.value = id;
      render();
    },
    update(now) {
      if (now - lastRender < 200) return;
      lastRender = now;
      render();
    },
  };

  function render() {
    const p = sim.people[selectedId];
    const b = p.beliefs;
    const where =
      b.location === null
        ? "en la calle"
        : b.location === p.homeId
          ? `en casa (#${p.homeId})`
          : b.location === p.workId
            ? `en el trabajo (#${p.workId})`
            : `edificio #${b.location}`;
    const hhmm = (m) => formatTime({ tick: m, startMinute: 0 });
    const best = Math.max(...p.desires.map((d) => d.utility), 0);
    const intent = p.intention;

    root.innerHTML = `
      <section>
        <h3>Creencias</h3>
        <dl>
          <dt>Ahora</dt><dd>${ACTIVITY[p.activity]}, ${where}</dd>
          <dt>Horario</dt><dd>${hhmm(p.workStart)}–${hhmm(p.workEnd)} · ${b.isWorkday ? "día laborable" : "fin de semana"}</dd>
          <dt>Trabajó hoy</dt><dd>${b.workedToday ? "sí" : "no"}</dd>
          <dt>Cree que tarda</dt><dd>${b.commuteMinutes} min hasta el trabajo</dd>
          <dt>Radio</dt><dd>${p.listensRadio ? "la escucha a las 07:00" : "no la escucha"}</dd>
          <dt>Obras vistas</dt><dd>${b.knownWorks.size ? `${b.knownWorks.size} casillas (la última, el día ${b.lastWorksSeenDay})` : "ninguna"}</dd>
        </dl>
        ${meter("Energía", b.energy, "energy")}
        ${meter("Hambre", b.hunger, "hunger")}
      </section>

      <section>
        <h3>Deseos <small>utilidad 0–1</small></h3>
        <ul class="desires">
          ${p.desires
            .map(
              (d) => `<li class="${intent?.desireId === d.id ? "chosen" : ""}">
                <span>${d.label}</span>
                <span class="gauge"><i style="width:${d.utility * 100}%"></i></span>
                <b>${d.utility.toFixed(2)}</b>
              </li>`
            )
            .join("")}
        </ul>
      </section>

      <section>
        <h3>Intención</h3>
        ${
          intent
            ? `<p class="intent">${intent.label} <small>comprometida con ${intent.utility.toFixed(2)}</small></p>
               <ol class="plan">${intent.steps
                 .map((s, i) => `<li class="${i === intent.stepIndex ? "now" : i < intent.stepIndex ? "done" : ""}">${describeStep(s, p)}</li>`)
                 .join("")}</ol>`
            : `<p class="muted">Deliberando…</p>`
        }
      </section>

      <section>
        <h3>Reconsideraciones</h3>
        ${
          p.history.length
            ? `<ul class="history">${p.history
                .map((h) => `<li><time>${formatTime({ tick: h.tick, startMinute: sim.clock.startMinute })}</time> ${h.text}</li>`)
                .join("")}</ul>`
            : `<p class="muted">Todavía ninguna.</p>`
        }
      </section>`;
  }

  function describeStep(step, p) {
    if (step.type === "goTo") {
      if (step.buildingId === p.homeId) return "Ir a casa";
      if (step.buildingId === p.workId) return "Ir al trabajo";
      return `Ir al edificio #${step.buildingId}`;
    }
    const until = step.until;
    const cond =
      until.minutes !== undefined ? `${until.minutes} min`
      : until.untilMinute !== undefined ? `hasta las ${formatTime({ tick: until.untilMinute, startMinute: 0 })}`
      : until.until === "fed" ? "hasta saciarse"
      : "hasta descansar";
    return `${ACTIVITY[step.activity]} ${cond}`;
  }

  function meter(label, value, kind) {
    return `<div class="meter ${kind}"><span>${label}</span><span class="gauge"><i style="width:${value}%"></i></span><b>${Math.round(value)}</b></div>`;
  }

  return inspector;
}

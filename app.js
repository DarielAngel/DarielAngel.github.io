// Dibuja el portafolio a partir de datos.js. No hace falta tocar este archivo para cambiar contenido.
(function () {
  const D = window.PORTAFOLIO
  const $ = (sel) => document.querySelector(sel)

  // ---------- Íconos (trazos de 24×24) ----------
  const ICONS = {
    carrito: '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3h2.6l2.4 11.2a1.6 1.6 0 0 0 1.6 1.3h8.6a1.6 1.6 0 0 0 1.6-1.2L21 7H6.2"/>',
    balanza: '<path d="M12 3v18M7 21h10M5 7h14M12 7 9 5h6l-3 2"/><path d="m5 7-3 7a3.5 3.5 0 0 0 6 0L5 7zM19 7l-3 7a3.5 3.5 0 0 0 6 0l-3-7z"/>',
    robot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01M9.5 17h5M2 13v3M22 13v3"/><circle cx="12" cy="3.5" r="1"/>',
    servidor: '<rect x="3" y="3.5" width="18" height="7" rx="2"/><rect x="3" y="13.5" width="18" height="7" rx="2"/><path d="M7 7h.01M7 17h.01M11 7h6M11 17h6"/>',
    capas: '<path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 13 9 5 9-5"/><path d="m3 17.5 9 5 9-5" opacity=".55"/>',
    grafico: '<path d="M3 3v18h18"/><path d="m7 15 4-5 3 3 5-7"/><circle cx="19" cy="6" r="1.2"/>',
    cerebro: '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3h0a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z"/>',
    codigo: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    idiomas: '<path d="M4 5h9M8.5 3v2M6 5c.5 3.5 2.6 6.4 6 8M11 5c-.7 3.8-3.2 6.8-7 8.5"/><path d="m13 21 4-9 4 9M14.4 18h5.2"/>',
    llave: '<circle cx="8" cy="15" r="4"/><path d="m10.9 12.1 8.6-8.6M17 6l2.5 2.5M14.5 8.5 17 11"/>',
    tarea: '<rect x="4" y="3.5" width="16" height="17" rx="2.5"/><path d="m8.5 12 2.2 2.2L15.5 9.5M8.5 7h7" opacity=".9"/>',
    github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
    telegram: '<path d="m21.5 3.5-19 7.3 6.2 2.2 2.3 6.5 3.5-4.2 5 3.7 2-15.5zM8.7 13l9.3-6.8-7 8.3"/>',
    correo: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
    descarga: '<path d="M12 3v12M7 10l5 5 5-5M4 19h16"/>',
    flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    externo: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    luna: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    maletin: '<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
    reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    chat: '<path d="M4 5h16v11H9l-5 4V5z"/><path d="M8 9.5h8M8 12.5h5"/>',
    documento: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    cohete: '<path d="M12 15c-2-2-3-5-1-9 2-3 6-3 8-3 0 2 0 6-3 8-4 2-7 1-9-1"/><path d="M9 13 5 17M7 14l-3-1 3-3M10 17l1 3 3-3"/><circle cx="15" cy="9" r="1.3"/>',
    whatsapp: '<path d="M4 20l1.3-4A8 8 0 1 1 8 19z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.6-2-.9-.8.8c-1-.4-1.9-1.3-2.3-2.3l.8-.8-.9-2L9.5 9z"/>',
    birrete: '<path d="m2 9 10-5 10 5-10 5L2 9z"/><path d="M6 11v5c3 2 9 2 12 0v-5M22 9v6"/>'
  }
  const icon = (name, cls = '') =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.codigo}</svg>`

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

  // ---------- Preferencias del visitante (idioma y tema) ----------
  const store = {
    get(k) { try { return localStorage.getItem(k) } catch { return null } },
    set(k, v) { try { localStorage.setItem(k, v) } catch { /* sin almacenamiento: solo por esta visita */ } }
  }
  let lang = store.get('portafolio-idioma') || ((navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en')
  let filtro = 'todas'
  const tx = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? (v[lang] ?? v.es) : v)
  const T = () => D.textos[lang]
  const cat = (id) => D.categorias[id] || { es: id, en: id, color: 'esmeralda' }
  const cvUrl = () => tx(D.perfil.cv)

  // 'Repo' o 'Repo@rama' → enlace al repositorio (o a esa rama)
  function repoInfo(r) {
    const [name, branch] = r.split('@')
    const base = `https://github.com/${D.perfil.usuarioGithub}/${name}`
    return { name, url: branch ? `${base}/tree/${branch}` : base }
  }

  function initials(name) {
    return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
  }

  function mailto() {
    return `mailto:${D.contacto.email}?subject=${encodeURIComponent(T().asuntoCorreo)}`
  }

  // ---------- Secciones ----------
  function renderHeader() {
    const t = T()
    $('#nav').innerHTML = Object.entries(t.menu).map(([id, label]) => `<a href="#${id}">${esc(label)}</a>`).join('')
    $('#logo').textContent = initials(D.perfil.nombre)
    $('#logo-name').textContent = D.perfil.nombreCorto
    const b = $('#btn-idioma')
    b.textContent = lang === 'es' ? 'EN' : 'ES'
    b.setAttribute('aria-label', t.idiomaAria)
    b.title = t.idioma
    $('#btn-tema').setAttribute('aria-label', t.tema)
    $('#btn-tema').title = t.tema
    $('#btn-menu').innerHTML = icon('menu')
  }

  function renderHero() {
    const p = D.perfil, t = T(), c = D.contacto
    const [first, ...rest] = p.nombre.split(' ')
    $('#hero-text').innerHTML = `
      ${p.disponible ? `<span class="badge rise"><span class="pulse"></span>${esc(tx(p.disponibilidad))}</span>` : ''}
      <span class="hello rise">${esc(t.hola)}</span>
      <h1 class="rise">${esc(first)} <span class="grad">${esc(rest.join(' '))}</span></h1>
      <p class="role rise">${esc(tx(p.titulo))} <span class="role-spec">${esc(tx(p.especialidad))}</span></p>
      <p class="lede rise">${esc(tx(p.lema))}</p>
      <ul class="facts rise">${(p.datosRapidos || []).map((d) => `<li>${icon(d.icono)}${esc(tx(d.texto))}</li>`).join('')}</ul>
      <div class="actions rise">
        <a class="btn btn-primary" href="#contacto">${esc(t.pedirPresupuesto)} ${icon('flecha')}</a>
        ${p.cv ? `<a class="btn btn-ghost" href="${esc(cvUrl())}" target="_blank" rel="noopener">${icon('descarga')} ${esc(t.descargarCV)}</a>` : ''}
        <a class="btn btn-link" href="#proyectos">${esc(t.verProyectos)}</a>
      </div>
      <div class="socials rise">
        ${c.telegram ? `<a href="https://t.me/${esc(c.telegram)}" target="_blank" rel="noopener">${icon('telegram')} @${esc(c.telegram)}</a>` : ''}
        ${c.whatsapp ? `<a href="https://wa.me/${esc(c.whatsapp)}" target="_blank" rel="noopener">${icon('whatsapp')} WhatsApp</a>` : ''}
        <a href="${esc(c.github)}" target="_blank" rel="noopener">${icon('github')} GitHub</a>
        ${c.linkedin ? `<a href="${esc(c.linkedin)}" target="_blank" rel="noopener">${icon('linkedin')} LinkedIn</a>` : ''}
      </div>`
    const chips = [['C# · .NET', 'var(--ambar)'], ['Vue 3', 'var(--esmeralda)'], ['Django', 'var(--cielo)']]
    const face = p.avatar
      ? `<img src="${esc(p.avatar)}" alt="${esc(p.nombre)}" width="400" height="400">`
      : `<span class="initials">${esc(initials(p.nombre))}</span>`
    $('#portrait').innerHTML = `
      <div class="portrait-ring"></div>
      <div class="portrait-inner">${face}</div>
      ${chips.map(([l, col]) => `<span class="chip-float"><i style="background:${col}"></i>${l}</span>`).join('')}`
    const img = $('#portrait img')
    // Si la foto no carga, van las iniciales.
    if (img) img.addEventListener('error', () => { img.parentElement.innerHTML = `<span class="initials">${esc(initials(p.nombre))}</span>` }, { once: true })
  }

  function renderAbout() {
    $('#about-text').innerHTML = tx(D.sobreMi).map((par) => `<p>${esc(par)}</p>`).join('')
    $('#stats').innerHTML = D.cifras.map((c) => `<div class="stat"><b>${esc(lang === 'en' && c.valorEn ? c.valorEn : c.valor)}</b><span>${esc(tx(c.texto))}</span></div>`).join('')
    $('#skills').innerHTML = D.habilidades.map((g) => `
      <div class="skill-group" data-c="${esc(g.color)}">
        <h3><span class="dot" style="background:var(--c)"></span>${esc(tx(g.grupo))}</h3>
        <div class="tags">${g.items.map((i) => `<span class="tag">${esc(tx(i))}</span>`).join('')}</div>
      </div>`).join('')
  }

  function links(pr) {
    const t = T()
    const repos = (pr.repos || []).map((r) => {
      const { name, url } = repoInfo(r)
      return `<a class="repo-link" href="${esc(url)}" target="_blank" rel="noopener" title="${esc(t.codigo)}: ${esc(name)}">${icon('github')}<span>${esc(name)}</span></a>`
    }).join('')
    const demo = pr.demo ? `<a class="repo-link demo" href="${esc(pr.demo)}" target="_blank" rel="noopener">${icon('externo')}<span>${esc(pr.demoTexto ? tx(pr.demoTexto) : t.demo)}</span></a>` : ''
    return `<div class="links">${demo}${repos}</div>`
  }

  const tags = (pr) => `<div class="tags">${(pr.stack || []).map((s) => `<span class="tag">${esc(tx(s))}</span>`).join('')}</div>`
  const meta = (pr, c) => `<div class="card-meta"><span class="pill">${esc(tx(c))}</span>${pr.fecha ? `<span class="date">${esc(tx(pr.fecha))}</span>` : ''}</div>`

  function renderProjects() {
    const visibles = D.proyectos.filter((p) => p.visible !== false)
    const destacados = visibles.filter((p) => p.destacado)
    const resto = visibles.filter((p) => !p.destacado)
    const t = T()

    $('#featured').innerHTML = destacados.map((pr) => {
      const c = cat(pr.categoria)
      const banner = pr.imagen
        ? `<div class="shot"><div class="shot-bar"><i></i><i></i><i></i></div><img src="${esc(pr.imagen)}" alt="${esc(tx(pr.titulo))}"></div>`
        : icon(pr.icono, 'big-icon')
      const wins = tx(pr.logros) || []
      const bannerTag = pr.demo ? 'a' : 'div'
      const bannerAttrs = pr.demo ? ` href="${esc(pr.demo)}" target="_blank" rel="noopener" aria-label="${esc(t.demo)}: ${esc(tx(pr.titulo))}"` : ''
      return `
        <article class="card" data-c="${esc(c.color)}">
          <${bannerTag} class="banner"${bannerAttrs}>${banner}${pr.demo ? `<span class="live-badge">${icon('externo')}${esc(t.demo)}</span>` : ''}</${bannerTag}>
          <div class="card-body">
            ${meta(pr, c)}
            <h3>${esc(tx(pr.titulo))}</h3>
            ${pr.util ? `<p class="use"><b>${esc(t.util)}:</b> ${esc(tx(pr.util))}</p>` : ''}
            <p>${esc(tx(pr.resumen))}</p>
            ${wins.length ? `<ul class="wins">${wins.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>` : ''}
            ${tags(pr)}
            ${links(pr)}
          </div>
        </article>`
    }).join('')

    const usadas = Object.keys(D.categorias).filter((id) => resto.some((p) => p.categoria === id))
    if (filtro !== 'todas' && !usadas.includes(filtro)) filtro = 'todas'
    $('#filters').setAttribute('aria-label', t.seccionMas)
    $('#filters').innerHTML =
      `<button type="button" class="filter" data-f="todas" aria-pressed="${filtro === 'todas'}">${esc(t.todas)} <span class="count">${resto.length}</span></button>` +
      usadas.map((id) => {
        const c = cat(id)
        return `<button type="button" class="filter" data-f="${id}" data-c="${esc(c.color)}" aria-pressed="${filtro === id}">${esc(tx(c))} <span class="count">${resto.filter((p) => p.categoria === id).length}</span></button>`
      }).join('')

    $('#more').innerHTML = resto.filter((p) => filtro === 'todas' || p.categoria === filtro).map((pr) => {
      const c = cat(pr.categoria)
      return `
        <article class="card mini" data-c="${esc(c.color)}">
          <div class="mini-top"><span class="mini-icon">${icon(pr.icono)}</span>${meta(pr, c)}</div>
          <h3>${esc(tx(pr.titulo))}</h3>
          <p>${esc(tx(pr.resumen))}</p>
          ${tags(pr)}
          ${links(pr)}
        </article>`
    }).join('')
  }

  function renderServices() {
    const colors = ['esmeralda', 'ambar', 'cielo', 'fucsia', 'indigo', 'rosa']
    $('#services').innerHTML = D.servicios.map((s, i) => `
      <div class="service" data-c="${colors[i % colors.length]}">
        <span class="mini-icon">${icon(s.icono)}</span>
        <h3>${esc(tx(s.titulo))}</h3>
        <p>${esc(tx(s.texto))}</p>
        ${s.ejemplo ? `<p class="service-eg">${esc(tx(s.ejemplo))}</p>` : ''}
      </div>`).join('')
  }

  function renderProcess() {
    $('#process').innerHTML = (D.proceso || []).map((p, i) => `
      <li class="step-p"><span class="step-n">${i + 1}</span><div><h3>${esc(tx(p.titulo))}</h3><p>${esc(tx(p.texto))}</p></div></li>`).join('')
    $('#terms').innerHTML = `<h3>${esc(T().condiciones)}</h3><dl>` + (D.condiciones || []).map((c) => `
      <div class="term">${icon(c.icono)}<dt>${esc(tx(c.etiqueta))}</dt><dd>${esc(tx(c.valor))}</dd></div>`).join('') + '</dl>'
    const note = $('#ai-note')
    note.hidden = !D.notaIA
    if (D.notaIA) note.innerHTML = `${icon('robot')}<span>${esc(tx(D.notaIA))}</span>`
  }

  function renderTimeline() {
    const t = T()
    $('#timeline').innerHTML = D.trayectoria.map((s) => {
      const work = s.tipo === 'trabajo'
      return `
        <div class="step" data-c="${work ? 'esmeralda' : 'indigo'}">
          <span class="step-icon">${icon(work ? 'maletin' : 'birrete')}</span>
          <div class="step-card">
            <div class="step-meta"><span class="step-date">${esc(tx(s.fechas))}</span><span class="step-kind">${esc(work ? t.trabajo : t.estudio)}</span></div>
            <h3>${esc(tx(s.puesto))}</h3>
            <span class="step-place">${esc(s.lugar)}</span>
            <ul>${(tx(s.detalle) || []).map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
          </div>
        </div>`
    }).join('')
  }

  function renderQuotes() {
    const list = (D.testimonios || []).filter((q) => q && q.texto)
    $('#testimonios').hidden = list.length === 0
    $('#quotes').innerHTML = list.map((q) => `
      <figure class="quote"><blockquote>${esc(tx(q.texto))}</blockquote><figcaption><b>${esc(q.nombre)}</b> · ${esc(tx(q.cargo))}</figcaption></figure>`).join('')
  }

  function renderContact() {
    const c = D.contacto, t = T(), p = D.perfil
    const cv = p.cv && typeof p.cv === 'object' ? p.cv : { es: p.cv, en: p.cv }
    $('#contact-cta').innerHTML = `
      <div class="cta-row">
        ${c.whatsapp ? `<a class="btn btn-light" href="https://wa.me/${esc(c.whatsapp)}" target="_blank" rel="noopener">${icon('whatsapp')} ${esc(t.escribirWhatsapp)}</a>` : ''}
        ${c.telegram ? `<a class="btn btn-light" href="https://t.me/${esc(c.telegram)}" target="_blank" rel="noopener">${icon('telegram')} ${esc(t.escribirTelegram)}</a>` : ''}
        ${c.email ? `<a class="btn btn-outline-light" href="${esc(mailto())}">${icon('correo')} ${esc(t.escribirCorreo)}</a>` : ''}
      </div>
      ${p.cv ? `<div class="team-box"><p>${esc(t.contactoEquipo)}</p><div class="cta-row">
        <a class="btn btn-outline-light btn-sm" href="${esc(cv.es)}" target="_blank" rel="noopener">${icon('descarga')} ${esc(t.cvEs)}</a>
        <a class="btn btn-outline-light btn-sm" href="${esc(cv.en)}" target="_blank" rel="noopener">${icon('descarga')} ${esc(t.cvEn)}</a>
      </div></div>` : ''}`
    const items = []
    if (c.email) items.push(`
      <div class="contact-item">${icon('correo')}
        <span class="grow"><span class="label">Email</span><a class="value" href="${esc(mailto())}" style="text-decoration:none;color:inherit">${esc(c.email)}</a></span>
        <button type="button" class="copy-btn" data-copy="${esc(c.email)}">${esc(t.copiar)}</button>
      </div>`)
    if (c.telegram) items.push(`<a class="contact-item" href="https://t.me/${esc(c.telegram)}" target="_blank" rel="noopener">${icon('telegram')}<span class="grow"><span class="label">Telegram</span><span class="value">@${esc(c.telegram)}</span></span></a>`)
    if (c.whatsapp) items.push(`<a class="contact-item" href="https://wa.me/${esc(c.whatsapp)}" target="_blank" rel="noopener">${icon('whatsapp')}<span class="grow"><span class="label">WhatsApp</span><span class="value">+${esc(c.whatsapp)}</span></span></a>`)
    if (c.linkedin) items.push(`<a class="contact-item" href="${esc(c.linkedin)}" target="_blank" rel="noopener">${icon('linkedin')}<span class="grow"><span class="label">LinkedIn</span><span class="value">${esc(c.linkedin.replace(/^https?:\/\/(www\.)?/, ''))}</span></span></a>`)
    if (c.github) items.push(`<a class="contact-item" href="${esc(c.github)}" target="_blank" rel="noopener">${icon('github')}<span class="grow"><span class="label">GitHub</span><span class="value">${esc(c.github.replace(/^https?:\/\//, ''))}</span></span></a>`)
    if (p.cv) items.push(`<a class="contact-item" href="${esc(cvUrl())}" target="_blank" rel="noopener">${icon('descarga')}<span class="grow"><span class="label">CV</span><span class="value">${esc(t.descargarCV)} (PDF)</span></span></a>`)
    $('#contact-list').innerHTML = items.join('')
    $('#footer-name').textContent = `© ${new Date().getFullYear()} ${p.nombre}`
  }

  function renderTexts() {
    document.querySelectorAll('[data-t]').forEach((el) => { el.textContent = T()[el.dataset.t] ?? '' })
    document.documentElement.lang = lang
  }

  function renderThemeIcon() {
    const explicit = document.documentElement.getAttribute('data-theme')
    const dark = explicit ? explicit === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
    $('#btn-tema').innerHTML = icon(dark ? 'sol' : 'luna')
  }

  function renderAll() {
    renderHeader(); renderHero(); renderAbout(); renderProjects(); renderServices(); renderProcess(); renderTimeline(); renderQuotes(); renderContact(); renderTexts(); renderThemeIcon()
  }

  // ---------- Eventos ----------
  $('#btn-idioma').addEventListener('click', () => {
    lang = lang === 'es' ? 'en' : 'es'
    store.set('portafolio-idioma', lang)
    renderAll()
  })
  $('#btn-tema').addEventListener('click', () => {
    const explicit = document.documentElement.getAttribute('data-theme')
    const dark = explicit ? explicit === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
    const next = dark ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    store.set('portafolio-tema', next)
    renderThemeIcon()
  })
  $('#btn-menu').addEventListener('click', () => {
    const open = $('#nav').classList.toggle('open')
    $('#btn-menu').setAttribute('aria-expanded', String(open))
  })
  $('#nav').addEventListener('click', (e) => {
    if (e.target.closest('a')) { $('#nav').classList.remove('open'); $('#btn-menu').setAttribute('aria-expanded', 'false') }
  })
  $('#filters').addEventListener('click', (e) => {
    const b = e.target.closest('[data-f]')
    if (!b) return
    filtro = b.dataset.f
    renderProjects()
  })
  document.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-copy]')
    if (!b) return
    try {
      await navigator.clipboard.writeText(b.dataset.copy)
      b.textContent = T().copiado
      setTimeout(() => { b.textContent = T().copiar }, 1600)
    } catch {
      // Sin portapapeles: selecciona el texto para que se pueda copiar a mano.
      const v = b.parentElement.querySelector('.value')
      const r = document.createRange(); r.selectNodeContents(v)
      const s = getSelection(); s.removeAllRanges(); s.addRange(r)
    }
  })
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', renderThemeIcon)

  renderAll()
})()

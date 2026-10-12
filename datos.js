/*
 * ============================================================================
 *  DATOS DEL PORTAFOLIO — el único archivo que necesitas editar.
 * ============================================================================
 *  - Cada texto tiene su versión en español (es) y en inglés (en).
 *  - Para agregar un proyecto, copia un bloque { ... } de la lista "proyectos" y cámbialo.
 *  - Para ocultar algo sin borrarlo: visible: false
 *  - "destacado: true" lo pone en la sección grande de arriba (se ven mejor 2 o 4).
 *  - "imagen": ruta a una captura dentro de assets/ (opcional). Sin imagen se dibuja un ícono.
 *  - "repos": nombre del repositorio; si el código está en otra rama, escribe 'Repo@rama'.
 *  - Iconos: carrito, balanza, robot, servidor, capas, grafico, cerebro, codigo, idiomas, llave, tarea,
 *    reloj, chat, documento, cohete
 *  - Una habilidad o tecnología puede ser texto simple o { es: ..., en: ... } si cambia con el idioma.
 *  - Busca "PENDIENTE" para ver lo que conviene completar.
 * ============================================================================
 */
window.PORTAFOLIO = {
  perfil: {
    nombre: 'Dariel Angel Arro Moreno',
    nombreCorto: 'Dariel',
    usuarioGithub: 'DarielAngel',
    // PENDIENTE: pon aquí una foto tuya (por ejemplo 'assets/foto.jpg'). Vacío = se muestran tus iniciales.
    avatar: '',
    titulo: { es: 'Desarrollador full-stack', en: 'Full-stack developer' },
    especialidad: { es: '.NET · Vue · Django', en: '.NET · Vue · Django' },
    lema: {
      es: 'Construyo aplicaciones web completas para empresas y equipos: tiendas en línea, sistemas de gestión y paneles con datos. Del diseño de la base de datos al despliegue, con pruebas automáticas.',
      en: 'I build complete web applications for businesses and teams: online stores, management systems and data dashboards. From database design to deployment, with automated tests.'
    },
    ubicacion: { es: 'Cuba · trabajo en remoto', en: 'Cuba · working remotely' },
    disponible: true,
    disponibilidad: {
      es: 'Disponible: tiempo completo, medio tiempo o por proyecto',
      en: 'Available: full-time, part-time or per project'
    },
    // Datos de un vistazo debajo del título.
    datosRapidos: [
      { icono: 'reloj', texto: { es: 'Horario compatible con América y la tarde europea', en: 'Hours that overlap the Americas and the European afternoon' } },
      { icono: 'idiomas', texto: { es: 'Español nativo · inglés B1', en: 'Native Spanish · English B1' } },
      { icono: 'chat', texto: { es: 'Respondo en menos de 24 h', en: 'I reply within 24 hours' } } // PENDIENTE: confírmalo o cámbialo
    ],
    cv: { es: 'cv/Dariel_Angel_Arro_Moreno-CV-ES.pdf', en: 'cv/Dariel_Angel_Arro_Moreno-CV-EN.pdf' }
  },

  contacto: {
    email: 'darielarrom@gmail.com',
    telegram: 'darielangel', // sin la @
    whatsapp: '', // PENDIENTE: número con código de país, solo dígitos (ej. 5355555555). Vacío = no se muestra
    github: 'https://github.com/DarielAngel',
    linkedin: '' // PENDIENTE: URL de tu LinkedIn. Vacío = no se muestra
  },

  sobreMi: {
    es: [
      'Soy ingeniero en Ciencias Informáticas (UCI, 2025) y llevo un año como desarrollador de software en XEJEL. Construyo sistemas completos: diseño la base de datos, escribo la API, hago la interfaz y lo dejo funcionando en un servidor, con pruebas automáticas y monitoreo.',
      'Mi proyecto más grande es una tienda en línea completa con pagos, devoluciones, cupones y puntos de lealtad. También hice un sistema para organizar el trabajo de los abogados de una provincia y una simulación de tráfico con 300 personas que puedes probar en el navegador.',
      'Vengo de la programación competitiva (ICPC): me gusta entender bien el problema antes de escribir código, y entregar algo que otra persona pueda mantener.'
    ],
    en: [
      'I am a Computer Science engineer (UCI, 2025) with a year of experience as a software developer at XEJEL. I build complete systems: I design the database, write the API, build the interface and get it running on a server, with automated tests and monitoring.',
      'My largest project is a complete online store with payments, returns, coupons and loyalty points. I also built a system to organize the work of a province’s lawyers and a traffic simulation with 300 people that you can try in your browser.',
      'I come from competitive programming (ICPC): I like to understand the problem before writing code, and to deliver something another person can maintain.'
    ]
  },

  // Cifras cortas que aparecen junto a "Sobre mí".
  cifras: [
    { valor: '1 año', valorEn: '1 year', texto: { es: 'como desarrollador de software en XEJEL', en: 'as a software developer at XEJEL' } },
    { valor: '750+', texto: { es: 'pruebas automáticas en mi proyecto principal', en: 'automated tests in my main project' } },
    { valor: '300', texto: { es: 'agentes en la simulación que puedes probar en vivo', en: 'agents in the simulation you can try live' } }
  ],

  habilidades: [
    { grupo: { es: 'Backend', en: 'Backend' }, color: 'ambar',
      items: ['C#', '.NET 8', 'ASP.NET Core', 'Entity Framework Core', 'Django', 'Node.js / Express', 'REST APIs', 'Clean Architecture', 'RabbitMQ'] },
    { grupo: { es: 'Frontend', en: 'Frontend' }, color: 'esmeralda',
      items: ['Vue 3', 'Pinia', 'Vite', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'PWA', { es: 'React (básico)', en: 'React (basic)' }] },
    { grupo: { es: 'Bases de datos', en: 'Databases' }, color: 'cielo',
      items: ['PostgreSQL', 'SQLite', 'Sequelize', { es: 'Optimización de consultas', en: 'Query optimization' }] },
    { grupo: { es: 'Despliegue y calidad', en: 'Deployment & quality' }, color: 'indigo',
      items: ['Docker / Compose', 'Linux (Ubuntu Server)', 'Nginx', 'Prometheus', 'Grafana', 'GitHub Actions', 'xUnit', 'Vitest', 'Playwright'] },
    { grupo: { es: 'IA y algoritmos', en: 'AI & algorithms' }, color: 'fucsia',
      items: [{ es: 'Desarrollo asistido por IA', en: 'AI-assisted development' }, { es: 'API de Gemini', en: 'Gemini API' }, { es: 'Bots de Telegram', en: 'Telegram bots' }, 'Python', 'scikit-learn', { es: 'Agentes BDI', en: 'BDI agents' }, 'ICPC'] }
  ],

  // Categorías de proyectos (el filtro de la sección "Más proyectos").
  categorias: {
    fullstack: { es: 'Full-stack', en: 'Full-stack', color: 'esmeralda' },
    backend: { es: 'Backend .NET', en: '.NET backend', color: 'ambar' },
    frontend: { es: 'Dashboards', en: 'Dashboards', color: 'cielo' },
    ia: { es: 'IA y simulación', en: 'AI & simulation', color: 'fucsia' },
    algoritmos: { es: 'Algoritmos', en: 'Algorithms', color: 'rosa' }
  },

  proyectos: [
    {
      id: 'ecommerce',
      visible: true,
      destacado: true,
      categoria: 'fullstack',
      icono: 'carrito',
      imagen: 'assets/ecommerce-tienda.webp',
      fecha: { es: 'sep.–oct. 2026', en: 'Sep–Oct 2026' },
      titulo: { es: 'Tienda en línea con panel de administración', en: 'Online store with admin panel' },
      util: { es: 'Para negocios que quieren vender en internet con pagos, envíos, devoluciones y fidelización.', en: 'For businesses that want to sell online with payments, shipping, returns and loyalty.' },
      resumen: {
        es: 'Catálogo con búsqueda, carrito, pago con PayPal, seguimiento del pedido, devoluciones con reembolso, cupones y puntos. El dueño lo gestiona todo desde un panel. Se instala en el teléfono como una app.',
        en: 'Searchable catalog, cart, PayPal checkout, order tracking, returns with refunds, coupons and points. The owner manages everything from a panel. It installs on the phone like an app.'
      },
      logros: {
        es: ['Lo dirigí por fases: definí cada funcionalidad, revisé el código y lo probé de punta a punta', 'Arquitectura de 11 microservicios .NET 8 con Vue 3, PostgreSQL y RabbitMQ', 'Más de 750 pruebas automáticas y CI en GitHub Actions', 'Stock, puntos y correos se actualizan solos después de cada pago o devolución'],
        en: ['I led it phase by phase: defined every feature, reviewed the code and tested it end to end', 'Architecture of 11 .NET 8 microservices with Vue 3, PostgreSQL and RabbitMQ', '750+ automated tests and CI on GitHub Actions', 'Stock, points and emails update automatically after each payment or return']
      },
      stack: ['C#', '.NET 8', 'Vue 3', 'PostgreSQL', 'RabbitMQ', 'Docker', 'PayPal'],
      repos: ['ecommerce-microservicios'],
      demo: '' // PENDIENTE: URL si algún día lo publicas en internet
    },
    {
      id: 'abogados',
      visible: true,
      destacado: true,
      categoria: 'fullstack',
      icono: 'balanza',
      imagen: 'assets/agenda-abogados.webp',
      fecha: { es: 'jun.–ago. 2026', en: 'Jun–Aug 2026' },
      titulo: { es: 'Sistema de agenda para abogados', en: 'Lawyer scheduling system' },
      util: { es: 'Para organizaciones que reparten tareas entre su personal y necesitan ver quién está libre cada día.', en: 'For organizations that assign tasks to their staff and need to see who is free each day.' },
      resumen: {
        es: 'Reparte el trabajo entre los abogados de una provincia: calendario mensual por persona, asignación de tareas sin choques de fechas, días no laborables configurables y búsqueda instantánea.',
        en: 'Distributes work among a province’s lawyers: monthly calendar per person, conflict-free task assignment, configurable non-working days and instant search.'
      },
      logros: {
        es: ['Primera versión con Node.js (Express) y Vue 3, con pruebas Vitest y Playwright', 'Migrada después por completo a Django conservando los mismos datos', 'Roles de administrador y usuario, y formularios que se guardan sin recargar'],
        en: ['First version with Node.js (Express) and Vue 3, tested with Vitest and Playwright', 'Later fully migrated to Django keeping the same data', 'Admin and user roles, and forms that save without reloading']
      },
      stack: ['Node.js', 'Vue 3', 'Django', 'Python', 'Docker', 'Playwright'],
      repos: ['DistribucionAbogadosTPPG', 'DistribucionAbogadosTPPGpython3'],
      demo: ''
    },
    {
      id: 'ciudad-bdi',
      visible: true,
      destacado: true,
      categoria: 'ia',
      icono: 'cerebro',
      imagen: 'assets/ciudad-bdi.webp',
      fecha: { es: 'oct. 2026', en: 'Oct 2026' },
      titulo: { es: 'Ciudad BDI — simulación con agentes', en: 'BDI City — agent-based simulation' },
      util: { es: 'Muestra cómo modelo comportamientos y tráfico: la base para simulaciones de logística, transporte o planificación urbana. Se prueba en el navegador.', en: 'Shows how I model behavior and traffic: the basis for logistics, transport or urban planning simulations. Runs in your browser.' },
      resumen: {
        es: 'Una ciudad vista desde arriba donde 300 personas deciden solas qué hacer: van al trabajo, comen, descansan, sufren atascos y esquivan obras. Nada está guionizado: la hora punta y los desvíos salen de sus decisiones.',
        en: 'A top-down city where 300 people decide on their own what to do: they commute, eat, rest, get stuck in traffic and avoid roadworks. Nothing is scripted: rush hour and detours emerge from their decisions.'
      },
      logros: {
        es: ['Cada habitante es un agente BDI (creencias, deseos e intenciones) que planifica y reacciona', 'Rutas con A* según el tráfico del momento; las personas aprenden de sus atascos', 'JavaScript puro, sin dependencias, determinista y separado de la pantalla'],
        en: ['Each resident is a BDI agent (beliefs, desires, intentions) that plans and reacts', 'A* routing based on live traffic; people learn from their traffic jams', 'Plain JavaScript, no dependencies, deterministic and decoupled from rendering']
      },
      stack: ['JavaScript', 'Canvas', { es: 'Agentes BDI', en: 'BDI agents' }, 'A*'],
      repos: ['ciudad-bdi'],
      demo: 'ciudad-bdi/'
    },
    {
      id: 'bot-gemini',
      visible: true,
      destacado: true,
      categoria: 'ia',
      icono: 'robot',
      fecha: { es: 'sep. 2026', en: 'Sep 2026' },
      titulo: { es: 'Asistente de IA en Telegram', en: 'AI assistant on Telegram' },
      util: { es: 'Para atender preguntas de clientes o del equipo a cualquier hora, desde Telegram.', en: 'To answer questions from customers or your team at any time, from Telegram.' },
      resumen: {
        es: 'Bot de Telegram que responde con inteligencia artificial usando Gemini de Google. Comparé también otros proveedores (Cerebras, OpenRouter) y lo dejé funcionando en la nube con Railway.',
        en: 'A Telegram bot that answers with AI using Google’s Gemini. I also compared other providers (Cerebras, OpenRouter) and left it running in the cloud on Railway.'
      },
      logros: {
        es: ['Integración directa con la API de Gemini', 'Pruebas para comparar proveedores de IA por calidad y costo', 'Desplegado en Railway'],
        en: ['Direct integration with the Gemini API', 'Tests to compare AI providers by quality and cost', 'Deployed on Railway']
      },
      stack: ['Python', 'Telegram', 'Gemini API', 'Railway'],
      repos: ['AgentGeminiAI'],
      demo: '' // PENDIENTE: enlace al bot (t.me/...) si es público
    },
    {
      id: 'easypos',
      visible: true,
      destacado: false,
      categoria: 'backend',
      icono: 'capas',
      fecha: { es: 'feb. 2025', en: 'Feb 2025' },
      titulo: { es: 'EasyPOS — API para punto de venta', en: 'EasyPOS — point-of-sale API' },
      resumen: {
        es: 'API organizada con Clean Architecture y CQRS: dominio sin dependencias, validación en un pipeline y pruebas unitarias por caso de uso.',
        en: 'An API organized with Clean Architecture and CQRS: dependency-free domain, validation in a pipeline and unit tests per use case.'
      },
      stack: ['C#', '.NET 8', 'EF Core', 'CQRS', 'DDD'],
      repos: ['EasyPOS@master']
    },
    {
      id: 'taskmaster',
      visible: true,
      destacado: false,
      categoria: 'backend',
      icono: 'tarea',
      fecha: { es: 'ene. 2026', en: 'Jan 2026' },
      titulo: { es: 'TaskMaster API', en: 'TaskMaster API' },
      resumen: {
        es: 'Hecha en mi trabajo en XEJEL: API REST de tareas con arquitectura en capas, Entity Framework Core sobre SQLite y patrón repositorio.',
        en: 'Built at my job at XEJEL: a REST API for tasks with a layered architecture, Entity Framework Core on SQLite and the repository pattern.'
      },
      stack: ['C#', 'ASP.NET Core', 'EF Core', 'SQLite'],
      repos: ['Projects-Net']
    },
    {
      id: 'auth-identity',
      visible: true,
      destacado: false,
      categoria: 'backend',
      icono: 'llave',
      fecha: { es: 'mar. 2025', en: 'Mar 2025' },
      titulo: { es: 'Inicio de sesión con ASP.NET Identity', en: 'Sign-in with ASP.NET Identity' },
      resumen: {
        es: 'Registro, inicio de sesión y tokens en una API mínima usando ASP.NET Identity sobre PostgreSQL.',
        en: 'Sign-up, sign-in and tokens in a minimal API using ASP.NET Identity on PostgreSQL.'
      },
      stack: ['C#', 'ASP.NET Identity', 'PostgreSQL'],
      repos: ['AuthenticationNetFrameworkInTwoLines@master']
    },
    {
      id: 'dashboard-planificacion',
      visible: true,
      destacado: false,
      categoria: 'frontend',
      icono: 'grafico',
      fecha: { es: '2024–2025 · tesis', en: '2024–2025 · thesis' },
      titulo: { es: 'Panel de planificación institucional', en: 'Institutional planning dashboard' },
      resumen: {
        es: 'Mi tesis de grado: plataforma para planificar y controlar actividades de una institución, con gráficos, varios idiomas y una API de Django sobre PostgreSQL optimizado.',
        en: 'My thesis: a platform to plan and track an institution’s activities, with charts, multiple languages and a Django API on tuned PostgreSQL.'
      },
      stack: ['Vue 3', 'Tailwind', 'Chart.js', 'Django', 'PostgreSQL'],
      repos: ['Dashboard-SIPAC']
    },
    {
      id: 'ia-notebooks',
      visible: true,
      destacado: false,
      categoria: 'ia',
      icono: 'grafico',
      fecha: { es: 'nov. 2024 – ene. 2025', en: 'Nov 2024 – Jan 2025' },
      titulo: { es: 'Modelos de aprendizaje automático', en: 'Machine learning models' },
      resumen: {
        es: 'Árboles y bosques de decisión y redes neuronales sobre datos reales: superconductividad (UC Irvine) y estabilidad de la red eléctrica.',
        en: 'Decision trees, random forests and neural networks on real datasets: superconductivity (UC Irvine) and power grid stability.'
      },
      stack: ['Python', 'Jupyter', 'scikit-learn', 'pandas'],
      repos: ['Inteligencia-Artificial']
    },
    {
      id: 'cp-es',
      visible: true,
      destacado: false,
      categoria: 'algoritmos',
      icono: 'idiomas',
      titulo: { es: 'CP-Algorithms en español', en: 'CP-Algorithms in Spanish' },
      resumen: {
        es: 'Colaboración en la traducción al español de cp-algorithms.com, la referencia de algoritmos para programación competitiva.',
        en: 'Contribution to the Spanish translation of cp-algorithms.com, the reference site for competitive programming algorithms.'
      },
      stack: [{ es: 'Algoritmos', en: 'Algorithms' }, 'Markdown'],
      repos: ['CP-Algorithms-es.github.io'],
      demo: 'https://cp-algorithms-es.github.io',
      demoTexto: { es: 'Ver sitio', en: 'Visit site' }
    },
    {
      id: 'competitive',
      visible: false, // solo tiene un .zip: mejor no enlazarlo hasta subir el código suelto
      destacado: false,
      categoria: 'algoritmos',
      icono: 'codigo',
      titulo: { es: 'Programación competitiva (ICPC)', en: 'Competitive programming (ICPC)' },
      resumen: {
        es: 'Soluciones de entrenamiento como representante de la universidad en el ICPC.',
        en: 'Training solutions from representing my university at the ICPC.'
      },
      stack: [{ es: 'Algoritmos', en: 'Algorithms' }],
      repos: ['Competitive_Programming']
    },
    {
      id: 'java',
      visible: false,
      destacado: false,
      categoria: 'algoritmos',
      icono: 'codigo',
      titulo: { es: 'Ejercicios de Java', en: 'Java exercises' },
      resumen: {
        es: 'Soluciones a ejercicios de programación orientada a objetos y estructuras de datos en Java.',
        en: 'Solutions to object-oriented programming and data structure exercises in Java.'
      },
      stack: ['Java'],
      repos: ['Java-excersises']
    }
  ],

  // Experiencia y educación, de lo más reciente a lo más antiguo.
  trayectoria: [
    {
      tipo: 'trabajo',
      fechas: { es: '2025 – actualidad', en: '2025 – present' },
      puesto: { es: 'Desarrollador de software', en: 'Software developer' },
      lugar: 'XEJEL · Universidad de las Ciencias Informáticas',
      detalle: {
        es: ['Desarrollo de APIs REST con Clean Architecture, Entity Framework Core y patrón repositorio.', 'Despliegue de servicios en Ubuntu Server con Docker Compose y monitoreo con Prometheus y Grafana para detectar y diagnosticar incidentes.', 'Evaluaciones de usabilidad de las plataformas XEJEL y Moodle, con informes para reducir errores y simplificar la interfaz.'],
        en: ['Built REST APIs with Clean Architecture, Entity Framework Core and the repository pattern.', 'Deployed services on Ubuntu Server with Docker Compose, monitored with Prometheus and Grafana to detect and diagnose incidents.', 'Usability evaluations of the XEJEL and Moodle platforms, with reports to reduce errors and simplify the interface.']
      }
    },
    {
      tipo: 'estudio',
      fechas: { es: '2024 – 2025', en: '2024 – 2025' },
      puesto: { es: 'Proyecto de tesis: panel de planificación (Vue 3 + Django)', en: 'Thesis project: planning dashboard (Vue 3 + Django)' },
      lugar: 'Universidad de las Ciencias Informáticas',
      detalle: {
        es: ['Plataforma completa de planificación y control de actividades: interfaz en Vue 3, API de Django y PostgreSQL.', 'Optimización de consultas para mejorar los tiempos de respuesta.'],
        en: ['Complete activity planning and tracking platform: Vue 3 interface, Django API and PostgreSQL.', 'Query optimization to improve response times.']
      }
    },
    {
      tipo: 'estudio',
      fechas: { es: 'Graduado en 2025', en: 'Graduated 2025' },
      puesto: { es: 'Ingeniería en Ciencias Informáticas', en: 'B.Eng. in Computer Science' },
      lugar: 'Universidad de las Ciencias Informáticas (UCI)',
      detalle: {
        es: ['Énfasis en ingeniería de software y algoritmos avanzados.', 'Representante de la universidad en competencias ICPC.'],
        en: ['Emphasis on software engineering and advanced algorithms.', 'Represented the university in ICPC contests.']
      }
    }
  ],

  servicios: [
    { icono: 'carrito', titulo: { es: 'Tiendas en línea', en: 'Online stores' },
      texto: { es: 'Catálogo, carrito, pagos, envíos y un panel para gestionar pedidos y stock.', en: 'Catalog, cart, payments, shipping and a panel to manage orders and stock.' },
      ejemplo: { es: 'Ideal para tiendas, distribuidoras y emprendimientos.', en: 'Great for shops, distributors and small brands.' } },
    { icono: 'tarea', titulo: { es: 'Sistemas de gestión', en: 'Management systems' },
      texto: { es: 'Agendas, turnos, inventarios, clientes y usuarios con permisos, hechos a la medida de tu forma de trabajar.', en: 'Schedules, appointments, inventory, customers and users with permissions, built around how you work.' },
      ejemplo: { es: 'Ideal para clínicas, academias, despachos y oficinas.', en: 'Great for clinics, academies, offices and firms.' } },
    { icono: 'grafico', titulo: { es: 'Paneles y reportes', en: 'Dashboards & reports' },
      texto: { es: 'Tus datos en gráficos y tablas claras, con filtros, para decidir sin abrir hojas de cálculo.', en: 'Your data in clear charts and tables, with filters, so you can decide without opening spreadsheets.' },
      ejemplo: { es: 'Ideal para ventas, operaciones y dirección.', en: 'Great for sales, operations and management.' } },
    { icono: 'robot', titulo: { es: 'Bots con inteligencia artificial', en: 'AI bots' },
      texto: { es: 'Asistentes en Telegram que responden preguntas frecuentes o consultan tus datos.', en: 'Telegram assistants that answer common questions or look up your data.' },
      ejemplo: { es: 'Ideal para atención al cliente y equipos internos.', en: 'Great for customer support and internal teams.' } },
    { icono: 'servidor', titulo: { es: 'APIs y backend', en: 'APIs & backend' },
      texto: { es: 'APIs en .NET, Django o Node.js con inicio de sesión, pruebas y documentación.', en: 'APIs in .NET, Django or Node.js with sign-in, tests and documentation.' },
      ejemplo: { es: 'Ideal para equipos que ya tienen frontend o app móvil.', en: 'Great for teams that already have a frontend or mobile app.' } },
    { icono: 'capas', titulo: { es: 'Migración y mantenimiento', en: 'Migration & maintenance' },
      texto: { es: 'Llevar un sistema viejo a una tecnología actual sin perder datos, y mantenerlo funcionando.', en: 'Move an old system to a current stack without losing data, and keep it running.' },
      ejemplo: { es: 'Ideal si tu sistema actual es lento o difícil de cambiar.', en: 'Great if your current system is slow or hard to change.' } }
  ],

  // Cómo trabajar conmigo: pasos (en orden) y condiciones.
  proceso: [
    { titulo: { es: 'Me cuentas tu idea', en: 'You tell me your idea' },
      texto: { es: 'Por Telegram o correo. La primera conversación no tiene costo.', en: 'Via Telegram or email. The first conversation is free.' } },
    { titulo: { es: 'Recibes una propuesta', en: 'You get a proposal' },
      texto: { es: 'Alcance, plazo y precio por escrito antes de empezar.', en: 'Scope, timeline and price in writing before we start.' } },
    { titulo: { es: 'Avances cada semana', en: 'Weekly progress' },
      texto: { es: 'Ves el sistema funcionando a medida que avanza y pides cambios a tiempo.', en: 'You see the system working as it grows and can ask for changes early.' } },
    { titulo: { es: 'Entrega y puesta en marcha', en: 'Delivery and launch' },
      texto: { es: 'Lo dejo funcionando en tu servidor o en la nube, con el código y una guía de uso.', en: 'I get it running on your server or in the cloud, with the code and a user guide.' } }
  ],
  condiciones: [
    { icono: 'cohete', etiqueta: { es: 'Modalidad', en: 'Engagement' },
      valor: { es: 'Tiempo completo, medio tiempo o por proyecto', en: 'Full-time, part-time or per project' } },
    { icono: 'reloj', etiqueta: { es: 'Horario', en: 'Time zone' },
      valor: { es: 'Hora de Cuba (UTC−5/−4): igual que la costa este de EE. UU. y Canadá, 1–3 h con Latinoamérica y 3–4 h de coincidencia con Europa', en: 'Cuba time (UTC−5/−4): same as the US and Canada east coast, 1–3 h from Latin America and 3–4 h of overlap with Europe' } },
    { icono: 'idiomas', etiqueta: { es: 'Idiomas', en: 'Languages' },
      valor: { es: 'Español nativo · inglés B1 (técnico y escrito)', en: 'Native Spanish · English B1 (technical and written)' } },
    { icono: 'documento', etiqueta: { es: 'Pagos', en: 'Payments' },
      valor: { es: 'Transferencia internacional (te explico las opciones según tu país) o en CUP/MLC dentro de Cuba. En proyectos, pago por etapas: una parte al empezar y el resto contra entrega.', en: 'International transfer (I’ll explain the options for your country) or CUP/MLC within Cuba. For projects, staged payments: part upfront and the rest on delivery.' } },
    { icono: 'llave', etiqueta: { es: 'Después', en: 'After launch' },
      valor: { es: 'El código y los accesos son tuyos. Hosting y dominio a tu nombre. Mantenimiento mensual opcional.', en: 'The code and access are yours. Hosting and domain in your name. Optional monthly maintenance.' } },
    { icono: 'chat', etiqueta: { es: 'Precio', en: 'Pricing' },
      valor: { es: 'Presupuesto gratis en 24 h según tu proyecto', en: 'Free quote within 24 h based on your project' } }
  ],
  notaIA: {
    es: 'Uso asistentes de IA (como Claude) para avanzar más rápido. Yo decido la arquitectura, reviso cada cambio y lo cubro con pruebas: tú recibes el resultado antes y con la misma calidad. No comparto con herramientas de IA datos privados de tu negocio ni de tus clientes.',
    en: 'I use AI assistants (such as Claude) to move faster. I decide the architecture, review every change and cover it with tests: you get the result sooner, with the same quality. I never share your business’s or your customers’ private data with AI tools.'
  },

  // PENDIENTE: testimonios reales (nombre, cargo y frase). Vacío = la sección no se muestra.
  testimonios: [],

  // Textos de la interfaz (menú, botones, títulos de sección).
  textos: {
    es: {
      menu: { sobre: 'Sobre mí', proyectos: 'Proyectos', servicios: 'Servicios', trabajo: 'Cómo trabajo', trayectoria: 'Experiencia', contacto: 'Contacto' },
      cejaSobre: 'Perfil', cejaProyectos: 'Portafolio', cejaServicios: 'Servicios', cejaTrabajo: 'Proceso', cejaTrayectoria: 'Trayectoria', cejaContacto: 'Contacto',
      verProyectos: 'Ver proyectos', pedirPresupuesto: 'Pide un presupuesto', descargarCV: 'Descargar CV', hola: 'Hola, soy',
      seccionSobre: 'Sobre mí', seccionHabilidades: 'Con qué trabajo',
      seccionDestacados: 'Proyectos destacados', seccionMas: 'Más proyectos', todas: 'Todos', util: 'Para qué sirve',
      seccionTrayectoria: 'Experiencia y educación', trabajo: 'Trabajo', estudio: 'Formación',
      seccionServicios: 'Qué puedo hacer por ti', seccionTrabajo: 'Cómo trabajar conmigo', condiciones: 'Condiciones',
      seccionContacto: 'Hablemos de tu proyecto',
      contactoTexto: 'Cuéntame qué necesitas, para cuándo y, si lo tienes, un ejemplo de algo parecido. Te respondo con una propuesta.',
      contactoEquipo: '¿Buscas a alguien para tu equipo? Descarga mi CV o escríbeme: puedo hacer una prueba técnica o una entrevista cuando te venga bien.',
      escribirCorreo: 'Envíame un correo', cvEs: 'CV en español', cvEn: 'CV en inglés',
      escribirTelegram: 'Escríbeme por Telegram', escribirWhatsapp: 'Escríbeme por WhatsApp',
      asuntoCorreo: 'Presupuesto para un proyecto',
      codigo: 'Código', demo: 'Probar en vivo', copiar: 'Copiar', copiado: 'Copiado',
      tema: 'Cambiar tema', idioma: 'English', idiomaAria: 'Switch to English', testimonios: 'Lo que dicen',
      pie: 'Sitio hecho con HTML, CSS y JavaScript. Publicado en GitHub Pages.'
    },
    en: {
      menu: { sobre: 'About', proyectos: 'Projects', servicios: 'Services', trabajo: 'How I work', trayectoria: 'Experience', contacto: 'Contact' },
      cejaSobre: 'Profile', cejaProyectos: 'Portfolio', cejaServicios: 'Services', cejaTrabajo: 'Process', cejaTrayectoria: 'Background', cejaContacto: 'Contact',
      verProyectos: 'See projects', pedirPresupuesto: 'Get a quote', descargarCV: 'Download CV', hola: 'Hi, I’m',
      seccionSobre: 'About me', seccionHabilidades: 'What I work with',
      seccionDestacados: 'Featured projects', seccionMas: 'More projects', todas: 'All', util: 'What it’s for',
      seccionTrayectoria: 'Experience & education', trabajo: 'Work', estudio: 'Education',
      seccionServicios: 'What I can do for you', seccionTrabajo: 'How to work with me', condiciones: 'Terms',
      seccionContacto: 'Let’s talk about your project',
      contactoTexto: 'Tell me what you need, by when and, if you have one, an example of something similar. I’ll reply with a proposal.',
      contactoEquipo: 'Looking for someone to join your team? Download my CV or email me: I’m happy to do a technical test or an interview whenever suits you.',
      escribirCorreo: 'Send me an email', cvEs: 'CV in Spanish', cvEn: 'CV in English',
      escribirTelegram: 'Message me on Telegram', escribirWhatsapp: 'Message me on WhatsApp',
      asuntoCorreo: 'Quote for a project',
      codigo: 'Code', demo: 'Try it live', copiar: 'Copy', copiado: 'Copied',
      tema: 'Toggle theme', idioma: 'Español', idiomaAria: 'Cambiar a español', testimonios: 'What people say',
      pie: 'Built with HTML, CSS and JavaScript. Hosted on GitHub Pages.'
    }
  }
}

/*
 * ============================================================================
 *  DATOS DEL PORTAFOLIO — el único archivo que necesitas editar.
 * ============================================================================
 *  - Cada texto tiene su versión en español (es) y en inglés (en).
 *  - Para agregar un proyecto, copia un bloque { ... } de la lista "proyectos" y cámbialo.
 *  - Para ocultar un proyecto sin borrarlo: visible: false
 *  - "destacado: true" lo pone en la sección grande de arriba (se ven mejor 3 o 4).
 *  - "imagen": ruta a una captura dentro de assets/ (opcional). Sin imagen se dibuja un ícono.
 *  - Iconos disponibles: carrito, balanza, robot, servidor, capas, grafico, cerebro,
 *    codigo, idiomas, llave, tarea
 *  - Una habilidad o tecnología puede ser texto simple o { es: ..., en: ... } si cambia con el idioma.
 *  - Busca "PENDIENTE" para ver lo que conviene completar.
 * ============================================================================
 */
window.PORTAFOLIO = {
  perfil: {
    nombre: 'Dariel Angel Arro Moreno',
    nombreCorto: 'Dariel',
    usuarioGithub: 'DarielAngel',
    // Se usa tu foto de perfil de GitHub. Si no carga, se muestran tus iniciales.
    avatar: 'https://github.com/DarielAngel.png',
    titulo: { es: 'Desarrollador full-stack', en: 'Full-stack developer' },
    lema: {
      es: 'Construyo aplicaciones web completas: de la base de datos y la API a la interfaz, con pruebas y despliegue.',
      en: 'I build complete web applications: from the database and the API to the interface, with tests and deployment.'
    },
    ubicacion: { es: 'Cuba', en: 'Cuba' },
    disponible: true,
    disponibilidad: {
      es: 'Disponible para trabajo remoto y proyectos freelance',
      en: 'Available for remote work and freelance projects'
    },
    cv: 'cv/Dariel_Angel_Arro_Moreno-CV.pdf'
  },

  contacto: {
    email: 'darielarrom@gmail.com',
    telegram: 'darielangel', // sin la @
    github: 'https://github.com/DarielAngel',
    linkedin: '' // PENDIENTE: pega aquí la URL de tu LinkedIn si tienes; vacío = no se muestra
  },

  sobreMi: {
    es: [
      'Soy ingeniero en Ciencias Informáticas (UCI, 2025) y desarrollador full-stack. Me gusta construir sistemas completos: diseño la base de datos, escribo la API, hago la interfaz y lo dejo corriendo con Docker, pruebas automatizadas y monitoreo.',
      'Mi proyecto más grande es una tienda en línea con 11 microservicios en .NET y Vue, con pagos, devoluciones, cupones, puntos de lealtad y una app instalable. También desarrollé un sistema de agenda de abogados para una institución judicial, que después migré de Node.js a Django manteniendo la misma base de datos, y una simulación de una ciudad con 300 agentes inteligentes que corre en el navegador.',
      'Vengo de la programación competitiva (ICPC): me gusta entender bien el problema, medir y dejar código que otro pueda mantener.'
    ],
    en: [
      'I am a Computer Science engineer (UCI, 2025) and a full-stack developer. I like building complete systems: I design the database, write the API, build the interface and ship it with Docker, automated tests and monitoring.',
      'My largest project is an online store with 11 microservices in .NET and Vue, with payments, returns, coupons, loyalty points and an installable app. I also built a lawyer scheduling system for a judicial institution, which I later migrated from Node.js to Django while keeping the same database, and a browser-based city simulation with 300 intelligent agents.',
      'I come from competitive programming (ICPC): I like to understand the problem well, measure, and leave code that others can maintain.'
    ]
  },

  // Cifras cortas que aparecen junto a "Sobre mí".
  cifras: [
    { valor: '11', texto: { es: 'microservicios en un solo proyecto', en: 'microservices in a single project' } },
    { valor: '750+', texto: { es: 'pruebas automatizadas en ese proyecto', en: 'automated tests in that project' } },
    { valor: '4', texto: { es: 'lenguajes en mis proyectos: C#, Python, JavaScript y Java', en: 'languages across my projects: C#, Python, JavaScript and Java' } }
  ],

  habilidades: [
    { grupo: { es: 'Backend', en: 'Backend' }, color: 'ambar',
      items: ['C#', '.NET 8', 'ASP.NET Core', 'Entity Framework Core', 'MediatR', 'Django', 'Express', 'REST', 'Clean Architecture', 'RabbitMQ / MassTransit'] },
    { grupo: { es: 'Frontend', en: 'Frontend' }, color: 'esmeralda',
      items: ['Vue 3', 'Pinia', 'Vite', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Canvas', 'PWA', { es: 'React (básico)', en: 'React (basic)' }] },
    { grupo: { es: 'Datos', en: 'Data' }, color: 'cielo',
      items: ['PostgreSQL', 'SQLite', 'Sequelize', { es: 'Optimización de consultas', en: 'Query optimization' }, 'Python', 'scikit-learn', 'Jupyter'] },
    { grupo: { es: 'Infraestructura y calidad', en: 'Infrastructure & quality' }, color: 'indigo',
      items: ['Docker / Compose', 'Linux (Ubuntu Server)', 'Nginx', 'Prometheus', 'Grafana', 'GitHub Actions', 'xUnit', 'Testcontainers', 'Vitest', 'Playwright'] },
    { grupo: { es: 'IA y algoritmos', en: 'AI & algorithms' }, color: 'fucsia',
      items: [{ es: 'API de Gemini', en: 'Gemini API' }, { es: 'Bots de Telegram', en: 'Telegram bots' }, { es: 'Árboles y bosques de decisión', en: 'Decision trees & forests' }, { es: 'Redes neuronales', en: 'Neural networks' }, { es: 'Agentes BDI', en: 'BDI agents' }, { es: 'Simulación', en: 'Simulation' }, 'A*', 'ICPC', { es: 'Grafos', en: 'Graphs' }, { es: 'Programación dinámica', en: 'Dynamic programming' }] }
  ],

  // Categorías de proyectos (el filtro de la sección "Más proyectos").
  categorias: {
    fullstack: { es: 'Full-stack', en: 'Full-stack', color: 'esmeralda' },
    backend: { es: 'Backend .NET', en: '.NET backend', color: 'ambar' },
    frontend: { es: 'Dashboards', en: 'Dashboards', color: 'cielo' },
    ia: { es: 'IA y datos', en: 'AI & data', color: 'fucsia' },
    algoritmos: { es: { es: 'Algoritmos', en: 'Algorithms' }, en: 'Algorithms', color: 'rosa' }
  },

  proyectos: [
    {
      id: 'ecommerce',
      visible: true,
      destacado: true,
      categoria: 'fullstack',
      icono: 'carrito',
      imagen: 'assets/ecommerce-tienda.webp',
      titulo: { es: 'E-commerce de microservicios', en: 'Microservices e-commerce' },
      resumen: {
        es: 'Tienda en línea completa: catálogo, carrito, pago con PayPal, devoluciones, cupones, puntos de lealtad y panel de administración. Se instala como app y abre sin conexión.',
        en: 'A complete online store: catalog, cart, PayPal checkout, returns, coupons, loyalty points and an admin panel. It installs as an app and opens offline.'
      },
      logros: {
        es: ['11 microservicios .NET 8 detrás de un gateway YARP, cada uno con su base PostgreSQL', 'Eventos con RabbitMQ: stock, puntos y correos se ajustan solos tras cada pago o reembolso', 'Más de 750 pruebas: unitarias, de integración con Testcontainers y E2E con Playwright'],
        en: ['11 .NET 8 microservices behind a YARP gateway, each with its own PostgreSQL database', 'RabbitMQ events: stock, points and emails update automatically after each payment or refund', '750+ tests: unit, integration with Testcontainers and E2E with Playwright']
      },
      stack: ['C#', '.NET 8', 'Vue 3', 'PostgreSQL', 'RabbitMQ', 'Docker', 'PayPal', 'PWA'],
      repos: ['ecommerce-microservicios'],
      demo: '' // PENDIENTE: URL si algún día lo publicas en internet
    },
    {
      id: 'abogados',
      visible: true,
      destacado: true,
      categoria: 'fullstack',
      icono: 'balanza',
      titulo: { es: 'Agenda de abogados para una institución judicial', en: 'Lawyer scheduling for a judicial institution' },
      resumen: {
        es: 'Sistema para repartir el trabajo entre los abogados de una provincia: cronograma mensual por abogado, asignación de tareas sin choques de fechas y días no laborables configurables.',
        en: 'A system to distribute work among the lawyers of a province: monthly schedule per lawyer, conflict-free task assignment and configurable non-working days.'
      },
      logros: {
        es: ['Primera versión con Express + Sequelize y Vue 3, probada con Vitest y Playwright', 'Migrada después a Django de extremo a extremo con el mismo esquema de base de datos', 'Buscador con autocompletado, modales por AJAX y roles de administrador y cliente'],
        en: ['First version with Express + Sequelize and Vue 3, tested with Vitest and Playwright', 'Later migrated end-to-end to Django with the same database schema', 'Autocomplete search, AJAX modals and admin/client roles']
      },
      stack: ['Node.js', 'Express', 'Vue 3', 'Django', 'Python', 'Docker', 'Playwright'],
      repos: ['DistribucionAbogadosTPPG', 'DistribucionAbogadosTPPGpython3'],
      demo: ''
    },
    {
      id: 'bot-gemini',
      visible: true,
      destacado: true,
      categoria: 'ia',
      icono: 'robot',
      titulo: { es: 'Asistente de IA en Telegram', en: 'AI assistant on Telegram' },
      resumen: {
        es: 'Bot de Telegram que responde con inteligencia artificial usando la API de Gemini. Probé también Cerebras y OpenRouter como alternativas y lo desplegué en Railway.',
        en: 'A Telegram bot that answers with AI through the Gemini API. I also tested Cerebras and OpenRouter as alternatives and deployed it on Railway.'
      },
      logros: {
        es: ['Integración directa con la API REST de Gemini', 'Scripts de prueba para comparar proveedores de IA', 'Desplegado en Railway (Procfile y railway.json)'],
        en: ['Direct integration with the Gemini REST API', 'Test scripts to compare AI providers', 'Deployed on Railway (Procfile and railway.json)']
      },
      stack: ['Python', 'python-telegram-bot', 'Gemini API', 'Railway'],
      repos: ['AgentGeminiAI'],
      demo: '' // PENDIENTE: enlace al bot (t.me/...) si es público
    },
    {
      id: 'ciudad-bdi',
      visible: true,
      destacado: true,
      categoria: 'ia',
      icono: 'cerebro',
      imagen: 'assets/ciudad-bdi.webp',
      titulo: { es: 'Ciudad BDI — simulación con agentes', en: 'BDI City — agent-based simulation' },
      resumen: {
        es: 'Una ciudad vista desde arriba donde 300 personas deciden solas qué hacer: van al trabajo, comen, descansan, sufren atascos y esquivan obras. Nada está guionizado: la hora punta y los desvíos salen de sus decisiones.',
        en: 'A top-down city where 300 people decide on their own what to do: they commute, eat, rest, get stuck in traffic and avoid roadworks. Nothing is scripted: rush hour and detours emerge from their decisions.'
      },
      logros: {
        es: ['Cada habitante es un agente BDI (creencias, deseos e intenciones) con una capa que delibera y otra que reacciona', 'Rutas con A* según el tráfico del momento; las personas aprenden de sus atascos y salen antes', 'Motor determinista y separado de la pantalla, en JavaScript puro sin dependencias'],
        en: ['Each resident is a BDI agent (beliefs, desires, intentions) with a deliberative layer and a reactive one', 'A* routing based on live traffic; people learn from jams and leave earlier', 'Deterministic engine decoupled from rendering, in plain JavaScript with no dependencies']
      },
      stack: ['JavaScript', 'Canvas', { es: 'Agentes BDI', en: 'BDI agents' }, 'A*', { es: 'Simulación', en: 'Simulation' }],
      repos: ['ciudad-bdi'],
      // Demo en vivo: funciona cuando activas GitHub Pages en el repositorio ciudad-bdi (ver README).
      demo: 'https://darielangel.github.io/ciudad-bdi/'
    },
    {
      id: 'easypos',
      visible: true,
      destacado: false,
      categoria: 'backend',
      icono: 'capas',
      titulo: { es: 'EasyPOS — API con Clean Architecture', en: 'EasyPOS — Clean Architecture API' },
      resumen: {
        es: 'API para un punto de venta organizada en capas de dominio, aplicación, infraestructura y web, con CQRS y pruebas unitarias por caso de uso.',
        en: 'A point-of-sale API organized into domain, application, infrastructure and web layers, with CQRS and unit tests per use case.'
      },
      logros: {
        es: ['Value objects y entidades de dominio sin dependencias externas', 'Comandos validados en un pipeline de behaviors', 'Middleware de errores y respuestas consistentes'],
        en: ['Value objects and domain entities with no external dependencies', 'Commands validated in a behaviors pipeline', 'Error-handling middleware and consistent responses']
      },
      stack: ['C#', '.NET 8', 'EF Core', 'CQRS', 'DDD', { es: 'Pruebas unitarias', en: 'Unit tests' }],
      repos: ['EasyPOS'],
      demo: ''
    },
    {
      id: 'taskmaster',
      visible: true,
      destacado: false,
      categoria: 'backend',
      icono: 'tarea',
      titulo: { es: 'TaskMaster API', en: 'TaskMaster API' },
      resumen: {
        es: 'API REST de tareas con arquitectura en capas, Entity Framework Core sobre SQLite y patrón repositorio.',
        en: 'A REST API for tasks with a layered architecture, Entity Framework Core on SQLite and the repository pattern.'
      },
      stack: ['C#', 'ASP.NET Core', 'EF Core', 'SQLite'],
      repos: ['Projects-Net']
    },
    {
      id: 'auth-identity',
      visible: false, // oculto para que la cuadrícula quede pareja; cámbialo a true si lo quieres mostrar
      destacado: false,
      categoria: 'backend',
      icono: 'llave',
      titulo: { es: 'Autenticación con ASP.NET Identity', en: 'Authentication with ASP.NET Identity' },
      resumen: {
        es: 'Registro, login y tokens en una API mínima usando los endpoints de Identity sobre PostgreSQL.',
        en: 'Sign-up, login and tokens in a minimal API using the Identity endpoints on PostgreSQL.'
      },
      stack: ['C#', 'ASP.NET Identity', 'PostgreSQL'],
      repos: ['AuthenticationNetFrameworkInTwoLines']
    },
    {
      id: 'dashboard-planificacion',
      visible: true,
      destacado: false,
      categoria: 'frontend',
      icono: 'grafico',
      titulo: { es: 'Dashboard de planificación institucional (tesis)', en: 'Institutional planning dashboard (thesis)' },
      resumen: {
        es: 'Plataforma para planificar y controlar actividades de una institución: frontend en Vue 3 con gráficos e idiomas, sobre una API de Django y PostgreSQL optimizado.',
        en: 'A platform to plan and track an institution’s activities: a Vue 3 frontend with charts and i18n, on a Django API with tuned PostgreSQL queries.'
      },
      stack: ['Vue 3', 'Tailwind', 'Chart.js', 'vue-i18n', 'Django', 'PostgreSQL'],
      repos: ['Dashboard-SIPAC']
    },
    {
      id: 'ia-notebooks',
      visible: true,
      destacado: false,
      categoria: 'ia',
      icono: 'cerebro',
      titulo: { es: 'Modelos de aprendizaje automático', en: 'Machine learning models' },
      resumen: {
        es: 'Notebooks con árboles y bosques de decisión y redes neuronales sobre datos reales: superconductividad (UC Irvine) y estabilidad de la red eléctrica.',
        en: 'Notebooks with decision trees, random forests and neural networks on real datasets: superconductivity (UC Irvine) and power grid stability.'
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
      stack: [{ es: 'Algoritmos', en: 'Algorithms' }, 'Markdown', { es: 'Traducción', en: 'Translation' }],
      repos: ['CP-Algorithms-es.github.io'],
      demo: 'http://cp-algorithms-es.github.io'
    },
    {
      id: 'competitive',
      visible: true,
      destacado: false,
      categoria: 'algoritmos',
      icono: 'codigo',
      titulo: { es: 'Programación competitiva (ICPC)', en: 'Competitive programming (ICPC)' },
      resumen: {
        es: 'Soluciones de entrenamiento como representante de la universidad en el ICPC: grafos, programación dinámica, segment trees y heavy-light decomposition.',
        en: 'Training solutions from representing my university at the ICPC: graphs, dynamic programming, segment trees and heavy-light decomposition.'
      },
      stack: [{ es: 'Algoritmos', en: 'Algorithms' }, { es: 'Estructuras de datos', en: 'Data structures' }, 'ICPC'],
      repos: ['Competitive_Programming']
    },
    {
      id: 'java',
      visible: false, // oculto para que la cuadrícula quede pareja; cámbialo a true si lo quieres mostrar
      destacado: false,
      categoria: 'algoritmos',
      icono: 'codigo',
      titulo: { es: 'Ejercicios de Java', en: 'Java exercises' },
      resumen: {
        es: 'Soluciones a ejercicios de programación orientada a objetos y estructuras de datos en Java.',
        en: 'Solutions to object-oriented programming and data structure exercises in Java.'
      },
      stack: ['Java', { es: 'POO', en: 'OOP' }],
      repos: ['Java-excersises']
    }
  ],

  // Experiencia y educación, de lo más reciente a lo más antiguo.
  trayectoria: [
    {
      tipo: 'trabajo',
      fechas: { es: '2025 – actualidad', en: '2025 – present' }, // PENDIENTE: confirma el mes de inicio
      puesto: { es: 'Desarrollador de software', en: 'Software developer' },
      lugar: 'XEJEL',
      detalle: {
        // PENDIENTE: cambia por 1–3 logros concretos de tu trabajo en XEJEL
        es: ['Un año desarrollando software en el equipo de XEJEL.'],
        en: ['One year developing software on the XEJEL team.']
      }
    },
    {
      tipo: 'trabajo',
      fechas: { es: 'ene. 2026 – actualidad', en: 'Jan 2026 – present' },
      puesto: { es: 'Backend, despliegue y evaluación técnica', en: 'Backend, deployment and technical evaluation' },
      lugar: 'Universidad de las Ciencias Informáticas',
      detalle: {
        es: ['API REST con Clean Architecture, EF Core y patrón repositorio (TaskMaster).', 'Despliegue multicontenedor en Ubuntu Server con Docker Compose y monitoreo con Prometheus y Grafana.', 'Evaluaciones heurísticas de usabilidad de las plataformas XEJEL y Moodle.'],
        en: ['REST API with Clean Architecture, EF Core and the repository pattern (TaskMaster).', 'Multi-container deployment on Ubuntu Server with Docker Compose, monitored with Prometheus and Grafana.', 'Heuristic usability evaluations of the XEJEL and Moodle platforms.']
      }
    },
    {
      tipo: 'trabajo',
      fechas: { es: 'ene. 2024 – dic. 2025', en: 'Jan 2024 – Dec 2025' },
      puesto: { es: 'Desarrollador full-stack — proyecto de tesis', en: 'Full-stack developer — thesis project' },
      lugar: 'Universidad de las Ciencias Informáticas',
      detalle: {
        es: ['Plataforma de planificación y control de actividades con Vue 3 y una API de Django.', 'Optimización de consultas en PostgreSQL para mejorar los tiempos de respuesta.'],
        en: ['Activity planning and tracking platform with Vue 3 and a Django API.', 'PostgreSQL query optimization to improve response times.']
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
    { icono: 'carrito', titulo: { es: 'Aplicaciones web a medida', en: 'Custom web applications' },
      texto: { es: 'Tiendas, sistemas de gestión y portales con frontend, backend y base de datos.', en: 'Stores, management systems and portals with frontend, backend and database.' } },
    { icono: 'servidor', titulo: { es: 'APIs y backends', en: 'APIs & backends' },
      texto: { es: 'APIs REST en .NET, Django o Node.js, con autenticación, pruebas y documentación.', en: 'REST APIs in .NET, Django or Node.js, with authentication, tests and documentation.' } },
    { icono: 'grafico', titulo: { es: 'Dashboards y reportes', en: 'Dashboards & reports' },
      texto: { es: 'Paneles con gráficos y filtros para ver los datos de tu negocio de un vistazo.', en: 'Panels with charts and filters to see your business data at a glance.' } },
    { icono: 'robot', titulo: { es: 'Bots e integraciones con IA', en: 'Bots & AI integrations' },
      texto: { es: 'Bots de Telegram y asistentes que usan modelos de IA como Gemini.', en: 'Telegram bots and assistants that use AI models such as Gemini.' } },
    { icono: 'capas', titulo: { es: 'Migración y modernización', en: 'Migration & modernization' },
      texto: { es: 'Llevar un sistema existente a otra tecnología sin perder datos ni funciones.', en: 'Moving an existing system to another stack without losing data or features.' } },
    { icono: 'llave', titulo: { es: 'Despliegue y monitoreo', en: 'Deployment & monitoring' },
      texto: { es: 'Docker, servidores Linux y alertas con Prometheus y Grafana.', en: 'Docker, Linux servers and alerts with Prometheus and Grafana.' } }
  ],

  // Textos de la interfaz (menú, botones, títulos de sección).
  textos: {
    es: {
      menu: { sobre: 'Sobre mí', proyectos: 'Proyectos', trayectoria: 'Trayectoria', servicios: 'Servicios', contacto: 'Contacto' },
      verProyectos: 'Ver proyectos', descargarCV: 'Descargar CV', hola: 'Hola, soy',
      seccionSobre: 'Sobre mí', seccionHabilidades: 'Con qué trabajo',
      seccionDestacados: 'Proyectos destacados', seccionMas: 'Más proyectos', todas: 'Todos',
      seccionTrayectoria: 'Experiencia y educación', trabajo: 'Trabajo', estudio: 'Estudios',
      seccionServicios: 'Qué puedo hacer por ti', seccionContacto: 'Hablemos',
      contactoTexto: '¿Tienes un proyecto o una vacante? Escríbeme por el medio que prefieras y te respondo pronto.',
      codigo: 'Código', demo: 'Ver en vivo', copiar: 'Copiar', copiado: 'Copiado',
      tema: 'Cambiar tema', idioma: 'English', idiomaAria: 'Switch to English',
      pie: 'Hecho a mano con HTML, CSS y JavaScript. Publicado en GitHub Pages.'
    },
    en: {
      menu: { sobre: 'About', proyectos: 'Projects', trayectoria: 'Experience', servicios: 'Services', contacto: 'Contact' },
      verProyectos: 'See projects', descargarCV: 'Download CV', hola: 'Hi, I’m',
      seccionSobre: 'About me', seccionHabilidades: 'What I work with',
      seccionDestacados: 'Featured projects', seccionMas: 'More projects', todas: 'All',
      seccionTrayectoria: 'Experience & education', trabajo: 'Work', estudio: 'Education',
      seccionServicios: 'What I can do for you', seccionContacto: 'Let’s talk',
      contactoTexto: 'Have a project or a job opening? Reach me through whichever channel you prefer and I’ll get back to you soon.',
      codigo: 'Code', demo: 'Live demo', copiar: 'Copy', copiado: 'Copied',
      tema: 'Toggle theme', idioma: 'Español', idiomaAria: 'Cambiar a español',
      pie: 'Handmade with HTML, CSS and JavaScript. Hosted on GitHub Pages.'
    }
  }
}

# Portafolio — Dariel Angel Arro Moreno

Sitio estático (HTML, CSS y JavaScript sin compilar) listo para **GitHub Pages**.
Bilingüe (español / inglés), con modo claro y oscuro.

```
portafolio/
├── index.html      estructura de la página (no hace falta tocarla)
├── styles.css      diseño y colores
├── app.js          dibuja todo a partir de datos.js (no hace falta tocarlo)
├── datos.js        ← TODO EL CONTENIDO: textos, proyectos, experiencia, contacto
├── assets/         capturas de proyectos y el ícono de la pestaña
└── cv/             tu CV en PDF
```

## Personalizar

Todo se cambia en **`datos.js`**. Busca la palabra `PENDIENTE` para ver lo que conviene completar.

| Quiero… | Qué hago en `datos.js` |
|---|---|
| Cambiar un texto | Edita el `es:` y el `en:` de ese texto |
| Agregar un proyecto | Copia un bloque `{ id: ..., }` de `proyectos` y cámbialo |
| Ocultar un proyecto sin borrarlo | `visible: false` |
| Ponerlo arriba, en grande | `destacado: true` (se ven mejor 2 o 4) |
| Agregar una captura | Copia la imagen a `assets/` y pon `imagen: 'assets/mi-captura.webp'` |
| Enlace a una demo en vivo | `demo: 'https://...'` |
| Mostrar LinkedIn | `contacto.linkedin: 'https://www.linkedin.com/in/...'` |
| Cambiar el CV | Reemplaza el PDF de `cv/` (mismo nombre) o cambia `perfil.cv` |
| Ocultar "Disponible para…" | `perfil.disponible: false` |
| Otra categoría de proyectos | Agrégala en `categorias` (colores: esmeralda, ambar, cielo, indigo, fucsia, rosa) |

La foto sale sola de tu perfil de GitHub (`https://github.com/DarielAngel.png`); si no carga, se ven tus iniciales.
Íconos disponibles para proyectos: `carrito, balanza, robot, servidor, capas, grafico, cerebro, codigo, idiomas, llave, tarea`.

## Verlo en tu PC

Ábrelo con un servidor local (abrir `index.html` con doble clic también funciona en la mayoría de navegadores):

```powershell
cd portafolio
python -m http.server 8000
```
y entra a http://localhost:8000. En VS Code también sirve la extensión **Live Server**.

## Publicarlo en GitHub Pages (gratis)

1. En GitHub crea un repositorio **público** llamado exactamente **`DarielAngel.github.io`**.
2. Sube el contenido de esta carpeta (no la carpeta, su contenido):
   ```powershell
   cd portafolio
   git init
   git add -A
   git commit -m "Portafolio"
   git branch -M main
   git remote add origin https://github.com/DarielAngel/DarielAngel.github.io.git
   git push -u origin main
   ```
3. En el repositorio: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   rama **main**, carpeta **/ (root)** → **Save**.
4. En 1–2 minutos queda en **https://darielangel.github.io**.

Cada vez que cambies algo: `git add -A`, `git commit -m "..."`, `git push` y se actualiza solo.

## Recomendaciones sobre tus repos (para que el portafolio luzca más)

- **EasyPOS**: el código está en la rama `master`, pero la rama por defecto es `main` (solo tiene el README).
  En *Settings → General → Default branch* cambia a `master`, para que quien entre vea el código.
- **DistribucionAbogadosTPPGpython3**: incluye `sabana de abogados. 6 de agosto 2026.xls`. Si tiene datos
  reales de personas, sácalo del repositorio (y de su historial).
- Agrega un README con capturas a `AgentGeminiAI` y `Dashboard-SIPAC` (este último aún tiene el README de la plantilla de Vite).
- En tu perfil de GitHub, fija (*pin*) los 4 proyectos destacados y pon el enlace del portafolio en tu bio.

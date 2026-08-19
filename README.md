# Cluster Fitness - Página Web

Página web oficial de **Cluster Fitness**, box de entrenamiento ubicado en Mapocho 3226, Santiago, Chile.

## 📁 Estructura del Proyecto

```
/
├── index.html             # Archivo HTML principal (SPA)
├── css/
│   ├── styles.css         # Estilos CSS fuente (editar aquí)
│   └── styles.min.css     # CSS minificado para producción (generado)
├── js/
│   ├── main.js            # JavaScript fuente (editar aquí)
│   └── main.min.js        # JS minificado para producción (generado)
├── assets/
│   ├── img/               # Imágenes (WebP preferido)
│   │   ├── coach/         # Fotos de coaches
│   │   ├── comunidad/     # Fotos de comunidad
│   │   └── reels/         # Posters de videos
│   └── videos/
│       └── reels/         # Videos MP4
├── package.json           # Dependencias de build (csso, terser)
├── robots.txt
├── sitemap.xml
└── README.md
```

## 🚀 Cómo ejecutar el proyecto

### Opción 1: Servidor local (Python)
```bash
python -m http.server 8000 --bind 127.0.0.1
```

### Opción 2: VSCode con Live Server
1. Instalar extensión "Live Server" (Ritwick Dey)
2. Abrir carpeta del proyecto
3. Clic derecho en `index.html` → "Open with Live Server"

### Opción 3: Abrir directamente en navegador
- Doble clic en `index.html` (algunas animaciones de scroll pueden no funcionar)

## 🔧 Comandos de build

| Acción | Comando |
|--------|---------|
| Minificar CSS | `npx clean-css-cli -o css/styles.min.css css/styles.css` |
| Minificar JS | `npx terser js/main.js -o js/main.min.js -c passes=2 -m` |
| Convertir imagen a WebP | `npx sharp-cli -i input.jpg -o output.webp -f webp -q 85` |

**Importante**: Editar siempre los archivos fuente (`styles.css`, `main.js`), no los minificados. Después de cambios, re-minificar. El HTML carga los archivos `.min.*` en producción.

## 🎨 Características implementadas

- ✅ Paleta de colores CSS custom properties
- ✅ Tipografía: Bebas Neue + Barlow (Google Fonts)
- ✅ Diseño responsive (320px → 768px → 1280px+)
- ✅ Animaciones con IntersectionObserver
- ✅ Navbar con transición al hacer scroll
- ✅ Formulario de contacto (UI)
- ✅ Galería de reels con video
- ✅ Carrusel de testimonios y comunidad
- ✅ FAQ con acordeón
- ✅ Modal lightbox para imágenes
- ✅ Lazy loading de imágenes y fondos

## 🔗 Enlaces oficiales

- **Instagram**: https://www.instagram.com/cluster.fitness.cl
- **Reservas**: https://boxmagic.cl/sport_page/ClusterCF
- **Web**: cluster.fitness.cl

## 📝 Requisitos técnicos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (Google Fonts)
- Node.js (para build)
- VSCode + Live Server (opcional, para desarrollo)

---

## Bitácora de cambios

### 2026-08-19 - Actualización planes, horarios y mejoras visuales

Cambios realizados:

- Ajuste tamaño y posición del logo en header.
- Actualización nombres y estructura de planes.
- Actualización horarios temporada 2026.
- Cambio hero badge a "Entrenamiento + comunidad + salud".
- Rediseño visual tarjetas de planes y precios.

Commit asociado:
`feat: actualización planes, horarios 2026 y mejoras visuales`

2026-08-19 - Actualización planes HYBRID.
Cambios realizados:

Actualización nombres y estructura de planes.

Commit asociado: 
`feat: actualización planes, se agrega Hybrid.`

Desarrollado con ❤️ para Cluster Fitness Santiago, Chile

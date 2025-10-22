# SpaceCode Technologies - Website 2025
# SpaceCode Technologies — Sitio web (reconstrucción moderna)

Este repositorio contiene la versión reconstruida y modernizada del sitio web de SpaceCode Technologies. El objetivo fue transformar una página heredada en una sola página moderna, optimizada y estática, eliminar referencias innecesarias a IoT, y añadir una sección de equipo con tres miembros junto con un botón flotante de WhatsApp para contacto rápido.

## Resumen rápido

- Estado: desarrollo / preview local
- Branch activo: `main`
- Último commit: cambios de UI (alineación del botón WhatsApp flotante y correcciones HTML/CSS)
- Vista previa local: http://127.0.0.1:8000 (servidor HTTP simple de Python desde la raíz del proyecto)

## Qué hice (cambios principales)

- Reescritura de `index.html` como una Single Page moderna con secciones semánticas: inicio, servicios, productos, equipo, sobre nosotros, testimonios y contacto.
- Sustituí la animación/astronauta interactiva por una imagen estática en el hero y corregí superposiciones que producían halo/purple artefactos.
- Añadí una sección de equipo con 3 miembros (imágenes en `assets/images/`), usando `picture`/`img` adaptables y WebP donde se aplicó.
- Añadí un botón flotante de WhatsApp con teléfono +1 305 482 6002 (`#whatsappFloat`) y controles CSS para apilarlo con el botón "volver arriba" (`#backToTop`).
- Convertí/añadí imágenes optimizadas en formato WebP y actualicé referencias donde fue posible.
- Añadí JSON-LD básico para SEO (Organization, Breadcrumb, SoftwareCompany).
- Corregí varios errores HTML (caracteres sobrantes como `+1 305 482 6002<`, enlaces partidos, rutas de imágenes antiguas) y limpié markup roto en la sección de equipo y testimonios.

## Estructura de archivos (mapa rápido)

- `index.html` — Página principal (Single Page App estática, HTML5 semántico)
- `assets/css/styles.css` — Estilos globales y componentes (variables, botones flotantes, responsive)
- `assets/js/main.js` — Interacciones ligeras (navegación, smooth-scroll, handlers del formulario)
- `assets/images/` — Imágenes del sitio (incluye WebP generadas)
- `manifest.json`, `robots.txt`, `sitemap.xml` — soporte PWA / SEO mínimo

## Cómo ejecutar una vista previa local (rápido)

1. Abre una terminal en la raíz del proyecto (`/home/carlos/Descargas/newwebpage_spacecode`).
2. Inicia un servidor estático simple con Python 3:

```bash
python3 -m http.server 8000 --bind 0.0.0.0
```

3. Abre en tu navegador: http://127.0.0.1:8000

Nota: durante la sesión anterior ya se arrancó un servidor con este comando; si otro proceso está usando el puerto 8000, termina ese proceso o usa otro puerto (por ejemplo `8001`).

## Comprobaciones rápidas y pruebas realizadas

- Se verificó HTTP 200 desde el servidor de preview (HEAD requests). 
- Se validaron y corrigieron referencias rotas en `index.html` y rutas de imágenes antiguas.

## Sugerencias y próximos pasos (recomendado)

1. Limpieza de JavaScript no usado: `assets/js/main.js` contiene lógica heredada (p. ej. puntero para la animación del astronauta). Recomiendo eliminar/extraer el código no utilizado.
2. Revisar y completar la optimización de imágenes: convierta todas las imágenes grandes a WebP y añada `picture` con `avif` fallback si interesa mayor compresión.
3. Hacer un barrido de encoding (mojibake) y revisar caracteres especiales/accentos en `index.html` para asegurar codificación UTF-8 consistente.
4. Añadir tests básicos (linting HTML/CSS) y una GitHub Action para desplegar a GitHub Pages si desea publicar.
5. Mejorar accesibilidad: añadir atributos `alt` completos, mejorar contraste, y considerar skip-links para navegación por teclado.

## Problemas conocidos

- Puede haber referencias a imágenes antiguas dentro de `Vieja página web/` que aún queden en `index.html` (algunos testimonios apuntaban a esa ruta). Se corrigieron los más visibles, pero conviene hacer un `grep` para encontrar rutas restantes.
- Algunas cadenas pueden conservar errores de codificación (acentos mojibake). Ejecutar una revisión rápida sobre el archivo con un editor UTF-8.

## Comandos útiles

- Iniciar servidor local en puerto 8000:
```bash
python3 -m http.server 8000 --bind 0.0.0.0
```
- Buscar referencias a imágenes antiguas:
```bash
grep -R "Vieja página web" -n
```
- Contar archivos WebP:
```bash
find assets/images -iname "*.webp" | wc -l
```

## Control de versiones

Los cambios recientes fueron confirmados en la rama `main`. Ver el historial con:

```bash
git log --oneline --decorate -n 10
```

Si quieres que empuje el nuevo `README.md` al remoto ahora, puedo hacerlo.

## Créditos y contacto

Trabajo realizado por: SpaceCode (reconstrucción por el autor del repositorio). Para soporte adicional, solicita los próximos cambios en este repositorio o indícame tareas puntuales (pulir CSS responsive, limpiar JS, reemplazar imágenes, deployment).

---

Fechado: 22 de octubre de 2025

- **Diseño Moderno**: Inspirado en Squarespace con gradientes y animaciones fluidas
- **Responsive**: Optimizado para todos los dispositivos (móvil, tablet, desktop)
- **Animaciones**: Efectos de scroll y transiciones suaves
- **Performance**: Código optimizado con lazy loading y animaciones CSS3
- **SEO Friendly**: Estructura semántica HTML5

## 📁 Estructura del Proyecto

```
newwebpage_spacecode/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       └── logo-white.png
└── README.md
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica moderna
- **CSS3**: Animaciones, gradientes, flexbox y grid
- **JavaScript ES6+**: Interactividad y efectos dinámicos
- **Font Awesome 6**: Iconos modernos
- **Sin frameworks pesados**: Vanilla JS para máxima performance

## 🎨 Secciones

1. **Hero**: Presentación principal con llamados a la acción
2. **Servicios**: Páginas web, Landing pages, Aplicativos web y móviles
3. **Productos**: Portafolio de trabajos realizados
4. **Equipo**: Presentación del equipo de 3 personas
5. **Nosotros**: Historia y cultura de la empresa
6. **Testimonios**: Opiniones de clientes satisfechos
7. **Contacto**: Formulario y enlaces de contacto

## 🚀 Cómo Ejecutar

### Opción 1: Servidor Python (Recomendado)
```bash
python3 -m http.server 8000
```
Luego visita: http://localhost:8000

### Opción 2: Servidor Node.js
```bash
npx serve
```

### Opción 3: Live Server (VS Code)
Instala la extensión "Live Server" y haz clic derecho en index.html > "Open with Live Server"

## 📱 Responsive Breakpoints

- **Desktop**: > 968px
- **Tablet**: 640px - 968px
- **Mobile**: < 640px

## 🎯 Características Destacadas

- Navegación sticky con efecto de scroll
- Animaciones on scroll (AOS alternative)
- Efectos hover en tarjetas
- Integración con WhatsApp
- Back to top button
- Custom cursor effect
- Parallax en hero section
- Gradientes modernos
- Diseño tipo Squarespace

## 📈 SEO Optimizado (Score: 91/100) 🏆

- **Meta tags completos** con keywords estratégicos
- **Schema Markup (JSON-LD)** para datos estructurados
- **Open Graph & Twitter Cards** para redes sociales
- **Sitemap.xml** y **robots.txt** configurados
- **HTML5 semántico** con ARIA labels
- **PWA Ready** con manifest.json
- **Mobile-first** y 100% responsive
- **Performance optimizado** con lazy loading

## 📞 Contacto

- **WhatsApp**: +57 314 449 5813
- **Email**: info@spacecode.com.co
- **Web**: https://spacecode.com.co

## 📝 Notas

- Se eliminó la sección de IoT según requerimientos
- Se agregó sección de equipo con 3 integrantes
- Imágenes de equipo usando placeholders temporales (pravatar.cc)
- Formulario integrado con WhatsApp

---

Desarrollado con ♥ por **&lt; SPACECODE /&gt;** - 2025

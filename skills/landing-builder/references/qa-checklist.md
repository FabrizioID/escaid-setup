# QA checklist — antes de entregar

Servir con `python -m http.server` (no file://). Forzar el reveal (`.in`) antes del screenshot full-page. Revisar en desktop y mobile.

## Contenido
- [ ] Cada sección tiene data real del brochure; 0 datos inventados.
- [ ] Vacíos = placeholder limpio marcado o ya preguntados (no rellenados con invento).
- [ ] Sin precios, cuentas, CCI, DNI ni teléfonos personales.
- [ ] Conteos cuadran (ej. "N certificados" suma N visible).
- [ ] Sin mentores inventados (si no hay nombres -> respaldos).
- [ ] Sin lenguaje de backstage (TODO, placeholder, jerga interna) en lo visible.

## Branding / diseño
- [ ] Tokens (color, tipografía, radios) del `DESIGN.md`, no del brochure.
- [ ] Focus ring visible en todo interactivo.
- [ ] `prefers-reduced-motion` respetado.
- [ ] Responsive: desktop, tablet y mobile sin desbordes ni solapes.
- [ ] Contraste de texto suficiente sobre el fondo.

## Logos
- [ ] Todos los logos son de la **marca correcta** (verificados en página de prueba; sin homónimos).
- [ ] Descargados local (no hotlink).
- [ ] Sin imágenes rotas, bloques blancos (invert sobre fondo opaco) ni wordmarks ilegibles inline.
- [ ] Los que no se consiguieron -> chip/tarjeta de texto consistente.

## Funcional
- [ ] Anclas del nav funcionan.
- [ ] Botones de guías con slot `LINK PENDIENTE` o ya con la URL real.
- [ ] Consola sin errores relevantes (favicon 404 es inofensivo).

## Entrega (a prueba de descargas)
- [ ] Generada la versión **`index.html` self-contained** (logos en base64, sin `assets/` externos).
- [ ] Generado el **`<slug>.zip`** con la carpeta completa (para editar).
- [ ] NO se entregan archivos sueltos descargables (al bajarlos se aplana `assets/` y se rompen las imágenes).

## Cierre
- [ ] Archivos de prueba y descargas basura eliminados.
- [ ] `BRIEF.md` refleja el estado final.
- [ ] Reporte: coberturas de logos, vacíos abiertos, siguiente paso (deploy).

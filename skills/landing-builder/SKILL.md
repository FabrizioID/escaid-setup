---
name: landing-builder
description: Genera una landing informativa on-brand a partir de un brochure de curso/programa + una plantilla + un branding. Usar cuando el usuario quiera crear o generar una landing desde un brochure (PDF/imagenes) junto con una plantilla y un branding entregados como RAR o ZIP, o cuando pida "generar landing", "plantilla de landing", "landing del diplomado/curso/programa". El flujo es: ingesta -> escaneo del brochure -> preguntar SOLO los vacios -> generar index.html -> conseguir logos reales verificados -> QA visual con Playwright -> entregar carpeta lista.
---

# Landing Builder

Generador repetible de landings informativas on-brand. Convierte (plantilla + branding + brochure) en una carpeta `index.html` lista, aplicando un set fijo de criterios de calidad. El operador trae el contenido; esta skill aporta el **proceso y los criterios**.

## PARA-QUE (objetivo real)
Que cualquier operador produzca una landing de un programa/curso **sin re-derivar estructura ni criterios**. La landing vende el programa de forma **informativa** (no transaccional): el receptor entiende el valor, la ruta, la prueba y cómo acceder a los recursos. NO postula ni paga desde la landing (salvo que el operador lo pida explícito).

**Condicion de salida (el QA pasa cuando):** todas las secciones con data real del brochure · 0 datos inventados (vacios marcados y preguntados) · branding exacto del design system · logos reales de marca correcta o texto (nunca imagen rota ni logo ajeno) · 0 datos sensibles (precios/cuentas/DNI) salvo permiso · hilo narrativo continuo · render verificado con Playwright.

## INPUTS que trae el operador
1. **`plantilla` (RAR/ZIP)** — esqueleto de la landing: `index.html` parametrizado + design system + estructura `assets/`. Es el punto de partida del HTML.
2. **`branding` (RAR/ZIP)** — `DESIGN.md` (tokens de color/tipografia/espaciado) + logos de la marca. Manda sobre la plantilla en lo visual.
3. **`brochure + info`** — PDF/imagenes/texto con el contenido del programa. Es la unica fuente de contenido.

Si falta alguno, pedirlo antes de empezar. No inventar branding ni contenido.

## EXTRAER RAR/ZIP (este equipo)
- ZIP: nativo (`Expand-Archive` en PowerShell, o `unzip`).
- RAR: usar WinRAR por linea de comandos:
  `& "C:\Program Files\WinRAR\WinRAR.exe" x -ibck -o+ "<archivo.rar>" "<carpeta_destino>\"`
  (o `UnRAR.exe x` si existe en esa carpeta). Verificar que se extrajeron archivos antes de seguir.
- Si el equipo no tuviera tool de RAR, pedir el archivo en ZIP.

## FLUJO (7 pasos)

**1. Ingesta.** Crear carpeta del proyecto (`<slug-programa>/`). Extraer plantilla y branding. Leer `DESIGN.md`, el `index.html` de la plantilla, y `references/criterios.md` de esta skill. Leer el brochure completo (todas las paginas/imagenes — NO asumir cantidad de paginas; leerlo de verdad).

**2. Escaneo automatico -> `BRIEF.md` (MD-first).** Mapear el contenido del brochure a las secciones (ver `references/estructura-landing.md`). Producir `BRIEF.md` con: PARA-QUE, orden de secciones, contenido real por seccion, y una lista explicita de **VACIOS** (lo que el brochure no trae o es ambiguo). Esto nace ANTES del HTML.

**3. Preguntar SOLO los vacios.** Usar `references/preguntas-vacios.md`. Preguntas dirigidas, no un cuestionario generico. Decisiones tipicas: precios si/no, mentores con nombre o respaldos, links de guias, orden de secciones, naturaleza informativa vs transaccional. No avanzar a generar secciones que dependen de un vacio bloqueante sin preguntar (o dejar placeholder limpio marcado).

**4. Generar `index.html`.** Partir de la plantilla, inyectar el design system del branding (tokens en `:root`), y rellenar cada seccion con el contenido del BRIEF. Aplicar `references/criterios.md` al pie de la letra.

**5. Logos reales (respaldos + herramientas).** Conseguir logos REALES, descargarlos LOCAL (nunca hotlink), y **verificar marca uno por uno** (ver criterios: hay muchos homonimos). Los que no se consigan de marca correcta -> chip/tarjeta de texto. Verificar contraste en fondo oscuro con una pagina de prueba antes de integrar.

**6. QA visual (Playwright).** Servir con `python -m http.server` (NO file://). Forzar el reveal para el screenshot full-page. Auditar seccion por seccion contra `references/qa-checklist.md` + recorrido del receptor. Podar/arreglar lo que se vea mal en el propio QA, no dejarlo al usuario.

**7. Entregar (a prueba de descargas).** Descargar los archivos sueltos desde el chat APLANA las carpetas y rompe las rutas `assets/...` -> imagenes rotas. Para evitarlo SIEMPRE entregar las dos formas:
   - **`index.html` self-contained** = version con TODOS los logos embebidos como `data:` base64 (cero archivos externos). Es la que el operador descarga y abre/deploya: no se puede romper al moverla.
   - **`<slug>.zip`** = la carpeta completa (`index.html` editable + `assets/` + `BRIEF.md`) comprimida, para quien quiera editar. Un zip baja como un solo archivo y conserva la estructura.
   Reportar coberturas (logos conseguidos vs texto), vacios abiertos, y ofrecer deploy. NO entregar la carpeta como archivos sueltos para descargar.

## REGLA DE ORO
No reducir la tarea ni inventar para "completar". Lo que no se sabe se pregunta o se marca como vacio visible. Un logo de otra empresa o un dato inventado es peor que un placeholder honesto.

## Referencias (leer segun fase)
- Criterios de contenido, diseño y logos: `references/criterios.md` (SIEMPRE en pasos 4-6).
- Estructura y orden de secciones: `references/estructura-landing.md` (paso 2 y 4).
- Catalogo de preguntas de vacios: `references/preguntas-vacios.md` (paso 3).
- Checklist de QA: `references/qa-checklist.md` (paso 6).

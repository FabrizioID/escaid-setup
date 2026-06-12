# Criterios — Landing Builder

Reglas fijas aprendidas. Aplicar al generar y en el QA. Si el operador pide algo que contradice un criterio, avisar y pedir confirmacion antes de romperlo.

## A. Naturaleza de la landing
- **Informativa por defecto.** Sin acciones de postular / inscribirme / pagar. El receptor se informa; la conversion ocurre fuera.
- CTAs permitidos: **navegacionales** (Ver modulos, Ver certificados, Ver temario) y **links de recursos** (guias de acceso, instaladores). El nav NO lleva boton de postular; puede llevar un dato (ej. "Inicio · 11 Jun").
- Solo hacerla transaccional si el operador lo pide explicito.

## B. Datos sensibles
- **Nunca** poner en la landing publica: precios, numeros de cuenta bancaria, CCI, DNI, telefonos personales, links de pago — **aunque esten en el brochure**.
- Si el brochure trae inversion/pagos, omitir o (si el operador lo pide) mostrar solo rangos sin datos de cuenta.

## C. Contenido (verdad)
- **No inventar.** Cada dato sale del brochure. Lo que falta -> VACIO marcado y preguntado. Supuestos siempre explicitos, nunca en silencio.
- **Mentores:** si el brochure no trae nombres reales, NO inventar personas. Resolver esa seccion con **respaldos institucionales** (partners, certificadoras) como prueba.
- **Fechas:** afirmar solo las explicitas (ej. fecha de inicio). No deducir fechas de un calendario ambiguo.
- **Conteos cuadrados:** si se afirma un numero (ej. "9 certificados"), que la suma sea visible y de exactamente ese numero. Revisar que no quede "dice 9 pero hay 8".
- **Framing comprador:** decir "sesiones bonus", no "cursos gratis". Traducir terminos tecnicos. Cero lenguaje de backstage (nada de "placeholder", "TODO", jerga interna) en lo que ve el receptor.

## D. Diseño / branding
- Paleta, tipografia, radios, sombras y espaciado **del `DESIGN.md`** (design system), NO los del brochure. El brochure es contenido, no estilo.
- Inyectar los tokens en `:root`. Dark-first si el sistema lo es.
- **Obligatorio:** focus ring visible en todo interactivo, `prefers-reduced-motion` en animaciones, responsive (desktop/tablet/mobile), contenedor del sistema.
- Animacion de entrada con IntersectionObserver: recordar que el screenshot full-page no la dispara -> forzar `.in` antes de capturar.

## E. Logos (respaldos + herramientas) — la parte delicada
- **Reales y LOCALES.** Descargar cada logo a `assets/` (nunca hotlink: se rompen). 
- **VERIFICACION DE MARCA OBLIGATORIA.** Muchos resultados de busqueda son **homonimos de otra empresa**. Casos reales vistos:
  - "KAMAN" -> sale **Kaman Aerospace** (helicopteros EEUU), NO la incubadora.
  - "Presto" -> sale un **Presto de retail**, NO RIB Presto (software construccion).
  - "Synchro" -> sale **"adVISU/otra empresa"**, NO el Synchro de Bentley.
  - Favicons de productos Autodesk -> el **simbolo Autodesk generico**, no el del producto.
  Por eso: **ver cada logo en una pagina de prueba con fondo oscuro y confirmar que es la marca correcta ANTES de integrarlo.** Poner el logo de otra empresa es peor que no poner logo.
- **Contraste:** logo oscuro monocromo -> invertir a blanco via CSS (`filter:brightness(0) invert(1)`). Logo con fondo opaco -> al invertir sale **bloque blanco** -> NO invertir, mejor descartar a texto. Wordmark ancho -> no entra inline -> texto.
- **Fallback:** si no hay logo de marca correcta -> chip/tarjeta de **texto** con el mismo estilo. NUNCA imagen rota.
- **Fuentes utiles:** sitios oficiales (header img / og:image), Wikimedia Commons (`https://commons.wikimedia.org/wiki/Special:FilePath/<Archivo.svg>`), `https://cdn.simpleicons.org/<slug>/<color>` (monocromo recolorable), worldvectorlogo (`https://cdn.worldvectorlogo.com/logos/<slug>.svg`), seeklogo. SIEMPRE verificar marca, no confiar en el nombre del slug.
- Para productos de una misma empresa (ej. todos Autodesk) no repetir 4 veces el mismo logo generico: mejor texto.

## F. Guias de acceso (botones con slots de links)
- Tarjetas con boton `href="#"` + `data-link="<id>"` + comentario `<!-- LINK PENDIENTE: ... -->` para que el operador pegue luego la URL (Drive, instaladores, etc.).
- Si los instaladores son varios, convertir esa tarjeta en varios botones (uno por software).
- Es utilitario (abrir/descargar recurso), no postulacion -> compatible con landing informativa.

## G. Proceso
- **MD-first:** producir `BRIEF.md` (contenido + vacios) antes del HTML.
- **Auditar antes de entregar:** revisar el resultado contra `qa-checklist.md` y el recorrido del receptor; no dejar que el receptor encuentre errores que el checklist ya cubre.
- Limpiar archivos de prueba (paginas de test, descargas basura) antes de entregar.

## H. Entrega — a prueba de descargas (CRITICO)
Descargar archivos SUELTOS desde el chat APLANA las carpetas: `index.html` queda junto a las imagenes y las rutas `assets/partners/...`, `assets/tools/...` dejan de resolver -> imagenes rotas. Para que el operador no lo sufra, entregar SIEMPRE las dos formas:
1. **`index.html` self-contained** — todos los logos embebidos como `data:` base64 (sin `assets/` externos). Se descarga, se abre y se deploya sin romperse al moverlo. Es la version "para usar".
2. **`<slug>.zip`** — la carpeta completa (`index.html` con rutas a `assets/` + `assets/` + `BRIEF.md`) comprimida. Un zip baja como UN archivo y conserva la estructura. Es la version "para editar".
NUNCA entregar la carpeta como archivos sueltos descargables. Si el operador ya tiene una carpeta plana rota, reorganizar los archivos a `assets/{logos,partners,tools,reference}/` por nombre, o regenerar la version self-contained.

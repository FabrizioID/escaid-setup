# UI Validation Protocol

Checklist antes de entregar una UI.

## Basico

1. Abrir la UI en navegador.
2. Revisar consola.
3. Tomar screenshot desktop.
4. Tomar screenshot mobile si hay responsive.
5. Verificar accion principal.
6. Verificar que no hay textos cortados, superpuestos o fuera de botones.

## Canvas / Three.js

- Confirmar que el canvas no esta en blanco.
- Confirmar que la camara encuadra el objeto o escena principal.
- Confirmar que hay movimiento o interaccion visible.
- Confirmar que el canvas no tapa controles.
- Si hay 3D, probar resize desktop/mobile.

## Motion

- Animaciones visibles pero no mareantes.
- No bloquear scroll.
- ScrollTrigger debe funcionar hacia abajo y hacia arriba.
- Respeta `prefers-reduced-motion` si el producto es operacional o serio.

## Responsive

Probar al menos:

- Desktop 1440 x 900.
- Mobile 390 x 844.

Revisar:

- nav/header;
- hero o pantalla principal;
- botones/tap targets;
- tablas/cards/grids;
- modales/drawers;
- footer o acciones persistentes.

## Producto / App

Si hay repo/app real:

- correr build/test/lint disponible;
- mantener convenciones del repo;
- usar iconos existentes o lucide;
- no crear landing si el usuario pidio herramienta;
- iniciar dev server y entregar URL.

## HTML Autocontenido

- archivo abre directo o con servidor local simple;
- dependencias CDN cargan;
- no hay rutas rotas;
- assets locales existen;
- light/dark toggle funciona si se implemento.

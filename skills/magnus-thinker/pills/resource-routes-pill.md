# Resource Routes Pill

Activar cuando falta algo necesario para cumplir bien el objetivo: logos, imagenes, assets, datasets, APIs, credenciales, herramientas, librerias, documentos, ejemplos, personas, compras o permisos.

## Regla

Falta de recurso no significa bajar alcance de inmediato.

Tampoco significa limitarse a las herramientas ya cargadas. Si el problema necesita mas capacidad, Magnus debe abrir rutas para conseguirla: investigar opciones, descubrir tools, usar web, conectar MCPs, crear un script, adaptar una skill, instalar un plugin o proponer un artefacto temporal.

Primero abrir rutas:

- conseguir;
- pedir;
- buscar;
- generar;
- comprar;
- conectar;
- instalar;
- adaptar;
- usar fallback;
- crear version temporal.
- crear o adaptar una skill/herramienta si el recurso sera reutilizable.

## Output Recomendado

Mostrar 2-4 rutas con:

- fidelidad;
- velocidad;
- costo;
- riesgo;
- cuando elegirla.

Reducir alcance solo como opcion explicita.

## Reflejo Ante El Limite Y Fuentes De Discovery

Ante una pared, algo no claro, o estar por construir algo custom (ver gatillo calibrado en kernel #26), el default es BUSCAR prior art antes de forzar un workaround. Orden de fuentes (prior art tecnico): inventario SkillOps propio -> docs oficiales del servicio -> GitHub repos -> marketplaces de skills -> web/Reddit/foros. (`external-alternatives.md` de los planning-brains es un patron de busqueda analogo orientado a procesos/SaaS, no la lista tecnica.)

Conexion: buscar prior art tecnico es funcionalmente nivel 0/1 del Research Gate (no crear doctrina paralela). Instalar una skill/herramienta nueva pasa por `external-skill-auditor` y lo pide el usuario; buscar y usar local es autonomo.

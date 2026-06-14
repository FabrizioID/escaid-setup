# Learnings: General (cross-dominio)

Errores, gotchas y patrones aprendidos en sesiones de desarrollo real.
Más reciente primero. Leer antes de trabajar en este dominio.

---

## 2026-06-14 — Playwright MCP bloquea file:// → servir el HTML con http.server local

**Dominio**: tooling / ui-architect / Playwright
**Severidad**: 🟡 Importante
**Contexto**: verificar un HTML autocontenido (presentación de clase) con screenshots de Playwright

**Síntoma**:
`browser_navigate` a `file:///...` falla con `Access to "file:" protocol is blocked`.

**Causa raíz**:
El Playwright MCP no permite el protocolo `file://`.

**Fix aplicado**:
```bash
cd "<carpeta del html>" && (python -m http.server 8765 >/dev/null 2>&1 &)
# luego navegar a http://localhost:8765/archivo.html
# al cerrar: pkill -f "http.server 8765"
```

**Cómo detectarlo antes**:
- Para previsualizar o tomar screenshot de cualquier HTML local con Playwright → levantar `http.server` desde el inicio, no intentar `file://`.
- El error `404 favicon.ico` en consola es **inofensivo** (la página no tiene favicon): NO contarlo como error real al revisar la consola.
- Los screenshots se guardan en `.playwright-mcp/` o en el cwd; si `Read` no los encuentra en la ruta esperada, hacer un `find . -name "<archivo>.png"`.

**Tags**: #playwright #ui-architect #html #file-protocol #http-server #favicon #screenshot

---

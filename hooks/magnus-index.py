#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Magnus index hook — escanea la base de criterios + capacidades y emite un
INDICE compacto (no el texto completo) como additionalContext para SessionStart
o SubagentStart. El texto completo se lee on-demand; el indice garantiza que
Magnus SIEMPRE sepa QUE criterio/capacidad existe (anti-proxy por retrieval-miss).

Uso:  python magnus-index.py "<ruta_second_brain>" [--subagent]
"""
import sys, os, re, json, glob

def lead(line):
    """Extrae el lead de un bullet: el **negrita** o los primeros ~90 chars."""
    s = line.strip().lstrip("-*").strip()
    m = re.match(r"\*\*(.+?)\*\*", s)
    if m:
        return m.group(1).strip()
    s = re.sub(r"[*_`#]", "", s)
    return (s[:90] + "…") if len(s) > 90 else s

def headers(path, levels=("## ", "### ")):
    out = []
    try:
        with open(path, encoding="utf-8") as f:
            for ln in f:
                for lv in levels:
                    if ln.startswith(lv):
                        out.append(ln.strip().lstrip("#").strip())
                        break
    except Exception:
        pass
    return out

def bullets(path):
    out = []
    try:
        with open(path, encoding="utf-8") as f:
            for ln in f:
                if ln.lstrip().startswith(("- ", "* ")):
                    L = lead(ln)
                    if L and len(L) > 4:
                        out.append(L)
    except Exception:
        pass
    return out

def main():
    sb = sys.argv[1] if len(sys.argv) > 1 else ""
    is_sub = "--subagent" in sys.argv
    parts = []

    # --- CRITERIOS por proyecto ---
    crit_lines = []
    if sb and os.path.isdir(sb):
        for cpath in sorted(glob.glob(os.path.join(sb, "inteligencia", "*", "memory", "criteria.md"))):
            proj = cpath.replace("\\", "/").split("/inteligencia/")[1].split("/")[0]
            items = bullets(cpath)
            if items:
                crit_lines.append(f"  [{proj}] ({len(items)}): " + " · ".join(items[:8]))
        pc = os.path.join(sb, "inteligencia", "_magnus", "memory", "process-criteria.md")
        if os.path.isfile(pc):
            secs = headers(pc, ("## ",))
            if secs:
                crit_lines.append("  [_magnus/process-criteria] secciones: " + " · ".join(secs))

    # --- KERNEL Magnus (reglas inamovibles + pills/references disponibles) ---
    skill_dir = os.path.expanduser("~/.claude/skills/magnus-thinker")
    kernel_lines = []
    skillmd = os.path.join(skill_dir, "SKILL.md")
    if os.path.isfile(skillmd):
        try:
            txt = open(skillmd, encoding="utf-8").read()
            m = re.search(r"## Reglas inamovibles(.+?)(?:\n## |\Z)", txt, re.S)
            if m:
                rules = re.findall(r"\n\d+\.\s+\*\*(.+?)\*\*", m.group(1))
                if rules:
                    kernel_lines.append("  Reglas inamovibles: " + " · ".join(rules))
        except Exception:
            pass
    # --- KERNEL: criterios absorbidos del usuario (universales, propagados) ---
    kpath = os.path.join(skill_dir, "references", "general-criteria-kernel.md")
    if os.path.isfile(kpath):
        try:
            ktxt = open(kpath, encoding="utf-8").read()
            m = re.search(r"## Criterios absorbidos del usuario(.+?)(?:\n## |\Z)", ktxt, re.S)
            if m:
                rows = re.findall(r"^\|\s*(U\d+)\s*\|\s*(.+?)\s*\|", m.group(1), re.M)
                abs_items = [f"{cid}: {crit}" for cid, crit in rows if crit and not crit.startswith("(vac")]
                if abs_items:
                    kernel_lines.append("  Criterios absorbidos (universales, aplican a TODOS los proyectos): " + " · ".join(abs_items))
        except Exception:
            pass

    for sub in ("pills", "references"):
        d = os.path.join(skill_dir, sub)
        if os.path.isdir(d):
            names = [os.path.splitext(f)[0] for f in sorted(os.listdir(d)) if f.endswith(".md")]
            if names:
                kernel_lines.append(f"  {sub}/ (leer on-demand): " + " · ".join(names))

    # --- CAPACIDADES ---
    cap = ("  Skills locales: ver lista de skills de la sesion. "
           "MCPs: google-workspace, n8n, hostinger, playwright, notion, word, canva (via ToolSearch). "
           "Otras: deep-research (evidencia externa), Playwright (ver/probar UI), WebSearch/WebFetch. "
           "REGLA: pregunta '¿que capacidad haria esto mejor?' y LLAMALA; no te limites al contexto.")

    # --- Ensamblar ---
    txt = ["### MAGNUS — INDICE DE CRITERIOS Y CAPACIDADES (auto-generado; lee el texto completo on-demand)"]
    txt.append("CRITERIOS (que lente existe + donde; abre el archivo para el texto):")
    txt += crit_lines if crit_lines else ["  (sin second-brain accesible en esta ruta)"]
    txt.append("KERNEL MAGNUS:")
    txt += kernel_lines if kernel_lines else ["  (SKILL no accesible)"]
    txt.append("CAPACIDADES DISPONIBLES:")
    txt.append(cap)
    if is_sub:
        txt.append("NOTA SUBAGENTE: recibiste objetivo+enfoque en tu prompt; este indice es tu vara de criterios. Devuelve structured-output, no prosa-resumen.")
    context = "\n".join(txt)

    event = "SubagentStart" if is_sub else "SessionStart"
    payload = json.dumps({"hookSpecificOutput": {"hookEventName": event, "additionalContext": context}}, ensure_ascii=False)
    # Escribir UTF-8 directo al buffer: evita UnicodeEncodeError si la consola es cp1252 (Windows)
    sys.stdout.buffer.write(payload.encode("utf-8"))

if __name__ == "__main__":
    main()

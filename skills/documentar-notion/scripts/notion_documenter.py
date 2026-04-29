#!/usr/bin/env python3
"""
Fallback utility for documentar-notion.

Primary route is Notion MCP. This script is for local planning, conservative
diffs, and direct Notion API fallback when explicitly chosen.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import sys
from dataclasses import dataclass, asdict
from typing import Any
from urllib import request, error


NOTION_VERSION = "2022-06-28"
API_BASE = "https://api.notion.com/v1"


@dataclass
class ChangePlan:
    safe_changes: list[dict[str, Any]]
    needs_confirmation: list[dict[str, Any]]
    blocked_changes: list[dict[str, Any]]
    warnings: list[str]
    notion_limitations: list[str]


def normalize_text(value: str) -> str:
    return " ".join(value.lower().strip().split())


def hash_text(value: str) -> str:
    return hashlib.sha256(normalize_text(value).encode("utf-8")).hexdigest()[:16]


def load_json(path: str) -> Any:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def write_json(data: Any) -> None:
    print(json.dumps(data, ensure_ascii=False, indent=2))


def notion_headers() -> dict[str, str]:
    token = os.environ.get("NOTION_API_KEY")
    if not token:
        raise SystemExit("Missing NOTION_API_KEY. Prefer Notion MCP when available, or set env var for API fallback.")
    return {
        "Authorization": f"Bearer {token}",
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
    }


def notion_request(method: str, path: str, payload: dict[str, Any] | None = None) -> dict[str, Any]:
    data = None if payload is None else json.dumps(payload).encode("utf-8")
    req = request.Request(f"{API_BASE}{path}", data=data, method=method, headers=notion_headers())
    try:
        with request.urlopen(req, timeout=45) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise SystemExit(f"Notion API error {exc.code}: {body}") from exc


def cmd_plan(args: argparse.Namespace) -> None:
    context = load_json(args.context)
    existing = load_json(args.existing) if args.existing else {}

    existing_hashes = set(existing.get("block_hashes", []))
    safe: list[dict[str, Any]] = []
    warnings: list[str] = []

    for section in context.get("sections", []):
        title = section.get("title", "Untitled")
        body = section.get("content", "")
        digest = hash_text(f"{title}\n{body}")
        if digest in existing_hashes:
            warnings.append(f"Probable duplicate skipped: {title}")
            continue
        safe.append({
            "action": "append_block",
            "content_type": "section",
            "title": title,
            "hash": digest,
            "reason": "new section from context",
        })

    for task in context.get("tasks", []):
        name = task.get("name") or task.get("title")
        if not name:
            continue
        safe.append({
            "action": "add_database_row",
            "content_type": "task",
            "title": name,
            "reason": "new task from context",
        })

    plan = ChangePlan(
        safe_changes=safe,
        needs_confirmation=[],
        blocked_changes=[],
        warnings=warnings,
        notion_limitations=[],
    )
    write_json(asdict(plan))


def paragraph_block(text: str) -> dict[str, Any]:
    return {
        "object": "block",
        "type": "paragraph",
        "paragraph": {
            "rich_text": [{"type": "text", "text": {"content": text[:1900]}}],
        },
    }


def heading_block(text: str, level: int = 2) -> dict[str, Any]:
    block_type = f"heading_{min(max(level, 1), 3)}"
    return {
        "object": "block",
        "type": block_type,
        block_type: {
            "rich_text": [{"type": "text", "text": {"content": text[:1900]}}],
        },
    }


def cmd_append(args: argparse.Namespace) -> None:
    payload_data = load_json(args.blocks)
    children = payload_data.get("children", payload_data if isinstance(payload_data, list) else [])
    if not children:
        raise SystemExit("No children blocks found.")
    if len(children) > 100:
        raise SystemExit("Refusing to append more than 100 blocks in one request. Split into batches.")
    result = notion_request("PATCH", f"/blocks/{args.block_id}/children", {"children": children})
    write_json({"updated": len(children), "result_id": result.get("block", {}).get("id"), "raw": result})


def cmd_diff(args: argparse.Namespace) -> None:
    before = load_json(args.before)
    after = load_json(args.after)
    before_hashes = {hash_text(json.dumps(item, sort_keys=True, ensure_ascii=False)) for item in before}
    new_items = []
    for item in after:
        digest = hash_text(json.dumps(item, sort_keys=True, ensure_ascii=False))
        if digest not in before_hashes:
            new_items.append(item)
    write_json({"new_count": len(new_items), "new_items": new_items})


def cmd_upload_image(args: argparse.Namespace) -> None:
    raise SystemExit(
        "Image upload is environment-dependent. Prefer Notion MCP/native upload. "
        "If unavailable, insert an external URL or placeholder/caption."
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="documentar-notion fallback utility")
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_plan = sub.add_parser("plan", help="Create a conservative change plan from context JSON")
    p_plan.add_argument("--context", required=True)
    p_plan.add_argument("--existing")
    p_plan.set_defaults(func=cmd_plan)

    p_append = sub.add_parser("append", help="Append prebuilt Notion blocks to a block/page")
    p_append.add_argument("--block-id", required=True)
    p_append.add_argument("--blocks", required=True)
    p_append.set_defaults(func=cmd_append)

    p_diff = sub.add_parser("diff", help="Diff two JSON arrays conservatively")
    p_diff.add_argument("--before", required=True)
    p_diff.add_argument("--after", required=True)
    p_diff.set_defaults(func=cmd_diff)

    p_upload = sub.add_parser("upload-image", help="Placeholder for image upload route")
    p_upload.add_argument("--path", required=True)
    p_upload.set_defaults(func=cmd_upload_image)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()


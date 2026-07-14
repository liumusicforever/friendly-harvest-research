#!/usr/bin/env python3
"""組站腳本：把 repo 的研究檔案彙整成 MkDocs 的 docs 目錄。

- Markdown 原樣搬進 build/docs（研究檔案保持在 repo 根目錄，方便 diff 與 GitHub 直讀）
- CSV 自動轉成 Markdown 表格頁（來源總表、歸檔索引、比較矩陣）
- 缺少的階段檔案補上「尚未開始」佔位頁，讓 nav 永遠 build 得起來

用法：python scripts/build_site.py && mkdocs serve
"""
from __future__ import annotations

import csv
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "build" / "docs"

# repo 路徑 -> 站上路徑
COPY = {
    "README.md": "index.md",
    "AGENT_BRIEF.md": "AGENT_BRIEF.md",
    "CHANGELOG.md": "CHANGELOG.md",
    "00_framework/source-tiers.md": "00_framework/source-tiers.md",
    "00_framework/methodology.md": "00_framework/methodology.md",
    "00_framework/archive-policy.md": "00_framework/archive-policy.md",
    "01_taiwan-baseline.md": "01_taiwan-baseline.md",
    "02_scientific-basis.md": "02_scientific-basis.md",
    "03_country-cases/03a_japan-okinawa.md": "03_country-cases/03a_japan-okinawa.md",
    "03_country-cases/03b_usa.md": "03_country-cases/03b_usa.md",
    "03_country-cases/03c_australia.md": "03_country-cases/03c_australia.md",
    "03_country-cases/03d_new-zealand.md": "03_country-cases/03d_new-zealand.md",
    "03_country-cases/03e_eu-others.md": "03_country-cases/03e_eu-others.md",
    "04_spearfishing.md": "04_spearfishing.md",
    "06_integrated-proposal.md": "06_integrated-proposal.md",
    "archive/README.md": "archive/index.md",
}

# CSV -> (站上路徑, 頁面標題, 前言)
TABLES = {
    "sources/source-registry.csv": (
        "sources/source-registry.md",
        "來源總表",
        "知識層的引用入口。每一列都應具備佐證三件組：URL、定位（條號／頁碼）、原文短引。"
        "`status` 非 `verified` 者不得用於最終政策建議。",
    ),
    "archive/archive-index.csv": (
        "archive/archive-index.md",
        "素材檔案庫索引",
        "原始素材層的檢索索引。`tags` 是 AI 分類標籤，只服務檢索，不是結論。",
    ),
    "05_comparative-matrix.csv": (
        "05_comparative-matrix.md",
        "跨國比較矩陣",
        "第 5 階段產出：各轄區的體長限制制度分類與可移植性評估。",
    ),
}

STAGE_STUB = "> 狀態：尚未開始\n\n本階段尚未產出內容，請見 [AGENT_BRIEF](AGENT_BRIEF.md)。\n"


def md_escape(cell: str) -> str:
    return cell.replace("|", "\\|").replace("\n", " ").strip()


def csv_to_markdown(csv_path: Path, title: str, intro: str) -> str:
    lines = [f"# {title}", "", intro, ""]
    with csv_path.open(encoding="utf-8", newline="") as fh:
        rows = list(csv.reader(fh))
    if len(rows) < 2:
        lines.append("_（尚無資料）_")
        return "\n".join(lines) + "\n"
    header, *body = rows
    lines.append("| " + " | ".join(md_escape(c) for c in header) + " |")
    lines.append("|" + "|".join(["---"] * len(header)) + "|")
    for row in body:
        if not any(c.strip() for c in row):
            continue
        row = row + [""] * (len(header) - len(row))
        lines.append("| " + " | ".join(md_escape(c) for c in row[: len(header)]) + " |")
    lines.append("")
    lines.append(f"_共 {len(body)} 筆。原始資料：`{csv_path.relative_to(ROOT)}`_")
    return "\n".join(lines) + "\n"


def build_cards_index(cards: list[Path]) -> str:
    lines = ["# 摘要卡", "", "每筆來源一張卡，忠實摘要單一文件，不做跨來源推論。", ""]
    if not cards:
        lines.append("_（尚無摘要卡）_")
    for card in sorted(cards):
        lines.append(f"- [{card.stem}](cards/{card.name})")
    return "\n".join(lines) + "\n"


def main() -> None:
    if DOCS.exists():
        shutil.rmtree(DOCS)
    DOCS.mkdir(parents=True)

    for src, dst in COPY.items():
        target = DOCS / dst
        target.parent.mkdir(parents=True, exist_ok=True)
        source = ROOT / src
        if source.exists():
            shutil.copy2(source, target)
        else:
            target.write_text(f"# {Path(src).stem}\n\n{STAGE_STUB}", encoding="utf-8")
            print(f"stub: {dst}")

    for csv_rel, (dst, title, intro) in TABLES.items():
        target = DOCS / dst
        target.parent.mkdir(parents=True, exist_ok=True)
        csv_path = ROOT / csv_rel
        if csv_path.exists():
            target.write_text(csv_to_markdown(csv_path, title, intro), encoding="utf-8")
        else:
            target.write_text(f"# {title}\n\n{intro}\n\n_（尚無資料）_\n", encoding="utf-8")

    cards_src = ROOT / "archive" / "cards"
    cards = list(cards_src.glob("S*.md")) if cards_src.exists() else []
    (DOCS / "archive" / "cards").mkdir(parents=True, exist_ok=True)
    for card in cards:
        shutil.copy2(card, DOCS / "archive" / "cards" / card.name)
    (DOCS / "archive" / "cards-index.md").write_text(build_cards_index(cards), encoding="utf-8")

    print(f"built -> {DOCS}  ({len(cards)} cards)")


if __name__ == "__main__":
    main()

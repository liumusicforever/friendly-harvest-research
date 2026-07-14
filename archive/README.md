# 素材檔案庫（Archive）

這裡是**原始素材層**。放的是「這份文件說了什麼」，**不放任何跨來源推論或政策意見**——
那些一律屬於知識層（`01`–`06` 各階段文件）。規則見
[`00_framework/archive-policy.md`](../00_framework/archive-policy.md)。

## 結構

- `raw/` — 原始快照（`S###__slug.pdf` / `.html` / `.txt`）。政府網站改版時連結常失效，故一律留底。
- `cards/` — 每筆來源一張摘要卡 `S###.md`：忠實摘要、關鍵條文、原文短引、AI 分類標籤。
- `archive-index.csv` — 歸檔物件總表，分類標籤在此，供檢索用。

## 與知識層的連結

只有一條：**來源編號 `S###`**。
知識層文件引用 `[S001]` → 到 `sources/source-registry.csv` 查佐證三件組 →
到 `archive/cards/S001.md` 看完整摘要 → 到 `archive/raw/` 看原件。

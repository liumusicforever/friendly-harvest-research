# 友善採捕行動方案・研究專案

把海洋委員會民國 109 年 5 月核定的「**台灣友善釣魚行動方案**」，
擴展為涵蓋魚槍、魚叉等致死性採捕工具的「**友善採捕行動方案**」，
並為守法的休閒自用採捕者建立**有科學依據**的教育指引。

## 核心主張

1. **語意擴張**：釣魚可放流，採捕不可逆。「友善」的定義必須從「不傷魚」
   轉為「**選擇性、避開繁殖母魚、不過量**」。
2. **科學支點**：台灣現行只設體長**下限**（讓幼魚長到至少繁殖一次）；
   而**上限／區間限制（slot limit）** 背後是另一套科學——保護大型老齡高產卵力母魚
   （**BOFFFF** 假說）。
3. **政策鉤子**：魚槍能「看著挑」的體長選擇性，在網具上是缺點，在魚槍上是**保育優勢**。

## 專案的兩層結構（請勿混寫）

| 層 | 位置 | 放什麼 |
|---|---|---|
| **知識層** | `01`–`06` 各階段文件 + `sources/source-registry.csv` | 論證、比較、政策推論 |
| **素材層** | `archive/`（原始快照 + 單來源摘要卡 + AI 分類索引） | 「這份文件說了什麼」，不做推論 |

兩層只用來源編號 `S###` 相連。規則見 [`00_framework/archive-policy.md`](00_framework/archive-policy.md)。

## 資料紀律

每一項主張都標 `[S###]`，且該編號在來源總表中必須具備**佐證三件組**：
原始 URL + 定位（條號／頁碼）+ 原文短引。缺任一項者標為 `unverified`，
**不得**用於最終政策建議。分級規則見 [`00_framework/source-tiers.md`](00_framework/source-tiers.md)。

## 研究階段

| 階段 | 產出 | 狀態 |
|---|---|---|
| 1 台灣現況基線 | [`01_taiwan-baseline.md`](01_taiwan-baseline.md) | 進行中 |
| 2 科學理論基礎 | [`02_scientific-basis.md`](02_scientific-basis.md) | 未開始 |
| 3 各國案例發散 | [`03_country-cases/`](03_country-cases/) | 未開始 |
| 4 魚槍專題深掘 | [`04_spearfishing.md`](04_spearfishing.md) | 未開始 |
| 5 比較與收斂 | `05_comparative-matrix.csv` | 未開始 |
| 6 整合方案草案 | [`06_integrated-proposal.md`](06_integrated-proposal.md) | 未開始 |

完整作戰指令：[`AGENT_BRIEF.md`](AGENT_BRIEF.md)。

## 網站

研究報告的單頁網站位於 [`web/index.html`](web/index.html)，`main` 分支每次 push 會經 GitHub Actions
自動部署到 GitHub Pages（設定見 [.github/workflows/pages.yml](.github/workflows/pages.yml)）。

本機預覽：直接用瀏覽器開 `web/index.html`，或

```bash
python3 -m http.server -d web 8000   # 然後開 http://localhost:8000
```

> `mkdocs.yml`、`scripts/build_site.py` 為早期的文件入口網站設定，目前**未用於部署**，保留供未來擴充。

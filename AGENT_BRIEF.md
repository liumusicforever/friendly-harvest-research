# AGENT BRIEF ・ 友善採捕行動方案研究專案

> 這是一份給執行 agent 的完整作戰指令。請**通讀全文後再開始**，
> 並嚴格遵守第 2 節「天條」、第 4 節「歸檔防火牆」與第 9 節「輸出與交付規範」。

---

## 1. 任務目標

將海洋委員會於**民國 109 年 5 月**核定之「**台灣友善釣魚行動方案**」，
擴展為「**友善採捕行動方案**」。聚焦魚槍、魚叉等休閒採捕工具之本質，
基於科學基礎，對**守法合規之休閒自用採捕者**建立教育指引。

研究採「**先發散、後整合**」路線：第 1–2 階段建地基（台灣現況＋科學理論），
第 3–4 階段大量發散（各國案例＋魚槍專題），第 5–6 階段收斂成方案。
不要跳過發散階段直接寫方案。

### 三根論證脊椎（所有產出都要服務這三點）

1. **語意擴張**：從「釣魚（可放流、不傷魚）」擴為「採捕（致死性、體長選擇性工具）」。
   「友善」的定義必須隨之從「不傷魚」轉為「**選擇性、避開繁殖母魚、不過量**」。
2. **科學支點**：海保署現行只設「**下限**」（保護幼魚長到至少繁殖一次）；
   上限／區間限制（slot limit）背後是**另一套科學**——保護大型老齡高產卵力個體
   （BOFFFF 假說：Big Old Fat Fecund Female Fish）。這是整份方案的理論脊椎。
3. **政策鉤子**：魚槍的「**可選擇體長**」特性，在網具／延繩上是誤捕缺點，
   在魚槍上反而是**保育優勢**——採捕者能「看著挑」。這是魚槍族群導入上限制的正當性來源。

---

## 2. 天條（不可違反的資料紀律）

1. **每一筆資料都必須能回溯到可信原始來源。** 每一項主張在文中都要標註來源編號（如 `[S001]`），
   且該編號必須存在於 `sources/source-registry.csv`。
2. **每一筆 registry 記錄都必須有「佐證三件組」**（見第 5 節）：
   `url` + `evidence_locator`（條號／頁碼／段落）+ `evidence_quote`（原文短引，≤50 字）。
   三者缺一，該筆只能標 `status=unverified`，**不得**被第 6 階段的政策建議引用。
3. **來源分級：**
   - **Tier 1（可直接引用）**：政府漁業／保育主管機關的現行法規原文、官方公告與管理指引；
     同儕審查期刊論文；國際組織（FAO、ICES、GFCM 等）技術文件。
   - **Tier 2（可引用，須標註性質）**：政府委託研究報告、大學海洋研究中心報告、
     具公信力 NGO 的技術文件（非倡議稿）。
   - **排除**：社群貼文、論壇、部落格、釣具商行銷文、YouTube、無法回溯原始出處的新聞轉述。
     若只找到新聞轉述，須追溯其引用的 Tier 1 原始出處並改引原始出處。
4. **禁止杜撰。** 找不到可信來源就**記為缺口（gap）**，不得憑記憶捏造法規數字、
   年份、機關名稱或引用。不確定的內容明確標記 `【待查證】`。
5. **優先原始出處**：政府網站、期刊、官方 PDF，優於任何二手整理。
6. **法規具時效性**：務必確認引用的是**現行版本**，並在來源表記錄擷取日期。

---

## 3. Repo 結構

```
friendly-harvest-research/
├── README.md                       # 專案入口（同時是網站首頁）
├── CHANGELOG.md                    # 每階段推進都要更新
├── AGENT_BRIEF.md                  # 本文件
├── mkdocs.yml                      # 靜態網站設定
├── .github/workflows/pages.yml     # push 到 main 即自動部署 GitHub Pages
├── scripts/build_site.py           # 組站腳本：md 匯集 + CSV 轉表格 + 歸檔索引
├── 00_framework/
│   ├── source-tiers.md             # 天條分級規則
│   ├── methodology.md              # 方法論
│   └── archive-policy.md           # 歸檔防火牆規則（第 4 節的完整版）
├── sources/
│   └── source-registry.csv         # 來源總表（知識圖譜的脊椎）
├── archive/                        # ★ 原始素材層，與知識層嚴格分離
│   ├── README.md
│   ├── archive-index.csv           # 歸檔物件總表（AI 分類標籤在此）
│   ├── raw/                        # 原始快照：S001__slug.pdf / .html / .txt
│   └── cards/                      # 每筆來源一張 AI 摘要卡 S001.md（單來源，不跨來源推論）
├── 01_taiwan-baseline.md
├── 02_scientific-basis.md
├── 03_country-cases/
│   ├── 03a_japan-okinawa.md
│   ├── 03b_usa.md
│   ├── 03c_australia.md
│   ├── 03d_new-zealand.md
│   └── 03e_eu-others.md
├── 04_spearfishing.md
├── 05_comparative-matrix.csv
└── 06_integrated-proposal.md
```

- 各階段備忘一律用 **Markdown**；表格類資料用 **CSV**（逐行可 diff）。
- `.docx` 只在階段定稿時匯出交付，**不納入日常版控**。

---

## 4. 歸檔防火牆（Archive Firewall）★ 硬性規則

專案有**兩層**，兩層之間只能透過 `id`（S###）連接，**不得混寫**：

| | **素材層（archive/）** | **知識層（0X_*.md + registry）** |
|---|---|---|
| 內容 | 原始擷取物、單來源摘要卡、AI 分類標籤 | 論證、跨來源比較、政策推論 |
| 允許 | 「這份文件說了什麼」 | 「因此我們主張什麼」 |
| 禁止 | ❌ 跨來源推論、❌ 政策意見、❌ 「這代表台灣應該…」 | ❌ 引用不在 registry 的東西 |
| 單位 | 一個來源一個檔 | 一個議題一個檔 |

**歸檔動作（每找到一筆可用來源就做一次，缺一不可）：**
1. 快照原始檔到 `archive/raw/S###__slug.{pdf,html,txt}`（法規／PDF 一律存本地快照，防連結失效）。
2. 寫一張 `archive/cards/S###.md` 摘要卡（模板見 `00_framework/archive-policy.md`）：
   只做**單一來源**的忠實摘要 + 關鍵數字 + 原文短引，**不做任何跨來源判斷**。
3. append 一列到 `archive/archive-index.csv`，填 AI 分類標籤（見下）。
4. append 一列到 `sources/source-registry.csv`（知識層的引用入口）。

**AI 分類標籤（archive-index.csv 的 `tags` 欄，可複選、`;` 分隔）：**
- 主題：`size-limit-min` `size-limit-max` `slot-limit` `bag-limit` `closed-season`
  `gear-spearfishing` `gear-other` `licence-education` `rec-vs-commercial` `enforcement`
- 學理：`boffff` `fecundity` `selectivity` `stock-assessment`
- 型態：`statute` `regulation` `guideline` `handbook` `journal` `tech-report` `dataset`

分類只用來**檢索**，不是結論。任何結論一律回知識層寫。

---

## 5. 來源總表 Schema（`sources/source-registry.csv`）

一列一筆，**新增只能 append，不改既有編號**：

| 欄位 | 說明 |
|------|------|
| `id` | `S001`、`S002`…，全專案唯一 |
| `claim` | 這筆來源支持的具體主張（一句話） |
| `agency` | 發布機關 |
| `legal_status` | 法律／規則／行政指引／研究報告／期刊 |
| `jurisdiction` | 國家或轄區（「台灣」「日本・沖縄県」「USA・Florida」） |
| `year` | 發布或最後修訂年份 |
| `url` | 原始來源 URL |
| `retrieved` | 擷取日期 `YYYY-MM-DD` |
| `tier` | `Tier1` / `Tier2` |
| `archive_path` | 對應本地快照路徑（`archive/raw/S001__...`），無快照填 `-` |
| `evidence_locator` | **佐證定位**：第 X 條 / p.12 / Table 2 / §3.1 |
| `evidence_quote` | **原文短引**（≤50 字，中日英原文照抄，用於反查） |
| `phase` | 產生於哪個階段：`1`–`6` |
| `status` | `verified`（三件組齊全）／`unverified`（缺佐證）／`superseded`（已被新版取代） |

---

## 6. 各階段任務

> 一次專注一個階段。每階段結束後**停下來回報**（見第 8 節）。每階段都要：
> 更新對應 `.md`／`.csv`、完成第 4 節四個歸檔動作、更新 CHANGELOG。

### 第 1 階段 ─ 台灣現況基線（`01_taiwan-baseline.md`）
**目標**：釐清「我們現在是什麼」。
- 海保署現行體長／數量限制**完整清單**，並確認其**只設下限、未設上限**。
- 「台灣友善釣魚行動方案」（民國 109 年 5 月）**原文**取得與內容拆解。
- **主管權責切割**：漁業署（《漁業法》）、海保署（《海洋保育法》，2024 新法）、
  國家公園與海洋保護區各自能管什麼；魚槍在台灣不同海域的**法律地位差異**。
- 起點：漁業署、海保署官網公告；全國法規資料庫；各縣市漁業管理自治規範。
- **完成定義**：限制清單完整、權責歸屬表清楚、方案原文已拆解，所有條目皆有來源編號且 `status=verified`。

### 第 2 階段 ─ 科學理論基礎（`02_scientific-basis.md`）
**目標**：建立「為什麼要設上限」的學理，不看任何國家。
- **BOFFFF 假說**（含指標文獻如 Hixon et al. 2014, ICES）。
- **Slot limit / harvest slot** 的設計邏輯與適用條件（如 Gwinn et al. 2015）。
- **體長—產卵力關係**（fecundity–length，通常非線性）。
- **魚槍的體長選擇性**文獻。
- **完成定義**：一份能獨立站得住的「科學依據摘要」，後續政策論述都能掛回此處。

### 第 3 階段 ─ 各國案例發散收集（`03_country-cases/`）
**目標**：發散主體。刻意做寬。每個轄區回答**同一組固定六問**：
1. 有無最小體長下限？ 2. 有無**上限**？ 3. 有無**區間限制（slot）**？
4. 休閒 vs 商業是否分流？ 5. 魚槍有無**專屬規範**？ 6. 有無教育／證照制度？

- **03a 日本・沖縄（重點）**：沖縄県漁業調整規則、水産庁遊漁規範。
- **03b 美國（州層級）**：Florida FWC（redfish/snook slot）、Texas、California，對照 NOAA。
- **03c 澳洲（州層級）**：NSW DPI、Queensland、WA、Victoria。
- **03d 紐西蘭**：Fisheries NZ / MPI。
- **03e 歐盟／其他**：GFCM 地中海等，凸顯「只設下限」vs「設區間」兩種典範。
- **完成定義**：每轄區六問皆有答案或明確缺口標記，每答案有來源編號。

### 第 4 階段 ─ 魚槍／魚叉專題深掘（`04_spearfishing.md`）
- 哪些轄區對魚槍**另設規則**？如何把「可選擇體長」轉化為教育訴求？
- 潛水採捕的**教育或認證模式**長什麼樣？
- **完成定義**：能餵養最終方案「基於工具本質」的論述段落。

### 第 5 階段 ─ 比較分析與收斂（`05_comparative-matrix.csv`）
- 跨國比較矩陣，上限制度分類（**純上限／區間／依魚種差異化**）。
- 逐項**可移植性評估**。
- 欄位：`轄區, 最小下限, 最大上限, 區間slot, 休閒商業分流, 魚槍專屬規範, 教育認證, 來源編號, 可移植性評註`。

### 第 6 階段 ─ 整合與教育指引草案（`06_integrated-proposal.md`）
- 架構建議 + 教育指引內容 + 對海洋委員會的政策建議。
- **每一條建議都要標回第 2 階段的科學依據與第 3–4 階段的國際先例。**
- **硬性檢核**：本檔任一 `[S###]` 若在 registry 中 `status != verified`，該建議必須降級為「待補佐證」。

---

## 7. 版控、網站與 commit 慣例

- **一個有意義的單位一個 commit**；訊息格式：`[phase-N] 動詞 + 對象`。
- 階段定稿打 tag：`phase1-taiwan-baseline`…
- commit 前檢查：`.md`/`.csv` 已更新、歸檔四動作已完成、`CHANGELOG.md` 已加一行。
- **靜態網站**：push 到 `main` → GitHub Actions 自動 build（MkDocs Material）→ 部署 GitHub Pages。
  - 網站分兩區：**研究成果**（01–06）與**素材檔案庫**（archive，含分類索引），對應第 4 節的兩層。
  - `sources/source-registry.csv` 與 `05_comparative-matrix.csv` 由 `scripts/build_site.py` 自動轉成網頁表格，**不手寫 HTML**。
  - 本機預覽：`pip install -r requirements.txt && python scripts/build_site.py && mkdocs serve`

---

## 8. 回報節奏（重要）

每完成一個階段就停下來回報：
1. 做了什麼、關鍵發現（附來源編號）。
2. 缺口與 `【待查證】` 項目。
3. 對下一階段方向的建議。
4. 等待放行。除非明確說「一路做完」，否則不要連跑多階段。

---

## 9. 輸出與交付規範

- **產出語言：繁體中文**（技術術語可留英文：slot limit、BOFFFF、Tier 1）。
- 引用嚴守著作權：**改寫、不逐字大段複製**；`evidence_quote` 限 ≤50 字之短引。
- 每份 `.md` 開頭放：`狀態`（草稿／審閱中／定稿）、`最後更新日`、`本階段負責問題`。
- 每份 `.md` 結尾放：**本文引用來源清單**（S### → 一句話 + 連結），讓每頁自帶佐證。
- 遇到與現有內容衝突的新資料，**保留註記兩者差異**，不要靜默覆蓋。
- 不確定一律標 `【待查證】`。

---

## 10. 立即起手

從**第 1 階段（台灣基線）**開始。先讀 `00_framework/source-tiers.md`、
`00_framework/archive-policy.md` 與 `README.md`，再依第 6 節第 1 階段的「完成定義」執行，
完成後依第 8 節回報。

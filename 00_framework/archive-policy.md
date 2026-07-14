# 歸檔防火牆（Archive Firewall）

> 狀態：定稿　　最後更新日：2026-07-14
> 本文件負責問題：查到的資料放哪裡、怎麼分類、為什麼不能跟知識圖譜混在一起。

## 為什麼要分兩層

素材會過期、會被推翻、會有多份互相矛盾；論證則需要穩定、可回溯、可被檢驗。
把兩者寫在同一份檔案裡，就會出現「摘要裡偷渡結論」——讀者無法分辨
哪一句是文件說的、哪一句是我們推的。因此本專案硬性分層。

| | **素材層 `archive/`** | **知識層 `01`–`06` + registry** |
|---|---|---|
| 回答的問題 | 「這份文件說了什麼」 | 「因此我們主張什麼」 |
| 單位 | 一個來源一個檔（`S###`） | 一個議題一個檔 |
| 允許 | 忠實摘要、關鍵數字、原文短引、分類標籤 | 跨來源比較、因果推論、政策建議 |
| 禁止 | ❌ 跨來源推論　❌ 政策意見　❌「這代表台灣應該…」 | ❌ 引用不在 registry 的東西 |

兩層唯一的連結是來源編號 `S###`。

## 每找到一筆可用來源，做四件事

1. **快照**原始檔 → `archive/raw/S###__slug.{pdf,html,txt}`
   （法規與 PDF 一律存本地快照，政府網站改版時連結常失效）。
2. **寫摘要卡** → `archive/cards/S###.md`（模板見下）。
3. **append** 一列到 `archive/archive-index.csv`（含 AI 分類標籤）。
4. **append** 一列到 `sources/source-registry.csv`（知識層的引用入口）。

## 摘要卡模板（`archive/cards/S###.md`）

```markdown
# S### ・ <文件標題>

- **機關 / 作者**：
- **轄區**：
- **法律位階／類型**：
- **年份（最後修訂）**：
- **Tier**：Tier1 / Tier2
- **URL**：
- **本地快照**：archive/raw/S###__slug.pdf
- **擷取日期**：YYYY-MM-DD
- **標籤**：size-limit-min;slot-limit;gear-spearfishing

## 這份文件說了什麼（忠實摘要，200 字內）

## 關鍵數字／條文

| 定位 | 原文短引（≤50 字） | 中文說明 |
|---|---|---|
| 第 X 條 | 「…」 | … |

## 與本專案的關聯（只寫「可用於哪個階段的哪一問」，不寫結論）

## 疑點 / 待查證
```

> 「與本專案的關聯」只能寫**檢索用途**（例：可回答第 3 階段第 2 問「有無上限」），
> 不能寫「因此台灣應該採用」。那句話屬於知識層。

## AI 分類標籤（`archive-index.csv` 的 `tags`，`;` 分隔，可複選）

- **主題**：`size-limit-min` `size-limit-max` `slot-limit` `bag-limit` `closed-season`
  `gear-spearfishing` `gear-other` `licence-education` `rec-vs-commercial` `enforcement`
- **學理**：`boffff` `fecundity` `selectivity` `stock-assessment`
- **型態**：`statute` `regulation` `guideline` `handbook` `journal` `tech-report` `dataset`

標籤只服務**檢索**，不是結論。

## `archive-index.csv` 欄位

`id, title, jurisdiction, agency, doc_type, year, tier, tags, url, local_snapshot, retrieved, card, notes`

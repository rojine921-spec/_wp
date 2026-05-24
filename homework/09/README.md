# 期末作業：平時作業總結與整理

## 📋 作業概覽

本資料夾整理所有平時作業（HW01 ~ HW08）及其說明文檔。

| 作業 | 主題 | 類型 | 說明 |
|------|------|------|------|
| 01 | 自我介紹 | HTML | 個人網頁展示 |
| 02 | 表單 | HTML | 問卷調查表單 |
| 03 | Hello JavaScript | JavaScript | 基礎輸出練習 |
| 04 | JS基礎題 | JavaScript | 10道演算法題（使用ChatGPT驗證） |
| 05 | OpenCode網誌 | Node.js + Express | 完整的部落格系統 |
| 06 | Callback練習 | JavaScript | 10道進階函數式編程題 |
| 07 | Express基礎 | JavaScript | 10道Express前置練習題 |
| 08 | 社群網站 | Node.js + Express | 完整社群平台系統（使用ChatGPT輔助） |

---

## 📁 資料夾結構

```
09-期末作業/
├── 01-自我介紹/
│   ├── 自我介紹 (HTML檔)
│   └── README.md (作業說明)
├── 02-表單/
│   ├── 表單 (HTML檔)
│   └── README.md
├── 03-Hello/
│   ├── hello.js
│   └── README.md
├── 04-JS基礎題/
│   ├── 01.js ~ 10.js
│   └── README.md
├── 05-OpenCode網誌/
│   ├── opencode/
│   │   ├── blog1/ (基礎版)
│   │   ├── blog2/ (主題版)
│   │   └── README.md
│   └── README.md
├── 06-Callback練習/
│   ├── 01.js ~ 10.js
│   └── README.md
├── 07-Express基礎/
│   ├── 01.js ~ 10.js
│   └── README.md
├── 08-社群網站/
│   ├── server.js
│   ├── package.json
│   ├── data/
│   ├── public/
│   └── README.md
└── README.md (本檔案)
```

---

## 🎓 學習進程

### 第一階段：前端基礎（HW01-HW02）
- HTML基礎語法
- 表單設計與結構
- CSS美化與排版

### 第二階段：JavaScript基礎（HW03-HW04）
- JavaScript基礎語法
- 迴圈與條件判斷
- 陣列與字串操作
- 函數定義與使用

### 第三階段：進階JavaScript（HW06-HW07）
- 回呼函數與高階函數
- 陣列方法深度應用
- 物件操作與解構賦值
- 函數式編程概念

### 第四階段：後端開發（HW05、HW08）
- Node.js環境
- Express框架
- RESTful API設計
- 資料庫與JSON儲存
- 前後端通訊

---

## 🤖 AI使用說明

### 使用AI的作業
- **HW04**：使用ChatGPT驗證演算法邏輯
  - 對話連結：https://chatgpt.com/share/69bcc04a-4d0c-8007-a65a-ac95531f10fc
  - 用途：驗證程式結果、確認邏輯正確性

- **HW05**：使用ChatGPT/Gemini輔助開發
  - 用途：架構設計、功能實現、UI優化

- **HW08**：使用ChatGPT輔助開發
  - 用途：API設計、前後端交換、問題排解

### 未使用AI的作業
- **HW01-HW02**：完全原創，未使用AI
- **HW03**：完全原創，未使用AI
- **HW06-HW07**：完全原創，未使用AI

---

## 📋 複製聲明

### 原創作品（HW01-HW03、HW06-HW07）
- 完全由本人獨立編寫
- 未複製他人或網路程式碼
- 自主解決所有問題

### 參考型作品（HW04-HW05、HW08）
- **題目**：來自課程指定
- **解法**：自主思考與實現
- **AI輔助**：用於驗證與優化，非直接複製
- **個人貢獻**：核心邏輯與完整實現

---

## ✅ 各作業說明

詳見各資料夾內的 `README.md` 檔案：
- [01-自我介紹](./01-自我介紹/README.md)
- [02-表單](./02-表單/README.md)
- [03-Hello](./03-Hello/README.md)
- [04-JS基礎題](./04-JS基礎題/README.md)
- [05-OpenCode網誌](./05-OpenCode網誌/README.md)
- [06-Callback練習](./06-Callback練習/README.md)
- [07-Express基礎](./07-Express基礎/README.md)
- [08-社群網站](./08-社群網站/README.md)

---

## 🚀 執行方式

### 靜態網頁（HW01-HW02）
用瀏覽器直接開啟HTML檔案

### 命令行程式（HW03-HW04、HW06-HW07）
```bash
node 檔案名.js
```

### Node.js伺服器（HW05、HW08）
```bash
# 進入相應資料夾
cd 05-OpenCode網誌/opencode/blog1
# 或
cd 08-社群網站

# 安裝依賴
npm install

# 啟動伺服器
npm start

# 訪問 http://localhost:3000
```

---

## 📊 成績優化建議

### 早交獎勵
建議在第15週之前交付，根據題目說明早交會有加分。

### 現場口報
建議準備現場口報（e320口），會比線上繳交有更好的評分。

### 準備重點
1. **介紹進程**：說明從基礎到進階的學習過程
2. **技術亮點**：展示HW05和HW08的完整功能
3. **AI應用**：清楚說明如何使用AI輔助而非依賴AI
4. **問題解決**：說明遇到的問題與如何解決

---

## 📝 繳交說明

本作業已準備完整的說明與程式碼，適合：
- ✅ 線上繳交（含完整README說明）
- ✅ 現場口報（可展示所有功能）
- ✅ 補充文件說明（每個作業都有詳細註解）

---

## 📧 總結

本作業整理涵蓋：
- ✅ 前端基礎（HTML/CSS）
- ✅ JavaScript進階（回呼、高階函數、解構賦值）
- ✅ 後端開發（Node.js/Express）
- ✅ 全棧開發（前後端整合）
- ✅ AI工具應用（ChatGPT輔助開發）

**預計分數優勢**：
- 完整的作業整理
- 清楚的AI使用說明
- 詳細的複製聲明
- 明確的個人貢獻說明
- 可運行的完整程式碼

---

*最後更新：2026年5月24日*
*學生：翁沂慶*

# CodeNote AI Community Website

> 使用 Node.js 與 Express 製作的簡易社群網站

---

# ChatGPT AI 輔助開發

本專案在開發過程中，
使用 AI 工具協助完成部分程式開發與學習。

ChatGPT AI 協助內容包含：

- Node.js 與 Express 學習
- API 撰寫協助
- 前端 UI 設計建議
- 程式錯誤排除
- 專案架構規劃
- README 與學習筆記整理

透過 AI 協助，
可以更快速理解網站開發流程，
並提升開發效率。

本專案主要仍由開發者自行整合、修改與測試程式內容。

---

# 專案介紹

本專案為課程期中作業。

使用 Node.js 與 Express 建立簡易社群網站，
使用者可以發表文章與瀏覽文章，
並透過 API 與伺服器交換資料。

本專案模擬部落格與社群平台的基本功能，
並結合 AI 輔助開發流程，
學習現代網站前後端開發方式。

---

# 專案目標

本專案主要目標：

- 學習 Node.js 後端開發
- 建立 Express API
- 理解前後端資料交換
- 製作簡易社群網站
- 練習網站伺服器架構
- 學習 JSON 資料儲存方式

---

# 使用技術

| 技術 | 用途 |
|------|------|
| HTML | 網頁結構 |
| CSS | UI 設計 |
| JavaScript | 前端互動 |
| Node.js | 後端伺服器 |
| Express | API 建立 |
| JSON | 資料儲存 |
| Fetch API | 前後端資料交換 |
| ChatGPT | AI 開發輔助 |

---

# 專案架構

```txt
08/
│
├── server.js
├── package.json
├── README.md
├── note.md
│
├── data/
│   ├── users.json
│   └── posts.json
│
└── public/
    ├── index.html
    ├── style.css
    └── app.js
```

---

# 系統架構

```txt
使用者
   ↓
前端網頁（HTML/CSS/JS）
   ↓ Fetch API
Express Server
   ↓
JSON Database
```

---

# 功能介紹

## 首頁功能

首頁可以顯示所有文章內容。

使用者可以瀏覽其他文章。

---

## 發文功能

使用者可以：

- 輸入文章標題
- 輸入文章內容
- 發布文章

發布後資料會儲存至 JSON 檔案。

---

## API 功能

本專案建立簡易 REST API。

### 取得文章

```http
GET /api/posts
```

用來取得所有文章資料。

---

### 新增文章

```http
POST /api/posts
```

用來新增文章資料。

---

## JSON 資料儲存

文章資料儲存在：

```txt
data/posts.json
```

使用 JSON 作為簡易資料庫。

---

# 開發流程

本專案開發流程：

1. 建立 Node.js 專案
2. 安裝 Express
3. 建立伺服器
4. 建立 API
5. 製作前端畫面
6. 完成前後端資料交換
7. 使用 JSON 儲存資料
8. 測試網站功能

---

# 遇到的問題

## Express 安裝問題

一開始不熟悉 npm 指令，
導致 Express 無法正常使用。

解決方式：

重新安裝 express 套件。

---

## API 無法讀取資料

前端 fetch 無法正確取得資料。

解決方式：

重新檢查 API 路徑與 JSON 格式。

---

## JSON 格式錯誤

JSON 少逗號導致資料無法讀取。

解決方式：

重新檢查 JSON 格式。

---

# 專案成果

本專案成功完成：

- Node.js 伺服器
- Express API
- 發文系統
- JSON 資料儲存
- 前後端資料交換
- 社群網站基礎功能

---

# 未來功能

未來希望加入：

- 使用者登入系統
- 個人頁面
- 留言功能
- 點讚功能
- AI 文章摘要
- 圖片上傳
- 資料庫系統
- Ollama AI 整合

---

# 心得

透過本次專案，
我學習到 Node.js 與 Express 的基本使用方式，
也理解網站前後端如何透過 API 交換資料。

雖然一開始對後端與 API 不熟悉，
但完成後對網站開發流程有更多理解。

本專案讓我學到：

- 如何建立伺服器
- 如何建立 API
- 如何讓前後端互動
- 如何使用 JSON 儲存資料
- 如何規劃網站架構

本次專案對網站開發學習有很大的幫助。

---

# 執行方式

## 安裝套件

```bash
npm install
```

---

## 啟動伺服器

```bash
node server.js
```

---

# 開啟網站

瀏覽器輸入：

```txt
http://localhost:3000
```

---

# 專案畫面

<img width="1919" height="866" alt="image" src="https://github.com/user-attachments/assets/6f12f9d0-a029-4e8a-941d-0e90ef4e5413" />


---

# 作者

rojine921-spec

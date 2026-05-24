# 作業05：OpenCode 網誌專案

## 概述
使用 Node.js + Express 開發的簡易網誌系統。包含使用者認證、文章管理、私人/公共貼文等進階功能。

## 技術棧
- **後端**：Node.js + Express.js
- **資料庫**：SQLite (sql.js)
- **認證**：bcryptjs + express-session
- **文章格式**：Markdown + marked
- **前端**：HTML + CSS + JavaScript

## AI使用說明
**使用AI：ChatGPT / Gemini**
- 用於架構設計討論
- 用於除錯和功能驗證
- 用於優化UI/UX設計

## 複製說明
- 核心功能為自主設計實現
- 部分前端UI設計參考網誌範例
- 後端邏輯為自主編寫

## 個人貢獻
- 獨立完成Express伺服器架構設計
- 自主實現SQLite資料庫設計
- 完整編寫認證系統
- 實現私人/公共文章管理機制
- 美化UI介面與響應式設計

## 主要功能
1. **使用者系統**
   - 註冊/登入
   - 密碼加密儲存
   - Session管理

2. **文章管理**
   - 發布文章
   - Markdown支援
   - 私人/公共設定

3. **權限控制**
   - 私人文章保護
   - 作者驗證
   - 公共區瀏覽

4. **UI/UX**
   - 卡片式設計
   - 深色主題支援
   - 動畫效果

## 檔案結構
詳見opencode/README.md

## 執行方式
```bash
cd opencode/blog1
npm install
npm start
# 訪問 http://localhost:3000
```

## 學習收穫
- Node.js伺服器開發實務
- Express框架使用
- 資料庫設計與SQL操作
- 使用者認證機制
- 前後端資料交換

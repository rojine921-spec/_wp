# Node.js 與 Express 學習筆記

---

# Node.js

Node.js 是 JavaScript 的執行環境。

可以讓 JavaScript 建立網站伺服器。

---

# Express

Express 是 Node.js 的框架。

可以快速建立：

- API
- 路由
- 網站伺服器

安裝方式：

```bash
npm install express
```

---

# API

API 是前端與後端交換資料的方法。

例如：

```js
app.get("/api/posts")
```

代表取得文章資料。

---

# GET 與 POST

## GET

取得資料。

```js
app.get()
```

---

## POST

新增資料。

```js
app.post()
```

---

# JSON

JSON 是網站常用的資料格式。

例如：

```json
{
  "title":"Hello",
  "content":"World"
}
```

---

# Fetch API

Fetch API 可以讓前端呼叫後端 API。

```js
fetch("/api/posts")
```

---

# Middleware

```js
app.use(express.json());
```

可以讓 Express 讀取 JSON。

---

# 靜態檔案

```js
app.use(express.static("public"));
```

可以讓瀏覽器讀取 public 資料夾。

---

# 本次學到的內容

- Node.js 基本使用
- Express API 建立
- JSON 資料格式
- 前後端資料交換
- 網站伺服器運作原理

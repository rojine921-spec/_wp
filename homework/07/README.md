# JavaScript Homework - Express 基礎理解練習

---

## 習題 1

## 程式碼

```javascript
let post = {
    id: 1,
    title: "Hello World",
    content: "Markdown content"
};

console.log(post.title);
console.log(post["title"]);
```

## 測試結果

```
Hello World
Hello World
```

## 摘要

使用點符號與中括號存取物件屬性。

---

## 習題 2

## 程式碼

```javascript
const req = {
    body: {
        title: "JS教學",
        content: "內容在此",
        author: "Gemini"
    }
};

const { title, content } = req.body;

console.log(title, content);
```

## 測試結果

```
JS教學 內容在此
```

## 摘要

使用解構賦值從物件中取出資料。

---

## 習題 3

## 程式碼

```javascript
const posts = [{id: 1, t: "A"}, {id: 2, t: "B"}];

let html = "";

posts.forEach(p => {
    html += `<div>${p.t}</div>`;
});

console.log(html);
```

## 測試結果

```
<div>A</div><div>B</div>
```

## 摘要

使用 forEach 與模板字串產生 HTML。

---

## 習題 4

## 程式碼

```javascript
let params = {};

params.id = 99;

console.log(params);
```

## 測試結果

```
{ id: 99 }
```

## 摘要

模擬 URL 參數物件。

---

## 習題 5

## 程式碼

```javascript
function fetchData(id, callback) {
    let data = {
        id: id,
        status: "success"
    };

    callback(null, data);
}

fetchData(101, (err, data) => {
    if (err) {
        console.log("發生錯誤：" + err);
    } else {
        console.log("成功取得資料：", data);
    }
});
```

## 測試結果

```
成功取得資料： { id: 101, status: 'success' }
```

## 摘要

實作 Error-first Callback，模擬資料傳遞。

---

## 習題 6

## 程式碼

```javascript
const jsonStr = '{"title": "Post 1", "tags": ["js", "node"]}';

let obj = JSON.parse(jsonStr);

console.log(obj.tags[1]);
```

## 測試結果

```
node
```

## 摘要

將 JSON 字串轉為物件並存取資料。

---

## 習題 7

## 程式碼

```javascript
function fakeGet(sql, params, callback) {
    const fakeRow = {
        id: 1,
        title: "測試文章",
        content: "這是內容"
    };

    callback(null, fakeRow);
}

fakeGet("SELECT * FROM posts WHERE id = ?", [1], (err, row) => {
    if (err) {
        console.log("錯誤");
    } else {
        console.log("標題：", row.title);
    }
});
```

## 測試結果

```
標題： 測試文章
```

## 摘要

模擬資料庫查詢與回呼機制。

---

## 習題 8

## 程式碼

```javascript
let user = "Guest";

let html = `<h1>Welcome, ${user ? user : "Stranger"}</h1>`;

console.log(html);
```

## 測試結果

```
<h1>Welcome, Guest</h1>
```

## 摘要

使用模板字串與條件判斷產生 HTML。

---

## 習題 9

## 程式碼

```javascript
let arr = [
    "Very long content here",
    "Another Very long content here",
    "3rd Very long content here"
];

let result = arr.map(str => str.substring(0, 10) + "...");

console.log(result);
```

## 測試結果

```
["Very long ...", "Another Ve...", "3rd Very l..."]
```

## 摘要

使用 substring 與 map 處理字串。

---

## 習題 10

## 程式碼

```javascript
function checkAdmin(role, callback) {
    if (role !== "admin") {
        callback("Access Denied");
    } else {
        callback(null, "Welcome");
    }
}

checkAdmin("user", (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(res);
    }
});

checkAdmin("admin", (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(res);
    }
});
```

## 測試結果

```
Access Denied
Welcome
```

## 摘要

實作 Error-first Callback 驗證權限。

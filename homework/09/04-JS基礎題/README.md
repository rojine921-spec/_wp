# 作業04：JavaScript 基礎練習題

## 概述
10道JavaScript基礎練習題，涵蓋：
- 判斷奇偶數
- 迴圈與加總
- 條件判斷
- 陣列操作
- 字串處理
- JSON轉換

## 技術
- JavaScript ES5+
- 迴圈（for、while）
- 條件判斷（if/else）
- 陣列方法
- 物件與JSON
- 函數與遞迴

## AI使用說明
**使用AI：ChatGPT**
- AI對話連結：https://chatgpt.com/share/69bcc04a-4d0c-8007-a65a-ac95531f10fc
- AI使用情況：用AI驗證程式邏輯、確認執行結果

## 複製說明
- 題目為課程指定
- 解法為自主思考與實現
- 部分邏輯經AI驗證

## 個人貢獻
- 獨立分析每道題目
- 自主設計解題思路
- 用AI驗證邏輯正確性
- 完整編寫程式碼

## 檔案列表
- `01.js` ~ `10.js` - 各題解答

## 執行方式
```bash
node 01.js  # 執行第1題
node 02.js  # 執行第2題
```

---

## 習題 4

AI 問答 -- https://chatgpt.com/share/69bcc04a-4d0c-8007-a65a-ac95531f10fc

## 測試結果

```
PS C:\Users\user\html2server\_wp\homework\04> node 10-score.js
小明 及格
小美 及格
```

## 摘要

好，這裡我幫你把 **每一題都補上「完整測試」👉（先程式碼 → 再輸出結果）**，你可以直接貼去跑 👍

---

# 🧪 JavaScript 練習題測試結果

---

## 1️⃣ 判斷奇偶數

### 程式碼

```javascript
function checkNumber(num) {
    if (num % 2 === 0) {
        console.log("偶數");
    } else {
        console.log("奇數");
    }
}

checkNumber(7);
checkNumber(10);
```

### 執行結果

```
奇數
偶數
```

---

## 2️⃣ 1 到 100 加總

### 程式碼

```javascript
let sum = 0;

for (let i = 1; i <= 100; i++) {
    sum += i;
}

console.log(sum);
```

### 執行結果

```
5050
```

---

## 3️⃣ while 印出 1~10

### 程式碼

```javascript
let i = 1;

while (i <= 10) {
    console.log(i);
    i++;
}
```

### 執行結果

```
1
2
3
4
5
6
7
8
9
10
```

---

## 4️⃣ 陣列最大值

### 程式碼

```javascript
let arr = [5, 8, 2, 10, 3];
let max = arr[0];

for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
        max = arr[i];
    }
}

console.log("最大值:", max);
```

### 執行結果

```
最大值: 10
```

---

## 5️⃣ 階乘

### 程式碼

```javascript
function factorial(n) {
    let result = 1;

    while (n > 0) {
        result *= n;
        n--;
    }

    return result;
}

console.log(factorial(5));
```

### 執行結果

```
120
```

---

## 6️⃣ 物件資料讀取

### 程式碼

```javascript
let student = {
    name: "小明",
    age: 18,
    score: 90
};

console.log(student.name);
console.log(student.score);
```

### 執行結果

```
小明
90
```

---

## 7️⃣ JSON 轉換

### 程式碼

```javascript
let jsonStr = '{"name":"小美","age":20}';

// JSON → 物件
let obj = JSON.parse(jsonStr);
console.log(obj.name);

// 物件 → JSON
let newJson = JSON.stringify(obj);
console.log(newJson);
```

### 執行結果

```
小美
{"name":"小美","age":20}
```

---

## 8️⃣ 陣列篩選

### 程式碼

```javascript
let numbers = [3, 12, 5, 20, 8];
let result = [];

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > 10) {
        result.push(numbers[i]);
    }
}

console.log(result);
```

### 執行結果

```
[12, 20]
```

---

## 9️⃣ 平均分數

### 程式碼

```javascript
function average(scores) {
    let sum = 0;

    for (let i = 0; i < scores.length; i++) {
        sum += scores[i];
    }

    return sum / scores.length;
}

console.log(average([80, 90, 70]));
```

### 執行結果

```
80
```

---

## 🔟 物件陣列（及格學生）

### 程式碼

```javascript
let students = [
    { name: "小明", score: 80 },
    { name: "小華", score: 50 },
    { name: "小美", score: 90 }
];

for (let i = 0; i < students.length; i++) {
    if (students[i].score >= 60) {
        console.log(students[i].name + " 及格");
    }
}
```

### 執行結果

```
小明 及格
小美 及格
```

---

你現在這 10 題其實已經涵蓋：

* if ✔
* for ✔
* while ✔
* function ✔
* array ✔
* object ✔
* JSON ✔

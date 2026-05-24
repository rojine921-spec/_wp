# 作業06：Callback 與陣列方法練習

## 概述
10道JavaScript進階練習題，深化對回呼函數、陣列方法和函數式編程的理解。

## 內容
- 回呼函數（Callback）
- 立即函數表達式（IIFE）
- 陣列方法（map、filter、reduce等）
- 高階函數
- 箭頭函數
- 非同步操作（setTimeout）

## 技術
- JavaScript 回呼函數
- 箭頭函數語法
- 陣列高階方法
- 閉包與作用域
- 非同步程式設計基礎

## AI使用說明
本作業未使用AI，為原創作品。

## 複製說明
- 題目為課程指定
- 解法為自主思考與實現
- 未複製他人程式碼

## 個人貢獻
- 獨立分析每道題目
- 自主掌握回呼函數概念
- 完整編寫所有程式碼
- 理解陣列方法的實際應用

## 檔案列表
- `01.js` ~ `10.js` - 各題解答

## 執行方式
```bash
node 01.js  # 執行第1題
node 02.js  # 執行第2題
```

---

# JavaScript Homework - Callback & Array Practice

---

## 習題 1

## 程式碼

```javascript
function mathTool(num1, num2, action) {
    return action(num1, num2);
}

console.log(mathTool(10, 5, function(a, b) {
    return a + b;
}));

console.log(mathTool(10, 5, function(a, b) {
    return a - b;
}));
```

## 測試結果

```
15
5
```

## 摘要

使用回呼函數實現加法與減法。

---

## 習題 2

## 程式碼

```javascript
(function() {
    let count = 100;
    console.log("Count is: " + count);
})();
```

## 測試結果

```
Count is: 100
```

## 摘要

使用 IIFE 建立區域變數，避免污染全域。

---

## 習題 3

## 程式碼

```javascript
const prices = [100, 200, 300, 400];

const result = prices.map(p => p * 0.8);

console.log(result);
```

## 測試結果

```
[80, 160, 240, 320]
```

## 摘要

使用 map 與箭頭函數進行陣列轉換。

---

## 習題 4

## 程式碼

```javascript
function cleanData(arr) {
    arr.pop();
    arr.unshift("Start");
}

let myData = [1, 2, 3];
cleanData(myData);

console.log(myData);
```

## 測試結果

```
["Start", 1, 2]
```

## 摘要

對陣列進行破壞性修改。

---

## 習題 5

## 程式碼

```javascript
function multiplier(factor) {
    return (n) => n * factor;
}

const double = multiplier(2);

console.log(double(10));
```

## 測試結果

```
20
```

## 摘要

建立回傳函數的高階函數。

---

## 習題 6

## 程式碼

```javascript
function myFilter(arr, callback) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i])) {
            result.push(arr[i]);
        }
    }

    return result;
}

let data = [1, 5, 8, 12];

let filtered = myFilter(data, n => n > 7);

console.log(filtered);
```

## 測試結果

```
[8, 12]
```

## 摘要

手動實作 filter 函數。

---

## 習題 7

## 程式碼

```javascript
const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 17 }
];

const adults = users.filter(user => user.age >= 18);

console.log(adults);
```

## 測試結果

```
[{ name: "Alice", age: 25 }]
```

## 摘要

使用 filter 篩選符合條件的物件。

---

## 習題 8

## 程式碼

```javascript
let listA = [1, 2];
let listB = [3, 4];

function process(a, b) {
    a.push(99);
    b = [100];
}

process(listA, listB);

console.log(listA);
console.log(listB);
```

## 測試結果

```
[1, 2, 99]
[3, 4]
```

## 摘要

說明傳址與重新賦值的差異。

---

## 習題 9

## 程式碼

```javascript
setTimeout(() => {
    const arr = ["Task", "Completed"];
    console.log(arr.join(" "));
}, 2000);
```

## 測試結果

```
(2秒後)
Task Completed
```

## 摘要

使用 setTimeout 實現延遲執行。

---

## 習題 10

## 程式碼

```javascript
function calculateTotal(cart, discountFunc) {
    let total = cart.reduce((sum, price) => sum + price, 0);
    return discountFunc(total);
}

let cart = [100, 200, 300];

let result = calculateTotal(cart, function(total) {
    return total - 50;
});

console.log(result);
```

## 測試結果

```
550
```

## 摘要

結合 reduce 與回呼函數計算總價。
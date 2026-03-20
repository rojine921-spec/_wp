let jsonStr = '{"name":"小美","age":20}';

// JSON → 物件
let obj = JSON.parse(jsonStr);
console.log(obj.name);

// 物件 → JSON
let newJson = JSON.stringify(obj);
console.log(newJson);

PS C:\Users\user\html2server\_wp\homework\04> node 7-score.js
小美
{"name":"小美","age":20}

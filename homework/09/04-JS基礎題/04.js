let arr = [5, 8, 2, 10, 3];
let max = arr[0];

for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
        max = arr[i];
    }
}

console.log("最大值:", max);

PS C:\Users\user\html2server\_wp\homework\04> node 4-score.js
最大值: 10

let numbers = [3, 12, 5, 20, 8];
let result = [];

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > 10) {
        result.push(numbers[i]);
    }
}

console.log(result);

PS C:\Users\user\html2server\_wp\homework\04> node 8-score.js
[ 12, 20 ]

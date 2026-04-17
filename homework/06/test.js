// 1
function mathTool(num1, num2, action) {
  return action(num1, num2);
}

console.log(mathTool(10, 5, (a, b) => a + b));
console.log(mathTool(10, 5, (a, b) => a - b));

// 2
(function() {
  let count = 100;
  console.log("Count is:", count);
})();

// 3
const prices = [100, 200, 300, 400];
const discounted = prices.map(p => p * 0.8);
console.log(discounted);

// 4
function cleanData(arr) {
  arr.pop();
  arr.unshift("Start");
}
let myData = [1, 2, 3];
cleanData(myData);
console.log(myData);

// 5
function multiplier(factor) {
  return n => n * factor;
}
const double = multiplier(2);
console.log(double(10));

// 6
function myFilter(arr, callback) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}
console.log(myFilter([1, 5, 8, 12], x => x > 7));

// 7
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 17 }
];
console.log(users.filter(u => u.age >= 18));

// 8
let listA = [1, 2];
let listB = [3, 4];
function process(a, b) {
  a.push(99);
  b = [100];
}
process(listA, listB);
console.log(listA);
console.log(listB);

// 9
setTimeout(() => {
  console.log(["Task", "Completed"].join(" "));
}, 2000);

// 10
function calculateTotal(cart, discountFunc) {
  let total = cart.reduce((sum, price) => sum + price, 0);
  return discountFunc(total);
}
console.log(calculateTotal([100, 200, 300], t => t - 50));
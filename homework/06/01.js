function mathTool(num1, num2, action) {
  return action(num1, num2);
}

<<<<<<< HEAD
// 相加
console.log(mathTool(10, 5, function(a, b) {
  return a + b;
})); // 15

// 相減
console.log(mathTool(10, 5, function(a, b) {
  return a - b;
})); // 5
=======
console.log(mathTool(10, 5, function(a, b) {
  return a + b;
}));

console.log(mathTool(10, 5, function(a, b) {
  return a - b;
})); 
>>>>>>> b6da412fc18df30f0e31486870d6b9aa45081e80

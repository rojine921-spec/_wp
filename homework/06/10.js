function calculateTotal(cart, discountFunc) {
  let total = cart.reduce((sum, price) => sum + price, 0);
  return discountFunc(total);
}

let cart = [100, 200, 300];

let finalPrice = calculateTotal(cart, function(total) {
  return total - 50;
});

console.log(finalPrice); // 550
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

let result = myFilter(data, x => x > 7);

console.log(result); // [8, 12]
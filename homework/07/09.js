let arr = [
    "Very long content here",
    "Another Very long content here",
    "3rd Very long content here"
];

let result = arr.map(str => str.substring(0, 10) + "...");

console.log(result);
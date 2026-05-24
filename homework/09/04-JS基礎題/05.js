function factorial(n) {
    let result = 1;

    while (n > 0) {
        result *= n;
        n--;
    }

    return result;
}

console.log(factorial(5));

PS C:\Users\user\html2server\_wp\homework\04> node 5-score.js
120

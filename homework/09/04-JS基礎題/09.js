function average(scores) {
    let sum = 0;

    for (let i = 0; i < scores.length; i++) {
        sum += scores[i];
    }

    return sum / scores.length;
}

console.log(average([80, 90, 70]));

PS C:\Users\user\html2server\_wp\homework\04> node 9-score.js
80

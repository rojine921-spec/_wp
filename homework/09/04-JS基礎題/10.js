let students = [
    { name: "小明", score: 80 },
    { name: "小華", score: 50 },
    { name: "小美", score: 90 }
];

for (let i = 0; i < students.length; i++) {
    if (students[i].score >= 60) {
        console.log(students[i].name + " 及格");
    }
}

PS C:\Users\user\html2server\_wp\homework\04> node 10-score.js
小明 及格
小美 及格

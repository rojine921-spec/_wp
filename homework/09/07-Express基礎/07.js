function fakeGet(sql, params, callback) {
    const fakeRow = {
        id: 1,
        title: "測試文章",
        content: "這是內容"
    };

    callback(null, fakeRow);
}

// 測試
fakeGet("SELECT * FROM posts WHERE id = ?", [1], (err, row) => {
    if (err) {
        console.log("錯誤");
    } else {
        console.log("標題：", row.title);
    }
});
function fetchData(id, callback) {
    let data = {
        id: id,
        status: "success"
    };

    callback(null, data);
}

// 測試
fetchData(101, (err, data) => {
    if (err) {
        console.log("發生錯誤：" + err);
    } else {
        console.log("成功取得資料：", data);
    }
});
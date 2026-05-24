function checkAdmin(role, callback) {
    if (role !== "admin") {
        callback("Access Denied");
    } else {
        callback(null, "Welcome");
    }
}

// 測試
checkAdmin("user", (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(res);
    }
});

checkAdmin("admin", (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(res);
    }
});
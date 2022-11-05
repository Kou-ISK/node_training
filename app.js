/* 1. expressモジュールをロードし、インスタンス化してappに代入。*/
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.render('index.ejs');
});

/* 2. listen()メソッドを実行して8080番ポートで待ち受け。*/
app.listen(8080);



/* 1. expressモジュールをロードし、インスタンス化してappに代入。*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require("axios").default;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/registration', (req, res)=>{
    console.log(req.body);
    console.log(req.body.last_name);
    res.send(req.body);
});

/* 2. listen()メソッドを実行して8080番ポートで待ち受け。*/
app.listen(8080);



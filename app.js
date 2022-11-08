/* 1. expressモジュールをロードし、インスタンス化してappに代入。*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const JSON = require('JSON');

var LINE_NOTIFY_TOKEN = "文字列";
var LINE_NOTIFY_API = "https://notify-api.line.me/api/notify";


const request = require('request');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs');
});


app.post('/registration', (req, res) => {
    console.log(req.body.last_name);
    var msg = toString(req.body.last_name);
    //LINEにメッセージを送る
    //400エラーばかり返されている
    request.post(
        {
            "url": LINE_NOTIFY_API,
            "content-type": "application/x-www-form-urlencoded",
            "method": "post",
            "headers": {
                "Authorization": "Bearer " + LINE_NOTIFY_TOKEN
            },
            "payload": { "message": msg }
        }
        , function (err, body, data) {
            console.log(data);
        }
    );
    // res.send(req.body);
});

/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
app.listen(3000);



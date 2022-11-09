/* 1. expressモジュールをロードし、インスタンス化してappに代入。*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const JSON = require('JSON');

//githubで管理する都合上、TOKENは都度入力 
var LINE_NOTIFY_TOKEN = "文字列";
var LINE_NOTIFY_API = "https://notify-api.line.me/api/notify";

const request = require('request');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/send_message', (req, res) => {
    res.redirect('/');
});

app.post('/send_message', (req, res) => {
    console.log(req.body.message_text);
    req.body.sticker_packag_Id
    //LINE notifyにメッセージを送る
    var options = {
        'method': 'POST',
        'url': LINE_NOTIFY_API,
        'headers': {
            'Authorization': 'Bearer ' + LINE_NOTIFY_TOKEN
        },
        formData: {
            'stickerPackageId': req.body.sticker_package_id,
            'stickerId': req.body.sticker_id,
            'message': req.body.message_text
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
    res.send('メッセージを送信しました。');
});

/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
app.listen(3000);



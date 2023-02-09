/* 1. expressモジュールをロードし、インスタンス化してappに代入。*/
const express = require('express');
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');

//githubで管理する都合上、TOKENは都度入力
var LINE_NOTIFY_TOKEN = "";
var LINE_NOTIFY_API = "https://notify-api.line.me/api/notify";

const request = require('request');

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/line_message', (req, res) => {
    res.render('sendLine.ejs');
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
    res.send('<script>alert("メッセージ送信に成功しました。")</script>')
    res.redirect('/');
});

app.get('/users', (req, res) => {
    res.render('users.ejs');
});

app.post('/registration', (req, res) => {
    //ユーザー登録APIを叩く
    var options = {
        'method': 'post',
        'url': 'http://localhost:8080/users/add',
        "headers": { "content-type": "application/json" },
        "json": {
            'name': req.body.name,
            'email': req.body.email
        }
    };
    console.log(req.body.name + req.body.email);
    request(options, function (error, response) {
        if (error) throw new Error(error);
    });
    res.send('<script>alert("ユーザー登録に成功しました。")</script>');
    res.redirect('/');
});

app.get('/find_all', (req, res) => {
    //ユーザー取得APIを叩く
    var options = {
        'method': 'get',
        'url': 'http://localhost:8080/user',
        "headers": { "content-type": "application/json" },
    };
    request(options, function (error, response) {
        console.log(response.body);
        var data = JSON.parse(response.body);
        if (data == null) {
            res.redirect('/postal_code');
            // res.send('<script>alert("その郵便番号は存在しません")</script>');
        } else {
            console.log(data);
            res.render('user_list.ejs', { items: data });
        }
    });
});

app.get('/registration', (req, res) => {
    res.redirect('/');
});

app.get('/find_user', (req, res) => {
    var options = {
        'method': 'get',
        'url': 'http://localhost:8080/user/' + req.query.id,
        "headers": { "content-type": "application/json" },
    };
    request(options, function (error, response) {
        console.log(req.query.id);
        var data = JSON.parse(response.body);
        if (data == null) {
        } else {
            console.log(data);
            res.render('user_list.ejs', { item: data });
        }
    });
});


/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
app.listen(3000);

app.get('/postal_code', (req, res) => {
    res.render('postal_code.ejs')
})

// アラートからリダイレクト時にどうするか？
app.post('/postal_code_result', (req, res) => {
    var options = {
        'method': 'get',
        'url': 'https://zipcloud.ibsnet.co.jp/api/search?zipcode=' + req.body.postal_code,
        "headers": { "content-type": "application/json" },
    }
    request(options, function (error, response) {
        var data = JSON.parse(response.body);
        if (data.results == null) {
            res.redirect('/postal_code');
            // res.send('<script>alert("その郵便番号は存在しません")</script>');
        } else {
            console.log(data);
            console.log(data.results[0].address1);
            res.render('postal_code_result.ejs', { item: data.results[0] });
        }
    });
});

app.get('/postal_code_result', (req, res) => {
    res.redirect('/postal_code');
});

app.get('/scrum', (req, res) => {
    res.render('scrum.ejs');
})
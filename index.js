'use strict';
console.log('hello, world!');
console.log('hello hello hello');

var http = require('http');
var server = http.createServer();
server.on('request', doRequest);
server.listen(8080);
console.log('Server running!');
var fs = require('fs');

// リクエストの処理
function doRequest(req, res) {
    fs.readFile('./index.html','UTF-8',function(err ,data){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
});
}
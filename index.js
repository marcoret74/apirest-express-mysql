var http = require('http');
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var app = express();

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'passw0rd',
    database: 'test'
});

conn.connect(function (err) {
    if (err) throw err;
    console.log('You are now connected with mysql database...');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var server = app.listen(3000, "127.0.0.1", function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});

app.get('/customer', function (req, res) {
    conn.query('select * from customer', function (err, results, fields) {
        if (err) throw err;
        res.end(JSON.stringify(results));
    });
});

app.get('/customer/:id', function (req, res) {
    conn.query('select * from customer where id = ?', [req.params.id], function (err, results, fields) {
        if (err) throw err;
        res.end(JSON.stringify(results));
    });
});

app.post('/customer', function (req, res) {
    var params = req.body;
    console.log(params);
    conn.query('INSERT INTO customer SET ?', params, function (err, results, fields) {
        if (err) throw err;
        res.end(JSON.stringify(results));
    });
});

app.put('/customer', function (req, res) {
    conn.query('UPDATE customer SET name=?, address=?, country=?, phone=?, updated_on=now() where  id = ?', [req.body.name, req.body.address, req.body.country, req.body.phone, req.body.id], function (err, results, fields) {
        if (err) throw err;
        res.end(JSON.stringify(results));
    });
});
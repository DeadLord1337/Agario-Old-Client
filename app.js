var express = require('express');
var app = express();
var http = require('request');
var bodyParser = require('body-parser')

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/info', function (req, res) {
  http('http://m.agar.io/info', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body)
    }
  })
});

app.post('/', function (req, res) {
  http.post({
    url: 'http://m.agar.io/',
    form: req.body
  }, function (err, response, body) {
    console.log(body);
    res.send(body);
  });
});

var server = app.listen(3000, function () {

});
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.set('views', './views');
app.set('view engine', 'pug');

if (app.get('env') === 'development') {
	app.locals.pretty = true;
}

if (app.get('env') === 'development') {
	app.locals.pretty = true;
}

var conn = mysql.createConnection({
	host: "aacy9rmotsalwh.c30xg8pih1rj.us-east-2.rds.amazonaws.com",
	user: "root",
	password: "19940106",
	database: 'game_data'
});

conn.connect(function(err) {
	if (err) throw err;
	console.log('DB Connected!');
});

app.get('/', function(req, res){
	res.render('index');
});

server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`);
});
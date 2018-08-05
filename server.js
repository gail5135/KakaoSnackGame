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

app.post('/data/:method', function(req, res){
	// var user = req.body.user;
	// var sql = 'SELECT user, score FROM ranking ORDER BY score DESC LIMIT 3';
	var method = req.params.method;
	if(method === 'add'){
		var score = req.body.score;
		var sql = `INSERT INTO cat_ranking (user, score, cat) VALUES ('TEST', ?, 0)`;
		conn.query(sql, [score], function(err, result, fields){
			if(err){
				console.log(err);
			} else {
				console.log('Inserted score:', score);
			}
		});
	}
	var sql = `SELECT MAX(score) FROM cat_ranking`;
	conn.query(sql, function(err, results, fields){
		if(err){
			console.log(err);
		} else {
			var o = JSON.parse(JSON.stringify(results))[0];
			var bestScore = o["MAX(score)"];
			res.type('json');
			res.json({ bestScore: bestScore });
		}
	});
});

server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`);
});

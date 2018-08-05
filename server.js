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

// CONNECT DB
var conn = mysql.createConnection({
	// host: "aacy9rmotsalwh.c30xg8pih1rj.us-east-2.rds.amazonaws.com",
	host: "localhost",
	user: "root",
	// password: "19940106"
	password: "bb0502",
	database: 'game_data'
});
conn.connect(function(err) {
	if (err) throw err;
	console.log('DB Connected!');
});



// Render index page
app.get('/', function(req, res){
	res.render('index');
});

// POST 'user' and link to game page
app.post('/', function(req, res){
	var user = req.body.user;
	console.log(user);
	var sql = `SELECT * FROM user_info WHERE user=?`;
	conn.query(sql, [ user ], function(err, results, fields){
		if(err) throw err;

		var user_info;
		// results = [] if there is no matching record.
		if(results.length === 0){
			sql = `INSERT INTO user_info (user, best_score) VALUES (?, 0)`;
			conn.query(sql, [ user ], function(err, new_user, fields){
				sql = `SELECT * FROM user_info WHERE id=?`;
				conn.query(sql, [ new_user.insertId ], function(err, record, fields){
					// res.send(record[0]);
					user_info = record[0];
					res.render('game', { user_info: user_info });
				});
			});
		} else {
			user_info = results[0];
			res.render('game', { user_info: user_info });
		}
	});
});

// TEST GET
app.get('/debug', function(req, res){
	var sql = `SELECT * FROM user_info WHERE user=?`;
	conn.query(sql, [ 'onnoo' ], function(err, results, fields){
		res.render('game', { user_info: results[0] });
	});
});


app.post('/data/:method', function(req, res){
	// var user = req.body.user;
	// var sql = 'SELECT user, score FROM ranking ORDER BY score DESC LIMIT 3';
	var method = req.params.method;
	if(method === 'add'){
		var score = req.body.score;
		var sql = `INSERT INTO user_info (user, score, cat) VALUES ('TEST', ?, 0)`;
		conn.query(sql, [score], function(err, result, fields){
			if(err){
				console.log(err);
			} else {
				console.log('Inserted score:', score);
			}
		});
	}
	var sql = `SELECT * FROM user_info WHERE user='user_name'`;
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


// TEST
// var sql = `SELECT * FROM user_info`;
// conn.query(sql, function(err, results, fields){
// 	if(err) throw err;
// 	console.log(results);
// });




server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`);
});

var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.set('view engine', 'pug');

if (app.get('env') === 'development') {
	app.locals.pretty = true;
}

// CONNECT DB
var conn = mysql.createConnection({
	host: "localhost",
	user: "",
	password: "",
	database: 'game_data'
});
conn.connect(function(err) {
	if (err) throw err;
	console.log('DB Connected!');
});

// Index Page
app.get('/', function(req, res){
	res.render('index');
});

// POST 'user' and link to game page
app.post('/', function(req, res){
	var user = req.body.user;
	var user_info;
	var ranking;
	// console.log(user);

	sql = `SELECT * FROM user_info WHERE user=?`;
	conn.query(sql, [ user ], function(err, results, fields){
		if(err) throw err;
		if(results.length === 0){
			sql = `INSERT INTO user_info (user) VALUES (?)`;
			conn.query(sql, [ user ], function(err, new_user, fields){
				sql = `SELECT * FROM user_info WHERE id=?`;
				conn.query(sql, [ new_user.insertId ], function(err, record, fields){
					user_info = record[0];
					sql = `SELECT bestScore, bestCat FROM user_info ORDER BY bestScore DESC LIMIT 4`;
					conn.query(sql, function(err, results, fields){
						var ranking = results;
						var num = 4 - ranking.length;
						if(ranking.length < 4)
							for(var i=0; i < num; i++)
								ranking.push({"bestScore":0,"bestCat":0});
						res.render('game', { user_info: user_info, ranking: ranking });
					});
				});
			});
		} else {
			user_info = results[0];
			sql = `SELECT bestScore, bestCat FROM user_info ORDER BY bestScore DESC LIMIT 4`;
			conn.query(sql, function(err, results, fields){
				var ranking = results;
				var num = 4 - ranking.length;		// 1
				if(ranking.length < 4){
					for(var i=0; i < num; i++){
						ranking.push({"bestScore":0,"bestCat":0});
					}
				}
				res.render('game', { user_info: user_info, ranking: ranking });
			});
		}
	});	
});

// Post '/user_info'
app.post('/user_info', function(req, res){
	var json = req.body;
	console.log(json);
	var sql =	`UPDATE user_info SET
					bestScore = IF (? > bestScore, ?, bestScore),
					bestCat = ?,
					lock_1 = IF (? > lock_1, 1, lock_1),
					lock_2 = IF (? > lock_2, 1, lock_2),
					lock_3 = IF (? > lock_3, 1, lock_3)
					WHERE id=?`;
	conn.query(sql, [json.bestScore, json.bestScore, json.bestCat,json.lock_1, json.lock_2, json.lock_3, json.id], function(err, result, fields){
		if(err){
			console.log(err);
		} else {
			// console.log('UPDATED', json.user);
		}
	});
});

server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`);
});
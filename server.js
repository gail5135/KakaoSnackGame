var express = require('express');
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

app.get('/', function(req, res){
	res.render('game');
})


server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`);
});
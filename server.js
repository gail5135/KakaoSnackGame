var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

if (app.get('env') === 'development') {
	app.locals.pretty = true;
}

app.get('/', function(req, res){
	res.send('Hello');
})


server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`);
});
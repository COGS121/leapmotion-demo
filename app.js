var express = require('express'),
    http = require('http'),
    path = require('path'),
    handlebars = require('express-handlebars'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    leap = require('leapjs');

var app = express();

app.engine('html', handlebars());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/charts', function(req, res){
    res.render('chart');
});

app.set('port', process.env.PORT || 3000);
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

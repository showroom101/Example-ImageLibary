var express 		= require('express');
var compress 		= require('compression');
var expressLayouts 	= require('express-ejs-layouts');
var path 			= require('path');
var favicon 		= require('static-favicon');
var morgan 			= require('morgan');
var livereload 		= require('connect-livereload');
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');
var session 		= require('express-session');
var cors    		= require('cors');
var multer  		= require('multer');

var routes 			= require('./routes/index');
var instagram  		= require('./routes/instagram');

var fs 		= require('fs');
var debug 	= require('debug')('Blank_GULP_Mean');

var app = express();

// Create Log Folder if not exist
var dir = './logs';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(compress());
app.use(expressLayouts);
app.use(favicon());

//app.use(morgan('combined'));
//app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(livereload({port: 35729}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.resolve('./node_modules')));
app.use(session({
    secret: 'myLoyppuj9yo',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 3600000}
}));
app.use(multer({dest:'/temp'}).any());
app.use(cors());

app.use('/', routes);
app.use('/instagram',instagram);

//star program
app.set('port', process.env.PORT || 3000);


var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});

module.exports = app;

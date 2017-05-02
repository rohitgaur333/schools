
// set up ======================================================================
// get all the tools we need

var express = require('express');
var exphbs  = require('express-handlebars');

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


var configDB = require('./config/database.js');
// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration



// set up our express application
var app = express();
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser()); // get information from html forms

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// required for passport
app.use(session({ 
	secret: 'fdelwknckedknmvkfdjn',
	resave: true,
    saveUninitialized: true
	})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./route.js')(app, passport); // load our routes and pass in our app and fully configured passport


var index = require('./routes/index');


//define app engine to be handlebars with extention as .hbs and main layout file to main.hbs
app.engine('.hbs', exphbs({extname: '.hbs',defaultLayout: 'main'}));
app.set('view engine', '.hbs');



app.use('/user', index);

app.get('/', function (req, res) {
    res.render('home');
});

app.listen(3000);
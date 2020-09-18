var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');


// Importing routers
var indexRouter = require('./routes/main.routes');
var CustomerRouter = require('./routes/customer.routes');
var AdminRouter = require('./routes/Admin.routes');

var app = express();

//Setting up sessions
app.use(session(
  {
    secret: 'random message', //this is needed for making a session key
    saveUninitialized: false, //for login sessions set it to false, setting to true means store blank sessions
    resave: false,
    cookie: {
      expires: 600000 //or use maxAge ( takes in milliseconds value)
    }
  }
)
);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.resolve('./public'))); //<--Added for accessing images in public folder

// Setting up routers
app.use('/', indexRouter);
app.use('/users', CustomerRouter);
app.use('/admin', AdminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});




// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

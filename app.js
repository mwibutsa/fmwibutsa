var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var newPostRouter = require('./routes/new-post');
var fileUpload = require('express-fileupload');
var authenticate = require('./middleware/redirect-if-logged-in');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/mwibutsa",{ useNewUrlParser: true });
var session = require('express-session');
var skipLogin = require('./middleware/redirect-if-logged-in');
var auth = require('./routes/account/auth');


var app = express();

app.use(session({
  store: new MongoStore({ mongooseConnection: mongoose.connection,autoRemove: 'interval',
  autoRemoveInterval: 1 }),
  resave:false,
  saveUninitialized:false,
  secret:"_@!((^"
}));

// IMPORTING ROUTES
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var loginRouter = require('./routes/account/login');
var signUpRouter = require('./routes/account/sign-up');
var contactRouter =  require('./routes/contact');
var aboutRouter = require('./routes/about');
var loginStatus = require('./middleware/login-status');
var logoutRouter = require('./routes/account/logout');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/popper.js/dist')));
app.use('/account/logout',logoutRouter);

app.use('/',loginStatus,indexRouter);
app.use('/users',loginStatus, usersRouter);
app.use('/new-post',loginStatus,auth,newPostRouter);
app.use('/posts',loginStatus,postsRouter);
app.use('/account/login',loginStatus,skipLogin,loginRouter);
app.use('/account/new-account',loginStatus,signUpRouter);
app.use('/contact-us',loginStatus,contactRouter);
app.use('/about-us',loginStatus,aboutRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

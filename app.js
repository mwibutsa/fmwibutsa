var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var newPostRouter = require('./routes/new-post');
var expressSession = require('express-session');
var fileUpload = require('express-fileupload');
var authenticate = require('./middleware/authenticate');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var loginRouter = require('./routes/account/login');
var signUpRouter = require('./routes/account/sign-up');
var contactRouter =  require('./routes/contact');
var aboutRouter = require('./routes/about');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret:"_@1!9(9)6^%"
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/popper.js/dist')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/new-post',authenticate,newPostRouter);
app.use('/posts',postsRouter);
app.use('/account/login',loginRouter);
app.use('/account/new-account',signUpRouter);
app.use('/contact-us',contactRouter);
app.use('/about-us',aboutRouter);
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
var port = process.env.PORT || '3000';
app.listen(port,()=>{
	console.log(`Server started on port ${port}`);
})
module.exports = app;

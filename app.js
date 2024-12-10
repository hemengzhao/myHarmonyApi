var express = require('express'); var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fileRouter = require('./routes/file');
var adminArticlesRouter = require('./routes/admin/articles');
var harmonyHomeRouter = require('./routes/harmony/home');
var harmonyActivityTypeRouter = require('./routes/harmony/activityType');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/file', fileRouter); 
app.use('/users', usersRouter);
app.use('/admin/article', adminArticlesRouter);
app.use('/harmony/home', harmonyHomeRouter);
app.use('/harmony/activityType', harmonyActivityTypeRouter);
module.exports = app;

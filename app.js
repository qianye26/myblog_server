var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const verifyMiddleware = require('./routes/middleware/verify')

var indexRouter = require('./routes/index');
var cateRouter = require('./routes/cate')
var articleRouter = require('./routes/article')
var infoRouter = require('./routes/info')
var adminRouter = require('./routes/admin')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// 给以下路由添加Token验证中间件
app.use('/cate', verifyMiddleware.verifyToken, cateRouter);
app.use('/article', verifyMiddleware.verifyToken, articleRouter);
app.use('/info', verifyMiddleware.verifyToken, infoRouter);
app.use('/admin', verifyMiddleware.verifyToken, adminRouter);


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
  res.send('500错误')
});

module.exports = app;

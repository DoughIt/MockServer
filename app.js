const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const estateRouter = require('./routes/estate');
// const adRouter = require('./routes/ad');
// app.use('/', indexRouter); // 将路径为 / 开头的请求交给 indexRouter 路由中间件处理
// app.use('/api/user', usersRouter); // 将路径为 /api/user 开头的请求交给 userRounter 路由中间件处理
// app.use('/api/estate', estateRouter); // 将路径为 /api/estate 开头的请求交给 estateRouter 路由中间件处理
// app.use('/api/ad', adRouter); // 将路径为 /api/ad 开头的请求交给 adRouter 路由中间件处理
const indexRouter = require('./lesson_bbs_mall/index')
const userRouter = require('./lesson_bbs_mall/user')
const lessonRouter = require('./lesson_bbs_mall/lesson')
const messageRouter = require('./lesson_bbs_mall/message')
const commodityRouter = require('./lesson_bbs_mall/commodity')
const sinanRouter = require('./sinan/index')
app.use('/', indexRouter)
app.use('/api/ums', userRouter)     // 项目管理路由
app.use('/api/lms', lessonRouter)   // 项目管理路由
app.use('/api/mms', messageRouter)   // 项目管理路由
app.use('/api/cms', commodityRouter)   // 项目管理路由
app.use('/api/sms', sinanRouter)  // 人机交互路由


app.use(express.static('public'));

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
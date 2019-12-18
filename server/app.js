var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var tokenUtil = require('./utils/token.js');
var sys_config = require('./config.js');

var usersRouter = require('./routes/users');
var publishRouter = require('./routes/publish')
var postRouter = require('./routes/post')

var app = express();


mongoose.connect('mongodb://127.0.0.1:27017/wecircle', { useNewUrlParser: true, useCreateIndex: true })
    .then(function () {
        console.log('数据库wecircle连接成功');
    })
    .catch(function (error) {
        console.log('数据库wecircle连接失败：' + error);
    });


app.use(sys_config.PICTURE_SERVER_PATH, express.static(__dirname + '/uploads'))
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Headers','author,content-type') ,//可根据浏览器的F12查看,把对应的粘贴在这里就行
    // res.header('Access-Control-Allow-Methods', '*');
    // res.header('Content-Type', 'application/json;charset=utf-8');
    var token = req.headers.author || '';
    var userMsg = tokenUtil.checkToken(token);
    if (userMsg) {
        req.user = userMsg;
        tokenUtil.setToken({ userName: userMsg.userName, userId: userMsg.userId }, res)
        next();
    } else {
        if (sys_config.TOKEN_API.join(',').indexOf(req.path) != -1) {
            next();
            return;
        }
        res.send({
            code: "-1",
            message: "登录过期，请登录"
        })
    }
})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/publish', publishRouter);
app.use('/post',postRouter);

module.exports = app;

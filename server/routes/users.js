var express = require('express');
var { SendSms, querySend } = require('../utils/sms.js');
var tokenUtil = require('../utils/token.js');
var User = require('../models/User')

var router = express.Router();
router.post('/phoneCode', function (req, res, next) {
  SendSms(req.body.phone, function () {
    res.send({
      code: 1,
      data: {},
      message: "请求成功"
    });
  }, function (err) {
    res.send(JSON.stringify(err));
  })
});
router.post('/signIn', function (req, res, next) {
  querySend({
    phoneNumber: req.body.name,
    date: getFormatedDate()
  }, async function (result) {
    let lastMsg = result.SmsSendDetailDTOs.SmsSendDetailDTO[0];
    if (lastMsg && (new Date() - new Date(lastMsg.ReceiveDate) < 6 * 24 * 60 * 60 * 1000)) {
      var _flag = lastMsg.Content.search(req.body.code);
      if (_flag != -1) {


        //查询用户
        var __user = await checkUser(req.body.name);
        // 用户不存在则创建用户
        if (!__user) {
          __user = await createUser(req.body.name);
        }

        // 创建token
        tokenUtil.setToken({
          userName: req.body.name,
          userId: __user._id
        }, res)

        res.send({
          code: 1,
          data: __user,
          message: "登录成功"
        });
      } else {
        res.send({
          code: 0,
          data: {},
          message: "验证码错误，请重新输入"
        });
      }
    } else {
      res.send({
        code: 0,
        data: {},
        message: "验证码已过期，请重新获取"
      });
    }
  }, function (err) {
    res.send({
      code: 0,
      data: err,
      message: "请求失败"
    })
  })
})

// 日期格式化: yyyymmdd
function getFormatedDate() {
  var _date = new Date();
  var _y = _date.getFullYear(),
    _m = _date.getMonth() + 1,
    _d = _date.getDate();
  if ((_m + '').length == 1) {
    _m = '0' + _m;
  }
  return '' + _y + _m + _d;
}

// 查询用户
function checkUser(phoneNumber) {
  // var user;
  return User.findOne({ phoneNum: phoneNumber }, function (error, res) { })
}

// 创建用户
function createUser(phoneNumber) {
  var nickname = '用户' + Date.now();
  // var avatar = config.uploadPath+'avatar/avatar'+Math.ceil(Math.random() * 9 )+'.jpg';
  // var bg = config.uploadPath+'bg/topbg'+Math.ceil(Math.random() * 4 )+'.jpg';
  var gender = '1';

  return User.create({
    nickname: nickname,
    gender: gender,
    phoneNum: phoneNumber
  })
}

module.exports = router;

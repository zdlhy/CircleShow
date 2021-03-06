var express = require('express');
var { SendSms, querySend } = require('../utils/sms.js');
var tokenUtil = require('../utils/token.js');
var User = require('../models/User')
var upFile = require('../utils/upFile')
var sys_config = require('../config')

var router = express.Router();

// 获取验证码
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

// 登录
router.post('/signIn', async function (req, res, next) {
  //查询用户
  var __user = await checkUser(req.body.name);
  // 用户不存在则创建用户
  if (!__user) {
    __user = await createUser(req.body.name);
  }

  var _url = sys_config.PICTURE_SERVER_HOST + ':' + sys_config.PICTURE_SERVER_PORT + sys_config.PICTURE_SERVER_PATH;
  __user.avatar = _url + __user.avatar;
  __user.bgUrl = _url + __user.bgUrl;


  // 创建token
  tokenUtil.setToken(__user, res)

  res.send({
    code: 1,
    data: __user,
    message: "登录成功"
  });


  /* querySend({
    phoneNumber: req.body.name,
    date: '20191106',
    // date: getFormatedDate()
  }, async function (result) {
    let lastMsg = result.SmsSendDetailDTOs.SmsSendDetailDTO[0];
    if (lastMsg && (new Date() - new Date(lastMsg.ReceiveDate) < 360 * 24 * 60 * 60 * 1000)) {
      var _flag = lastMsg.Content.search(req.body.code);
      if (_flag != -1) {


        //查询用户
        var __user = await checkUser(req.body.name);
        // 用户不存在则创建用户
        if (!__user) {
          __user = await createUser(req.body.name);
        }

        var _url = sys_config.PICTURE_SERVER_HOST + ':' + sys_config.PICTURE_SERVER_PORT + sys_config.PICTURE_SERVER_PATH;
        __user.avatar = _url + __user.avatar;
        __user.bgUrl = _url + __user.bgUrl;


        // 创建token
        tokenUtil.setToken(__user, res)

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
  }) */
})

// 更改用户背景图片
router.post('/uploadImg', upFile.single('bgImg'), function (req, res, next) {
  var bgUrl = sys_config.PICTURE_SERVER_HOST + sys_config.PICTURE_SERVER_PATH + "/" + req.file.filename;
  User.update({
    _id: req.body.id
  }, {
    bgUrl: bgUrl
  }, function (error) {
    if (error) {
      res.send({
        code: 0,
        data: error,
        message: "更新失败"
      })
    } else {
      res.send({
        code: 1,
        data: {
          bgUrl: bgUrl
        },
        message: "请求成功"
      })
    }
  })
});

// 日期格式化: yyyymmdd
function getFormatedDate() {
  var _date = new Date();
  var _y = _date.getFullYear(),
    _m = _date.getMonth() + 1,
    _d = _date.getDate();
  if ((_m + '').length == 1) {
    _m = '0' + _m;
  }
  if ((_d + '').length == 1) {
    _d = '0' + _d;
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
  var avatar = 'avatar.png';
  var bg = 'default-bg.png';
  var gender = '1';

  return User.create({
    nickname: nickname,
    gender: gender,
    phoneNum: phoneNumber,
    avatar: avatar,
    bgUrl: bg
  })
}

module.exports = router;

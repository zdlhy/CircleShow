var express = require('express');

var sys_config = require('../config');
var Post = require('../models/Post');
var upload = require('../utils/upFile');

var router = express.Router();

// 文件上传
router.post('/upFile', upload.single('picture'), function (req, res, next) {
    res.json({
        code: '1',
        data: {
            url: sys_config.PICTURE_SERVER_HOST + sys_config.PICTURE_SERVER_PATH + "/" + req.file.filename
        },
        message: "上传成功"
    })
})

//此刻想法
router.post('/postText', function (req, res, next) {
    Post.create({
        content:req.body.text,
        pictureList:req.body.picture,
        user:req.user._id
    },function(error,data){
        if(error){
            res.json({
                code: '0',
                data: error,
                message: "保存失败"
            })
        }
        res.json({
            code: '1',
            data: data,
            message: "保存成功"
        })
    })
})

module.exports = router;
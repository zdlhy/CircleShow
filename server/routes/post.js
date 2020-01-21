var express = require('express');

var Post = require('../models/Post');

var router = express.Router();

// 消息列表
router.get('/getList', function (req, res, next) {
    var _skip = (req.query.page - 1) * req.query.pageSize;
    var _limit = parseInt(req.query.pageSize);

    const doc_count = new Promise(function (resolve, reject) {
        Post.find({
            // 'user': req.user._id
        }).countDocuments(function (error, data) {
            if (error) {
                reject(error)
            }
            resolve(data)
        })
    })
    const data_list = new Promise(function (resolve, reject) {
        Post.find({
            // 'user': req.user._id
        }).
            skip(_skip).//需要跳过的条数
            limit(_limit).//查询条数
            populate('user').
            sort({ create: -1 }).//时间倒叙排序
            exec(function (error, data) {//执行查询
                if (error) {
                    reject(error)
                }
                resolve(data)
            })
    })

    Promise.all([doc_count, data_list]).then((args) => {
        res.json({
            code: '1',
            data: {
                count: args[0],
                list: args[1]
            },
            message: "查询成功"
        })
    }).catch(function (error) {
        res.json({
            code: '0',
            data: error,
            message: "查询失败"
        })
    })

})

module.exports = router;
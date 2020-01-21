var express = require('express');
var sys_config = require('../config')

var Chat = require('../models/Chat');
var Message = require('../models/Message');

var socket = require('../utils/socket')

var router = express.Router();

// 获取聊天信息
router.get('/getMsg', async function (req, res, next) {

    //分页pageSize
    var pageSize = parseInt(req.query.pageSize);
    //分页pageSizepageStart
    var pageStart = (req.query.page - 1) * req.query.pageSize;

    var myId = req.user._id;
    var toUserId = req.query.toUser


    // 获取聊天ID
    try {
        var _result = await Chat.find({
            $or: [
                { $and: [{ 'fromUser': myId }, { 'toUser': toUserId }] },
                { $and: [{ 'fromUser': toUserId }, { 'toUser': myId }] }
            ]
        }).sort({ 'create': 1 }).exec();
        var chatId = _result[0] && _result[0]._id
    } catch (e) {
        res.json({
            code: '0',
            data: e,
            messages: '获取聊天ID失败'
        })
        return;
    }

    // 新聊天，创建聊天ID
    if (!chatId) {
        var messages = [];
        try {
            var _result = await Chat.create({
                fromUser: myId,
                toUser: toUserId,
                isDel: false
            });
            chatId = _result._id;
        } catch (e) {
            res.json({
                code: '0',
                data: e,
                messages: '创建聊天失败'
            })
            return;
        }
    } else {
        var messages = await Message.find({
            $or: [
                { $and: [{ 'fromUser': myId }, { 'toUser': toUserId }] },
                { $and: [{ 'toUser': myId }, { 'fromUser': toUserId }] }
            ]
        }).populate('toUser')
            .populate('fromUser')

        var _url = sys_config.PICTURE_SERVER_HOST + ':' + sys_config.PICTURE_PORT + sys_config.PICTURE_SERVER_PATH;
        messages = JSON.parse(JSON.stringify(messages))
        messages.map(function (item) {
            item.fromUser.avatar = _url + item.fromUser.avatar;
            item.fromUser.bgUrl = _url + item.fromUser.bgUrl;
            item.toUser.avatar = _url + item.toUser.avatar;
            item.toUser.bgUrl = _url + item.toUser.bgUrl;
        })
    }

    res.json({
        code: '1',
        data: {
            chatId: chatId,
            list: messages
        },
        messages: '查询成功'
    })
})

// 发送聊天信息
router.post('/sendMsg', async function (req, res, next) {

    var fromUser = req.user._id,
        toUser = req.body.toUser,
        content = req.body.content,
        chatId = req.body.id

    // 添加聊天信息
    try {
        Message.create({
            content: content,
            fromUser: req.user._id,
            toUser: toUser._id,
            chat: chatId
        })
    } catch (e) {
        res.json({
            code: '0',
            data: e,
            messages: '发送信息失败'
        })
        return;
    }

    socket.sendMsg({
        id: chatId,
        action: 'recieveMsg',
        data: {
            content: content,
            toUser: toUser,
            fromUser: req.user
        }
    })

    res.json({
        code: '1',
        data: {},
        messages: '发送成功'
    })
})

// 获取聊天列表
router.get('/getChatList', async function (req, res, next) {

    var user = req.user;

    var chatList = await Chat.find({
        $or: [
            { 'fromUser': user._id },
            { 'toUser': user._id }
        ]
    }).sort({ 'create': 1 }).populate('toUser').populate('fromUser').exec();

    res.json({
        code: '1',
        data: chatList,
        messages: '请求成功'
    })
})

module.exports = router
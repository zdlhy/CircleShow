// 用户模型

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    nickname: { type: String, maxlength: 20 },//昵称
    avatar: String,//头像
    bgUrl: String,//背景图
    phoneNum: String,//电话号码
    desc: { type: String, maxlength: 20, default: '' },//描述
    gender: String,//性别 1男 0女
    update: { type: Date, default: Date.now },//更新时间
    create: { type: Date, default: Date.now },//创建时间
}, {
    timestamps: {
        createdAt: 'create',
        updatedAt: 'update'
    }
})

module.exports = mongoose.model('User', UserSchema);
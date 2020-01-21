// 帖子模型

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
    content: { type: String, required: true},//帖子内容
    pictureList: [String],//图片信息 数组类型，子元素只能为string
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },//发帖人
    update: { type: Date, default: Date.now },//更新时间
    create: { type: Date, default: Date.now },//创建时间
}, {
    timestamps: {
        createdAt: 'create',
        updatedAt: 'update'
    }
})

module.exports = mongoose.model('Post', PostSchema);
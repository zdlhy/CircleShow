// 喜欢模型

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LikeSchema = new mongoose.Schema({
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    create: { type: Date, default: Date.now },
    update: { type: Date, default: Date.now },
}, { timestamps: { createdAt: 'create', updatedAt: 'update' } })

module.exports = mongoose.model('Like', LikeSchema);
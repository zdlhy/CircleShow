module.exports = {
    TOKEN_SECRET: 'zdl_',//token key
    TOKEN_TIME: 60 * 60,//token过期时间s（1小时过期）
    TOKEN_API:[
        '/users/signIn',
        '/users/phoneCode',
    ],//免token验证白名单
    MONGO_HOST: 'mongodb://127.0.0.1:27017/',//mongoDB地址
    MONGO_DB: 'wecircle',//使用数据库
    PICTURE_SERVER_HOST: 'http://127.0.0.1:3000',//图片服务
    PICTURE_SERVER_PATH: '/static',//图片服务路径
}
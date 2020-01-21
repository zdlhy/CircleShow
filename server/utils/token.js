var jwt = require('jsonwebtoken');
var _opt = require('../config.js');

module.exports = {
    setToken(data, res) {
        var _data = JSON.parse(JSON.stringify(data))
        var token = jwt.sign(
            _data,
            _opt.TOKEN_SECRET,
            {
                expiresIn: _opt.TOKEN_TIME
            }
        )

        res.header('author', token);

        return token;
    },
    checkToken(token) {
        var data = null;
        try {
            var decoded = jwt.verify(token, _opt.TOKEN_SECRET);
            data = decoded
        } catch (err) {

        }
        return data
    }
}

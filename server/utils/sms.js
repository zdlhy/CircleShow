const Core = require('@alicloud/pop-core');

var client = new Core({
    accessKeyId: 'LTAI4FbirzxEXr9FRhxCMmB2',
    accessKeySecret: 'sefws6kNdlmsZ8IR69EPY8z1Oqn0VA',
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25'
});

function SendSms(phoneNumber,callback,error) {
    const s2msCode = Math.random().toString().slice(-4);
    var params = {
        "RegionId": "default",
        "PhoneNumbers": phoneNumber,
        "SignName": "Circle",
        "TemplateCode": "SMS_173766645",
        "TemplateParam": `{"code":${s2msCode}}`
    }
    var requestOption = {
        method: 'POST'
    }
    client.request('SendSms', params, requestOption).then((result) => {
        callback?callback(result):"";
    }, (ex) => {
        error?error(ex):'';
    })
}

/**
 * 
 * @param {Object} data 
 * @param {String} data.phoneNumber//电话号码
 * @param {String} data.date//查询日期 yyyymmdd
 * @param {String} data.PageSize//查询条数
 * @param {function} callback 
 * @param {function} error 
 */
function querySend(data,callback,error){
    var params = {
        "RegionId": "default",
        "PhoneNumber": data.phoneNumber,
        "SendDate": data.date,
        "PageSize": data.PageSize||50,
        "CurrentPage": data.PageNo||1
      }
      
      var requestOption = {
        method: 'POST'
      };
      
      client.request('QuerySendDetails', params, requestOption).then((result) => {
        callback?callback(result):"";
      }, (ex) => {
        error?error(ex):"";
      })      
}

module.exports = {SendSms,querySend}
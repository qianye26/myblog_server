const jwt = require('jsonwebtoken')
// 设定一个秘钥，用来加密和解密Token
const tokenKey = 'UT9zo#W7!@50ETnk'

const Token = {
  /**
   * 加密方法
   * @param {需要加密在Token中的数据} data 
   * @param {Token的过期时间，单位s}} time 
   */
  encrypt: function (data, time) {
    return jwt.sign(data, tokenKey, { expiresIn: time })
  },
  /**
   * 解密方法
   * @param {加密后的Token} token 
   */
  decrypt: function (token) {
    try {
      let data = jwt.verify(token, tokenKey);
      return {
        token: true,
        data: data
      }
    } catch (e) {
      return {
        token: false,
        data: e
      }
    }
  }
}

module.exports = Token
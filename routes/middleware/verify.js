const Token = require('../../controllers/token')
const Constant = require('../../constant/constant')
const exportObj = {
  verifyToken
}
module.exports = exportObj

// 验证Token中间件
function verifyToken (req, res, next) {
  if (req.path === '/login') return next()
  let token = req.headers.token;
  let tokenVerifyObj = Token.decrypt(token)
  if (tokenVerifyObj.token) {
    next()   //如果token验证通过则继续下一步
  } else {
    res.json(Constant.TOKEN_ERROR)
  }
}
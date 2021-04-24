const async = require('async')
const Constant = require('../constant/constant')

const exportObj = {
  clone,
  checkParams,
  autoFn
}
module.exports = exportObj

// 克隆方法， 克隆一个对象
function clone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

// 校验参数全局方法
function checkParams (params, checkArr) {
  let flag = true
  checkArr.forEach(v => {
    if (!params[v]) {
      flag = false
    }
  })
  return flag
}

function autoFn (tasks, res, resObj) {
  async.auto(tasks, function (err) {
    if (!!err) {
      console.log(JSON.stringify(err));
      res.json({
        code: err.code || Constant.DEFAULT_ERROR.code,
        msg: err.msg || JSON.stringify(err)
      })
    } else {
      res.json(resObj)
    }
  })
}
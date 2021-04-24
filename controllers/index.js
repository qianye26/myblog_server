const Common = require('./common')
const AdminModel = require('../models/admin')
const Constant = require('../constant/constant')
const dateFormat = require('dateformat')
const Token = require('./token')
// 设定默认Token的过期时间 ，单位为s
const TOKEN_EXPIRE_SENCOND = 3600;

let exportObj = {
  login
}
module.exports = exportObj

function login (req, res) {
  // 校验参数完整性
  const check = Common.checkParams(req.body, ['username', 'password'])
  if (!check) {
    res.json(Constant.LACK)
  }
  let resObj = {}
  AdminModel
    .findOne({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    })
    .then(function (result) {
      if (result) {
        // 如果查到结果，组装数据
        resObj.data = {
          id: result.id,
          username: result.username,
          name: result.name,
          role: result.role,
          lastLoginAt: dateFormat(result.lastLoginAt, 'yyyy-mm-dd HH:MM:ss'),
          createAt: dateFormat(result.createAt, 'yyyy-mm-dd HH:MM:ss')
        }
        // 生成token
        const adminInfo = {
          id: result.id
        }
        let token = Token.encrypt(adminInfo, TOKEN_EXPIRE_SENCOND)
        resObj.data.token = token
        resObj.msg = "登录成功"
        res.json(resObj)
        // 写入上次登录日期lastLoginAt
        AdminModel
          .update({
            lastLoginAt: new Date()
          }, {
            where: {
              id: result.id
            }
          })
          .then(function (result) {
            if (result) {
              console.log('更新lastLoginAt成功');
            } else {
              console.log('更新lastLoginAt失败');
            }
          })
          .catch(function (err) {
            console.log(err);
            res.json(Constant.DEFAULT_ERROR)
          })
      } else {
        // 如果没查询到结果，返回错误信息
        res.json(Constant.TOKEN_ERROR)
      }
    })
    .catch(function (err) {
      console.log(err);
      res.json(Constant.DEFAULT_ERROR)
    })

}



// function login (req, res) {
//   // 定义一个返回对象
//   const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
//   let tasks = {
//     // 校验参数方法
//     checkParams: (cb) => {
//       Common.checkParams(req.body, ['username', 'password'], cb)
//     },
//     // 查询方法
//     query: ['checkParams', (results, cb) => {
//       AdminModel
//       findOne: ({
//         where: {
//           username: req.body.username,
//           password: req.body.password
//         }
//       })
//         .then(function (result) {
//           if (result) {
//             resObj.data = {
//               id: result.id,
//               username: result.username,
//               name: result.name,
//               role: result.role,
//               lastLoginAt: dateFormat(result.lastLoginAt, 'yyyy-mm-dd HH:MM:ss'),
//               createdAt: dateFormat(result.createdAt, 'yyyy-mm-dd HH:MM:ss')
//             }
//             const adminInfo = {
//               id: result.id
//             }
//             // 生成Token
//             let token = Token.encrypt(adminInfo, TOKEN_EXPIRE_SENCOND)
//             resObj.data.token = token
//             cb(null, result.id)
//           } else {
//             cb(Constant.LOGIN_ERROR)
//           }
//         })
//         .catch(function (err) {
//           console.log(err);
//           cb(Constant.DEFAULT_ERROR)
//         })
//     }],
//     // 写入上次登录时间
//     writeLastLoginAt: ['query', (results, cb) => {
//       let adminId = results['query']  //获取前面传递过来的参数admin的id
//       // 通过id查询，将当前时间更新为数据库中的上次登录时间
//       AdminModel
//         .update({
//           lastLoginAt: new Date()
//         }, {
//           where: {
//             id: adminId
//           }
//         })
//         .then(function (result) {
//           if (result) {
//             cb(null)
//           } else {
//             cb(Constant.DEFAULT_ERROR)
//           }
//         })
//         .catch(function (err) {
//           console.log(err);
//           cb(Constant.DEFAULT_ERROR)
//         })
//     }]
//   }
//   Common.autoFn(tasks, res, resObj)
// }
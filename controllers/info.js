const common = require('./common')
const InfoModel = require('../models/info')
const Constant = require('../constant/constant')
const dateFormat = require('dateformat')

const exportObj = {
  info,
  update,
}
module.exports = exportObj

// 获取博客信息方法
/**
 * get请求  无参数
 */
function info (req, res) {
  let resObj = {}
  InfoModel
    .findByPk(1)
    .then(function (result) {
      if (result) {
        resObj.data = {
          id: result.id,
          title: result.title,
          subtitle: result.subtitle,
          about: result.about,
          createdAt: dateFormat(result.createdAt, 'yyyy-mm-dd HH:MM:ss')
        }
        resObj.msg = '获取博客信息成功'
        res.json(resObj)
      } else {
        resObj.msg = '获取博客信息失败'
        res.json(resObj)
      }
    })
    .catch(function (err) {
      console.log(err);
      res.json(Constant.DEFAULT_ERROR)
    })
}

// 修改博客信息方法 
/**
 * put请求  参数如下
 * title    必传    博客名称
 * subtitle 必传    副标题
 * about    必传    关于我们
 */
function update (req, res) {
  let resObj = {}
  const check = common.checkParams(req.body, ['title', 'subtitle', 'about'])
  if (!check) {
    res.json(Constant.LACK)
  } else {
    InfoModel
      .update({
        title: req.body.title,
        subtitle: req.body.subtitle,
        about: req.body.about,
        updatedAt: new Date()
      }, {
        where: {
          id: 1
        }
      })
      .then(function (result) {
        if (result[0]) {
          resObj.msg = '修改博客信息成功'
          res.json(resObj)
        } else {
          resObj.msg = '修改博客信息失败'
          res.json(resObj)
        }
      })
      .catch(function (err) {
        console.log(err);
        res.json(Constant.DEFAULT_ERROR)
      })
  }
}

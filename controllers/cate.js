const common = require('./common')
const Constant = require('../constant/constant')
const CateModel = require('../models/cate')
const dateFormat = require('dateformat')

const exportObj = {
  list,
  info,
  add,
  update,
  remove,
}

module.exports = exportObj

// 获取分类列表方法
/**
 *  get请求参数
 *  page  必传  页码
 *  rows  必传  每页条数
 *  name  非必  分类名称
 */
function list (req, res) {
  let resObj = {} //返回对象
  let searchOption //设定搜索对象
  // 验证参数完整性
  let check = common.checkParams(req.query, ['rows', 'page'])
  if (!check) {
    res.json(Constant.LACK)
  } else {
    // offset 从多少条开始查询
    let offset = req.query.rows * (req.query.page - 1) || 0
    // limit 查询多少条
    let limit = parseInt(req.query.rows)
    let whereCondition = {} //设定一个分类名查询条件
    if (req.query.name) {
      whereCondition.name = req.query.name
    }
    searchOption = {
      where: whereCondition,
      offset: offset,
      limit: limit,
      order: [['created_at', 'DESC']],
    }
    console.log(searchOption)
  }
  // 通过搜索对象searchOption 去 查询
  CateModel.findAndCountAll(searchOption)
    .then(function (result) {
      let list = []
      result.rows.forEach((v, i) => {
        let obj = {
          id: v.id,
          name: v.name,
          createdAt: dateFormat(v.createdAt, 'yyyy-mm-dd HH:MM:ss'),
        }
        list.push(obj)
      })
      resObj.data = {
        list,
        count: result.count,
      }
      resObj.msg = '获取分类列表成功'
      res.json(resObj)
    })
    .catch(function (err) {
      console.log(err)
      res.json(Constant.DEFAULT_ERROR)
    })
}

// 获取单条分类方法
/**
 * get请求参数
 * id  必传   分类id
 *
 */
function info (req, res) {
  let resObj = {}
  const check = common.checkParams(req.params, ['id'])
  if (!check) {
    res.json(Constant.LACK)
  } else {
    CateModel.findByPk(req.params.id)
      .then(function (result) {
        resObj.data = {
          id: result.id,
          name: result.name,
          createdAt: dateFormat(result.createdAt, 'yyyy-mm-dd HH:MM:ss'),
        }
        resObj.msg = '单条分类信息获取成功'
        res.json(resObj)
      })
      .catch(function (err) {
        console.log(err)
        res.json(Constant.DEFAULT_ERROR)
      })
  }
}

// 添加分类方法
/**
 * post请求参数
 * name 必传  分类名称
 */
function add (req, res) {
  let resObj = {}
  const check = common.checkParams(req.body, ['name'])
  if (!check) {
    res.json(Constant.LACK)
  } else {
    CateModel
      .create({
        name: req.body.name
      })
      .then(function (result) {
        resObj.msg = '添加分类成功'
        res.json(resObj)
      })
      .catch(function (err) {
        console.log(err)
        res.json(Constant.DEFAULT_ERROR)
      })
  }
}

// 修改分类方法
/**
 * put请求参数
 * id  必传   分类id
 * name  必传   分类名称
 */
function update (req, res) {
  let resObj = {}
  const check = common.checkParams(req.body, ['id', 'name'])
  if (!check) {
    res.json(Constant.LACK)
  } else {
    CateModel
      .update({
        name: req.body.name
      }, {
        where: {
          id: req.body.id
        }
      })
      .then(function (result) {
        if (result[0]) {
          resObj.msg = '修改分类成功'
          res.json(resObj)
        } else {
          resObj.msg = '修改分类失败'
          res.json(resObj)
        }
      })
      .catch(function (err) {
        console.log(err);
        res.json(Constant.DEFAULT_ERROR)
      })
  }
}

// 删除分类方法
/**
 * delete请求参数
 * id  必传   疯了id
 */
function remove (req, res) {
  let resObj = {}
  const check = common.checkParams(req.body, ['id'])
  if (!check) {
    res.json(Constant.LACK)
  } else {
    CateModel
      .destroy({
        where: {
          id: req.body.id
        }
      })
      .then(function (result) {
        if (result) {
          resObj.msg = '分类删除成功'
          res.json(resObj)
        } else {
          resObj.msg = '分类删除失败'
          res.json(resObj)
        }
      })
      .catch(function (err) {
        console.log(err);
        res.json(Constant.DEFAULT_ERROR)
      })
  }
}

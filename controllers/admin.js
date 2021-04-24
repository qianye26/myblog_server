const common = require('./common')
const AdminModel = require('../models/admin')
const Constant = require('../constant/constant')
const dateFormat = require('dateformat')

const exportObj = {
  list,
  info,
  add,
  update,
  remove
}

module.exports = exportObj

// 获取管理员列表方法
/**
 * get方法 参数如下
 * page   必传    页码
 * rows   必传    每页条数
 * username 非    用户名
 */
function list (req, res) {
  let resObj = {}
  const check = common.checkParams(req.query, ['page', 'rows'])
  if (!check) {
    res.json(Constant.LACK)
  } else {
    let limit = parseInt(req.query.rows) || 20
    let offset = req.query.rows * (req.query.page - 1) || 0
    let whereCondition = {}
    if (req.query.username) {
      whereCondition.username = req.query.username
    }
    AdminModel
      .findAndCountAll({
        where: whereCondition,
        limit,
        offset,
        order: [['create_at', 'DESC']]
      })
      .then(function (result) {
        let list = []
        result.rows.forEach((v, i) => {
          let obj = {
            id: v.id,
            username: v.username,
            name: v.name,
            role: v.role,
            lastLoginAt: dateFormat(v.lastLoginAt, 'yyyy-mm-dd HH-MM-ss'),
            createAt: dateFormat(v.createAt, 'yyyy-mm-dd HH-MM-ss')
          }
          list.push(obj)
        })
        resObj.data = {
          list,
          count: result.count
        }
        resObj.msg = '获取管理员列表成功'
        res.json(resObj)
      })
      .catch(function (err) {
        console.log(err);
        res.json(Constant.DEFAULT_ERROR)
      })
  }
}

// 获取单条管理员方法
/**
 * get方法  参数如下
 * id   必传      管理员id
 */
function info (req, res) {
  let resObj = {}
  const check = common.checkParams(req.params, ['id'])
  if (!check) {
    res.json(Constant.LACK)
  } else {
    AdminModel
      .findByPk(req.params.id)
      .then(function (result) {
        if (result) {
          resObj.data = {
            id: result.id,
            username: result.username,
            name: result.name,
            role: result.role,
            lastLoginAt: dateFormat(result.lastLoginAt, 'yyyy-mm-dd HH-MM-ss'),
            createAt: dateFormat(result.createAt, 'yyyy-mm-dd HH-MM-ss')
          }
          resObj.msg = '获取单条管理员信息成功'
          res.json(resObj)
        } else {
          resObj.msg = '管理员信息不存在'
          res.json(resObj)
        }
      })
      .catch(function (err) {
        console.log(err);
        res.json(Constant.DEFAULT_ERROR)
      })
  }
}

// 添加管理员方法
/**
 * post方法  参数如下
 * username   必传    用户名
 * password   必传    密码
 * name       必传    姓名
 * role       必传    角色
 */
function add (req, res) {
  let resObj = {}
  const check = common.checkParams(req.body, ['username', 'password', 'name', 'role'])
  if (!check) {
    res.json(Constant.LACK)
  } else {
    AdminModel
      .create({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        role: req.body.role,
        createAt: new Date()
      })
      .then(function (result) {
        resObj.msg = '注册博客账号成功'
        res.json(resObj)
      })
      .catch(function (err) {
        console.log(err);
        res.json(Constant.DEFAULT_ERROR)
      })
  }
}

// 修改管理员方法
/**
 * put方法  参数如下
 * id         必传    管理员id
 * username   必传    用户名
 * password   必传    密码
 * name       必传    姓名
 * role       必传    角色
 */
function update (req, res) {
  let resObj = {}
  const check = common.checkParams(req.body, ['id', 'username', 'password', 'name', 'role'])
  if (!check) {
    res.json(Constant.LACK)
  } else {
    AdminModel
      .update({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        role: req.body.role,
        updatedAt: new Date()
      }, {
        where: {
          id: req.body.id
        }
      })
      .then(function (result) {
        if (result[0]) {
          resObj.msg = '修改账号成功'
          res.json(resObj)
        } else {
          resObj.msg = '修改账号失败'
          res.json(resObj)
        }
      })
      .catch(function (err) {
        console.log(err);
        res.json(Constant.DEFAULT_ERROR)
      })
  }
}

// 删除管理员方法
/**
 * delete方法  参数如下
 * id   必传    管理员id
 */
function remove (req, res) {
  let resObj = {}
  const check = common.checkParams(req.body, ['id'])
  if (!check) {
    res.json(Constant.LACK)
  } else {
    AdminModel
      .destroy({
        where: {
          id: req.body.id
        }
      })
      .then(function (result) {
        if (result) {
          resObj.msg = '账号删除成功'
          res.json(resObj)
        } else {
          resObj.msg = '账号删除失败'
          res.json(resObj)
        }
      })
      .catch(function (err) {
        console.log(err);
        res.json(Constant.DEFAULT_ERROR)
      })
  }
}
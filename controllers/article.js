const common = require('./common')
const ArticleModel = require('../models/article')
const CateModel = require('../models/cate')
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

// 获取文章列表方法
/**
 * get请求  参数如下
 * page   必填    页码
 * rows   必填    每页条数
 * title  非必    文章标题
 */
function list (req, res) {
  let resObj = {}
  const check = common.checkParams(req.query, ['page', 'rows'])
  if (!check) {
    res.json(Constant.LACK)
  } else {
    let offset = req.query.rows * (req.query.page - 1) || 0
    let limit = parseInt(req.query.rows) || 20
    let whereCondition = {}
    if (req.query.title) {
      whereCondition.title = req.query.title
    }
    ArticleModel
      .findAndCountAll({
        where: whereCondition,
        limit: limit,
        offset: offset,
        order: [['created_at', 'DESC']],
        include: [{
          model: CateModel
        }]
      })
      .then(function (result) {
        let list = []
        result.rows.forEach((v, i) => {
          let obj = {
            id: v.id,
            title: v.title,
            desc: v.desc.substr(0, 20) + '...',
            cate: v.cate,
            cateName: v.Cate.name,
            content: v.content,
            createdAt: dateFormat(v.createdAt, 'yyyy-mm-dd HH:MM:ss')
          }
          list.push(obj)
        })
        resObj.data = {
          list,
          count: result.count
        }
        resObj.msg = '获取文章列表成功'
        res.json(resObj)
      })
      .catch(function (err) {
        console.log(err);
        res.json(Constant.DEFAULT_ERROR)
      })
  }
}

// 获取单条文章方法
/**
 * get请求 参数如下
 * id   必填    文章id
 */
function info (req, res) {
  let resObj = {}
  const check = common.checkParams(req.params, ['id'])
  if (!check) {
    res.json(Constant.LACK)
  } else {
    ArticleModel
      .findOne({
        where: {
          id: req.params.id
        },
        include: [{
          model: CateModel
        }]
      })
      .then(function (result) {
        resObj.data = {
          id: result.id,
          title: result.title,
          desc: result.desc.substr(0, 20) + '...',
          content: result.content,
          cate: result.cate,
          cateName: result.Cate.name,
          createdAt: dateFormat(result.createdAt, 'yyyy-mm-dd HH:MM:ss')
        }
        resObj.msg = '查找单条文章成功'
        res.json(resObj)
      })
      .catch(function (err) {
        console.log(err);
        res.json(Constant.DEFAULT_ERROR)
      })
  }
}

// 添加文章方法
/**
 * post请求 参数如下
 * title    必传  文章标题
 * cate     必传  所属分类
 * desc     必传  摘要
 * content  必传  内容
 */
function add (req, res) {
  let resObj = {}
  const check = common.checkParams(req.body, ['title', 'cate', 'desc', 'content'])
  if (!check) {
    res.json(Constant.LACK)
  } else {
    ArticleModel
      .create({
        title: req.body.title,
        desc: req.body.desc,
        content: req.body.content,
        cate: req.body.cate,
        createdAt: new Date()
      })
      .then(function (result) {
        resObj.msg = '添加文章成功'
        res.json(resObj)
      })
      .catch(function (err) {
        console.log(err);
        res.json(Constant.DEFAULT_ERROR)
      })
  }
}

// 修改文章方法
/**
 * put请求  参数如下
 * id     必传    文章id
 * title   必传   文章标题
 * cate   必传    所属分类
 * desc   必传    摘要
 * content  必传  内容
 */
function update (req, res) {
  let resObj = {}
  const check = common.checkParams(req.body, ['id', 'title', 'cate', 'desc', 'content'])
  if (!check) {
    res.json(Constant.LACK)
  } else {
    ArticleModel
      .update({
        title: req.body.title,
        desc: req.body.desc,
        content: req.body.content,
        cate: req.body.cate,
        updatedAt: new Date()
      }, {
        where: {
          id: req.body.id
        }
      })
      .then(function (result) {
        if (result[0]) {
          resObj.msg = '文章修改成功'
          res.json(resObj)
        } else {
          resObj.msg = '文章修改失败'
          res.json(resObj)
        }
      })
      .catch(function (err) {
        console.log(err);
        res.json(Constant.DEFAULT_ERROR)
      })
  }
}

// 删除文章方法
/**
 * delete请求  参数如下
 * id    必传     文章id
 */
function remove (req, res) {
  let resObj = {}
  const check = common.checkParams(req.body, ['id'])
  if (!check) {
    res.json(Constant.LACK)
  } else {
    ArticleModel
      .destroy({
        where: {
          id: req.body.id
        }
      })
      .then(function (result) {
        if (result) {
          resObj.msg = '删除文章成功'
          res.json(resObj)
        } else {
          resObj.msg = '文章信息不存在'
          res.json(resObj)
        }
      })
      .catch(function (err) {
        console.log(err);
        res.json(Constant.DEFAULT_ERROR)
      })
  }
}
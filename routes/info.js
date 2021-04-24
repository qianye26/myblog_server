// 博客信息管理模块路由
var express = require('express');
var router = express.Router();
const InfoController = require('../controllers/info')

// 获取博客信息路由
router.get('/', InfoController.info);
// 修改博客信息路由
router.put('/', InfoController.update);

module.exports = router;
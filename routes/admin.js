// 登录模块路由
var express = require('express');
var router = express.Router();
const AdminController = require('../controllers/admin')

router.get('/', AdminController.list);

router.get('/:id', AdminController.info);
// 添加管理员路由
router.post('/', AdminController.add);
// 修改管理员路由
router.put('/', AdminController.update);
// 删除管理员路由
router.delete('/', AdminController.remove);

module.exports = router;

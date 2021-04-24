// 分类管理模块路由
var express = require('express');
var router = express.Router();
const CateController = require('../controllers/cate')

router.get('/', CateController.list);

router.get('/:id', CateController.info);

// 添加分类路由
router.post('/', CateController.add);

// 修改分类路由
router.put('/', CateController.update);

// 删除分类路由
router.delete('/', CateController.remove);


module.exports = router;
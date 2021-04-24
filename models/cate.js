// 数据表cate的映射model
const Sequelize = require('sequelize')
const db = require('../db')
// 定义model
const Cate = db.define('Cate', {
  id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },    //分类id
  name: { type: Sequelize.STRING(20), allowNull: false }, //分类名称
}, {
  underscored: true,    //是否支持驼峰
  tableName: 'cate',     //mysql数据库表名
  timestamps: false     //禁用时间戳
})

module.exports = Cate
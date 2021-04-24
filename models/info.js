// 数据表info的映射model
const Sequelize = require('sequelize')
const db = require('../db')
// 定义model
const Info = db.define('Cate', {
  id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },    //主键
  title: { type: Sequelize.STRING(20), allowNull: false },
  subtitle: { type: Sequelize.STRING(30), allowNull: false },
  about: { type: Sequelize.TEXT, allowNull: false },
}, {
  underscored: true,    //是否支持驼峰
  tableName: 'info',     //mysql数据库表名
  timestamps: false
})

module.exports = Info
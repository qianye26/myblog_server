// 数据表admin的映射model
const Sequelize = require('sequelize')
const db = require('../db')
// 定义model
const Admin = db.define('Admin', {
  id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },    //主键
  username: { type: Sequelize.STRING(20), allowNull: false },
  password: { type: Sequelize.STRING(36), allowNull: false },
  name: { type: Sequelize.STRING(20), allowNull: false },
  role: { type: Sequelize.INTEGER, allowNull: false },
  lastLoginAt: { type: Sequelize.DATE },
  createAt: { type: Sequelize.DATE },
  updatedAt: { type: Sequelize.DATE }
}, {
  underscored: true,    //是否支持驼峰
  tableName: 'admin',   //mysql数据库表名
  timestamps: false     //禁用时间戳
})

module.exports = Admin
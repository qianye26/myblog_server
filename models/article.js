// 数据表article的映射model
const Sequelize = require('sequelize')
const CateModel = require('./cate')
const db = require('../db')
// 定义model
const Article = db.define('Article', {
  id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },    //文章id
  title: { type: Sequelize.STRING(30), allowNull: false },
  desc: { type: Sequelize.STRING, allowNull: false },
  content: { type: Sequelize.TEXT, allowNull: false },
  cate: { type: Sequelize.INTEGER, allowNull: false },
  createdAt: { type: Sequelize.DATE },
  updatedAt: { type: Sequelize.DATE }
}, {
  underscored: true,    //是否支持驼峰
  tableName: 'article',     //mysql数据库表名
  timestamps: false
})

module.exports = Article

// 文章所属分类，一个分类包含多个文章，将文章表和分类表进行关联
Article.belongsTo(CateModel, { foreignKey: 'cate', constraints: false })
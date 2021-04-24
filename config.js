// 数据库连接信息config.js
const config = {
  DEBUG: true,     //是否开启调试模式
  // mysql 数据库连接配置
  MYSQL: {
    host: 'localhost',
    database: 'blog',
    username: 'root',
    password: '123456'
  }
}
if (process.env.NODE_ENV === 'production') {
  //生产环境mysql数据库连接配置
  config.MYSQL = {
    host: '',
    database: '',
    username: '',
    password: ''
  }
}

module.exports = config
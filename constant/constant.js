const obj = {
  DEFAULT_SUCCESS: {
    code: 10000,
    mag: ''
  },
  DEFAULT_ERROR: {
    code: 188,
    msg: '系统错误'
  },
  // 错误返回- 缺少必要的参数
  LACK: {
    code: 199,
    msg: '缺少必要的参数'
  },
  TOKEN_ERROR: {
    code: 101,
    msg: '用户名或密码错误'
  },
  ARTICLE_NOT_EXSIT: {
    code: 102,
    msg: '文章信息不存在'
  },
  ADMIN_NOT_EXSIT: {
    code: 103,
    msg: '管理员信息不存在'
  },
  CATE_NOT_EXSIT: {
    code: 104,
    msg: '分类信息不存在'
  },
  BLOG_INFO_NOT_EXSIT: {
    code: 105,
    msg: '博客信息不存在'
  }
}

module.exports = obj
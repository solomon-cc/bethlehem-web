// 全局配置
export const BaseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/'
    : 'https://service.ylmz.com.cn/'

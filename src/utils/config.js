// 全局配置
export const BaseUrl =
  import.meta.env.MODE === 'development'
    ? '/'
    : 'https://service.ylmz.com.cn/'

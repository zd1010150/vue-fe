/**
 * 配置编译环境和线上环境之间的切换
 *
 * localapi: 是否使用本地API接口
 * proapi: 是否使用线上API接口
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = '/api'
let apiUrl = ''
const onlineUrl = "", localUrl = "http://localhost:8001" + baseUrl

if (__PRO__) {

  apiUrl = onlineUrl
} else if (__DEV__) {
  apiUrl = localUrl
}
console.log(apiUrl)
export {
  apiUrl,
  baseUrl
}

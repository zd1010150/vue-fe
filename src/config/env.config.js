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


//http://api.finlogixtest.com/v1/admin/login?email=steven.hu@zerologix.com&password=acy11111111&captcha=jh4hn
//"http://api.cloudhubpanellocal.com/api/v1"

let baseUrl = ''
/*
const devUrl = "http://api.cloudhubpanellocal.com/v1",
  onlineUrl = "https://api.cloudhubpanel.com/v1"*/
const devUrl = "/api",
  onlineUrl = "/api"

if (__PRO__) {
  baseUrl = onlineUrl
} else if (__DEV__) {
  baseUrl = devUrl
}



export {
  baseUrl
}

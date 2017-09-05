/**
 * 配置编译环境和线上环境之间的切换
 */


//http://api.finlogixtest.com/v1/admin/login?email=steven.hu@zerologix.com&password=acy11111111&captcha=jh4hn
//"http://api.cloudhubpanellocal.com/api/v1"

let baseUrl = ''
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

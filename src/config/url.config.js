/* eslint-disable one-var */
import { baseUrl } from './env.config.js'

export let UPLOAD_DOCUMENT_URL = baseUrl + '/file'
export let UPLOAD_ASSET_URL = baseUrl + '/file/asset'

/* 外部链接,qq,livechat */
export const EXTERNAL_URL = {
  qq: 'http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDA5NzY1MV8zMjQ1ODJfODAwMDk3NjUxXzJf',
  livechat: 'https://secure.livechatinc.com/licence/4905761/open_chat.cgi'
}
/*
 * 链接到官网的一些地址
 */
// 官网的首页
export const ORG_INDEX = {
  zh: 'https://cn.acyfxasia.com',
  en: 'https://www.acyfxasia.com'
}
// 下载中心的web mt4 地址
export const MT4_WEB_PLATFORM = {
  zh: 'https://cn.acyfxasia.com/acy-webtrader',
  en: 'https://www.acyfxasia.com/acy-webtrader'
}
// 开通合作账户的条款地址
export const TERMS = {
  zh: 'https://cn.acyfxasia.com/why-acy/terms-and-conditions',
  en: 'https://www.acyfxasia.com/why-acy/terms-and-conditions'
}
// 官网的抽奖地址
export const PRIZE_LANDING_PAGE = {
  zh: 'https://cn.acyfxasia.com/landingpage/2018annuallottery',
  en: 'https://www.acyfxasia.com/landingpage/2018annuallottery'
}
// 常见问题的链接地址
export const COMMON_QUESTION = {
  zh: 'https://cn.acyfxasia.com/why-acy/faq',
  en: 'https://www.acyfxasia.com/why-acy/faq'
}

// Verification/Big Video Upload Url
export const VIDEO_BASE_URL = 'https://rsc.cloudhubpanel.com'

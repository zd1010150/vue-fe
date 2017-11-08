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
  zh: 'https://cn.acy.com',
  en: 'https://www.acy.com'
}
// 下载中心的web mt4 地址
export const MT4_WEB_PLATFORM = {
  zh: 'https://cn.acy.com/acy-webtrader',
  en: 'https://www.acy.com/acy-webtrader'
}
// 开通合作账户的条款地址
export const TERMS = {
  zh: 'https://cn.acy.com/why-acy/terms-and-conditions',
  en: 'https://www.acy.com/why-acy/terms-and-conditions'
}
// 官网的抽奖地址
export const PRIZE_LANDING_PAGE = {
  zh: 'https://cn.acy.com/landingpage/annuallottery',
  en: 'https://www.acy.com/landingpage/monthlydraw'
}
// 常见问题的链接地址
export const COMMON_QUESTION = {
  zh: 'https://cn.acy.com/why-acy/faq',
  en: 'https://www.acy.com/why-acy/faq'
}

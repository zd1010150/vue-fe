/* eslint-disable one-var */
export const ZH_LANGUAGE = 'zh'
export const EN_LANGUAGE = 'en'
export const DEFAULT_LANGUAGE = EN_LANGUAGE // 默认语言
export const DEFAULT_THEME = 'dark' // 默认theme
export const DEFAULT_PAY_GATEWAY = {code: 'bankwire', type: 'bankTransfer'} // 默认支付方式-转账，因为该方式是中英文都会存在的方式

export const MAX_FETCH_TIMEOUT = 100 * 1000// 网络请求最大超时时间
export const FIXED_WITHDRAWAL_UNIT = 'USD' // 取钱的时候fee的单位
export const UPLOAD_CONFIG = {
  ticket: {
    extentions: ['png', 'jpg', 'jpeg', 'pdf'],
    size: 10 * Math.pow(2, 20)
  },
  bill: {
    extentions: ['png', 'jpg', 'jpeg'],
    size: 2 * Math.pow(2, 20)
  },
  img: {
    extentions: ['png', 'jpg', 'jpeg'],
    size: 2 * Math.pow(2, 20)
  }
}

export const TABLES = {
  BANK_CARD_TABLE: 'BANK_CARD_TABLE',
  WITHDRAWAL_TABLE: 'WITHDRAWAL_TABLE',
  TICKET_TABLE: 'TICKET_TABLE'
}
// ticket回复时显示的管理员的名字
export const ACY_ADMIN = {
  zh: 'ACY客服',
  en: 'ACY-Supports'
}
// ticket回复时管理员的头像
export const ACY_ADMIN_HEAD_LOGO = {
  zh: 'static/images/zh_admin_head_logo.jpg',
  en: 'static/images/en_admin_head_logo.jpg'
}
export const ACY_BOOK_UPLOADER = {
  zh: 'ACY稀万',
  en: 'ACY'
}
// 网络请求的code
export const HTTP_STATUS_CODE = {
  OK: 200 // 成功的status code
}
// 菜单轮询的时间间隔
export const POLLING_INTERVAL = 2 * 60 * 1000 // 毫秒
// 同步后端数据的最大间隔
export const MAX_SYNC_TIME = 15 // 单位min

export const ONLINE_TRAINING_YY = 89270992
export const ONLINE_TRAINING_YY_URL = 'http://www.yy.com/89270992'

export const TRAINING_VIDEO_TYPES = {
  YOUTUBE: 'YOUTUBE',
  YOUKU: 'YOUKU',
  OTHER: 'OTHER'
}
export const CHINA_COUNTRY_CODE = ['china', 'cn']

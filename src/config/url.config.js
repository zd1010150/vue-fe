import { baseUrl } from "./env.config.js"

export let UPLOAD_DOCUMENT_URL = baseUrl+"/file"
export let UPLOAD_ASSET_URL = baseUrl+"/file/asset"

/*
 * 链接到官网的一些地址
 */
//下载中心的web mt4 地址
export const MT4_WEB_PLATFORM = { 
		zh : "https://cn.acy.com/acy-webtrader",
		en : "https://www.acy.com/acy-webtrader"
	}
//开通合作账户的条款地址
export const TERMS = {
	zh : "https://cn.acy.com/why-acy/terms-and-conditions",
	en: "https://www.acy.com/why-acy/terms-and-conditions"
}
//官网的抽奖地址
export const PRIZE_LANDING_PAGE = {
	zh : "https://cn.acy.com/landingpage/annuallottery",
	en: "https://www.acy.com/landingpage/monthlydraw"
}
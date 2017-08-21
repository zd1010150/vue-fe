export const ZH_LANGUAGE = "zh"
export const EN_LANGUAGE = "en"
export const DEFAULT_LANGUAGE = ZH_LANGUAGE //默认语言
export const DEFAULT_THEME = "dark" //默认theme
export const DEFAULT_PAY_GATEWAY = { key :"wireTransfer",code: ""} //默认支付方式-转账，因为该方式是中英文都会存在的方式

export const MAX_FETCH_TIMEOUT = 100*1000//网络请求最大超时时间

export const UPLOAD_CONFIG = {
	bill:{
		extentions:['png', 'jpg','jpeg','bmp','pdf'],
		size:10*Math.pow(2,20)
	}
}
export const TABLES = {
	BANK_CARD_TABLE : "BANK_CARD_TABLE",
	WITHDRAWAL_TABLE :"WITHDRAWAL_TABLE"
}
//MT4网页版地址，注意如果官网更换域名，那么对应的网址也需要修改
export const MT4_WEB_PLATFORM = { zh : "https://cn.acy.com/acy-webtrader",en:"https://www.acy.com/acy-webtrader"}

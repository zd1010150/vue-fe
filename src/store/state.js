import {DEFAULT_LANGUAGE,DEFAULT_THEME} from "../config/app.config"
import { getStore } from "../utils/storage.js"

export default {
  userInfo:null,
  language:getStore("language") || DEFAULT_LANGUAGE, //此处一定要有值，因为i18n初始化时，从这个地方获取了值
  theme:getStore("theme") || DEFAULT_THEME,
  errors:[],
  token:null,
  path:"",
  leftSideBarStatus:window.innerWidth>=768,
  mt4Accounts:[],
  traderAccounts:[],
  agentAccounts:[],
  leverage:[],
  contentLoading:false
}

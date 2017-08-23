
import {
  SET_USERINFO,
  ADD_ERROR_INFO,
  SET_TOKEN,
  SET_LANGUAGE,
  SET_THEME,
  SET_PATH,
  SET_LEFT_SIDE_BAR_STATUS ,
  SET_MT4_ACCOUNTS,
  SET_MT4_AGENT_ACCOUNTS,
  SET_MT4_TRADER_ACCOUNTS,
  SET_LEVERAGE,
  SET_CONTENT_LOADING
} from "./mutation-types";



export default{
  [SET_USERINFO](state,userInfo){
    state.userInfo= userInfo

  },
  [ADD_ERROR_INFO](state,error){
    state.errors.push(error)
    console.log("systemerror:",state.errors);
  },
  [SET_TOKEN](state,token){
    state.token = token
  },
  [SET_LANGUAGE](state,language){
    state.language = language

  },
  [SET_THEME](state,theme){
    state.theme = theme

  },
  [SET_PATH](state,path){
    state.path = path
  },
  [SET_LEFT_SIDE_BAR_STATUS ](state,status){
    state.leftSideBarStatus = status
  },
  
  [SET_MT4_ACCOUNTS](state,accounts){
    state.mt4Accounts = accounts
  },
  [SET_MT4_AGENT_ACCOUNTS](state,accounts){
    state.agentAccounts = accounts
  },
  [SET_MT4_TRADER_ACCOUNTS](state,accounts){
    state.traderAccounts = accounts
  },
  [SET_LEVERAGE](state,leverage){
    state.leverage = leverage
  },
  [SET_CONTENT_LOADING](state,loading){
    state.contentLoading = loading
  }
}

import {SET_USERINFO,ADD_ERROR_INFO,SET_TOKEN} from "./mutation-types";
import * as Storage from "../utils/storage"

// 同步vuex的状态到localstorage里面
let syncVuexStateAndLocalStorage = (key,value) => {
  if(value){
    Storage.setStore(key,JSON.stringify(userInfo));
  }else{
    Storage.removeStore(key);
  }
}

export default{
  [SET_USERINFO](state,userInfo){
    state.userInfo= userInfo
    syncVuexStateAndLocalStorage("userInfo",userInfo);

  },
  [ADD_ERROR_INFO](state,error){
    state.systemError.push(error);
  },
  [SET_TOKEN](state,token){
    state.token = token;
    syncVuexStateAndLocalStorage("token",token);
  }
}

import {SET_USERINFO,ADD_ERROR_INFO,SET_TOKEN} from "./mutation-types";


export default{
  [SET_USERINFO](state,userInfo){
    state.userInfo= userInfo
  },
  [ADD_ERROR_INFO](state,error){
    state.systemError.push(error);
  },
  [SET_TOKEN](state,token){
    state.token = token;
  }
}

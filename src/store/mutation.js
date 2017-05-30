import {SET_USERINFO,ADD_ERROR_INFO} from "./mutation-types";


export default{
  [SET_USERINFO](state,username){
    state.userInfo= username
  },
  [ADD_ERROR_INFO](state,error){
    state.systemError.push(error);
  }
}

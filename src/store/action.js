import * as type from "./mutation-types"
import userService from "../services/userService"
import pwdService from "../services/pwdService"
export default{

  async login({ commit }, form){

    return await userService.login(form).then(({data,success,message}) => {
      if(success && data.token){
        commit(type.SET_TOKEN, data.token);
      }
      return {data,success,message};
    });
  },
  async getUserInfo({ commit }){
    return await userService.getUserInfo().then(({data,success,message}) => {
      if (success) {
        commit(type.SET_USERINFO, data);

      }
      return { success };
    });
  },
  async logout({commit, state}){
    console.log("logout state", state, state.userInfo);
    if (state && state.userInfo) {
      return await userService.logout();
    }
  },
  async addSystemError({commit}, error){
    commit(type.ADD_ERROR_INFO, error)
  },
  async changePassword({commit},{old_password,password}){
    let {data,success,message} = await pwdService.changePwd({old_password,password});
    if(success){
      commit(type.SET_USERINFO,null)
      commit(type.SET_TOKEN,"")
    }
    return {data,success,message};
   },
   
}

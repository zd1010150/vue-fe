import * as type from "./mutation-types"
import userService from "../services/userService"

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
    return await userService.login(form).then(({data,success,message}) => {
      if (success && data.userInfo) {
        commit(type.SET_USERINFO, data.userInfo);

      }
      return { success };
    });
  },
  async logout({commit, state}){
    console.log("logout state", state, state.userInfo);
    if (state && state.userInfo) {
      return await userService.logout(state.userInfo.id).then(() => {
        commit(type.SET_USERINFO, null)
      });
    }
  },
  async addSystemError({commit}, error){
    commit(type.ADD_ERROR_INFO, error)
  }
}

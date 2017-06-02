import * as type from "./mutation-types"
import userService from "../services/userService"

export default{

  async login({
    commit
  }, form){

    return await userService.login(form).then((res) => {

      const {data, success, errMsg} = res;
      if (success && data.username) {
        commit(type.SET_USERINFO, data.userInfo);
        commit(type.SET_TOKEN,data.token);
      }
      return success;
    }, (errorResponse) => {
      console.log(errorResponse);
    });

  },
  async logout({
    commit,state
  }){
    console.log("logout state",state);

    // return await userService.logout(state.userInfo.id).then(() => {
    //   commit(type.SET_USERINFO, null)
    // }, (errorResponse) => {
    //   console.log(errorResponse);
    // });

  },

  async addSystemError({commit}, error){
    commit(type.ADD_ERROR_INFO, error)
  }

}

import * as type from "./mutation-types"
import * as userService from "../services/userService"

export default{
  async login({
    commit
  },username,password){
    let res = await userSerice.login(username,password);
    commit(type.SET_USERINFO,res)
  },
  async addSystemError({commit},error){
    commit(type.ADD_ERROR_INFO,error)
  }
}

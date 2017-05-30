
import { getData } from  './network/getData'
import { apiUrl } from '../config/env.config.js'
export default{
  login(username,pwd){
    return getData(apiUrl + "/auth/login")
  },
  checkLogin(){
    return getData(apiUrl + "/auth/checkLogin")
  }
}

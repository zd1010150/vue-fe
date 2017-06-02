
import   { fetchData }  from  './network/getData'
import { apiUrl } from '../config/env.config.js'
import { dataToForm } from '../utils/form'
export default{
  async login(form){

    return fetchData("POST",apiUrl + "/auth/login",form)
  },
  async checkLogin({username,token}){
    return fetchData("GET",apiUrl + "/auth/checkLogin",{username,token})
  },
  async logout(id){
    return fetchData("DELETE",apiUrl + "/auth/logout",{id})
  }
}

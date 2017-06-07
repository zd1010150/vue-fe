
import   { fetchData }  from  './network/getData'


export default{
  async login(form){

    return fetchData("POST","/login",form)
  },
  async checkLogin(){
    return fetchData("GET", "/checkLogin")
  },
  async logout(id){
    return fetchData("DELETE","/logout",{id})
  },
  async getUserInfo(){
    return fetchData("GET","/user/me")
  }
}

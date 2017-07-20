
import   { fetchData }  from  './network/getData'


export default{
  async validatePwd(form){ // 校验密码是否合理

    return fetchData("POST","/login",form)
  },
  async changePwd({old_password,password}){
  	return fetchData("POST","/profile/reset-password",{old_password,password})
  }
}

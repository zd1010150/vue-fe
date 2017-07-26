
import   { fetchData }  from  './network/getData'


export default{
  async validatePwd({old_password}){ // 校验密码是否合理

    return fetchData("POST","/profile/verify-password",{old_password})
  },
  async changePwd({old_password,password}){
  	return fetchData("POST","/profile/reset-password",{old_password,password})
  }
}

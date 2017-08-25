
import Store from "store"
import { ADD_ERROR_INFO,SET_USERINFO,SET_TOKEN } from "store/mutation-types"
import fetch from "./fetch"

/*统一处理 后端接口的一些统一错误*/
let filterResoveResponse = (response) => {
   // console.log("getData resolve",response);//处理各种异常的信息


}
let filterRejectResponse = (xhr) => {
   // console.log("getdata reject",xhr);//处理各种异常的信息
}



let fetchData = async function(type = 'GET', url = '', data = {}){
  return fetch(type,url,data).then((response)=>{
        filterResoveResponse(response);
        let success = response.status_code == 200 ? true : false
        if(!success){
          if(response.status_code == 401){
            vm.toastr.error(vm.$t("info.Unauthenticated"))
            Store.commit(SET_USERINFO, null)
            Store.commit(SET_TOKEN,null)
            vm.$router.replace("/login")
          }else{
            vm.toastr.error(vm.$t("info."+response.message))
          }
          
        }
        return {
          data:response.data,
          success:success,
          message:response.message,
          errors:response.errors
        };
    },(errorResponse)=>{
        filterRejectResponse(errorResponse);
        throw errorResponse;
    });
  }


export { fetchData } ;

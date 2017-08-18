
import Store from "store"
import { ADD_ERROR_INFO } from "store/mutation-types"
import fetch from "./fetch"

/*统一处理 后端接口的一些统一错误*/
let filterResoveResponse = (response) => {
   // console.log("getData resolve",response);//处理各种异常的信息


}
let filterRejectResponse = (xhr) => {
   // console.log("getdata reject",xhr);//处理各种异常的信息
}



let fetchData = async function(type = 'GET', url = '', data = {}){
  console.log("fetch data:",data);
    return fetch(type,url,data).then((response)=>{
        filterResoveResponse(response);
        let success = response.status_code == 200 ? true : false
        if(!success){
          if(response.status_code == 500){
            vm.toastr.error(vm.$t("info.Unauthenticated"));
            Store.commit(SET_USERINFO, null)
            Store.commit(SET_TOKEN,null)
            vm.$router.push("/login")
          }else{
            vm.toastr.error(vm.$t("info."+response.message));
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
        console.log("reject callback",errorResponse.message);
       // let errorMsg = errorResponse.message ? errorResponse.message : "";
        //Store.state.commit(ADD_ERROR_INFO,{msg:"errorResponse",level:"system"});

        throw errorResponse;
    });
  }


export { fetchData } ;

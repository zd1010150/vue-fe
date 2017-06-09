
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
    return fetch(type,url,data).then((response)=>{
        filterResoveResponse(response);
        var success = response.status_code == 0 ? true : false
      console.log("resolve callback");
        return {
          data:response.data,
          success:success,
          message:response.message,
          errors:response.errors
        };
    },(errorResponse)=>{
        filterRejectResponse(errorResponse);
        console.log("reject callback");
        let errorMsg = errorResponse.message ? errorResponse.message : "";
        Store.state.commit(ADD_ERROR_INFO,{msg:"errorResponse",level:"system"});
        Store.commit()
        throw errorResponse;
    });
  }


export { fetchData } ;

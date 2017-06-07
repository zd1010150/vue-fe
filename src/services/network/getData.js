

import fetch from "./fetch";

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
        return {
          data:response.data,
          success:success,
          message:response.message,
          errors:response.errors
        };
    },(errorResponse)=>{
        filterRejectResponse(errorResponse);
        console.log("fail to fetch");
        throw errorResponse;
    });
  }


export { fetchData } ;

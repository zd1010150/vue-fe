

import fetch from "./fetch";
/*统一处理*/
let filterResoveResponse = (response) => {
    console.log("getData resolve",response);//处理各种异常的信息
}
let filterRejectResponse = (xhr) => {
    console.log("getdata reject",xhr);//处理各种异常的信息
}

let fetchData = async function(type = 'GET', url = '', data = {}, method = 'fetch'){
    console.log("fetchdata",type,url,data,method);
    return fetch(type,url,data,method).then((response)=>{
        filterResoveResponse(response);
        console.log("fetchdata response",response);
        return response;
    },(errorResponse)=>{
        filterRejectResponse(errorResponse);
        return errorResponse;
    });
  }

export { fetchData } ;

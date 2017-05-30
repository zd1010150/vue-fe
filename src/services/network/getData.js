

import fetch from "./fetch.js";
/*统一处理*/
let filterResoveResponse = (response) => {
    console.log(response);//处理各种异常的信息
}
let filterRejectResponse = (xhr) => {
    console.log(xhr);//处理各种异常的信息
}

export default {
  getData(type = 'GET', url = '', data = {}, method = 'fetch'){
    return fetch(type,url,data,method).then((response)=>{
        filterResoveResponse(response);
    },(xhr)=>{
        filterRejectResponse(xhr);
    });
  }
}

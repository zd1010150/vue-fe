import {
  baseUrl
} from '../../config/env.config.js'
import { MAX_FETCH_TIMEOUT } from '../../config/app.config.js'
import store from "store"
//需要添加对formData的支持
export default async(type = 'GET', url = '', data = {},uploadFile = false) => {
  console.log("fetch,",url);
  type = type.toUpperCase();
  url = baseUrl + url;

  if (type == 'GET') {
    let dataStr = ''; //数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
  }
  if (type == 'DELETE') {
    url = url + "/" + data.id;
  }


  let requestConfig = {
    credentials: 'include',
    method: type,
    headers: {
      'Accept': 'application/json',
      'Content-Type' : 'application/json'
    },
    mode: "cors",
    cache: "force-cache"
  }

  if(store.state.token){
    requestConfig.headers["Authorization"] = store.state.token;
  }
  console.log("define before");
  if (type == 'POST' ) {
     Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
  }
  console.log("define after");
 function _fetch(fetch_promise, timeout) {

      var abort_fn = null;

      //这是一个可以被reject的promise
      var abort_promise = new Promise(function(resolve, reject) {
        abort_fn = function() {
          reject('abort promise');
        };
      });

      //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
      var abortable_promise = Promise.race([
        fetch_promise,
        abort_promise
      ]);

      setTimeout(function() {
        abort_fn();
      }, timeout);

      return abortable_promise;
    }
   let response,resoponseJson;
   try{
      response = await _fetch(fetch(url,requestConfig),MAX_FETCH_TIMEOUT);
      resoponseJson = await response.json();
   }catch(error){
    console.log("Error",error);
      throw new Error(error);
   }
   console.log("result from server:",resoponseJson);
   return resoponseJson;

}

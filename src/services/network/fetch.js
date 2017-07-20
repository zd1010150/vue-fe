import {
  baseUrl
} from '../../config/env.config.js'
import { MAX_FETCH_TIMEOUT } from '../../config/app.config.js'
import store from "store"

import {formDataToJson} from '../../utils/form.js';





export default async(type = 'GET', url = '', data = {}) => {

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

  if (type == 'POST') {
    if (window.FormData && data instanceof FormData) {
      Object.defineProperty(requestConfig, 'body', {
        value: formDataToJson(data)
      })
    } else {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }

  }


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

   try{
      let response = await _fetch(fetch(url,requestConfig),MAX_FETCH_TIMEOUT);
      let resoponseJson = await response.json();
   }catch(error){
      throw new Error(error);
   }
   return resoponseJson;
   
}

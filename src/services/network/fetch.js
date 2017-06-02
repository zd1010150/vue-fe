import {
  baseUrl
} from '../../config/env.config.js'
import { formDataToJson } from '../../utils/form.js';

export default async(type = 'GET', url = '', data = {}, method = 'fetch') => {
  console.log("request:===",type,url,data,method);

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
  if(type == 'DELETE'){
    url = url+"/"+data.id ;
  }
  if (window.fetch && method == 'fetch') {
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: "cors",
      cache: "force-cache"
    }

    if (type == 'POST') {
      if(window.FormData && data instanceof FormData){
        Object.defineProperty(requestConfig, 'body', {
          value: formDataToJson(data)
        })
      }else {
        Object.defineProperty(requestConfig, 'body', {
          value: JSON.stringify(data)
        })
      }

    }

    try {
      var response = await fetch(url, requestConfig);
      var responseJson = await response.json();
    } catch (error) {
      throw new Error(error)
    }
    return responseJson
  } else {
    return new Promise((resolve, reject) => {
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        requestObj = new ActiveXObject;
      }

      let sendData = '';
      if (type == 'POST' ) {
        if(window.FormData && data instanceof FormData){
           sendData = formDataToJson(data);
        }else{
          sendData = JSON.stringify(data);
        }

      }

      requestObj.open(type, url, true);
      requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      requestObj.send(sendData);

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
          if (requestObj.status == 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj);
            }
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}

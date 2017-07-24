// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.


import 'es6-shim'
require('es6-promise').polyfill()
require('isomorphic-fetch')
import './assets/index.scss'
import './assets/less/index.less'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from './i18n'
import miniToastr from 'mini-toastr'
import Components from "./components"
import routers from './router/map/index'
import Validate from './validate'

import { getStore,syncVuexStateAndLocalStorage } from "./utils/storage.js"
import  changeTheme  from 'utils/theme.js'
import { SET_USERINFO,SET_PATH,SET_TOKEN } from "./store/mutation-types"

import AuthenService from "services/authenService"
import UserService from "services/userService"

Vue.use(Components);
Vue.use(Validate);

miniToastr.init();
Vue.prototype.toastr = miniToastr;

let initVue = () =>{
  window.vm = new Vue({
    store,
    router,
    i18n,
    miniToastr,
    el:"#app",
    template: '<App/>',
    components: { App },
    mounted(){
      changeTheme(this.$store.state.theme);
      window.onbeforeunload = function () {
        vm.$store.commit(SET_PATH,vm.$router.currentRoute.fullPath)
        syncVuexStateAndLocalStorage(vm.$store.state)
        return 'Do you want to leave?';
      }
    },
    methods:{
      leaving(e){
       // alert( "Are you sure you want to close the window?");
        this.$store.commit(SET_PATH,this.$router.currentRoute.fullPath)
        syncVuexStateAndLocalStorage(this.$store.state)
        e.returnValue = "Are you sure you want to close the window?";
        return "Are you sure you want to close the window?";
      }
    },
    beforeDestroy(){
      console.log("vue beforedestorey");
    }
  })
  Vue.config.productionTip = false
};


//token存在应该直接从localstrorage里面读取token，然后向后端查询，是否是合法登录，如果有合法登录，那么就查询一次用户信息，然后返回到
//用户之前的页面，否则，就进入登录页面

  AuthenService.checkLogin().then(({success,message,data})=>{
    if(!success){
      throw new Error(message);
    }else{
      this.$store.commit(SET_TOKEN,data.token?data.token:null);
      return UserService.getUserInfo();
    }
  }).then(({data:{user},success,message})=>{
    if(success){
      initVue();
      router.addRoutes(routers);
      vm.$store.commit(SET_USERINFO,user);
      let path = getStore("path") == "/login" ? "/main" : getStore("path");
      vm.$router.push(path);
    }else{
      throw new Error(message);
    }
  }).catch((error)=>{
      initVue();
      vm.$store.commit("ADD_ERROR_INFO",{ msg : error.message,type: "system"});
      vm.$router.push("/login");
  });
/*AuthenService.checkLogin().then(({success,message})=>{
  if(!success){
    throw new Error(message);
  }else{
    return UserService.getUserInfo();
  }
}).then(({data:{user},success,message})=>{

  if(success){
    vm.$store.commit(SET_USERINFO,user);
  //  vm.$router.addRoutes(routers);
    vm.$router.push(getStore("path") || "/");
  }else{
    throw new Error(message);
  }
}).catch((error)=>{
    console.log("error:",getStore("path") || "/");
    router.addRoutes(routers);//必须放在
    initVue();
    vm.$router.push(getStore("path") || "/");
    // vm.$store.commit("ADD_ERROR_INFO",{ msg : error.message,type: "system"});
    // vm.$router.push("/login");
});*/

// AuthenService.checkLogin().then(({data:{userInfo,token}}) =>{
//   if(userInfo){
//     vm.$store.commit(SET_USERINFO,userInfo);
//     vm.$store.commit(SET_TOKEN,"");
//   }else{
//     vm.$router.push("/login");
//     vm.$store.commit(SET_USERINFO,null);
//     vm.$store.commit(SET_TOKEN,"");
//   }
// }).catch((err)=>{
//   vm.$router.push("/login");
//   vm.$store.commit(SET_USERINFO,null);
// });


// /* eslint-disable no-new */
// // window.onunload = function(e){
//   // alert( "Are you sure you want to close the window?");
//   // this.$store.dispatch(SET_PATH,this.$router.currentRoute.fullPath)
//    syncVuexStateAndLocalStorage(vm.$store.state)
//   e.returnValue = "Are you sure you want to close the window?";
//   return "Are you sure you want to close the window?";
// }
//
// window.addEventListener('unload', function(event) {
//   console.log('I am the 3rd one.');
// });

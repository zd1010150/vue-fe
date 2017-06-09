// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-shim'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from './i18n'
import "./assets/index.scss"
import  VueMaterial from 'vue-material'


import { getStore,syncVuexStateAndLocalStorage } from "./utils/storage.js"
import {  DEFAULT_LANGUAGE } from "./config/app.config"
import { SET_USERINFO,SET_TOKEN,SET_PATH } from "./store/mutation-types"
import AuthenService from "services/authenService"
import UserService from "services/userService"

Vue.use(VueMaterial);

window.vm = new Vue({
  el:"#app",
  store,
  router,
  i18n,
  template: '<App/>',
  components: { App },
  mounted(){
    console.log("vue mounted");
    this.$store.state.language = getStore("language") || DEFAULT_LANGUAGE;
    window.onbeforeunload = function () {
      vm.$store.commit(SET_PATH,vm.$router.currentRoute.fullPath)
      syncVuexStateAndLocalStorage(vm.$store.state)
      return 'Do you want to leave?';
    }
  },
  methods:{
    leaving(e){
     // alert( "Are you sure you want to close the window?");
      console.log();
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

AuthenService.checkLogin().then(({success,message})=>{
  if(!success){
    throw new Error(message);
  }else{
    return UserService.getUserInfo();
  }
}).then(({data:{user},success,message})=>{

  if(success){
    vm.$store.commit(SET_USERINFO,user);

    vm.$router.push(getStore("path") || "/main");
  }else{
    throw new Error(message);
  }
}).catch((error)=>{
  console.log("error:",error);
    vm.$store.commit("ADD_ERROR_INFO",{ msg : error.message,type: "system"});
    vm.$router.push("/login");
});


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




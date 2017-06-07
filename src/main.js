// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-shim'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from './i18n'
import "./assets"
import  VueMaterial from 'vue-material'



import { SET_USERINFO,SET_TOKEN } from "./store/mutation-types"
import AuthenService from "services/authenService"

Vue.use(VueMaterial);

window.vm = new Vue({
  el:"#app",
  store,
  router,
  i18n,
  template: '<App/>',
  components: { App }
})
Vue.config.productionTip = false





AuthenService.checkLogin().then(({data:{userInfo,token}}) =>{
  console.log("222",data);
  if(userInfo){
    vm.$store.commit(SET_USERINFO,userInfo);
    vm.$store.commit(SET_TOKEN,"");
  }else{
    vm.$router.push("/login");
    vm.$store.commit(SET_USERINFO,null);
    vm.$store.commit(SET_TOKEN,"");
  }
}).catch((err)=>{
  console.log("checklogin fail");
  vm.$router.push("/login");
  vm.$store.commit(SET_USERINFO,null);
});


/* eslint-disable no-new */




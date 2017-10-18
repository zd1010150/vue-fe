// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'es6-shim'
require('es6-promise').polyfill()

require('./utils/requestanimationFrame.js' ) //polyfill requestAnimationFrame
require('mutationobserver-shim') // polyfill mutationobserver
require('element-dataset') // polyfill dataset
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
import { SET_USERINFO,SET_PATH,SET_TOKEN} from "./store/mutation-types"

import AuthenService from "services/authenService"
import UserService from "services/userService"
import pageService from "services/pageService"

Vue.use(Components)
Vue.use(Validate)
miniToastr.init()
Vue.prototype.toastr = miniToastr
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
      changeTheme(this.$store.state.theme)
      window.addEventListener('beforeunload',function(){
        vm.$store.commit(SET_PATH,vm.$router.currentRoute.fullPath)
        syncVuexStateAndLocalStorage(vm.$store.state)
        document.cookie = "test = dandan;"
        return 'Do you want to leave?'
      })
    }
  })
  Vue.config.productionTip = false
}
let checkLogin = async()=>{
  return await AuthenService.checkLogin()
}
let getUserInfo = async()=>{
  return await UserService.getUserInfo()
}
let checkIP = async()=>{
  return await pageService.detectIP()
}
let init = async()=>{
  //检查ip是否合法
  let {success,data} = await checkIP()
  console.log(data,"===")
  if(data.status == "invalid"){
    initVue()
    vm.$router.push("/error")
  }else{
    // 首先从 cookie里面直接发送给服务器验证，是否正确，如果正确了，就获取用户信息，如果用户信息获取成功，就进入之前的页面，否则就进入登录页面
    try{
      let {success,message,data} = await checkLogin()
      if(success){
        let {success,message,data} = await getUserInfo()
        if(success){
          router.addRoutes(routers)
          store.commit(SET_USERINFO,data)
          store.commit(SET_TOKEN,getStore("token"))
          initVue()
          let path = getStore("path") == "/login" ? "/main" : getStore("path")
          vm.$router.push(path)
        }else{
          throw new Error(message)
        }
      }else{
        throw new Error(message)
      }
    }catch(error){
      initVue()
      if(vm.$route.meta.requiresAuth == false && vm.$route.path != "/404"){
        vm.$router.push(vm.$route.fullPath)
      }else {
        vm.$router.push("/login")
      }
    }
  }
}

init()




 
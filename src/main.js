/* eslint-disable no-undef */
/**/
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'es6-shim'
import './assets/index.scss'
import './assets/less/index.less'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from './i18n'
import miniToastr from 'mini-toastr'
import Components from './components'
import routers from './router/map/index'
import Validate from './validate'
import { Validator } from 'vee-validate'
import { getStore, syncVuexStateAndLocalStorage } from './utils/storage.js'
import changeTheme from 'utils/theme.js'
import { SET_LANGUAGE, SET_TOKEN, SET_USERINFO, SET_I18N_LANGUAGE } from './store/mutation-types'

import AuthenService from 'services/authenService'
import UserService from 'services/userService'
import pageService from 'services/pageService'

require('es6-promise').polyfill()

require('./utils/requestanimationFrame.js') // polyfill requestAnimationFrame
require('mutationobserver-shim') // polyfill mutationobserver
require('element-dataset') // polyfill dataset

Vue.use(Components)
Vue.use(Validate)
miniToastr.init()
Vue.prototype.toastr = miniToastr
let initVue = () => {
  window.vm = new Vue({
    store,
    router,
    i18n,
    miniToastr,
    el: '#app',
    template: '<App/>',
    components: {App},
    mounted () {
      changeTheme(this.$store.state.theme)
      window.addEventListener('beforeunload', function () {
        syncVuexStateAndLocalStorage(vm.$store.state)
        return 'Do you want to leave?'
      })
    }
  })
  Vue.config.productionTip = false
}
const checkLogin = async () => {
    return AuthenService.checkLogin()
  }, getUserInfo = async () => {
    return UserService.getUserInfo()
  }, checkIP = async () => {
    return pageService.detectIP()
  }, init = async () => {
  // 检查ip是否合法
    let { data, success } = await checkIP()
    if (!success || (data && data.status && data.status === 'invalid')) {
      initVue()
      vm.$router.push('/error')
    } else {
      try {
        // token有没有在localstorage里面
        if (getStore('token') === 'null' || !getStore('token')) {
          throw new Error('no token')
        } else {
          // token是否有效
          let {success, message} = await checkLogin()
          // token有效，就获取用户个人信息
          if (success) {
            let {success, message, data} = await getUserInfo()
            if (success) {
              router.addRoutes(routers)
              store.commit(SET_USERINFO, data)
              store.commit(SET_TOKEN, getStore('token'))
              store.commit(SET_LANGUAGE, data.language)
              store.commit(SET_I18N_LANGUAGE, data.language)
              i18n.locale = data.language
              Validator.setLocale(data.language)
              initVue()
              // 进入页面
              vm.$router.push(vm.$route.fullPath === '/login' ? '/main' : vm.$route.fullPath)
            } else {
              throw new Error(message)
            }
          } else {
            throw new Error(message)
          }
        }
      } catch (error) {
        initVue()
        // 用户可以进入不需要验证的页面，
        if (vm.$route.meta.requiresAuth === false && vm.$route.path !== '/404') {
          vm.$router.push(vm.$route.fullPath)
        } else {
          vm.$router.push('/login')
        }
      }
    }
  }

init()

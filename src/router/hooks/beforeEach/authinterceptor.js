/* eslint-disable brace-style */
import store from 'src/store'
import i18n from 'src/i18n/index'

const authInterceptor = (router) => (to, from, next) => {
  let userInfo = store.state.userInfo
  console.log(store.state.needVideoAuthen)
  const {meta: {requiresAuth, forbidAuthen}} = to
  // console.log(from.path,"======>",to.path,store.state.userInfo)
  if (to.matched.length < 1) {
    next({path: '/404'})
  }
  if (to.path === '/videoAuth') {
    next()
  }
  if (!userInfo && requiresAuth) {
    next({path: '/login'})
  } else if (forbidAuthen && userInfo) {
    // debugger
    // console.log('dandan', i18n.t('loginAndPassword.login.reLoginError'))
    alert(i18n.t('loginAndPassword.login.reLoginError'))
    // alert('你已经登录，不能再次访问登录页面')
    next(false)
  } else if (requiresAuth && userInfo && store.state.needVideoAuthen) {
    next({path: '/videoAuth'})
  } else if (requiresAuth && userInfo && !store.state.needVideoAuthen && to.path === '/videoAuth') {
    next({path: '/main'})
  } else {
    next()
  }
}

export default authInterceptor

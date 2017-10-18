import store from 'src/store'

const authInterceptor = (router) => (to, from, next) => {
  let userInfo = store.state.userInfo
  const {meta:{requiresAuth, forbidAuthen}} = to
  //console.log(from.path,"======>",to.path,store.state.userInfo)
  if (to.matched.length < 1) {
    next({path: "/404"})
  }
  if (!userInfo && requiresAuth) {
    next({path: "/login"})
  } else if (forbidAuthen && userInfo) {
    alert("你已经登录，不能再次访问登录页面")
    next(false)
  } else {
    next()
  }

}


export default authInterceptor

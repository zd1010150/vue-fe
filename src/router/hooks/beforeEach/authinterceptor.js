
import store from 'src/store'
import AuthenService from "services/authenService"


const authInterceptor = (router) => (to, from, next) => {
  let userInfo = store.state.userInfo;

  const {meta:{requiresAuth,forbidAuthen}} = to;
  if(to.matched.length < 1){
    alert("404 我们没找到");
    next(false);
  }
  if (!userInfo && requiresAuth) {
      next({path : "/login"});

  }else if(forbidAuthen && userInfo){
    alert("你已经登录，不能再次访问登录页面");
    next(false);
  }else{
    next();
  }

}


export default authInterceptor;

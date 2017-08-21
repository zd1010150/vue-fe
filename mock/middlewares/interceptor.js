var db = require('../db/');

function aUserIsLogin(token){
  return !db.get('session').filter({token:token}).isEmpty().value();
}

function interceptorGen(isNeedLogin, errMsg) {
  return function (req, res, next) {

    var isLogin = aUserIsLogin(req.cookies.token || '')

    console.log("interceptor:",isNeedLogin,isLogin);
    if(isNeedLogin){
      if(!isLogin){
        res.ajaxReturn(false, { errMsg: errMsg });
        return;
      }
    }else{
      if(isLogin){
        res.ajaxReturn(false, { errMsg: errMsg });
        return;
      }
    }
    next();
  };
}

module.exports = {
  NEED_AUTH: interceptorGen(true, '您需要登录后才能进行该操作'),
  FORBID_AUTHED: interceptorGen(false, '您已经登录，禁止当前操作')
};

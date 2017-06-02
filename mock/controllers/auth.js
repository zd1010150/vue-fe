var errorStatusCode  = require("../config/errorStatusCode.js");
var db = require('../db/');
var  uuid = require('uuid/v1');
// GET /auth/checkLogin
exports.checkLogin = function (req, res) {
  var username = (req.body.username || '').trim();
  var   token= (req.body.token || '').trim();
  console.log("checklogin contraller----",username,token);
  var errorCode;
  var user = db.get('session').filter(function(o){
    if(o.username == username){
      if(o.token != token){
        errorCode = errorStatusCode.INVALID_SESSION;
      }else{
        return o;
      }

    }
  });
  user = user.value();
  if (!user) {
    return res.ajaxReturn(false, { errMsg: errorStatusCode.UN_LOGIN });
  }

  res.ajaxReturn({ login:true  });
};

// POST /auth/login
exports.login = function (req, res) {
  var username = (req.body.username || '').trim();
  var password = (req.body.password || '').trim();

  console.log("checklogin contraller----",username,password);
  var user = db.get('users').find({username:username,password:password}).value();


 console.log(user);
  if (!user) {
    return res.ajaxReturn(false, { errMsg: '登录失败' });
  }

  var token =  uuid().substr(0, 10),
      session = { userInfo: user,token:token};

  res.cookie('token',token,{ httpOnly:true });
  res.ajaxReturn(
    db.get('session').push(session).last().value()
  );
};

// DELETE /auth/logout
exports.logout = function (req, res) {
  console.log("logout parmas and cookies:",req.cookies,req.params.userid);
  db.get('session').remove({userInfo:{id:req.params.userid},token:req.cookies.token}).write();
  console.log("logout after:",db.get('session').value());
  res.ajaxReturn();
};

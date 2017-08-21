var errorStatusCode  = require("../config/errorStatusCode.js");
var db = require('../db/');
var  uuid = require('uuid/v1');
// GET /auth/checkLogin
exports.checkLogin = function (req, res) {
 var   token= req.cookies.token;
  console.log("checklogin contraller----",token);
  var user = db.get('session').filter({token:token}).value();
  if (!user) {
    return res.ajaxReturn(false, { errMsg: errorStatusCode.UN_LOGIN });
  }
  res.ajaxReturn(user[0]);
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

  res.cookie('token',token,{ httpOnly:true })
  db.get('session').push(session).write()
  res.ajaxReturn(
    db.get('session').last().value()
  );
};

// DELETE /auth/logout
exports.logout = function (req, res) {
  console.log("logout parmas and cookies:",req.cookies,req.params.userid);
  var id= req.params.userid,token=req.cookies.token;
  var t= db.get('session').filter({token:req.cookies.token}).value();
  console.log("t",t);
  db.get('session').remove({token:req.cookies.token}).value();
  console.log("logout after:",db.get('session').value());
  res.cookie('token',"");
  res.ajaxReturn();
};

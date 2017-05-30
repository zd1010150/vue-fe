var db = require('../db/');

// GET /auth/checkLogin
exports.checkLogin = function (req, res) {
  res.ajaxReturn(db.get('session').value());
};

// POST /auth/login
exports.login = function (req, res) {
  var username = (req.body.username || '').trim();
  var password = (req.body.password || '').trim();
  var users = db.get('users');

  var loginUser = users.filter((user)=>{
    if(user.username == username && user.password == password){
      return user;
    }
  });
  if (!loginUser) {
    return res.ajaxReturn(false, { errMsg: '登录失败' });
  }

  var session = { username: loginUser.username };

  db.set('session', session).value();
  res.ajaxReturn(session);
};

// DELETE /auth/logout
exports.logout = function (req, res) {
  db.set('session', null).value();
  res.ajaxReturn();
};

var express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  multer = require("multer"),
  routes = require('./routes/'),
  notFound = require('./middlewares/notFound'),
  simpleLogger = require('./middlewares/simpleLogger'),
  resAjaxReturn = require('./middlewares/res.ajaxReturn');

var app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({dest:__dirname+"/file/uploads/"}).array());

app.use(simpleLogger);
app.use(resAjaxReturn);


// 根据 app.<verb>(<path>, <[middlewares]?>, <handler>) 挂载路由
routes.forEach(function (route) {
  var args = [route.path];
  if (route.middlewares) args.push(route.middlewares);
  args.push(route.handler);

  app[route.method.toLowerCase()].apply(app, args);
});

app.use(notFound);
console.log("mock server start");
module.exports = app;

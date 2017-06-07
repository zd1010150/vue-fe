import Login from 'views/auth/login'
import Logout from 'views/auth/logout'
import ResetPwd from 'views/auth/Reset'

export default [{
  path: "/login",
  component: Login,
  name: "login",
  meta: {
    forbidAuthen: true
  }
}, {
  path: "/logout",
  component: Logout

}, {
  path: "/reset",
  comoponent: ResetPwd
}];

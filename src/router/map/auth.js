import Login from 'views/auth/login'
import Logout from 'views/auth/logout'
import changePassword from 'views/auth/changePassword'

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
  path:"/changePassword",
  component: changePassword,
  meta: {
    requiresAuth: true
  }
}];

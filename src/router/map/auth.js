import Login from 'views/auth/login'
import Logout from 'views/auth/logout'
import changePassword from 'views/auth/changePassword'
import recoverPassword from 'views/auth/recoverPassword'
import resetPassword from 'views/auth/resetPassword'
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
},
{
  path:"/recoverPassword",
  component: recoverPassword,
  meta: {
    forbidAuthen: true,
    requiresAuth:false
  }
},
{
  path:"/resetPassword",
  component: resetPassword,
  meta: {
    forbidAuthen: true,
    requiresAuth:false
  }
}];

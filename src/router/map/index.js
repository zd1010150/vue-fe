import Login from 'views/auth/login'
import Logout from 'views/auth/logout'
import Main from 'views/main/main'
import Dashboard from 'views/main/dashboard'

export default [{
  path: "/",
  component: Main,
  children: [{
    path: "",
    component: Dashboard,
    name:"dashboard"
  }]
}];

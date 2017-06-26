
import Main from 'views/main/main'
import Dashboard from 'views/main/dashboard'

export default [{
  path: "/main",
  component: Main,
  children: [{
    path: "",
    component: Dashboard,
    name:"dashboard",
    meta:{
      requiresAuth : false
    }
  }]
}];

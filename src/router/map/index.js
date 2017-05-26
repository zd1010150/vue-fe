
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

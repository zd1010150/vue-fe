import Login from 'views/auth/login'
import Logout from 'views/auth/logout'
import ResetPwd from 'views/auth/Reset'

export default [{
  path:"/auth",
  component:Login,
  name:"login",
  },{
    path:"/logout",
    component:Logout

  },{
    path:"/Reset",
    comoponent:ResetPwd
  }
];

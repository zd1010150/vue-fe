
import error404 from 'views/error/404'
import error403 from 'views/error/403'
import error from 'views/error/error'


export default [{
  path: "/404",
  component: error404,
  meta: {
    requiresAuth: false
  }
},{
  path: "/403",
  component: error403,
  meta: {
    requiresAuth: false
  }
},{
  path: "/error",
  component: error,
  meta: {
    requiresAuth: false
  }
}];


import error404 from 'views/error/404'
import error403 from 'views/error/403'


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
}];

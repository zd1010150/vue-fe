
import error404 from 'views/error/404'


export default [{
  path: "/404",
  component: error404,
  meta: {
    requiresAuth: false
  }
}];

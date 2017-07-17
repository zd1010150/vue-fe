import uicomponent from 'views/uiDemo/uicomponent'
import formvalidate from 'views/uiDemo/formvalidate'


export default [{
    path: "/uiDemo/ui-component",
    component: uicomponent,
    meta: {
      requiresAuth: false
    },
  } ,{
    path: "/uiDemo/form-validate",
    component: formvalidate,
    meta: {
      requiresAuth: false
    }
  }];

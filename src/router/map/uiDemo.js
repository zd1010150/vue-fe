import uiDemo from 'views/uiDemo/index'
import uicomponent from 'views/uiDemo/uicomponent'
import formvalidate from 'views/uiDemo/formvalidate'


export default [{
  path: "/uiDemo",
  component:uiDemo,
  meta:{
    requiresAuth : false
  },
  children:[{
    path:"ui-component",
    alias:"",
    component: uicomponent,
    meta:{
      requiresAuth : false
    }
  },{
    path:"form-validate",
    component:formvalidate,
    meta:{
      requiresAuth : false
    }
  }]
}];

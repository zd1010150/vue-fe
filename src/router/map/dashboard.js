import Dashboard from 'views/dashboard/dashboard'

export default {
    path: "main",
    component: Dashboard,
    name:"dashboard",
    meta:{
      requiresAuth : true
    }
  };

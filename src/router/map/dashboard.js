import Dashboard from 'views/dashboard/index'

export default {
    path: "main",
    component: Dashboard,
    name:"dashboard",
    meta:{
      requiresAuth : true,
      pageTitle:"dashboard"
    }
  };

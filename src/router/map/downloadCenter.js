import downloadCenter from 'views/downloadCenter/index'


export default [{
  path: "/download-center",
  component: downloadCenter,
  meta: {
    requiresAuth: true,
    pageTitle: "downloadCenter"
  }
}];

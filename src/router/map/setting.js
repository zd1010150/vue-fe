import Setting from 'views/setting/index.vue'

export default [{
  path: '/setting',
  component: Setting,
  meta: {
    requiresAuth: true,
    pageTitle: 'setting'
  }
}]

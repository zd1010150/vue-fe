import VPS from 'views/vps/index'

export default [{
  path: 'vps',
  component: VPS,
  meta: {
    requiresAuth: true,
    pageTitle: "vps"
  }
}]

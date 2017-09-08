

import Notice from 'views/notice/index.vue'


export default [{
  path: "/notice",
  component: Notice,
  meta: {
    requiresAuth: true,
    pageTitle: "notice"
  }
}]

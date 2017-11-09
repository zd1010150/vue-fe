import onlineTraining from 'views/training/onlineTraining/index'
import VideoIndex from 'views/training/video/index'
import BookIndex from 'views/training/book/index'

export default [{
  path: 'training/online-training',
  component: onlineTraining,
  meta: {
    requiresAuth: true,
    pageTitle: 'onlineTraining'
  }
}, {
  path: 'training/books',
  component: BookIndex,
  meta: {
    requiresAuth: true,
    pageTitle: 'book'
  }
}, {
  path: 'training/videos',
  component: VideoIndex,
  meta: {
    requiresAuth: true,
    pageTitle: 'video'
  }
}]

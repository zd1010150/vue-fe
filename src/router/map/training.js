import onlineTraining from 'views/training/onlineTraining/index'


import VideoIndex from 'views/training/video/index'
import EducationalBooks from 'views/training/booksMagazines/educationalBooks'
import moneyTheory from 'views/training/booksMagazines/moneyTheory'

export default [{
  path: 'training/online-training',
  component: onlineTraining,
  meta: {
    requiresAuth: true,
    pageTitle: "onlineTraining"
  }
}, {
  path: 'training/books-magazines/money-theory',
  component: moneyTheory,
  meta: {
    requiresAuth: true,
    
  }
}, {
  path: 'training/books-magazines/educational-books',
  component: EducationalBooks,
  meta: {
    requiresAuth: true
  }
},{
  path: 'training/videos',
  component: VideoIndex,
  meta: {
    requiresAuth: true
  },
}];


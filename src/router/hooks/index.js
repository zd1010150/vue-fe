import authInterceptor from './beforeEach/authinterceptor'
// import docTitleChange from './afterEach/docTitleChange'
// import scrollToTop from './afterEach/scrollToTop'
// import simpleLogger from './afterEach/simpleLogger'

export default (router) => {
  router.beforeEach(authInterceptor(router));
  // router.afterEach(docTitleChange);
  // router.afterEach(scrollToTop);
  if(__DEV__){
    //router.afterEach(simpleLogger);
  }
}

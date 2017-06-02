import store from 'src/store'
const authInterceptor = (router) => (to,from,next) => {
  let userData = router.app.store;
   const { meta:{requiresAuth} } = to;
console.log(store.state.username,router.app);
 if(requiresAuth ){}
  next();
 }



 export default authInterceptor;

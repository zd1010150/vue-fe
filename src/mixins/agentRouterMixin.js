import Store from 'store'
export default{
	beforeRouteEnter(to,from,next){
		let userInfo = Store.state.userInfo 
		if(to.meta.agent && userInfo && userInfo.hasAgent){
			next()
		}else if((!to.meta.agent) && userInfo && (!userInfo.hasAgent) ){
			next()
		}else{
			next({path: "/403"})
		}
	}
}
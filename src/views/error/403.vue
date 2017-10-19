<template>
<chp-error-layout>
  <div class="content-center error-page">
		<div class="main-error mb-xlg">
			<h2 class="error-code text-dark text-center text-weight-semibold m-none">403 <i class="fa fa-chain-broken"></i></h2>
			<h6 class="error-explanation text-center">Forbidden to this page
				<router-link to="/main">Go back to DashBoard</router-link>
			</h6>
			<h6 class="error-explanation text-center">没有权限访问该页面 <router-link to="/main">返回首页</router-link>
			</h6>
		</div>
	</div>
</chp-error-layout>
</template>
<script>
  export default{
    
  }
</script>

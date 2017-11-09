<template>
<chp-error-layout>
  <div class="content-center error-page">
		<div class="main-error mb-xlg">
			<h2 class="error-code text-dark text-center text-weight-semibold m-none">404 <i class="fa fa-compass"></i></h2>

			<h6 class="error-explanation text-center">
			We're sorry, but the page you were looking for doesn't exist.
			<router-link to="/main">Go back to DashBoard</router-link>
			</h6>
			<h6 class="error-explanation text-center">
			你所访问的页面不存在
			<router-link to="/main">返回首页</router-link>
			</h6>
		</div>
	</div>
</chp-error-layout>
</template>
<script>
  export default{}
</script>

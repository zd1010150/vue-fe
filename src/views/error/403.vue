<template>
<chp-error-layout>
  <div class="content-center error-page">
		<div class="main-error mb-xlg">
			<h2 class="error-code text-dark text-center text-weight-semibold m-none">403 <i class="fa fa-file"></i></h2>
			<h6 class="error-explanation text-center">don't have authorize to this page
				go back to<router-link to="/main">DashBoard</router-link>
			</h6>
		</div>
	</div>
</chp-error-layout>
</template>
<script>
  export default{
    
  }
</script>

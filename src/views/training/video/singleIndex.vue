<template lang="html">
<!--teaching 页面的首页-->
  <div>
		this is teaching....{{ $route.query.videoType}}
		<router-link to="?level=3&videoType=video-teaching-detail&videoId=233">detail</router-link>
		<router-link to="?level=1">all teaching videos</router-link>
	</div>

</template>

<script>
  export default {

  }
</script>


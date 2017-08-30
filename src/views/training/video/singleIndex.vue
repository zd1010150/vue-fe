<template>
	<!--teaching 页面的首页-->
	<div class="container-fluid">
		<div class="video-header">
			<h3>
				<span class="mt-none">{{ $route.query.videoType | PascalCase}}</span>
				<div class="pull-right action">
					<router-link to="?level=1">
						<button class="mb-xs mt-xs mr-xs btn btn-sm btn-primary mt-none">All Videos</button>
					</router-link>
				</div>
			</h3>
		</div>

		<div class="media-gallery">
			<div class="row mg-files">
				<div v-for="video in [1,2,3,4,5,6,7,8]" class="col-sm-6 col-md-4 col-lg-3">
					<div class="thumbnail">
						<router-link :to="'?level=3&videoType='+$route.query.videoType+'&videoId=233'">
							<div class="featured-image"></div>
						</router-link>

						<h5 class="mb-xs mt-md">美国5月季调后非农大跌眼镜</h5>
						<div class="mg-description">
							<span class="text-muted">Ginney</span>
							<small class="text-muted pull-right pt-xs">05/06/2017 </small>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import filters from "src/filters";
export default {
	data() {
		return {

		}
	},
	filters
}
</script>

<style scoped>
.video-header {
	border-bottom: 1px solid #DADADA;
	margin-bottom: 15px;
}

.video-header .action {
	margin:-10px -5px;
	
}

.featured-image {
	width: 100%;
	height: 0;
	padding-bottom: 57%;
	background: url(http://thevideoanalyst.com/wp-content/uploads/2016/05/video-conference.jpg) no-repeat;
	background-size: 100%; 
}
</style>



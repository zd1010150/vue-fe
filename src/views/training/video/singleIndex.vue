<i18n src="../i18n.yaml"></i18n>
<template>
	<!--teaching 页面的首页-->
	<div class="container-fluid">
		<div class="video-header">
			<h3>
				<span class="mt-none">{{ $t('video.'+ $route.query.videoCode) }}</span>
				<div class="pull-right action">
					<router-link to="?level=1">
						<button class="mb-xs mt-xs mr-xs btn btn-sm btn-primary mt-none">{{ $t('video.allVideos')}}</button>
					</router-link>
				</div>
			</h3>
		</div>

		<div class="media-gallery">
			<div class="row mg-files">
				<div v-for="video in loopList" class="col-sm-6 col-md-4 col-lg-3">
					<div class="thumbnail">
						<router-link :to="'?level=3&videoCode='+$route.query.videoCode+'&videoType='+$route.query.videoType+'&videoId='+video.id">
							<chp-feature-image :src='video.imagepath || video.image_link'/>
						</router-link>
						<h5 class="mb-xs mt-md"><chp-one-line :content='video.title' :lens="25"></chp-one-line></h5>
						<div class="mg-description">
							<span class="text-muted">{{video.uploader_name}}</span>
							<small class="text-muted pull-right pt-xs">{{video.upload_date}}</small>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import filters from "src/filters"
import trainingService from "services/trainingService"
import { SET_CONTENT_LOADING } from 'store/mutation-types'
export default {
	data() {
		return {
			language: this.$store.state.language,
			loopList: []
		}
	},
	filters,
	watch: {
			"$store.state.language": function(val) {
				this.language = val;
				this.getCategoryVideo();
			}
	},
	activated() {
			console.log("single index activated")
			this.getCategoryVideo()
	},
	methods: {
		async getCategoryVideo() {
			this.$store.commit(SET_CONTENT_LOADING, true)
			let { success, data } = await trainingService.getCategoryVideo(this.language == "zh" ? "mandarin" : "english", this.$route.query.videoType)
			this.$store.commit(SET_CONTENT_LOADING, false)
			if (success) {
				this.loopList = data[this.$route.query.videoType];
				console.log(data[this.$route.query.videoType]);
			}
		},
		
	}
}
</script>

<style scoped>
.video-header {
	border-bottom: 1px solid #DADADA;
	margin-bottom: 15px;
}

.video-header .action {
	margin: -10px -5px;
}

.featured-image {
	width: 100%;
	height: 0;
	padding-bottom: 56.25%;
	background: rgba(0, 0, 0, 0.1) no-repeat center;
	background-size: 100%;
}
</style>



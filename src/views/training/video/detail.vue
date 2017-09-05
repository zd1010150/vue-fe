<i18n src="../i18n.yaml"></i18n>
<template>
	<div class="container-fluid">
		<section class="media-gallery">
			<div class="row mg-files">
				<div class="col-xs-12">
					<div class="thumbnail">
						<iframe v-bind:src="video.url" frameborder="0"></iframe>
						<div class="general-infor">
							<h2 class="mg-title text-weight-semibold mt-md mb-xs">{{video.title}}</h2>							
							<div>
								<div class="pull-right">{{video.uploader_name}} - {{video.upload_date}} </div>
								{{ $t('video.category')}}:
								<router-link to="?level=1">{{ $t('video.video')}}</router-link> /
								<router-link :to="'?level=2&videoType='+ $route.query.videoType "> {{ $route.query.videoType | pascalCase }} </router-link><br>
							</div>
						</div>
						<div class="description">
							{{video.description}}
						</div>
					</div>
				</div>
			</div>
		</section>

	</div>
</template>
<script>
import filters from "src/filters"
import trainingService from "services/trainingService"
import { SET_CONTENT_LOADING } from 'store/mutation-types'
export default {
	data () {
		return {
			video:{},
			url:"http://player.youku.com/embed/XMjY5OTE2NzA5Mg"
		}
	},
	created() {
		console.log("")
	},
	filters,
	watch: {
			"$store.state.language": function(val) {
				this.language = val;
				this.getSingleVideo();
			}
	},
	activated() {
			console.log("single video")
			this.getSingleVideo()
	},
	methods:{
		async getSingleVideo() {
			this.$store.commit(SET_CONTENT_LOADING, true)
			let { success, data } = await trainingService.getSingleVideo(this.$route.query.videoId)
			this.$store.commit(SET_CONTENT_LOADING, false)
			if (success) {
				this.video = data;
			}
		},
	}

}
</script>
<style scoped>
.thumbnail iframe {
	width: 100%;
	height: 35vw;
}
.general-infor {
	padding-bottom: 10px;
	border-bottom: 1px solid #DADADA;
}
.description {
	margin: 15px 0;
}

@media screen and (max-width: 991px) {
	.thumbnail iframe {
		width: 100%;
		height: 60vw;
	}
}
</style>

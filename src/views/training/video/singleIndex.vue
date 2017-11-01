<i18n src="../i18n.yaml"></i18n>
<template>
	<!--teaching 页面的首页-->
	<div class="container-fluid " >
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
		<div class="media-gallery infinite-container" ref="scroller" >
			<div class="row mg-files">
				<div v-for="video in loopList" class="col-sm-6 col-md-4 col-lg-3 video">
					<div class="thumbnail">
						<router-link :to="'?level=3&videoCode='+$route.query.videoCode+'&videoType='+$route.query.videoType+'&videoId='+video.id">
							<chp-feature-image :src='video.imagepath || video.image_link'/>
						</router-link>
						<h5 class="mb-xs mt-md video-title">{{video.title}}</h5>
						<div class="mg-description">
							<span class="text-muted">{{uploader[$store.state.language]}}</span>
							<small class="text-muted pull-right pt-xs">{{video.upload_date}}</small>
						</div>
					</div>
				</div>
				<div class="col-sm-12 col-md-12 col-lg-12 text-dark content-center" v-if="showLoadTip">
					<h5 v-if="!loading">{{ canLoadMore? $t('video.pullLoadmore') : $t('video.noMore')}}</h5>
				</div>
				<mu-infinite-scroll :scroller="scroller" class="text-dark" :loading="loading" @load="loadMore" :loadingText="$t('video.loading')"/>
			</div>
    	</div>
		
	</div>
</template>

<script>
import filters from "src/filters"
import trainingService from "services/trainingService"
import { SET_CONTENT_LOADING } from 'store/mutation-types'
import { ACY_BOOK_UPLOADER } from 'src/config/app.config.js'
export default {
	data() {
		return {
			language: this.$store.state.language,
			loopList: [],
			totalPage: 0,
			pageSize:8,
			page:0,
			scroller:null,
			loading:false,
			canLoadMore:true,
			showLoadTip:false,
			uploader: ACY_BOOK_UPLOADER
		}
	},
	filters,
	mounted(){
		this.scroller = this.$refs.scroller
	},
	watch:{
		"$store.state.language": function(val) {
			this.language = val;
			this.getCategoryVideo();
		}
	},
	activated() {
		console.log("single index activated")
		this.page=0
		this.loopList=[]
		this.getCategoryVideo()
	},
	methods: {
		async getCategoryVideo() {
			//this.$store.commit(SET_CONTENT_LOADING, true)
			this.loading = true
			let { success, data } = await trainingService.getCategoryVideo(this.language == "zh" ? "mandarin" : "english", this.$route.query.videoType,this.page+1,this.pageSize)
			//this.$store.commit(SET_CONTENT_LOADING, false)
			this.loading = false
			if (success) {
				this.filterData(data)
			}
		},
		loadMore(){
			if(this.canLoadMore){
				this.getCategoryVideo()
			}
		},
		filterData(data){
			let _data = data[this.$route.query.videoType]
			this.loopList.push(..._data.data)
			this.page = _data.current_page
			this.totalPage= _data.last_page
			this.canLoadMore = _data.current_page < _data.last_page
			this.showLoadTip = _data.total > this.pageSize
		}
	}
}
</script>

<style scoped>

.infinite-container{
	height:700px;
	overflow: auto;
	-webkit-overflow-scrolling: touch;
}
.video-header {
	border-bottom: 1px solid #4C4C4C;
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

.media-gallery h5 {
	height: 45px;
  	line-height: 22px;
	overflow: hidden;
}
.row.mg-files{
	margin:0px;
}

</style>



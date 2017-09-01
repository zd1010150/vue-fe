<template lang="html">
<!--所有视频的首页-->
  <div class="container-fluid">
    <div v-for="category in categories" class="categories">
      <div class="video-header">
        <h3 class="title">
          <span class="mt-none">{{category.title}}</span>
          <div class="pull-right action">
            <router-link v-bind:to="'?level=2&videoType='+ category.link">
              <button class="mb-xs mt-xs mr-xs btn btn-sm btn-primary"><i class="fa fa-info-circle mr-xs"></i>More</button>
            </router-link>
          </div>
        </h3>
		  </div>

      <div class="media-gallery">
        <div class="row mg-files">
          <div v-for="video in category.loop" class="col-sm-6 col-lg-3">
            <div class="thumbnail" v-if="video.featured ">
              <router-link :to="'?level=3&videoType='+category.link+'&videoId=233'">
                <div class="featured-image" v-bind:style='{backgroundImage:"url(" + video.imagepath +")"}'></div>
              </router-link>	
                <div>
                  <h5 class="mb-xs mt-md">{{video.title}}</h5>
                  <div class="mg-description">
                    <div class="text-muted">{{video.uploader_name}}</div>
                    <small class="text-muted pull-right pt-xs">{{video.upload_date}}</small>
                  </div>
                </div>						
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <router-link v-bind:to="'?level=2&videoType='+'stock'">stock</router-link>
  	<router-link to="?level=2&videoType=analyse">analyse</router-link>
  	<router-link to="?level=2&videoType=teaching">teaching</router-link>
	</div>
  	

  

</template>

<script>
import trainingService from "services/trainingService"
import { SET_CONTENT_LOADING } from 'store/mutation-types'
export default {
  data() {
    return {
      language: this.$store.state.language,
      categories: [
        { title: 'Stock', link: 'stock', loop:[]},
        { title: 'Analyse', link: 'analyse',loop:[]},
        { title: 'Teaching', link: 'teaching',loop:[]}
      ]
      
      
    }
  },
  methods: {
		async fetchVideo() {
			this.$store.commit(SET_CONTENT_LOADING, true)
      let { success, data } = await trainingService.getVideo(this.language == "zh" ? "mandarin" : "english","info")
      this.$store.commit(SET_CONTENT_LOADING, false)
			if (success) {				
        this.categories[0].loop = data.info;
        this.categories[1].loop = data.analysis;
        this.categories[2].loop = data.tutorials;
				console.log(data);
			}
    },
    
		refresh(){
			this.fetchVideo()
		}
  },
  watch: {
    "$store.state.language": function(val) {
			console.log(val);
			this.language = val;
			this.fetchVideo();
		}
  },
	created() {
		this.fetchVideo();
	}
}
</script>
<<style scoped>
.video-header {	
	border-bottom: 1px solid #4C4C4C;
	margin-bottom: 15px;
}

.video-header .action {
  margin:-10px -5px;
}

.featured-image {
	width: 100%;
	height: 0;
	padding-bottom: 57%;
	background: no-repeat;
	background-size: 100%; 
}
</style>



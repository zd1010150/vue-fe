<i18n src="../../i18n.yaml"></i18n>
<template lang="html">
<!--所有视频的首页-->
  <div class="container-fluid">
    <div v-for="category in categories" class="categories">
      <div class="video-header">
        <h3 class="title">
          <span class="mt-none">{{ $t('video.'+category.code) }}</span>
          <div class="pull-right action">
            <router-link v-bind:to="'?level=2&videoCode='+category.code+'&videoType='+ category.id">
              <button class="mb-xs mt-xs mr-xs btn btn-sm btn-primary"><i class="fa fa-info-circle mr-xs"></i>{{ $t('video.more')}}</button>
            </router-link>
          </div>
        </h3>
      </div>

      <div class="media-gallery">
        <div class="row mg-files">
          <div v-for="video in category.children" class="col-sm-6 col-lg-3">
            <div class="thumbnail">
              <router-link :to="'?level=3&videoCode='+category.code+'&videoType='+category.id+'&videoId='+video.id">
                <chp-feature-image :src='video.imagepath || video.image_link'/>
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
  </div>
</template>

<script>
import trainingService from "services/trainingService"
import { SET_CONTENT_LOADING } from 'store/mutation-types'
export default {
  data() {
    return {
      language: this.$store.state.language,
      categories: []
    }
  },
  methods: {
    async fetchVideo() {
      this.$store.commit(SET_CONTENT_LOADING, true)
      let { success, data } = await trainingService.getVideo(this.language == "zh" ? "mandarin" : "english", "")
      this.$store.commit(SET_CONTENT_LOADING, false)
      if (success) {
        console.log(data);
        this.mapData(data)
      }
    },
    mapData(data) {
      if (!(data && data.categorized && data.categories)) return
      let categories = []
      for (let categorized in data.categorized) {
        let c_id = categorized,
          c_children = data.categorized[c_id],
          category = []
        if (c_children && c_children.length > 0) {
          category = data.categories.filter((c) => {
            return c.id == c_id
          })[0]
          categories.push({ code: category.code, children: c_children ,id:category.id})
        }
      }
      this.categories = categories
    },
    refresh() {
      this.fetchVideo()
    }
  },
  watch: {
    "$store.state.language": function(val) {
      this.language = val
      this.fetchVideo()
    }
  },
  created() {
    this.fetchVideo()
  }
}
</script>
<style scoped>
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
	height: 31px;
	overflow: hidden;
}
</style>



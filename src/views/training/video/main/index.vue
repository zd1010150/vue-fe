<template lang="html">
<!--所有视频的首页-->
  <div class="container-fluid">
    <div v-for="category in categories">
      <div class="video-header">
        <h3 class="title">
          <span class="mt-none">{{category.title}}</span>
          <div class="pull-right action">
            <router-link v-bind:to="'?level=2&videoType='+category.link">
              <button class="mb-xs mt-xs mr-xs btn btn-sm btn-primary"><i class="fa fa-info-circle mr-xs"></i>More</button>
            </router-link>
          </div>
        </h3>
		  </div>

      <div class="media-gallery">
        <div class="row mg-files">
          <div v-for="video in [1,2,3,4]" class="col-sm-6 col-lg-3">
            <div class="thumbnail">
              <router-link :to="'?level=3&videoType='+category.link+'&videoId=233'">
                <div class="featured-image"></div>
              </router-link>	
                <div>
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
    </div>
    
    <router-link v-bind:to="'?level=2&videoType='+'stock'">stock</router-link>
  	<router-link to="?level=2&videoType=analyse">analyse</router-link>
  	<router-link to="?level=2&videoType=teaching">teaching</router-link>
	</div>
  	

  

</template>

<script>
export default {
  data() {
    return {
      categories: [
        { title: 'Stock', link: 'stock' },
        { title: 'Analyse', link: 'analyse' },
        { title: 'Teaching', link: 'teaching' }
      ]
    }

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
	background: #eee;
}
</style>



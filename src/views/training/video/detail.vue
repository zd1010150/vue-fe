<i18n src="../i18n.yaml"></i18n>
<template>
  <div class="container-fluid">
    <section class="media-gallery">
      <div class="row mg-files">
        <div class="col-xs-12">
          <div class="thumbnail">
            <!--<iframe v-bind:src="video.url" frameborder="0"></iframe>-->
            <div id="youkuplayer"></div>
            <div class="general-infor">
              <h2 class="mg-title text-weight-semibold mt-md mb-xs">{{video.title}}</h2>
              <div>
                <div class="pull-right">{{uploader[$store.state.language]}}  {{video.upload_date}} </div>
                {{ $t('video.category')}}:
                <router-link to="?level=1">{{ $t('video.video')}}</router-link>
                /
                <router-link :to="'?level=2&videoCode='+$route.query.videoCode+'&videoType='+ $route.query.videoType ">
                  {{ $t('video.' + $route.query.videoCode) | pascalCase }}
                </router-link>
                <br>
              </div>
            </div>
            <div class="description" v-html="video.description"></div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
<script>
  /* eslint-disable no-new,no-undef */

  import filters from 'src/filters'
  import trainingService from 'services/trainingService'
  import { SET_CONTENT_LOADING } from 'store/mutation-types'
  import { ACY_BOOK_UPLOADER } from 'src/config/app.config.js'
  import regxUtil from 'src/utils/regx.js'

  const YOUKU_SCRIPT = '//player.youku.com/jsapi'

  export default {
    data () {
      return {
        video: {},
        youkuId: '',
        uploader: ACY_BOOK_UPLOADER,
        url: 'http://player.youku.com/embed/XMjY5OTE2NzA5Mg',
        scriptEle: null
      }
    },
    filters,
    watch: {
      '$store.state.language': function (val) {
        this.language = val
        this.getSingleVideo()
      }
    },
    async activated () {
      await this.getSingleVideo()
      let youkuId = this.getYoukuVideoId()
      this.addYoukuScript(youkuId)
    },
    deactivated () {
      this.removeYoukuScript()
    },
    methods: {
      async getSingleVideo () {
        this.$store.commit(SET_CONTENT_LOADING, true)
        let {success, data} = await trainingService.getSingleVideo(this.$route.query.videoId)
        this.$store.commit(SET_CONTENT_LOADING, false)
        if (success) {
          this.video = data
        }
      },
      getYoukuVideoId () {
        let youkuId = '', str = this.video.url
        if (str && str.length > 0) {
          let groups = regxUtil.extractYoukuVideoId.exec(str)
          if (groups && groups.length > 2) {
            youkuId = groups[2]
          }
        }
        return youkuId
      },
      loadVideo (id) {
        let self = this
        new YKU.Player('youkuplayer', {
          styleid: '0',
          client_id: '1533eefa4c4aac9e',
          vid: self.youkuId,
          newPlayer: true
        })
      },
      addYoukuScript (id) {
        if (id && id.length > 0) {
          let self = this
          self.youkuId = id
          self.loadVideo = self.loadVideo.bind(self)
          self.scriptEle = document.createElement('script')
          self.scriptEle.src = YOUKU_SCRIPT
          self.scriptEle.addEventListener('load', self.loadVideo, false)
          self.$el.appendChild(self.scriptEle)
        }
      },
      removeYoukuScript () {
        if (this.scriptEle) {
          this.scriptEle.removeEventListener('load', this.loadVideo)
          this.$el.removeChild(this.scriptEle)
        }
      }
    }

  }
</script>
<style scoped>
  #youkuplayer {
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
    #youkuplayer {
      width: 100%;
      height: 60vw;
    }
  }
</style>

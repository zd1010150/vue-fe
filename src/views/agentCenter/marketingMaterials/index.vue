<i18n src="../i18n.yaml"></i18n>
<template>
  <div class="fluid-container">
    <agent-statistics-head @agentChange="agentChange"></agent-statistics-head>
    <div class="row">
      <div class="col-lg-12 col-md-12">
        <chp-tabs :isJustified="true" :value="activeStepTab" @change="handleStepTabChange">
          <template slot="header">
            <chp-tab-header href="tab1">{{ $t('marketingMaterial.banner') }}</chp-tab-header>
            <chp-tab-header href="tab2">{{ $t('marketingMaterial.video') }}</chp-tab-header>
          </template>
          <template slot="content">
            <chp-tab-content id="tab1" class="row">

              <div v-for=" (image,index) in images" class="col-lg-3 col-md-3 col-sm-6 col-xs-12 pt-sm" :key="index">
                <table class="picture">
                  <tr>
                    <td>
                      <mu-paper class="pic" :zDepth="2">
                        <div class="img-wrapper">
                          <table>
                            <tr>
                              <td><img :src="image.src" alt=""></td>
                            </tr>
                          </table>
                        </div>
                        <div class="mask">
                          <div class="mask-text-wrapper">
                            <p class="p-sm">
                              {{ getImageScript(image) }}
                            </p>
                          </div>
                        </div>
                      </mu-paper>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p class="size pt-sm">
                        <chp-one-line :content='image.name' :lens="20"></chp-one-line>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p class="copy">
                        <chp-button class="mb-xs mt-xs  btn btn-primary print-btn" @click="copy(getImageScript(image))">
                          {{ $t('marketingMaterial.copy') }}
                        </chp-button>
                      </p>
                    </td>
                  </tr>
                </table>

              </div>

            </chp-tab-content>
            <chp-tab-content id="tab2" class="row">
              <div v-for=" (video,index) in videos" class="col-lg-4 col-md-4 col-sm-6 col-xs-12" :key="'video'+index">
                <table class="picture">
                  <tr>
                    <td>
                      <mu-paper class="pic" :zDepth="2">
                        <div class="img-wrapper video">
                          <table>
                            <tr>
                              <td>
                                <div class="thumbnail" @click="playVideo(video.id)">
                                  <template v-if="!video.playing">
                                    <img :src="video.thumbnailUrl" alt="">
                                    <i class="fa fa-youtube-play play-btn text-primary" aria-hidden="true"></i>
                                  </template>
                                  <video controls="" v-else>
                                    <source :src="video.src">
                                  </video>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </div>

                      </mu-paper>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p class="size pt-sm">
                        <chp-one-line :content='video.name' :lens="20"></chp-one-line>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p class="copy">
                        <chp-button class="mb-xs mt-xs  btn btn-primary print-btn" @click="copy(getVideoScript(video))">
                          {{ $t('marketingMaterial.copy') }}
                        </chp-button>
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </chp-tab-content>
          </template>
        </chp-tabs>
      </div>
    </div>
  </div>
</template>
<script>
  import agentRouterMixin from 'mixins/agentRouterMixin'
  import materialService from 'services/materialService'
  import { SET_CONTENT_LOADING } from 'store/mutation-types'
  import { ORG_INDEX } from 'src/config/url.config.js'
  import eventUtil from 'src/utils/eventUtil'
  import head from '../head.vue'

  export default {
    components: {
      'agent-statistics-head': head
    },
    mixins: [agentRouterMixin],
    data () {
      return {
        orgUrl: ORG_INDEX[this.$store.state.language],
        agent: null,
        images: [],
        videos: [],
        activeStepTab: 'tab1'
      }
    },
    methods: {
      handleStepTabChange: function (id) {
        this.activeStepTab = id
      },
      toggleURL (id) {
        document.getElementById('#' + id).classList.toggleClass('active')
      },
      async fetchImageData () {
        let {success, data} = await materialService.getMarketingImage(this.$store.state.language)
        if (success) {
          this.images = data
        }
      },
      async fetchVideoData () {
        let {success, data} = await materialService.getMarketingVideo(this.$store.state.language)
        if (success) {
          this.mapVideoData(data)
        }
      },
      agentChange (agentId) {
        this.agent = this.$store.state.agentAccounts.filter((agent) => {
          return agent.mt4_id === agentId
        })[0]
      },
      getImageScript (image) {
        let obj = Object.assign(this.agent, {src: image.src, wp_url: this.orgUrl})
        return `<a href="${obj.wp_url}${obj.agent_url}" target="_blank"><img src="${obj.src}"/></a>`
      },
      getVideoScript (video) {
        let obj = Object.assign(this.agent, {src: video.src, wp_url: this.orgUrl})
        return `<video width="260" height="150" controls="" autoplay="" onended="_acy_direct(this)" data-url="${obj.wp_url}${obj.agent_url}"><source src="${obj.src}"></video>\<script type="text/javascript"\>function _acy_direct ( dom ){window.open ( dom.getAttribute ( "data-url" ) );}\<\/script\>`
      },
      copy (txt) {
        if (eventUtil.copy(txt)) {
          this.toastr.info(this.$t('marketingMaterial.copySuccess'))
        } else {
          this.toastr.error(this.$t('marketingMaterial.unsupportCopy'))
        }
      },
      mapVideoData (data) {
        this.videos = data.map((video) => {
          video.playing = false
          return video
        })
      },
      playVideo (id) {
        this.videos.map((video) => {
          video.playing = video.id === id
          return video
        })
      }
    },
    watch: {
      async agent (val, oldVal) {
        if (val !== oldVal) {
          let self = this
          this.$store.commit(SET_CONTENT_LOADING, true)
          Promise.all([await this.fetchVideoData(), await this.fetchImageData()]).then(() => {
            self.$store.commit(SET_CONTENT_LOADING, false)
          })
        }
      },
      '$store.state.language' (val) {
        this.orgUrl = ORG_INDEX[val]
        this.fetchImageData()
        this.fetchVideoData()
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "~assets/less/variable.less";
  @import "~assets/less/transition.less";

  .picture {
    width: 100%;
    .pic {
      width: 100%;
      max-height: 300px;
      height: 300px;
      position: relative;
      .img-wrapper {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        z-index: 3;
        &.video {
          table {
            img {
              max-height: 300px;
              max-width: 100%;
              margin: 0 auto;
              width: 100%;
            }
          }
        }
        table {
          width: 100%;
          height: 100%;
          video {
            max-height: 300px;
            max-width: 100%;
            margin: 0 auto;
            width: 100%;
          }
          td {
            text-align: center !important;
          }
          img {
            max-height: 300px;
            max-width: 100%;
          }
          .thumbnail {
            position: relative;
            border: none;
          }
          .play-btn {
            font-size: 30px;
            padding-left: 5px;
            position: absolute;
            bottom: 10px;
            left: 10px;
          }
        }
      }
      .mask {
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        width: 100%;
        height: 100%;
        z-index: 50;
        display: table;
        vertical-align: middle;
        word-break: break-all;
        transition: @material-enter;
        .mask-text-wrapper {
          display: table-cell;
          vertical-align: middle;
          width: 100%;
          height: 100%;
        }
        p {
          display: table-cell;
          color: transparent;
        }
        &:hover {
          p {
            color: @dark-color;
          }
          background-color: rgba(256, 256, 256, .6);
        }

      }

    }
  }

  html.dark {
    .picture {
      .pic {
        .mask {
          &:hover {
            p {
              color: @light-color;

            }
            background-color: rgba(0, 0, 0, .6)
          }

        }
      }
    }
  }
</style>

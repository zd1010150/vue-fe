<i18n src="./i18n.yaml"></i18n>
<template>
  <div class="col-lg-6 col-md-6 col-sm-12">
    <chp-panel :canCollapse="false" :canClose="false" :isLoading="loadingStatus">
      <template slot="panelTitle">
        {{ $t("books") }}
        <chp-view-all href="#/training/books"></chp-view-all>
      </template>
      <chp-carousel :key="carouselKey"
                    slot="body"
                    :perPage="1"
                    :autoplayHoverPause="true"
                    :paginationPadding="5"
                    :autoplayTimeout="15000">
        <chp-slide v-for="(book,index) in books" class="slide-wrapper" :key="index">
          <chp-feature-image :src='book.imagepath || book.image_link'/>
          <div class="mask">
            <h3><a :href="book.docpath" target="_blank" @click="display(book.id)">{{ $t("download")}}</a></h3>
          </div>
        </chp-slide>
      </chp-carousel>
    </chp-panel>
  </div>
</template>
<script>
  import trainingService from 'services/trainingService'
  import loading from 'src/mixins/loading'

  export default {
    mixins: [loading],
    data () {
      return {
        books: [],
        carouselKey: ''
      }
    },
    created () {
      this.fetchData()
      let self = this
      setTimeout(() => {
        self.carouselKey = Math.random()
      }, 500)
    },
    methods: {
      display (id) {
        this.$store.dispatch('statisticsBook', id)
      },
      async fetchData () {
        this.loadingStatus = true
        let {success, data} = await trainingService.getBook(this.$store.state.language === 'zh' ? 'mandarin' : 'english')
        this.loadingStatus = false
        if (success) {
          this.mapData(data)
        }
      },
      mapData (data) {
        if (!data.categorized) return
        let books = []
        for (let i in data.categorized) {
          books = [...books, ...data.categorized[i]]
        }
        this.books = books
      }
    },
    watch: {
      '$store.state.language': function () {
        this.fetchData()
      }
    }
  }
</script>
<style lang="less">
  @import "~assets/less/variable.less";
  @import "~assets/less/transition.less";

  .VueCarousel-pagination {
    float: none !important;
  }

  .slide-wrapper {
    position: relative;
    .mask {
      position: absolute;
      left: 0px;
      right: 0px;
      top: 0px;
      bottom: 0px;
      .display(flex);
      .align-items(center);
      .justify-content(center);
      transition: @material-enter;
      h3 {
        a {
          color: transparent;
        }
      }
      &:hover {
        h3 > a {
          color: @dark-color;
        }
        background-color: rgba(256, 256, 256, .6);
      }

    }
  }

  .size, .copy {
    text-align: center;
  }

  html.dark {
    .slide-wrapper {
      .mask {
        &:hover {
          h3 > a {
            color: @light-color;
          }
          background-color: rgba(0, 0, 0, .6)
        }

      }
    }
  }
</style>

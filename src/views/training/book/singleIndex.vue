<i18n src="../i18n.yaml"></i18n>
<template>
  <!--teaching 页面的首页-->
  <div class="container-fluid">
    <div class="book-header">
      <h3>
        <span class="mt-none">{{ $t('book.'+ $route.query.bookType) }}</span>
        <div class="pull-right action">
          <router-link to="?level=1">
            <button class="mb-xs mt-xs mr-xs btn btn-sm btn-primary mt-none">{{ $t('book.allBooks')}}</button>
          </router-link>
        </div>
      </h3>
    </div>

    <div class="media-gallery">
      <div class="row mg-files">
        <div v-for="book in loopList" class="col-sm-6 col-md-4 col-lg-3">
          <div class="thumbnail">
            <div class="image-box">
              <chp-feature-image :src='book.imagepath || book.image_link'/>
              <div class="description">
                <div class="word-box">
                  <small class="central-word" v-html="book.description"></small>
                </div>
              </div>
            </div>

            <h5 class="mb-xs mt-md">{{book.title}}</h5>
            <div class="mg-description">
              <ul class="notifications pull-right">
                <li>
                  <a v-bind:href="book.docpath" class="notification-icon" target="_blank">
                    <i class="fa fa-play"></i>
                  </a>
                </li>
                <li>
                  <a v-bind:href="book.docpath" class="notification-icon" download>
                    <i class="fa fa-download"></i>
                  </a>
                </li>
              </ul>
              <div class="text-muted">{{book.uploader_name}}</div>
              <small class="text-muted">{{book.upload_date}}</small>
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
      this.getCategoryBook();
    }
  },
  activated() {
    this.getCategoryBook()
  },
  methods: {
    async getCategoryBook() {
      this.$store.commit(SET_CONTENT_LOADING, true)
      let { success, data } = await trainingService.getCategoryBook(this.language == "zh" ? "mandarin" : "english", 
                                                                    this.$route.query.bookType)
      this.$store.commit(SET_CONTENT_LOADING, false)
      if (success) {
        this.loopList = data.paginatedList.data
      }
    },

  }
}
</script>

<style scoped>
.book-header {
  border-bottom: 1px solid #DADADA;
  margin-bottom: 15px;
}

.book-header .action {
  margin: -10px -5px;
}

.featured-image {
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  background: rgba(0, 0, 0, 0.1) no-repeat center;
  background-size: 100%;
}

.image-box {
  position: relative;
}

.description {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: none;
}

.image-box:hover .description {
  display: block;
}

.word-box {
  display: table;
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
}

.central-word {
  display: table-cell;
  vertical-align: middle;
  color: #fff;
  font-weight: 300;
}
</style>





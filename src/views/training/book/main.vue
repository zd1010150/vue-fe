<i18n src="../i18n.yaml"></i18n>
<template lang="html">
  <div class="container-fluid">
    <div v-for="category in categories" class="categories">
      <div class="book-header">
        <h3 class="title">
          <span class="mt-none">{{ $t('book.'+category.title) }}</span>
          <div class="pull-right action">
            <router-link v-bind:to="'?level=2&bookType='+ category.link">
              <button class="mb-xs mt-xs mr-xs btn btn-sm btn-primary"><i class="fa fa-info-circle mr-xs"></i>{{ $t('video.more')}}</button>
            </router-link>
          </div>
        </h3>
      </div>

      <div class="media-gallery">
        <div class="row mg-files">
          <div v-for="book in category.loop" class="col-sm-6 col-lg-3">
            <div class="thumbnail">              
                <div class="image-box">
                  <div class="featured-image" v-bind:style='{backgroundImage:"url(" + book.imagepath +")"}'></div>
                  <div class="description">
                    <div class="word-box">
                      <small class="central-word" v-html="book.description"></small>
                    </div>
                  </div>
                </div>
              <div>
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
      categories: [
        { title: 'articles', link: 'articles', loop: [] },
        { title: 'books', link: 'books', loop: [] }
      ]
    }
  },
  methods: {
    async fetchBook() {
      this.$store.commit(SET_CONTENT_LOADING, true)
      let { success, data } = await trainingService.getBook(this.language == "zh" ? "mandarin" : "english", "")
      this.$store.commit(SET_CONTENT_LOADING, false)
      if (success) {
        console.log(data);
        this.categories[0].loop = data.articles
        this.categories[1].loop = data.books
        // console.log(data);
      }
    },

    refresh() {
      this.fetchBook()
    }
  },
  watch: {
    "$store.state.language": function(val) {
      console.log(val);
      this.language = val
      this.fetchBook()
    }
  },
  created() {
    this.fetchBook()
  }
}

</script>
<style scoped>
.book-header {
  border-bottom: 1px solid #4C4C4C;
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
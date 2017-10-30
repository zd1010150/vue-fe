<i18n src="../i18n.yaml"></i18n>
<template lang="html">
  <div class="container-fluid">
    <div v-for="category in categories" class="categories">
      <div class="book-header">
        <h3 class="title">
          <span class="mt-none">{{ $t('book.'+category.code) }}</span>
          <div class="pull-right action">
            <router-link v-bind:to="'?level=2&bookCode='+category.code+'&bookType='+ category.id">
              <button class="mb-xs mt-xs mr-xs btn btn-sm btn-primary"><i class="fa fa-info-circle mr-xs"></i>{{ $t('video.more')}}</button>
            </router-link>
          </div>
        </h3>
      </div>

      <div class="media-gallery">
        <div class="row mg-files">
          <div v-for="book in category.children" class="col-sm-6 col-lg-3">
            <div class="thumbnail">              
                <div class="image-box">
                  <div class="featured-image" v-bind:style='{backgroundImage:"url(" + book.imagepath || book.image_link +")"}'></div>
                  <div class="description">
                    <div class="word-box">
                      <small class="central-word" v-html="book.description"></small>
                    </div>
                  </div>
                </div>
              <div>
                <h5 class="mb-xs mt-md"><chp-one-line :content='book.title' :lens="15"></chp-one-line></h5>
                <div class="mg-description">
                  <ul class="notifications pull-right">
                    <li>
                      <a v-bind:href="book.docpath" class="notification-icon" target="_blank" @click="display(book.id)">
                        <i class="fa fa-play"></i>
                      </a>
                    </li>
                    <li>
                      <a v-bind:href="book.docpath" class="notification-icon"  :download="book.title" target="_blank" @click="display(book.id)">
                        <i class="fa fa-download"></i>
                      </a>
                    </li>								
                  </ul>
                  <div class="text-muted">{{uploader[$store.state.language]}}</div>
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
import { ACY_BOOK_UPLOADER } from 'src/config/app.config.js'
export default {
  data() {
    return {
      language: this.$store.state.language,
      categories: [],
      uploader: ACY_BOOK_UPLOADER
    }
  },
  methods: {
    display(id){
      this.$store.dispatch("statisticsBook",id)
    },
    async fetchBook() {
      this.$store.commit(SET_CONTENT_LOADING, true)
      let { success, data } = await trainingService.getBook(this.language == "zh" ? "mandarin" : "english", "")
      this.$store.commit(SET_CONTENT_LOADING, false)
      if (success) {
        this.mapData(data)
      }
    },
    mapData(data){
      if(! (data && data.categorized && data.categories )) return
      let categories = []
      for (let categorized in data.categorized){
        let c_id = categorized,
            c_children = data.categorized[c_id],
            category =[]
        if(c_children && c_children.length > 0){
          category = data.categories.filter((c)=>{
              return c.id == c_id
          })[0]
          categories.push({code:category.code,children:c_children,id:category.id})
        }
      }
      this.categories = categories
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
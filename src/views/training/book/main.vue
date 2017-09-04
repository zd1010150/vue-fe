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
              <router-link :to="'?level=3&bookType='+category.link+'&bookId='+book.id">
                <div class="featured-image" v-bind:style='{backgroundImage:"url(" + book.imagepath +")"}'>
                  <div class="description">jdlkfjsldkjflskd jfasldkj</div>
                </div>
              </router-link>
              <div>
                <h5 class="mb-xs mt-md">{{book.title}}</h5>
                <div class="mg-description">
                  <div class="text-muted">{{book.uploader_name}}</div>
                  <small class="text-muted pull-right pt-xs">{{book.upload_date}}</small>
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
          { title: 'article', link: 'articles', loop: [] },
          { title: 'book', link: 'books', loop: [] }
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
      "$store.state.language": function (val) {
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
    padding-bottom: 100%;
    background: #eee no-repeat;
    background-size: 100%;
    position: relative;
    box-sizing: border-box;
  }
  .description {
    background:rgba(0,0,0,0.5);
  }
</style>
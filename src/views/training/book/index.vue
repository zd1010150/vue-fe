<template>
  <transition name="slide-fade" mode="out-in">
    <keep-alive>
      <component v-bind:is="currentView"></component>
    </keep-alive>
  </transition>
</template>
<script>
  import BookMain from './main.vue'
  import singleIndex from './singleIndex.vue'

  export default {
    data () {
      return {
        currentView: 'book-main'
      }
    },

    components: {
      'book-main': BookMain,
      'book-single-index': singleIndex

    },
    methods: {
      switchComponents (level) {
        if (level) {
          switch (Number(level)) {
            case 1:
              this.currentView = 'book-main'
              break
            case 2:
              this.currentView = 'book-single-index'
              break
          }
        } else {
          this.currentView = 'book-main'
        }
      }
    },
    created () {
      this.switchComponents(this.$route.query && this.$route.query.level)
    },
    watch: {
      '$route.query': function (val) {
        this.switchComponents(val && val.level)
      }
    }
  }
</script>

<template>
  <header class="page-header">
    <span class="sidebar-toggle hidden-xs" @click="openLeftSidenav" v-if="isShowToggle">
      <i class="fa fa-bars" aria-label="Toggle sidebar"></i>
    </span>
    <h2>{{ $t("pageTitle." + pageHeader)}}</h2>

  </header>
</template>
<script>
  import { SET_LEFT_SIDE_BAR_STATUS } from 'store/mutation-types'

  export default {
    name: 'pageHeader',
    data () {
      return {
        pageHeader: '',
        isShowToggle: false
      }
    },
    beforeMount () { // before mount会在render之前调用
      this.pageHeader = this.$route.meta.pageTitle
    },
    methods: {
      openLeftSidenav () {
        this.$store.commit(SET_LEFT_SIDE_BAR_STATUS, true)
      }
    },
    watch: {
      $route (val, oldVal) {
        this.pageHeader = val.meta.pageTitle
      },
      '$store.state.leftSideBarStatus': function (val) {
        this.isShowToggle = !val
      }
    }
  }
</script>
<style lang="less">
  @import "~assets/less/variable.less";

  .sidebar-toggle {
    background-color: @light-component-accent-bg-color;
    width: 73px;
    height: 50px;
    display: inline-block;
    float: left;
    line-height: 50px;
    font-size: 1.7rem;
    text-align: center;
  }

  html.dark {
    .sidebar-toggle {
      background-color: @dark-component-accent-bg-color;
    }
  }
</style>

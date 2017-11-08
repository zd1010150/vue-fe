<template>
  <div class="header">
    <div class="logo-container">
      <a href="#/main" class="logo"><img src="static/images/logo.png" alt="cloudhub client 2.0"></a>
      <div class="toggle-sidebar-left visible-xs" @click="toggleSidebarOpen">
        <i class="fa fa-bars" aria-label="Toggle sidebar"></i>
      </div>
    </div>
    <div class="header-right">
      <chp-top-bar-notification></chp-top-bar-notification>
      <!-- <span class="separator"></span>
      <chp-top-bar-language></chp-top-bar-language>
      <span class="separator no-right-margin"></span> -->
      <chp-top-bar-userbox></chp-top-bar-userbox>
    </div>
  </div>
</template>

<script>
  import ChpTopBarLanguage from './language.vue'
  import ChpTopBarNotificateion from './notification/index'
  import ChpTopBarUserbox from './userbox'
  import { SET_LEFT_SIDE_BAR_STATUS } from 'store/mutation-types'

  export default {
    name: 'chpTopBar',
    props: ['username'],
    components: {
      'chp-top-bar-language': ChpTopBarLanguage,
      'chp-top-bar-notification': ChpTopBarNotificateion,
      'chp-top-bar-userbox': ChpTopBarUserbox
    },

    methods: {
      toggleSidebarOpen () {
        let $html = document.querySelector('html')
        $html.classList.toggle('sidebar-left-opened')
        this.$store.commit(SET_LEFT_SIDE_BAR_STATUS, !this.$store.state.leftSideBarStatus)
      }
    }

  }
</script>
<style lang="less">
  @import "~lesshat/lesshat.less";

  .header-right {
    .separator.no-right-margin {
      margin-right: 0px;
    }
  }


</style>

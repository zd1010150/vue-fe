
<template>
  <div class="header">
      <div class="logo-container">
        <a href="www.acy.com" class="logo"><img src="static/images/logo.png" alt="cloudhub client 2.0"></a>
          <div class="toggle-sidebar-left visible-xs" @click="toggleSidebarOpen">
            <i class="fa fa-bars" aria-label="Toggle sidebar"></i>
          </div>
      </div>
      <div class="header-right">
        <chp-top-bar-notification></chp-top-bar-notification>
        <span class="separator"></span>
        <chp-top-bar-language></chp-top-bar-language>
        <span class="separator"></span>
        <chp-top-bar-userbox></chp-top-bar-userbox>
      </div>
  </div>
</template>

<script>


  import ChpTopBarLanguage from './language.vue'
  import ChpTopBarNotificateion from './notification'
  import ChpTopBarUserbox from "./userbox"
  export default {
    name: "chpTopBar",
    props: ["username"],
    components: {
      "chp-top-bar-language": ChpTopBarLanguage,
      "chp-top-bar-notification":ChpTopBarNotificateion,
      "chp-top-bar-userbox":ChpTopBarUserbox
    },
    
    methods: {
      toggleSidebarOpen(){
        let $html = document.querySelector("html");
        $html.classList.toggle("sidebar-left-opened");
      }
    }

  }
</script>
<style lang="less">
  @import "~lesshat/lesshat.less";

  
  .notifications {
    /*margin: 4px 0px 0px;*/
  }

  /*.userbox {
    display: inline-block;
    margin: 0px 10px 0px;

    .mu-item-title {
      font-size: 1.2rem;
    }

    .userbox-setting {
      overflow: visible;
      padding: 0px;
      .mu-item-content {
        .flex(none);
        width: 63px;
      }

      .userbox-operation-list {
        position: absolute;
        overflow: visible;
        padding: 8px 0px 0px;
        .mu-item-content {
          .flex(1);
          width: auto;
        }
        .mu-item {
          padding: 16px 0px;
        }
        .mu-item-wrapper {

          &>div{
            margin-left: 0px !important;
          }

          .show-left {
            padding-left: 60px;
          }

        }
      }
    }
  }*/
</style>

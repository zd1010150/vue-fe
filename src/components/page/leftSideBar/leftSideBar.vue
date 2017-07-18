<template lang="html">

    <aside id="sidebar-left" class="sidebar-left">
      <div class="sidebar-header">

        <!-- <div class="sidebar-title">
          Navigation
        </div>
        <div class="sidebar-toggle hidden-xs" data-toggle-class="sidebar-left-collapsed" data-target="html" data-fire-event="sidebar-left-toggle">
          <i class="fa fa-bars" aria-label="Toggle sidebar"></i>
        </div> -->
      </div>
      <div class="sidebar-body">
        <chp-left-side-bar-profile></chp-left-side-bar-profile>
        <chp-scroll-bar wrapper="nav-main-wrapper" vBarInternal="vueScrollInternalBar" vBar="vueScrollBar">
          <chp-left-side-bar-menu></chp-left-side-bar-menu>
          <chp-left-side-bar-contact></chp-left-side-bar-contact>
        </chp-scroll-bar>
      </div>
    </aside>

</template>

<script>
  import Profile from "./profile.vue"
  import Menu from "./menu.js"
  import Contact from "./contact.vue"
export default {
  name:"topbar",
  data(){
    return {

    }
  },
  components : {
    "chp-left-side-bar-profile" : Profile,
    "chp-left-side-bar-menu" : Menu,
    "chp-left-side-bar-contact" : Contact
  },
  methods: {
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
    toggleRightSidenav() {
      this.$refs.rightSidenav.toggle();
    },
    closeRightSidenav() {
      this.$refs.rightSidenav.close();
    },
    open(ref) {
      console.log('Opened: ' + ref);
    },
    close(ref) {
      console.log('Closed: ' + ref);
    }
  }
}
</script>

<style lang="less">
@import "~assets/less/variable.less";
.nav-main-wrapper{

  /*max-height:~"calc(100% - 168px)";*/
  overflow:hidden;
  width:300px;
  height:~"calc(100% - 168px)";

}
@media only screen and (max-width: 767px){
  .nav-main-wrapper{

  width:100%;
  height:~"calc(100% - 144px)";

  }
}
.leftsidebar-menu-list.mu-list{
  width:324px;
  /*padding:10px 24px 0px 0px !important;*/
  &>div{
    border-right: 4px solid @sidebar-border-color;
  }
    .mu-item{
      &.show-left{
        padding:12px 25px 12px 25px;
       }
       .mu-item-left{
         left:20px;
       }
    }
}
html.sidebar-light{
  .leftsidebar-menu-list.mu-list >div{

  border-right: none;
 }
}
@media only screen and (max-width: 767px){
  .nav-main-wrapper,.leftsidebar-menu-list.mu-list{
  width:100%;
  }
}
</style>

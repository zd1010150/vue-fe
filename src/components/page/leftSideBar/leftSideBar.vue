<template lang="html">

<mu-drawer  :docked="true" class="sidebar-left" id="sidebar-left"  :open="showSideBar">
      <div class="sidebar-header">
          <div class="sidebar-title hidden-xs">
            Navigation
          </div>
          <div class="sidebar-toggle hidden-xs" @click="closeLeftSidenav" >
            <i class="fa fa-bars" aria-label="Toggle sidebar"></i>
          </div> 
        </div>
        
          <div class="sidebar-body">
            <chp-left-side-bar-profile></chp-left-side-bar-profile>
            <chp-scroll-bar wrapper="nav-main-wrapper" vBarInternal="vueScrollInternalBar" vBar="vueScrollBar">
              <chp-left-side-bar-menu></chp-left-side-bar-menu>
              <chp-left-side-bar-contact></chp-left-side-bar-contact>
            </chp-scroll-bar>
          </div>
      
</mu-drawer>
      
        
     
       
    
</template>

<script>
  import Profile from "./profile.vue"
  import Menu from "./menu.vue"
  import Contact from "./contact.vue"
  import { SET_LEFT_SIDE_BAR_STATUS } from "store/mutation-types"
export default {
  name:"topbar",
  data(){
    return {
      showSideBar:this.$store.state.leftSideBarStatus
    }
  },
  components : {
    "chp-left-side-bar-profile" : Profile,
    "chp-left-side-bar-menu" : Menu,
    "chp-left-side-bar-contact" : Contact
  },
  methods: {
    closeLeftSidenav() {
      this.$store.commit(SET_LEFT_SIDE_BAR_STATUS,false);
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
    },
    toggleSidebarStatus(show){
      let $html = document.querySelector("html");
      $html.classList.toggle("sidebar-left-hidden",!show);
    }
  },
  watch:{
    "$store.state.leftSideBarStatus" : function(val){
      this.showSideBar = val;
      this.toggleSidebarStatus(val);
    }
  }
}
</script>

<style lang="less">
@import "~assets/less/variable.less";
@import "~assets/less/transition.less";
.sidebar-left{
  overflow: hidden;
}
.nav-main-wrapper{

  /*max-height:~"calc(100% - 168px)";*/
  overflow:hidden;
  width:300px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  height:~"calc(100% - 200px)";

}
.chp-list{
  width:307px;
}
@media only screen and (max-width: 767px){
  .nav-main-wrapper{

  width:100%;
  height:~"calc(100% - 144px)";

  }
  .chp-list{
    width:100%;
    .chp-inset .chp-list-item-container{
      padding-right: 5px;
    }
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
.mu-drawer{
  width:300px;
}


</style>

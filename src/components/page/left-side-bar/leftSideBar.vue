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
        <chp-left-side-bar></chp-left-side-bar>
      <chp-scroll-bar wrapper="nav-main-wrapper" vBarInternal="vueScrollInternalBar" vBar="vueScrollBar">
        <mu-list class="leftsidebar-menu-list">
          <mu-list-item title="Sent mail">
            <mu-icon slot="left" value="send"/>
          </mu-list-item>
          <mu-list-item title="Drafts">
            <mu-icon slot="left" value="drafts"/>
          </mu-list-item>
          <mu-list-item title="Inbox" toggleNested>
            <mu-icon slot="left" value="inbox"/>
            <mu-list-item slot="nested" title="Starred">
              <mu-icon slot="left" value="grade"/>
            </mu-list-item>
            <mu-list-item slot="nested" disabled title="Sent mail very longlong long long div" toggleNested>
              <mu-icon slot="left" value="send"/>
              <mu-list-item title="Drafts" slot="nested">
                <mu-icon slot="left" value="drafts"/>
              </mu-list-item>
            </mu-list-item>
            <mu-list-item slot="nested" title="Inbox" toggleNested>
              <mu-icon slot="left" value="inbox"/>
              <mu-list-item title="Drafts" slot="nested">
                <mu-icon slot="left" value="drafts"/>
              </mu-list-item>
              <mu-list-item title="Drafts" slot="nested">
                <mu-icon slot="left" value="drafts"/>
              </mu-list-item>
              <mu-list-item title="Drafts" slot="nested">
                <mu-icon slot="left" value="drafts"/>
              </mu-list-item>
              <mu-list-item title="Drafts" slot="nested">
                <mu-icon slot="left" value="drafts"/>
                <mu-list-item title="Drafts" slot="nested">
                  <mu-icon slot="left" value="drafts"/>
                </mu-list-item>
                <mu-list-item title="Drafts" slot="nested">
                  <mu-icon slot="left" value="drafts"/>
                </mu-list-item>
                <mu-list-item title="Drafts" slot="nested">
                  <mu-icon slot="left" value="drafts"/>
                </mu-list-item>
                <mu-list-item title="Drafts" slot="nested">
                  <mu-icon slot="left" value="drafts"/>
                </mu-list-item>
                <mu-list-item title="Drafts" slot="nested">
                  <mu-icon slot="left" value="drafts"/>
                </mu-list-item>
                <mu-list-item title="Drafts" slot="nested">
                  <mu-icon slot="left" value="drafts"/>
                </mu-list-item>
                <mu-list-item title="Drafts" slot="nested">
                  <mu-icon slot="left" value="drafts"/>
                </mu-list-item>
                <mu-list-item title="Drafts" slot="nested">
                  <mu-icon slot="left" value="drafts"/>
                </mu-list-item>
                <mu-list-item title="Drafts" slot="nested">
                  <mu-icon slot="left" value="drafts"/>
                </mu-list-item>
                <mu-list-item title="Drafts" slot="nested">
                  <mu-icon slot="left" value="drafts"/>
                </mu-list-item>
              </mu-list-item>
            </mu-list-item>
          </mu-list-item>
        </mu-list>
      </chp-scroll-bar>
      </div>
      
    </aside>

</template>

<script>
  import profile from "./profile.vue"
export default {
  name:"topbar",
  data(){
    return {

    }
  },
  components : {
    "chp-left-side-bar" : profile
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
  max-height:100%;
  overflow:hidden;
  width:300px;
  height:100%;
  
}
@media only screen and (max-width: 767px){
  .nav-main-wrapper{
  
  width:100%;
  
  
  }
}
.leftsidebar-menu-list.mu-list{
  width:324px;
  padding:0px 24px 0px 0px !important;
  &>div{
    border-right: 4px solid @sidebar-border-color;
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

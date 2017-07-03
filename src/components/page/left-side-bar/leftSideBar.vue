<template lang="html">
  <aside id="sidebar-left" class="sidebar-left">
    <div class="sidebar-header">
      <div class="logo"> <strong>CloudHub Client</strong></div>
      <div class="sidebar-title">
        Navigation
      </div>
      <div class="sidebar-toggle hidden-xs" data-toggle-class="sidebar-left-collapsed" data-target="html" data-fire-event="sidebar-left-toggle">
        <i class="fa fa-bars" aria-label="Toggle sidebar"></i>
      </div>
    </div>
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
  </aside>
</template>

<script>
  import profile from "./profile.vue"
export default {
  name:"topbar",
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

<style lang="scss">

.nav-main-wrapper{
  max-height:100%;
  overflow:hidden;
  width:300px;
  height:100%;
}
.leftsidebar-menu-list.mu-list{
  padding-right: 26px !important;
}

</style>

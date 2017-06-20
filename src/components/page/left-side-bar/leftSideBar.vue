<template lang="html">
  <aside id="sidebar-left" class="sidebar-left">
    <div class="sidebar-header">
      <div class="sidebar-title">
        Navigation
      </div>
      <div class="sidebar-toggle hidden-xs" data-toggle-class="sidebar-left-collapsed" data-target="html" data-fire-event="sidebar-left-toggle">
        <i class="fa fa-bars" aria-label="Toggle sidebar"></i>
      </div>
    </div>
    <chp-scroll-bar wrapper="nav-main-wrapper" vBarInternal="vueScrollInternalBar" vBar="vueScrollBar">
      <chp-list class="nav-main">
        <chp-list-item >
          <a>
            <i class="fa fa-home" aria-hidden="true">

            </i>
            <span>News</span>
          </a>


          <chp-list-expand>
            <chp-list>
              <chp-list-item class="chp-inset" >World</chp-list-item>

            </chp-list>
          </chp-list-expand>
        </chp-list-item>

        <chp-list-item >
          <a>
            <i class="fa fa-columns" aria-hidden="true"></i>
            <span>Games</span>
          </a>

          <chp-list-expand >
            <chp-list>
              <chp-list-item class="chp-inset">Console</chp-list-item>
              <chp-list-item class="chp-inset">PC</chp-list-item>
              <chp-list-item class="chp-inset">Phone</chp-list-item>
            </chp-list>
          </chp-list-expand>
        </chp-list-item>

        <chp-list-item >
          <a>
            <i class="fa fa-columns" aria-hidden="true"></i>
            <span>Video</span>
          </a>
          <chp-list-expand>
            <chp-list>
              <chp-list-item class="chp-inset">Humor</chp-list-item>
              <chp-list-item class="chp-inset">Music</chp-list-item>
              <chp-list-item class="chp-inset">Movies</chp-list-item>
              <chp-list-item class="chp-inset">TV Shows</chp-list-item>
            </chp-list>
          </chp-list-expand>
        </chp-list-item>

        <chp-list-item href="javascript:void(0)">
          <a>
            <i class="fa fa-columns" aria-hidden="true"></i>
            <span>Shop</span>
          </a>
        </chp-list-item>
      </chp-list>
    </chp-scroll-bar>
  </aside>
</template>

<script>
export default {
  name:"sidebar",
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
.phone-viewport{
  overflow: hidden;
}
.nav-main-wrapper{
  max-height:100%;
  overflow:hidden;
  width:300px;
  height:100%;
}
.nav-main{

  .chp-list-item.chp-inset {
    .chp-list-item-container{
      padding-left: 1.6em;
    }
  }
  .chp-list-expand-container{
    padding:0px 16px;
  }
}
html.dark{
  .nav-main{
    color: #abb4be;

    i.chp-list-expand-indicator{
      font-size:1.1rem;
    }
    .chp-list-expand-container{
      background-color: #191c21;
    }
  }
}
</style>

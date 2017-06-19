<template lang="html">
  <div class="phone-viewport" >
    <div class="sidebar-header">
      <div class="sidebar-title">
        Navigation
      </div>
      <div class="sidebar-toggle hidden-xs" data-toggle-class="sidebar-left-collapsed" data-target="html" data-fire-event="sidebar-left-toggle">
        <i class="fa fa-bars" aria-label="Toggle sidebar"></i>
      </div>
    </div>
    <chp-list class="nav-main">
      <chp-list-item>
        <i class="fa fa-home" aria-hidden="true"></i>
        <span>News</span>

        <chp-list-expand>
          <chp-list>
            <chp-list-item class="chp-inset">World</chp-list-item>
            <chp-list-item class="chp-inset">Americas</chp-list-item>
            <chp-list-item class="chp-inset">Europe</chp-list-item>
          </chp-list>
        </chp-list-expand>
      </chp-list-item>

      <chp-list-item>
        <i class="fa fa-columns" aria-hidden="true"></i>
        <span>Games</span>

        <chp-list-expand>
          <chp-list>
            <chp-list-item class="chp-inset">Console</chp-list-item>
            <chp-list-item class="chp-inset">PC</chp-list-item>
            <chp-list-item class="chp-inset">Phone</chp-list-item>
          </chp-list>
        </chp-list-expand>
      </chp-list-item>

      <chp-list-item>
        <i class="fa fa-columns" aria-hidden="true"></i>
        <span>Video</span>

        <chp-list-expand>
          <chp-list>
            <chp-list-item class="chp-inset">Humor</chp-list-item>
            <chp-list-item class="chp-inset">Music</chp-list-item>
            <chp-list-item class="chp-inset">Movies</chp-list-item>
            <chp-list-item class="chp-inset">TV Shows</chp-list-item>
          </chp-list>
        </chp-list-expand>
      </chp-list-item>

      <chp-list-item>
        <i class="fa fa-columns" aria-hidden="true"></i>
        <span>Shop</span>
      </chp-list-item>
    </chp-list>
</div>
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

<style lang="css" scoped  >
.phone-viewport{
  overflow: hidden;
}
</style>

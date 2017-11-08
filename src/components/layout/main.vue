<template>
  <section class="body">
    <chp-top-bar></chp-top-bar>

    <div class="inner-wrapper">

      <chp-left-side-bar></chp-left-side-bar>
      <section role="main" class="content-body" :class="{'loading-overlay-showing':isLoading}">
        <chp-page-header></chp-page-header>
        <slot name="content-body"></slot>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
        <div class="loading-overlay content-loading">
          <div class="bounce-loader">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
          </div>
        </div>
      </section>
    </div>
    <aside class="sidebar-right" id="sidebar-right">
      <chp-right-side-bar></chp-right-side-bar>
    </aside>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        isLoading: false
      }
    },

    watch: {
      '$store.state.contentLoading': function (val) {
        this.isLoading = val
      }
    }
  }
</script>
<style lang="less">
  .page-loading {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    z-index: 9999999;
  }
</style>

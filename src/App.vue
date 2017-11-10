<template>
  <div id="app" :class="{'loading-overlay-showing':isLoading}" class="app-mask">

    <router-view></router-view>
    <div class="loading-overlay page-loading">
      <div class="bounce-loader">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        isLoading: false
      }
    },
    watch: {
      '$store.state.asyncLoading' (val) {
        this.isLoading = val
      }
    }
  }
</script>

<style lang="less">
  #app {
    position: relative;
  }

  .app-mask.loading-overlay-showing .page-loading {
    background-color: rgba(255, 255, 255, .5);
  }

  html.dark {
    .app-mask.loading-overlay-showing .page-loading {
      background-color: rgba(0, 0, 0, .5);
    }
  }

  .body-error.error-inside.update-browser-tips {
    display: table;
    height: 100vh;
    margin-top: 0px;
    .center-error {
      display: table-cell;
      vertical-align: middle;

    }
  }
</style>

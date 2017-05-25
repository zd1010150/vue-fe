<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <topbar></topbar>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-3 col-lg-3">
        <sidebar></sidebar>
      </div>
      <div class="col-xl-9 col-lg-9 col-md-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from "components/page/sidebar"
import topbar from "components/page/topbar"
export default {
  name:"main",
  components:{
    sidebar:sidebar,
    topbar:topbar
  }
}
</script>

<style lang="css">
</style>

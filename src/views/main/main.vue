<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-xl-12 col-lg-12 col-  12 col-sm-12">
        <div>
         </div>
        <topbar :username="username"></topbar>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-3 col-lg-3">
        <sidebar></sidebar>
      </div>
      <div class="col-xl-9 col-lg-9 col-  12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import sidebar from "components/page/sidebar"
  import topbar from "components/page/topbar"

  export default {
    name: "main",
    components: {
      sidebar: sidebar,
      topbar: topbar
    },
    data(){
      return {
          radio1:"2"
      }
    },
    computed: {
      username (){
        if (this.$store.state.userInfo) {
          return this.$store.state.userInfo.name;
        } else {
          return ""
        }
        ;
      }
    }
  }
</script>

<style lang="css">
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'app',
    created(){
        console.log("app created");
    },
    beforeDestroy(){
      console.log("app beforedestorey");
    }
  }
</script>

<style scoped>

</style>

<template lang="html">
  <chp-main-layout>
    <div class="container" slot="content-body">
      this is page content
    </div>
    </div>

  </chp-main-layout>

</template>

<script>


  export default {
    name: "main",
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

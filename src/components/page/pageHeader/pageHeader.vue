<template>
  <header class="page-header">
    <h2>{{ $t("pageTitle."+pageHeader)}}</h2>

  </header>
</template>
<script>
  export default{
    name: "pageHeader",
    data(){
      return {
        pageHeader: "",
      }
    },
    mounted(){
      this.pageHeader = this.$route.meta.pageTitle;
    },
    watch: {
      $route(val, oldVal){
        if (val == oldVal) {
          return;
        }
        else {
          this.pageHeader = val.meta.pageTitle;
        }
      }
    }
  }
</script>

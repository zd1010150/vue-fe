<template></template>

<script>
  export default {
    name: "chp-theme",
    data(){
      return {
        theme: this.$store.state.theme
      }
    },
    watch: {
      theme: function (newTheme) {
        this.switchTheme(newTheme);
      }
    },
    methods: {
      switchTheme(newTheme){
        let $html = document.querySelector("html");
        $html.classList.toggle("dark",newTheme == "dark");
      }
    }
  }

</script>

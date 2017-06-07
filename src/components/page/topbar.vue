<template lang="html">
  <div>
    usernameis :{{ username }}
    <button v-on:click = "logout">logout</button>
  </div>

</template>

<script>
export default {
  name:"topbar",
  props:["username"],
  data(){
      return {}
  },
  methods:{
    logout(){
      this.$store.dispatch("logout").then(()=>{
          this.$router.push("/");
      })
    }
  }
}
</script>

<style lang="css">
</style>

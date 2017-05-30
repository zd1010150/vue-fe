<template>
<div>

  <form>
    <div class="form-group">
      <label for="formGroupExampleInput">name:</label>
      <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input" v-model="username">
    </div>
    <div class="form-group">
      <label for="formGroupExampleInput2">pwd</label>
      <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input" v-model="password">
    </div>
    <div class="form-group">
      <button v-on:click="login()">login</button>
    </div>
  </form>
</div>
</template>
<script type="text/javascript">
export default {
  name: "login",
  state: {
    username:"",
    password:""
  },
  methods: {
    login (){
      this.$store.dispatch('login',this.state.username,this.state.password).then(() => {
          this.$router.push({
              path : ''
          });
      }).catch( (err) => {
       this.$store.dispatch('')
      });
    }
  }
}
</script>

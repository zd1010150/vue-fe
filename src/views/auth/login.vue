<template>
<div>

  <form>
    <div class="form-group">
      <label for="formGroupExampleInput">name:</label>
      <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input">
    </div>
    <div class="form-group">
      <label for="formGroupExampleInput2">pwd</label>
      <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input">
    </div>
    <div class="form-group">
      <button v-on:click="goToMain()">login</button>
    </div>
  </form>
</div>
</template>
<script type="text/javascript">
export default {
  name: "login",
  methods: {
    goToMain (){
      this.$router.push({name:"dashboard"});
    }
  }
}
</script>

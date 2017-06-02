<template>
  <div>

    <form class="login-form" v-on:submit="login">
      <div class="form-group">
        <label for="formGroupExampleInput">name:</label>
        <input type="text" class="form-control" name="username" id="formGroupExampleInput" placeholder="Example input"
               v-model="username">
      </div>
      <div class="form-group">
        <label for="formGroupExampleInput2">pwd</label>
        <input type="text" class="form-control" name="password" id="formGroupExampleInput2" placeholder="Another input"
               v-model="password">
      </div>
      <div class="form-group">
        <button >login</button>
      </div>
    </form>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: "login",
    data () {
      return {
        username: "",
        password: ""
      }
    },
    methods: {
      login (e){
        e.preventDefault();
        this.$store.dispatch('login',{username:this.username,password:this.password}).then((success) => {
            if(success){
              this.$router.push({
                path: '/main'
              });
            }else{
                alert("login fail");
            }


        });
      }
    }
  }
</script>

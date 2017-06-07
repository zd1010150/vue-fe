<i18n>
  en:
    login:
      email: "Email"
      password: "Password"
      loginError: "Login Fail"
      getUserInfoError: "Get User information Error"
  zh:
    login:
      email: "电子邮件"
      password: "密码"
      loginError: "登录失败"
      getUserInfoError: "获取用户信息失败"
</i18n>
<template>
  <div>

    <form class="login-form" v-on:submit="login">
      <div class="form-group">
        <label for="formGroupExampleInput"> {{ $t("login.email") }} </label>
        <input type="email" class="form-control" name="email"  placeholder="Example input"
               v-model="email">
      </div>
      <div class="form-group">
        <label for="formGroupExampleInput2">{{ $t("login.password") }} </label>
        <input type="password" class="form-control" name="password"  placeholder="Another input"
               v-model="password">
      </div>
      <div class="form-group">
        <div v-if="loginError"> {{ errorInfo }}</div>
        <button >login</button>
      </div>
    </form>
  </div>
</template>
<script type="text/javascript">
  import userService from 'services/userService.js'
  export default {
    name: "login",
    data () {
      return {
        email: "",
        password: "",
        loginError:false,
        errorInfo : ""
      }
    },
    methods: {
      login (e){
        e.preventDefault();

        this.$store.dispatch('login',new FormData(document.querySelector(".login-form"))).then(({success}) => {
            if(success){
              this.$store.dispatch('getUserInfo').then(({success}) => {
                  if(success){
                      this.$router.push("/main");
                  }else{
                      this.loginError = true;
                      this.errorInfo = this.$t("login.getUserInfoError")
                  }

              });

            }else{
                this.loginError = true;
                this.errorInfo = this.$t("login.loginError")
            }
        });
      }
    }
  }
</script>

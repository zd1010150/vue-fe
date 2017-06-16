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
   <logLayout >
     <form class="login-form" v-on:submit="login" slot="content">
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
         <chp-button classes='btn-lg btn-primary' type="submit">login</chp-button>
       </div>
     </form>

   </logLayout>
    <chp-button classes='btn-xm btn-primary' @click="buttonClickHandler">login</chp-button>
  </div>
</template>
<script type="text/javascript">
  import logLayout from 'components/layout/log'
  import userService from 'services/userService.js'
  export default {
    name: "login",
    components:{
        logLayout : logLayout
    },
    data () {
      return {

        email: "",
        password: "",
        loginError:false,
        errorInfo : ""
      }
    },
    methods: {
      buttonClickHandler(){
        console.log("====button click handler");
      },
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
  /*email: "wei.bai0736@gmail.com",
   password: "11111111",*/
</script>

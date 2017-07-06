<i18n src="./i18n.yaml"></i18n>

<template>
  <div>
   <chp-log-layout >
     <chp-panel slot="content" :isHeaderTransparent="true" :canClose="false" :canCollapse="false" :titles="{mainTitle:'login'}" class="panel-sign">

       <div slot="title" class="panel-title-sign mt-xl text-right">
         <h2 class="title text-uppercase text-weight-bold m-none"><i class="fa fa-user mr-xs"></i> Sign In</h2>
       </div>
       <form class="login-form" v-on:submit="login" slot="body">

         <div class="form-group mb-lg">
           <div class="clearfix">
             <label class="pull-left">Username</label>
           </div>
           <div class="input-group input-group-icon">
          <!--   <input type="email" name="email"  placeholder="Example input" v-model="email" class="form-control input-lg">-->
             <mu-text-field :hintText="$t('login.placeholderEmail')" v-model="email" class="form-control input-lg" name="email" type="email"/>
             <span class="input-group-addon">
										<span class="icon icon-lg">
											<i class="fa fa-user"></i>
										</span>
									</span>
           </div>
         </div>

         <div class="form-group mb-lg">
           <div class="clearfix">
             <label class="pull-left">Password</label>
             <a href="pages-recover-password.html" class="pull-right">Lost Password?</a>
           </div>
           <div class="input-group input-group-icon">
             <mu-text-field :hintText="$t('login.placeholderPwd')" v-model="password" class="form-control input-lg" name="password" type="password"/>


             <span class="input-group-addon">
										<span class="icon icon-lg">
											<i class="fa fa-lock"></i>
										</span>
									</span>
           </div>
         </div>


         <div class="row">
           <div class="col-sm-8">
             <div class="">
               <!--<input id="RememberMe" name="rememberme" type="checkbox">-->
               <mu-checkbox label="Remember Me" class="demo-checkbox" id="RememberMe" name="rememberme"/>
               <!--<label for="RememberMe">Remember Me</label>-->
             </div>
           </div>
           <div class="col-sm-4 text-right">
             <chp-button type="submit" class="btn btn-primary hidden-xs">Sign In</chp-button>
             <button type="submit" class="btn btn-primary btn-block btn-lg visible-xs mt-lg">Sign In</button>
           </div>
         </div>
       </form>


     </chp-panel>

   </chp-log-layout>

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
<style>
  .mu-text-field{
    font-size:1.2rem;
  }
</style>


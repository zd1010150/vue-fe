<i18n src="./i18n.yaml"></i18n>

<template>
  <div>
    <chp-log-layout>
      <chp-panel slot="content" :isHeaderTransparent="true" :canClose="false" :canCollapse="false"
                 :titles="{mainTitle:'login'}" class="panel-sign">

        <div slot="title" class="panel-title-sign mt-xl text-right">
          <h2 class="title text-uppercase text-weight-bold m-none"><i class="fa fa-user mr-xs"></i> 
            Recover Password
          </h2>
        </div>

        <form slot="body" class="login-form" @submit.prevent="checkEmail">
          <div class="alert alert-info">
              <p class="m-none text-weight-semibold h6">Enter your e-mail below and we will send you reset instructions!</p>
          </div>
          <div class="form-group mb-lg required-field " :class="errorClass('email')">
            
            <div class="input-group ">
              <mu-text-field v-validate="'required|email'" data-vv-value-path="model.email" data-vv-name="email"
                             :hintText="$t('login.placeholderEmail')" class="form-control input-lg" name="email"
                             type="email"  v-model="model.email"  id="email"/>
                   <span class="input-group-btn">
                    <button class="btn btn-primary btn-lg" type="submit">Reset!</button>
                  </span>
            </div>

            <span slot="required" class="error"
                  v-if="errors.has('email:required')">{{ errors.first('email:required')}}</span>
            <span slot="email" class="error" v-if="errors.has('email:email')">{{ errors.first('email:email')}}</span>
          </div>
          <p class="text-center mt-lg">Remembered? <a href="pages-signin.html">Sign In!</a></p>
        </form>
      </chp-panel>
    </chp-log-layout>
  </div>
</template>
<script type="text/javascript">

  import validateMixin from 'mixins/validatemix.js'
  import pwdService from 'services/pwdService'
  
  export default {
    name: "login",
    mixins: [validateMixin],
    data () {
      return {
        loading:false,
        model: {
          email: ""
        }
      }
    },
    methods: {
      async checkEmail (e){
        
          let validateResult = await this.$validator.validateAll();
          console.log(window.location.origin +this.$router.resolve("/resetPassword").href,"++++++")
          //if(validateResult){
          if(true){
            this.loading = true;
            let {message,success} = await pwdService.checkEmail(this.model.email)
            this.loading = false;
             if(success){
               
              let {message,success} = await pwdService.resetPwd(this.model.email,"")    
            }
          }
        }
      
    },
    mounted(){
       let self = this;
        setTimeout(()=>{
          let $pwd = document.querySelector("input[name=password]"),
              $email = document.querySelector("input[name=email]");
          if($pwd && $email &&( $pwd.value || $email.value )){
            document.querySelector("#password .mu-text-field-hint").classList.remove('show');

          }
        },500);
    },
    watch: {
      errors(val, oldVal){
        console.log("errors", val);
      },
      model(val){
        console.log("model", val);
      }
    }
  }
</script>
<style>
  .mu-text-field {
    font-size: 1.2rem;
  }

  .panel-sign .panel-heading {
    top: 7px;
  }
</style>


<i18n src="./i18n.yaml"></i18n>

<template>
  <div>
    <chp-log-layout>
      <chp-panel slot="content" :isHeaderTransparent="true" :canClose="false" :canCollapse="false"
                 :titles="{mainTitle:'login'}" class="panel-sign">

        <div slot="panelTitle" class="panel-title-sign mt-xl text-right">
          <h2 class="title text-uppercase text-weight-bold m-none"><i class="fa fa-user mr-xs"></i> 
            {{ $t("applyResetPwd.title") }}
          </h2>
        </div>

        <form slot="body" class="login-form" @submit.prevent="checkEmail">
          <div class="alert alert-info">
              <p class="m-none text-weight-semibold h6">{{ $t("applyResetPwd.tips") }}</p>
          </div>
          <div class="form-group mb-lg required-field " :class="errorClass('email')">
            <div class="input-group ">
              <mu-text-field v-validate="'required|email'" 
              data-vv-value-path="model.email" 
              data-vv-name="email"
                             :hintText="$t('login.placeholderEmail')" 
                             class="form-control input-lg" 
                             name="email"
                             type="email"  
                             v-model="model.email"  
                             id="email"/>
                   <span class="input-group-btn">
                    <button class="btn btn-primary btn-lg" type="submit">{{ $t('ui.button.resetPwd') }}!</button>
                  </span>
            </div>
            <span slot="required" class="error" v-if="errors.has('email:required')">
              {{ errors.first('email:required')}}
            </span>
            <span slot="email" class="error" v-if="errors.has('email:email')">
              {{ errors.first('email:email')}}
            </span>
          </div>
          <p class="text-center mt-lg">
            {{ $t("applyResetPwd.remember") }}? 
            <router-link to="/login">{{ $t("applyResetPwd.signIn") }}!</router-link>
          </p>
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
          email: "",
          domain: ""
        }
      }
    },
    methods: {
      async checkEmail (e){
        let validateResult = await this.$validator.validateAll();
          if(validateResult){
            this.loading = true;
            let {message,success} = await pwdService.checkEmail(this.model.email)
            this.loading = false;
             if(success){
               
              let {message,success,data} = await pwdService.applyResetPwd(this.model.email)
              if(success){
                this.toastr.info(this.$t("applyResetPwd.success"))
              }    
            }
          }
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


<i18n src="./i18n.yaml"></i18n>
<template>
  <chp-log-layout>
     <chp-panel slot="content"
                :isHeaderTransparent="true"
                :canClose="false"
                :canCollapse="false"
                :titles="{mainTitle:'login'}"
                class="panel-sign">

        <div slot="panelTitle" class="panel-title-sign mt-xl text-right">
          <h2 class="title text-uppercase text-weight-bold m-none">
            <i class="fa fa-user mr-xs"></i>
            {{ $t('resetPwd.resetPwdTitle') }}
          </h2>
        </div>

        <form slot="body" @submit.prevent="changePassword">
      	  <div class="form-group col-md-12 input-group-icon" :class="errorClass('password')">
            <mu-text-field :value="model.email" :disabled="true" :full-width="true"/>
          </div>
          <div class="form-group col-md-12 input-group-icon" :class="errorClass('password')">
            <mu-text-field v-validate="'required|password'"
                           data-vv-value-path="model.password"
                           data-vv-name="password"
                           :hintText="$t('pwd.placeHolderNewPwd')"
                           class="form-control "
                           name="password"
                           type="password"
                           v-model.lazy="model.password"
                           required
                           :disabled="passwordIsValid"
                           :full-width="true"/>
            <span slot="required" class="error" v-if="errors.has('password:required')">
              {{errors.first('password:required')}}
            </span>
            <span slot="password" class="error" v-if="errors.has('password:password')">
              {{errors.first('password:password')}}
            </span>
          </div>
          <div class="form-group col-md-12 input-group-icon" :class="errorClass('confirm_password')">
            <mu-text-field v-validate="'confirmed:password'"
                           data-vv-value-path="model.password_confirmation"
                           data-vv-name="confirm_password"
                           :hintText="$t('pwd.placeHolderConfirmPwd')"
                           class="form-control "
                           type="password"
                           required
                           v-model="model.password_confirmation"
                           :disabled="passwordIsValid"
                           :full-width="true"/>
            <span slot="password" class="error" v-if="errors.has('confirm_password:confirmed')">
                {{errors.first('confirm_password:confirmed')}}
            </span>
          </div>

          <div class="col-xs-12 text-right">
            <chp-button type="submit" class="mb-xs mt-xs mr-xs btn btn-primary" :disabled="passwordIsValid">
               {{ $t('ui.button.submit') }}
            </chp-button>
          </div>
    </form>
    </chp-panel>
  </chp-log-layout>
</template>
<script type="text/javascript">
  import pwdService from "services/pwdService.js"
  import validateMixin from 'mixins/validatemix.js'
  export default{
    name:"changePassword",
    mixins: [validateMixin],
    data(){
        return {
            passwordIsValid : false,
            model :{
                email: "",
                password: "",
                password_confirmation: "",
                token: ""
            }
        }
    },
    methods:{
        async changePassword(){
        	let validateResult = await this.$validator.validateAll();
        	if(validateResult){
          		let {data,success,message} = await pwdService.resetPwd(this.model)
          		if(success){
            		this.toastr.info(this.$t("resetPwd.success"))
                this.$router.replace("/login")
                }
        	}
      	}
    },
    created(){
      let query = this.$route.query || {}
    	this.$set(this.model,"token",query.token || "")
    	this.$set(this.model,"email",query.email || "")
    }
  }
</script>

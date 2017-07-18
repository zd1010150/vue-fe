<i18n src="./i18n.yaml"></i18n>

<template>
  <div>
    <chp-log-layout>
      <chp-panel slot="content" :isHeaderTransparent="true" :canClose="false" :canCollapse="false"
                 :titles="{mainTitle:'login'}" class="panel-sign">

        <div slot="title" class="panel-title-sign mt-xl text-right">
          <h2 class="title text-uppercase text-weight-bold m-none"><i class="fa fa-user mr-xs"></i> Sign In</h2>
        </div>
        <vue-form slot="body"  class="login-form" :state="formstate"  @submit.prevent="login">

          <validate class="form-group mb-lg required-field" :class="fieldClassName(formstate.email)">

              <label >Username</label>

            <div class="input-group input-group-icon">
              <mu-text-field :hintText="$t('login.placeholderEmail')"  class="form-control input-lg" name="email" type="email" required v-model.lazy="model.email"/>
              <span class="input-group-addon">
                    <span class="icon icon-lg">
                      <i class="fa fa-user"></i>
                    </span>
                  </span>
                  </div>
              <field-messages name="email" show="$touched || $submitted">
                <div slot="required" class="error">email is a required field</div>
                <div slot="email" class="error">Email is not valid</div>
              </field-messages>

          </validate>

          <!-- <div class="form-group mb-lg">
            <div class="clearfix">
              <label class="pull-left">Username</label>
            </div>
            <div class="input-group input-group-icon">

              <mu-text-field :hintText="$t('login.placeholderEmail')" v-model="email" class="form-control input-lg"
                             name="email" type="email"/>
              <span class="input-group-addon">
										<span class="icon icon-lg">
											<i class="fa fa-user"></i>
										</span>
									</span>
            </div>
          </div> -->

          <validate class="form-group mb-lg">
            <div class="clearfix">
              <label class="pull-left">Password</label>
              <a href="pages-recover-password.html" class="pull-right">Lost Password?</a>
            </div>
            <div class="input-group input-group-icon">
              <mu-text-field :hintText="$t('login.placeholderPwd')" class="form-control input-lg"
                             name="password" type="password" v-model.lazy="model.password" password-strength/>
              <span class="input-group-addon">
                  <span class="icon icon-lg">
                    <i class="fa fa-lock"></i>
                  </span>
							</span>
            </div>
            <field-messages name="password" show="$touched || $submitted">
              <div slot="required" class="error">password is a required field</div>
              <div slot="password" class="error">password at least 8 letters</div>
            </field-messages>
          </validate>


          <div class="row">

            <div class="col-sm-12 text-right">
              <chp-button type="submit" class="btn btn-primary hidden-xs">Sign In</chp-button>
              <chp-button type="submit" class="btn btn-primary btn-block btn-lg visible-xs mt-lg">Sign In</chp-button>
            </div>
          </div>
        </vue-form>


      </chp-panel>

    </chp-log-layout>

  </div>
</template>
<script type="text/javascript">

  import formMixin from 'mixins/vueForm'
  import userService from 'services/userService.js'
  export default {
    name: "login",
    mixins:[formMixin],
    data () {
      return {
        formstate:{},
        model:{
          email: "",
          password: ""
        },
        loginError: false,
        errorInfo: ""
      }
    },
    methods: {
      login (e){
        e.preventDefault();

        this.$store.dispatch('login', new FormData(document.querySelector(".login-form"))).then(({success}) => {
          if (success) {
            this.$store.dispatch('getUserInfo').then(({success}) => {
              if (success) {
                this.$router.push("/main");
              } else {
                this.loginError = true;
                this.errorInfo = this.$t("login.getUserInfoError")
              }

            });

          } else {
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
  .mu-text-field {
    font-size: 1.2rem;
  }

  .panel-sign .panel-heading {
    top: 7px;
  }
</style>


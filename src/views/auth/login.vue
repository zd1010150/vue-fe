<i18n src="./i18n.yaml"></i18n>
<template>
  <div>
    <chp-log-layout>
      <chp-panel slot="content" :isHeaderTransparent="true" :canClose="false" :canCollapse="false"
                 :titles="{mainTitle:'login'}" class="panel-sign">

        <div slot="panelTitle" class="panel-title-sign mt-xl text-right">
          <h2 class="title text-uppercase text-weight-bold m-none"><i class="fa fa-user mr-xs"></i>{{ $t("login.signIn")
            }}</h2>
        </div>

        <form slot="body" class="login-form" @submit.prevent="login">
          <div class="form-group mb-lg required-field " :class="errorClass('email')">
            <label class="control-label">{{ $t("login.email") }}</label>
            <div class="input-group input-group-icon">
              <mu-text-field v-validate="'required|email'"
                             data-vv-value-path="model.email"
                             data-vv-name="email"
                             :hintText="$t('login.placeholderEmail')"
                             class="form-control input-lg"
                             name="email"
                             type="email"
                             v-model.lazy="model.email"
                             id="email"/>
              <span class="input-group-addon"><span class="icon icon-lg"> <i class="fa fa-user"></i></span></span>
            </div>
            <span slot="required" class="error" v-if="errors.has('email:required')">
              {{ errors.first('email:required')}}
            </span>
            <span slot="email" class="error" v-if="errors.has('email:email')">
              {{ errors.first('email:email')}}
            </span>
          </div>
          <div class="form-group mb-lg required-field" :class="errorClass('password')">
            <div class="clearfix">
              <label class="pull-left control-label">{{ $t("login.password") }}</label>
              <router-link to="/recoverPassword" class="pull-right">{{ $t("login.lostPassword") }}?</router-link>
            </div>
            <div class="input-group input-group-icon">
              <mu-text-field v-validate="'required|min:8'"
                             data-vv-value-path="model.password"
                             data-vv-name="password"
                             :hintText="$t('login.placeholderPwd')"
                             class="form-control input-lg"
                             name="password"
                             type="password"
                             v-model.lazy="model.password"
                             id="password"/>
              <span class="input-group-addon">
                  <span class="icon icon-lg">
                    <i class="fa fa-lock"></i>
                  </span>
              </span>
            </div>
            <span slot="required" class="error" v-if="errors.has('password:required')">
              {{errors.first('password:required')}}
            </span>
            <span slot="password" class="error" v-if="errors.has('password:min')">
              {{errors.first('password:min')}}
            </span>
          </div>
          <div class="row">
            <div class="col-sm-12 text-right">
              <chp-button type="submit" class="btn btn-primary hidden-xs" :disabled="loading">{{ $t("login.signIn") }}
              </chp-button>
              <chp-button type="submit" class="btn btn-primary btn-block btn-lg visible-xs mt-lg" :disabled="loading">
                {{ $t("login.signIn") }}
              </chp-button>
            </div>
          </div>
        </form>
      </chp-panel>
    </chp-log-layout>
  </div>
</template>
<script>
  import validateMixin from 'mixins/validatemix.js'
  import routers from '../../router/map/index'
  import { SET_LANGUAGE } from 'src/store/mutation-types'
  import { Validator } from 'vee-validate'
  import i18n from 'src/i18n'

  export default {
    name: 'login',
    mixins: [validateMixin],
    data () {
      return {
        loading: false,
        model: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      async login (e) {
        let validateResult = await this.$validator.validateAll()
        if (validateResult) {
          this.loading = true
          let {success} = await this.$store.dispatch('login', this.model)
          if (success) {
            let getUserInfo = await this.$store.dispatch('getUserInfo')
            if (getUserInfo.success) {
              this.$router.addRoutes(routers)
              this.$router.replace('/main')
              this.$store.commit(SET_LANGUAGE, getUserInfo.data.language)
              i18n.locale = getUserInfo.data.language
              Validator.setLocale(getUserInfo.data.language)
            }
          }
          this.loading = false
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


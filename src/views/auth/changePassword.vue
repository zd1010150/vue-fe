<i18n src="./i18n.yaml"></i18n>
<template>

  <chp-pwd-layout>
    <form slot="body" @submit.prevent="changePassword">
      <div class="current-user text-center">
        <img :src=" $store.state.userInfo.avatar " :alt="$store.state.userInfo.name" class="img-circle user-image">
        <h2 class="user-name text-dark m-none">{{ $store.state.userInfo.name }}</h2>
        <p class="user-email m-none">{{ $store.state.userInfo.email }}</p>
      </div>

      <div class="form-group col-md-12 input-group-icon" :class="errorClass('old_password')">
        <mu-text-field v-validate="'required|min:8'" data-vv-value-path="model.old_password"
                       :hintText="$t('pwd.placeHolderCurrentPwd')" class="form-control " name="old_password"
                       type="password" required v-model="model.old_password" @blur="validatePwd" :full-width="true"/>

      </div>
      <span slot="required" class="error"
            v-if="errors.has('old_password:required')">{{errors.first('old_password:required')}}</span>
      <span slot="min" class="error"
            v-if="errors.has('old_password:min')">{{errors.first('old_password:min')}}
              </span>

      <div class="form-group col-md-12 input-group-icon" :class="errorClass('password')">
        <mu-text-field v-validate="'required|password'" data-vv-value-path="model.password" data-vv-name="password"
                       :hintText="$t('pwd.placeHolderNewPwd')" class="form-control " name="password"
                       type="password" v-model.lazy="model.password" required :disabled="passwordIsValid"
                       :full-width="true"/>

      </div>
      <span slot="required" class="error"
            v-if="errors.has('password:required')">{{errors.first('password:required')}}</span>
      <span slot="password" class="error"
            v-if="errors.has('password:password')">{{errors.first('password:password')}}</span>

      <div class="form-group col-md-12 input-group-icon" :class="errorClass('confirm_password')">
        <mu-text-field v-validate="'confirmed:password'" data-vv-value-path="confirmPwd" data-vv-name="confirm_password"
                       :hintText="$t('pwd.placeHolderConfirmPwd')" class="form-control "
                       type="password" required v-model="confirmPwd" :disabled="passwordIsValid" :full-width="true"/>
      </div>
      <!-- <span slot="required" class="error" v-if="errors.has('confirm_password:required')">{{errors.first('confirm_password:required')}}</span>
      <span slot="password" class="error"
            v-if="errors.has('confirm_password:password')">{{errors.first('confirm_password:password')}}</span> -->
      <span slot="password" class="error"
            v-if="errors.has('confirm_password:confirmed')">{{errors.first('confirm_password:confirmed')}}</span>
      <div class="col-xs-6">

        <chp-button type="button" class="mb-xs mt-xs mr-xs btn btn-default" @click="cancel"><i
          class="fa fa-angle-left"></i> {{ $t('ui.button.cancel')}}
        </chp-button>

      </div>
      <div class="col-xs-6 text-right">
        <chp-button type="submit" class="mb-xs mt-xs mr-xs btn btn-primary" :disabled="passwordIsValid"><i
          class="fa fa-cog"></i> {{ $t('ui.button.reset') }}
        </chp-button>
      </div>

    </form>
  </chp-pwd-layout>
</template>
<script type="text/javascript">
  import pwdService from 'services/pwdService.js'

  import validateMixin from 'mixins/validatemix.js'

  export default {
    name: 'changePassword',
    mixins: [validateMixin],
    data () {
      return {
        passwordIsValid: true,
        confirmPwd: '',
        model: {
          old_password: '',
          password: ''
        }
      }
    },
    methods: {
      async validatePwd () {
        // 需要调用验证密码接口
        let {success} = await pwdService.validatePwd({old_password: this.model.old_password})
        if (success) {
          this.$nextTick(() => {
            this.passwordIsValid = false
          })
        }
      },
      cancel () {
        this.$router.push('/main')
      },
      async changePassword () {
        let validateResult = await this.$validator.validateAll()
        if (validateResult) {
          let {success} = await this.$store.dispatch('changePassword', this.model)
          if (success) {
            this.toastr.info(this.$t('info.SUCCESS'))
            this.$router.push('/login')
          }
        }
      }
    }
  }
</script>

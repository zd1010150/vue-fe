<i18n src="../i18n.yaml"></i18n>
<template>
  <div class="col-lg-12 deposite-methods">
    <section class="methods bankTransfer" v-if="Object.keys(gateWays.bankTransfer).length > 0">
      <h4 class="text-dark">{{ $t('payMentMethod.bankTransfer')}}</h4>
      <div class="row">
        <template v-for="(value,key) in gateWays.bankTransfer">
          <div class="methods-wrapper">
            <payment-method :value="value.code"
                            :bgUrl="value.logo"
                            :title="value.name"
                            :isActive="value.isActive"
                            type="bankTransfer"
                            @chosePaymentMethod="chosePaymentMethod">
            </payment-method>
          </div>
        </template>
      </div>
    </section>
    <section class="methods cards" v-if="Object.keys(gateWays.cards).length > 0">
      <h4 class="text-dark">{{ $t('payMentMethod.cards')}}</h4>
      <div class="row">
        <template v-for="(value,key) in gateWays.cards">
          <div class="methods-wrapper">
            <payment-method :value="value.code"
                            :bgUrl="value.logo"
                            :title="value.name"
                            :isActive="value.isActive"
                            type="cards"
                            @chosePaymentMethod="chosePaymentMethod">
            </payment-method>
          </div>
        </template>
      </div>
    </section>
    <section class="methods e-wallet" v-if="Object.keys(gateWays.eWallet).length > 0">
      <h4 class="text-dark">{{ $t('payMentMethod.eWallet')}}</h4>
      <div class="row">
        <template v-for="(value,key) in gateWays.eWallet">
          <div class="methods-wrapper">
            <payment-method :value="value.code"
                            :bgUrl="value.logo"
                            :title="value.name"
                            :isActive="value.isActive"
                            type="eWallet"
                            @chosePaymentMethod="chosePaymentMethod">
            </payment-method>
          </div>
        </template>
      </div>
    </section>
    <chp-dialog
      ref="noCreditCardDialog"
    >
      <p slot="title">{{ $t('ui.dialog.alert.title') }}</p>
      <p slot="body">
        {{ $t('deposit.noCreditCard.please')}}
        <router-link to="/fund-manager/bank-account">
          {{ $t('pageTitle.bankAccount') }}
        </router-link>
        {{ $t('deposit.noCreditCard.verifyCreditCard')}}
      </p>
      <template slot="footer">
        <chp-button class="chp-primary" @click="closeCreditCardDialog">{{ $t('ui.button.close') }}</chp-button>
      </template>
    </chp-dialog>
  </div>
</template>
<script>
  import method from './method.vue'
  import fundsService from 'services/fundsService'
  import bankCardService from 'services/bankCardService'

  export default {
    data () {
      return {
        previousMethod: '',
        gateWays: {
          cards: {},
          eWallet: {},
          bankTransfer: {}
        }
      }
    },
    components: {
      'payment-method': method
    },
    methods: {
      async fetchCreditCount () {
        let {success, data} = await bankCardService.getCreditCardCount()
        if (success) {
          let count = data.cnt
          return Number(count)
        }
      },
      closeCreditCardDialog () {
        this.$refs.noCreditCardDialog.close()
      },
      async chosePaymentMethod (code, type) {
        if (code === 'invis' || code === 'inmas') {
          let count = await this.fetchCreditCount()
          if (Number(count) < 1) {
            this.$refs.noCreditCardDialog.open()
            return
          }
        }
        this.$set(this.gateWays[this.previousMethod.type][this.previousMethod.code], 'isActive', false)
        this.$set(this.gateWays[type][code], 'isActive', true)

        this.previousMethod = Object.assign({}, this.gateWays[type][code])

        this.$emit('chosePaymentMethod', code, this.gateWays[type][code].name)
      },
      mapData (data) {
        Reflect.ownKeys(data).sort().forEach((key, outerIndex) => {
          let methods = data[key]
          Object.keys(methods).forEach((innerKey, innerIndex) => {
            Object.assign(methods[innerKey], {
              isActive: innerIndex === 0 && outerIndex === 0,
              code: innerKey
            })
            if (innerIndex === 0 && outerIndex === 0) {
              this.previousMethod = {
                code: innerKey,
                type: methods[innerKey].type
              }
            }
          })
          this.$set(this.gateWays, key, methods)
        })
      },
      setDefaultMethod () {
        this.$emit('chosePaymentMethod', this.previousMethod.code, this.gateWays[this.previousMethod.type][this.previousMethod.code].name)
      },
      async fetchPaymentMethods () {
        let {data, success} = await fundsService.getDepositeMethod(this.$store.state.i18nLanguage)
        if (success) {
          this.mapData(data)
          this.setDefaultMethod()
        }
      }
    },
    created () {
      this.fetchPaymentMethods()
    },
    watch: {
      '$store.state.i18nLanguage': function (val) {
        this.fetchPaymentMethods()
      }
    }
  }
</script>
<style lang="less">
  @import "~assets/less/variable.less";
  .methods-wrapper {
    width: 25%;
    float: left;
  }

  @media (max-width: @screen-sm-min) {
    .methods-wrapper {
      width: 50%;
    }
  }
</style>


<i18n src="../i18n.yaml"></i18n>
<template>
  <chp-expand-transition name="chp-fade">
    <keep-alive>
      <component v-bind:is="currentView"
                 @close="close"
                 @refresh="refresh"
                 :editId="editId"/>
    </keep-alive>
  </chp-expand-transition>
</template>
<script>
  /* eslint-disable no-extra-boolean-cast */
  import otherCountryForms from './otherCountryForms/index'
  import chinaForms from './chinaForms/index'
  import { CHINA_COUNTRY_CODE } from 'src/config/app.config'
  export default {
    data () {
      return {
        currentView: null
      }
    },
    props: {
      editId: [Number, String]
    },
    components: {
      'bank-other-country-forms': otherCountryForms,
      'bank-china-forms': chinaForms
    },
    watch: {
      '$store.state.userInfo': function (val) {
        this.initCurrentView((val && val.country) || '')
      }
    },
    mounted () {
      this.initCurrentView(this.$store.state.userInfo.country)
    },
    methods: {
      initCurrentView (country) {
        const isChina = CHINA_COUNTRY_CODE.indexOf(country.toLowerCase()) > -1
        this.currentView = isChina ? 'bank-china-forms' : 'bank-other-country-forms'
      },
      close () {
        this.$emit('close')
      },
      refresh () {
        this.$emit('refresh')
      }
    }
  }
</script>

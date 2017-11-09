<i18n src='../i18n.yaml'></i18n>
<template>
  <div class='container-fluid'>
    <div class='row'>
      <div class='col-lg-12 col-md-12'>
        <chp-panel :canCollapse='false' :canClose='false'>
          <template slot='panelTitle'>{{ $t('affiliate') }}</template>
          <form slot='body' class='form-horizontal form-bordered ' ref='accountForm'>
            <div class='form-group' :class='errorClass("platForm")'>
              <label class='control-label col-md-3'>
                {{ $t('apply.experience') }}
                <span class='required' aria-required='true'>*</span>
              </label>
              <div class='col-md-6'>
                <mu-select-field v-model='model.exp'>
                  <template v-for='(p,index) in exps'>
                    <mu-menu-item :value='p.val' :title='p.text+" "+$t("apply.unit.year")' key='index'/>
                  </template>
                </mu-select-field>
              </div>
            </div>
            <div class='form-group' :class='errorClass("exp_company")'>
              <label class='control-label col-md-3'>
                {{ $t('apply.otherCompanies')}}
                <span class='required' aria-required='true'>*</span>
              </label>
              <div class='col-md-6'>
                <mu-text-field :fullWidth="true"
                               multiLine
                               :rows='3'
                               :rowsMax='6'
                               class='form-control'
                               v-model='model.exp_company'
                               v-validate='"required"'
                               data-vv-value-path='model.exp_company'
                               name='exp_company'/>
                <br>
                <span slot='required' class='error' v-if='errors.has("exp_company:required")'>
				            	{{errors.first('exp_company:required')}}
				            </span>
              </div>
            </div>
            <div class='form-group'>
              <label class='control-label col-md-3'>
                {{ $t('apply.accountPerMonth')}}
                <span class='required' aria-required='true'>*</span>
              </label>
              <div class='col-md-6'>
                <mu-select-field v-model='model.one_month_new_acc'>
                  <template v-for='(l,index) in perAccountOptions'>
                    <mu-menu-item :value='l.val' :title='l.text' key='index'/>
                  </template>
                </mu-select-field>
              </div>
            </div>
            <div class='form-group'>
              <label class='control-label col-md-3'>
                {{ $t('apply.volumePerMonth')}}
                <span class='required' aria-required='true'>*</span>
              </label>
              <div class='col-md-6'>
                <mu-select-field v-model='model.per_month_trading_volume'>
                  <template v-for='(l,index) in perVolumeOptions'>
                    <mu-menu-item :value='l.val' :title='l.text+" "+$t("apply.unit.lots")' key='index'/>
                  </template>
                </mu-select-field>
              </div>
            </div>
            <div class='form-group'>
              <label class='control-label col-md-3'>
                {{ $t('apply.averageAccount')}}
                <span class='required' aria-required='true'>*</span>
              </label>
              <div class='col-md-6'>
                <mu-select-field v-model='model.avg_deposit'>
                  <template v-for='(l,index) in perMoneyOptions'>
                    <mu-menu-item :value='l.val' :title='l.text+" "+$t("apply.unit.money")' key='index'/>
                  </template>
                </mu-select-field>
              </div>
            </div>
            <div class='form-group' :class='errorClass("exp_comment")'>
              <label class='control-label col-md-3'>
                {{ $t('apply.relatedExperience')}}
                <span class='required' aria-required='true'>*</span>
              </label>
              <div class='col-md-6'>
                <mu-text-field multiLine
                               :rows='3'
                               :fullWidth="true"
                               :rowsMax='6'
                               class='form-control'
                               v-model='model.exp_comment'
                               v-validate='"required"'
                               data-vv-value-path='model.exp_comment'
                               name='exp_comment'/>
                <br>
                <span slot='required' class='error' v-if='errors.has("exp_comment:required")'>
				            	{{errors.first('exp_comment:required')}}
				            </span>
              </div>
            </div>
            <div class='form-group' :class='errorClass("service_comment")'>
              <label class='control-label col-md-3'>
                {{ $t('apply.comments')}}
                <span class='required' aria-required='true'>*</span>
              </label>
              <div class='col-md-6'>
                <mu-text-field multiLine
                               :rows='3'
                               :rowsMax='6'
                               :fullWidth="true"
                               class='form-control'
                               v-model='model.service_comment'
                               v-validate='"required"'
                               data-vv-value-path='model.service_comment'
                               name='service_comment'/>
                <br>
                <span slot='required' class='error' v-if='errors.has("service_comment:required")'>
				            	{{errors.first('service_comment:required')}}
				            </span>
              </div>
            </div>
            <div class="form-group" :class="errorClass('terms')">
              <div class="col-md-9 col-md-offset-3">
                <chp-checkbox name="terms"
                              nativeValue="checkedIterms"
                              v-model="checkedIterms"
                              data-vv-value-path="checkedIterms"
                              v-validate="'required'"
                              data-vv-name="terms"
                              data-vv-validate-on="input"
                              type="checkbox"/>
                <span>
							    	{{ $t('apply.iAgree')}}
							    	<a target="_blank" :href="termURL">{{ $t('apply.terms')}}</a>
							    </span>
                <br>
                <span slot="required" class="error" v-if="errors.has('terms:required')">
							    	{{errors.first('terms:required')}}
							    </span>
              </div>
            </div>
          </form>
          <div class='row' slot='footer'>
            <div class='col-md-6 col-md-offset-3'>
              <chp-button class='mb-xs mt-xs mr-xs btn btn-primary print-btn' @click='submit' :disabled='submitDisable'>
                <i class='fa fa-check hidden-sm hidden-xs'></i> {{ $t('ui.button.submit') }}
              </chp-button>
            </div>
          </div>
        </chp-panel>
      </div>
    </div>
  </div>
</template>
<script>
  import validateMixin from 'mixins/validatemix'
  import mt4Service from 'services/mt4Service'
  import { TERMS } from 'src/config/url.config.js'

  export default {
    mixins: [validateMixin],
    data () {
      return {
        termURL: TERMS[this.$store.state.language],
        checkedIterms: [],
        exps: [{
          val: 0, text: '0-1'
        },
        {
          val: 1, text: '2-3'
        },
        {
          val: 2, text: '3-5'
        },
        {
          val: 3, text: '>5'
        }],
        perAccountOptions: [{
          val: 0, text: '0-5'
        },
        {
          val: 1, text: '5-10'
        },
        {
          val: 2, text: '10-50'
        },
        {
          val: 3, text: '>50'
        }],
        perVolumeOptions: [{
          val: 0, text: '<50'
        },
        {
          val: 1, text: '50-200'
        },
        {
          val: 2, text: '200-500'
        },
        {
          val: 3, text: '500-1000'
        },
        {
          val: 4, text: '1000-2000'
        }, {
          val: 5, text: '>2000'
        }],
        perMoneyOptions: [{
          val: 0, text: '<2000'
        },
        {
          val: 1, text: '2001-5000'
        },
        {
          val: 2, text: '5001-10000'
        },
        {
          val: 3, text: '10001-20000'
        },
        {
          val: 4, text: '>20000'
        }],
        submitDisable: false,
        model: {
          exp: 0,
          exp_company: '',
          one_month_new_acc: 0,
          per_month_trading_volume: 0,
          avg_deposit: 0,
          exp_comment: '',
          service_comment: ''
        }
      }
    },
    methods: {
      async submit () {
        this.submitDisable = true
        let validateResult = await this.$validator.validateAll()
        if (validateResult) {
          let {success} = await mt4Service.applyAffiliate(this.model)
          if (success) {
            this.toastr.info(this.$t('info.SUCCESS'))
            // this.resetForm()
          }
        }
        this.submitDisable = false
      }
    },
    watch: {
      '$store.state.language': function (val) {
        this.termURL = TERMS[val]
      }
    }
  }
</script>

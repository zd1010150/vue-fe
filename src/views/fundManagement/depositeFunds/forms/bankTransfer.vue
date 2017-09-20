<i18n src="../../i18n.yaml"></i18n>
<template>
	<chp-panel :canCollapse="false" :canClose="false" :isLoading="loadingStatus">
    <template slot="panelTitle">{{ methodName }}</template>
    <template slot="body">
      <div  class="row padding-20">
        <div class="form-group">
          <label class="control-label col-md-3">
             {{ $t('deposit.selectCurrency') }}
             <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-6" >
            <mu-select-field v-model="currency" @input="currencyChange">
              <template v-for="c in currencies">
                <mu-menu-item :value="c" :title="$t('currency.'+c)+'('+c+')'" />
              </template>
            </mu-select-field>
          </div>
        </div>
      </div>
      <div class="row padding-20" v-if="allInfos">
        <div v-for="(infos,index) in allInfos" class="col-lg-6 col-md-6 col-sm-12 bank-detail mb-lg padding-10" id="bank-detail" :id="index+'print'">
          <h5> {{ $t('deposit.acyAccountDetail')}} <small >({{ currencies.join("、")}})</small></h5>
          <table >
            <tr>
              <td class="field text-primary">{{ $t('deposit.bankName')}}</td>
              <td class="field-value">{{ infos.BANKNAME }}</td>
              <td></td>
            </tr>
            <tr>
              <td class="field text-primary">{{ $t('deposit.bankAddress')}}</td>
              <td class="field-value">{{ infos.CITY }}</td>
              <td></td>
            </tr>
            <tr>
              <td class="field text-primary">{{ $t('deposit.bankAccount')}}</td>
              <td class="field-value">{{ infos.BANKACCOUNTNUMBER }}</td>
              <td></td>
            </tr>
            <tr v-if="infos.SWIFTCODE">
              <td class="field text-primary">{{ $t('deposit.swift')}}</td>
              <td class="field-value">{{ infos.SWIFTCODE }}</td>
              <td></td>
            </tr>
            <tr>
              <td class="field text-primary">{{ $t('deposit.accountName')}}</td>
              <td class="field-value">{{ infos.ACCOUNTHOLDER }}</td>
              <td class="print-btn-td ">
                <chp-button class="mb-xs mt-xs mr-xs btn btn-default print-btn hidden-md hidden-sm hidden-xs" @click="print(index+'print')">
                 <i class="fa fa-print"></i> {{ $t('ui.button.print') }}
                </chp-button>
              </td>
            </tr>
            <tr class="visible-md visible-sm visible-xs ">
              <td colspan="3" class="padding-10">
                <chp-button class="mb-xs mt-xs mr-xs btn btn-default print-btn pull-right" @click="print(index+'print')">
                 <i class="fa fa-print"></i> {{ $t('ui.button.print') }}
                </chp-button>
              </td>
            </tr>
          </table>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 padding-20">
          <p>{{ $t('deposit.wireTransferNote')}} <a herf="mailto:accounts@acyfx.com">accounts@acyfx.com</a></p>
        </div>
      </div>
    </template>
  </chp-panel>
</template>
<script>
  import { printTable } from 'utils/print.js'
  import fundsService from 'services/fundsService'
  import loadingMix from 'mixins/loading'
	export default{
    mixins:[loadingMix],
    props:{
      methodName:String
    },
    data(){
      return {
        allInfos:null,
        currency:'USD',
        currencies: ['AUD','CAD','EUR','GBP','HKD' ,'JPY','NZD','SGD','USD']
      }
    },
		methods:{
      print(id){
        printTable(id)
      },
      async getBankTransferInfo(){
        this.loadingStatus = true
        let { success,data } = await fundsService.getBanktransferInfo(this.currency)
        this.loadingStatus = false
        if(success){
          this.allInfos = data
        }

      },
      currencyChange(){
        this.getBankTransferInfo()
      }
    },
    created(){
      this.getBankTransferInfo()
    }
	}
</script>
<style lang="less">
@import "~assets/less/variable.less";
@import "~assets/less/print.less";
  .bank-detail{
    border-top:@border-grey-1px;
    border-bottom:@border-grey-1px;
    table{
    width:100%;
    .field{
      padding-right: 20px;
    }
    td.print-btn-td{
      text-align: right !important;
    }
  }
  }
  @media(max-width:@screen-sm-min){
    .bank-detail{
      table{
        .field{
          padding-right: 5px;
        }
      }
    }
  }
  
  

</style>
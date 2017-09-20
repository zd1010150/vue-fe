<i18n src="../../i18n.yaml"></i18n>
<template>
	<chp-panel :canCollapse="false" :canClose="false">
    <template slot="panelTitle">{{ methodName }}</template>
    <div slot="body" class="row padding-20">
     <div class="col-lg-6 col-md-6 col-sm-12 bank-detail padding-10" id="bank-detail">
          
             <h5> {{ $t('deposit.acyAccountDetail')}} <small >({{ currencies.join("、")}})</small></h5>
          <table >
            <tr>
              <td class="field text-primary">{{ $t('deposit.bankName')}}</td>
              <td class="field-value">HSBC</td>
              <td></td>
            </tr>
            <tr>
              <td class="field text-primary">{{ $t('deposit.bankAddress')}}</td>
              <td class="field-value">1 Queen's Road Central, Hong Kong</td>
              <td></td>
            </tr>
            <tr>
              <td class="field text-primary">{{ $t('deposit.bankAccount')}}</td>
              <td class="field-value">848-587093-838</td>
              <td></td>
            </tr>
            <tr>
              <td class="field text-primary">{{ $t('deposit.swift')}}</td>
              <td class="field-value">HSBCHKHHHKH</td>
              <td></td>
            </tr>
            <tr>
              <td class="field text-primary">{{ $t('deposit.accountName')}}</td>
              <td class="field-value">ACY Capital Australia Limited</td>
              <td class="print-btn-td ">
                <chp-button class="mb-xs mt-xs mr-xs btn btn-default print-btn hidden-md hidden-sm hidden-xs" @click="print">
                 <i class="fa fa-print"></i> {{ $t('ui.button.print') }}
                </chp-button>
              </td>
            </tr>
            <tr class="visible-md visible-sm visible-xs ">
              <td colspan="3" class="padding-10">
                <chp-button class="mb-xs mt-xs mr-xs btn btn-default print-btn pull-right" @click="print">
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
  </chp-panel>
</template>
<script>
import { printTable } from "utils/print.js";
	export default{
    data(){
      return {
        currencies: ['AUD','CAD','EUR','GBP','HKD' ,'JPY','NZD','SGD','USD']
      }
    },
    props:{
      methodName:String
    },
		methods:{
      print(){
        printTable('bank-detail')
      }
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
<template>
	<chp-panel :canCollapse="false" :canClose="false">
    <template slot="title">wire Transfer</template>
    <div slot="body" class="row padding-20">
      <div class="col-lg-6 col-md-6 col-sm-12 bank-detail padding-10" id="bank-detail">
        
           <h5>ACY Bank Account Detail <small >(USD、AUD、EUR、CNY)</small></h5>
        <table >
          <tr>
            <td class="field text-primary">Bank Name</td>
            <td class="field-value">HSBC</td>
            <td></td>
          </tr>
          <tr>
            <td class="field text-primary">Bank Address</td>
            <td class="field-value">1 Queen's Road Central, Hong Kong</td>
            <td></td>
          </tr>
          <tr>
            <td class="field text-primary">Bank Account</td>
            <td class="field-value">848-587093-838</td>
            <td></td>
          </tr>
          <tr>
            <td class="field text-primary">SWIFT</td>
            <td class="field-value">HSBCHKHHHKH</td>
            <td></td>
          </tr>
          <tr>
            <td class="field text-primary">Account Name</td>
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
        <p>Please input your MT4 account number and account name in the comment area when you fill in Wire Transfers </p>
        <p>To ensure Wire Transfer credit to your account as soon as possible, please send your receipt to <a herf="mailto:accounts@acyfx.com">accounts@acyfx.com</a></p>
      </div>
    </div>
  </chp-panel>
</template>
<script>
import {printDiv} from "utils/print.js";
	export default{
		methods:{
      print(){
        window.print();
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
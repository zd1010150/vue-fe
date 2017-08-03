<i18n src="../i18n.yaml"></i18n>
<template>
	<div class="col-lg-12 col-md-12">
		<chp-panel :canCollapse="false" :canClose="false" :isLoading="loadingStatus">
	      <template slot="title">银行卡管理</template>
	      	<chp-data-table slot="body" :isDisplayFilterToolbar="false" :canFilter = "false" :canPaging="false"
                      
      >
      <template slot="addBtnText">{{ $t('bankcard.newBtnText')}}</template> 
      <chp-table slot="table" chp-sort="calories" chp-sort-type="desc" >
          <chp-table-header>
            <chp-table-row>
              <chp-table-head chp-sort-by="order_time">Time</chp-table-head>
              <chp-table-head chp-sort-by="mt4_id" width="100px">Account</chp-table-head>
              <chp-table-head chp-sort-by="method" width="100px">Method</chp-table-head>
              <chp-table-head chp-sort-by="top_up_amount" chp-numeric>Amount</chp-table-head>
              <chp-table-head chp-sort-by="currency_type">Currency</chp-table-head>
              <chp-table-head chp-sort-by="trade_status">Status</chp-table-head>
			</chp-table-row>
          </chp-table-header>
		  <chp-table-body>
            <chp-table-row v-for="(row, rowIndex) in histories" :key="rowIndex"  :chp-selection="chpSelection">
              <chp-table-cell v-for="(column, columnIndex) in row" :key="columnIndex" :chp-numeric="columnIndex == 'top_up_amount' ">
              {{column}}
              </chp-table-cell>
            </chp-table-row>
          </chp-table-body>
        </chp-table>

      </chp-data-table>
	    </chp-panel>
	</div>
</template>
<script>
    import bankCardService from 'services/bankCardService'
    import validateMixin from 'mixins/validatemix.js'
    import loadingMix from 'mixins/loading'
    import {Validator} from 'vee-validate'
	export default{
		mixins: [validateMixin,loadingMix],
		data () {
        return{
          chpSelection: false, //每一行是否可选
          histories: null,
          prompting:"",
          bankCards:null,
          
        }
     },
    watch:{
    	
    },
    created(){
      
    	this.fetchBankcardData();
    },
    methods : {
      
      filterFields(originData){
      	if(originData && originData.length > 0){
          
      	this.bankCards = originData.map(function(row,index) {
            return {
      				order_time : row.order_time,
      				mt4_id : row.mt4_id,
      				method : row.method,
      				top_up_amount: row.top_up_amount,
      				currency_type: row.currency_type,
      				trade_status: row.trade_status
				    }
      		});
      	}else{
          this.histories = [];
        }
      },
      async fetchBankcardData(){
        let {success,data} = await bankCardService.getBankCard();
        if(success && data){
         this.filterFields(data);
        }
      	return {data};
      },
      async fetchPromptingMessage(){

      }

    },
    watch:{
      '$store.state.language':function(val,oldVal){
        this.prompting = this.fetchPromptingMessage(val);
      }
    }
}
</script>
<style lang="less">
  .date-picker-wrapper{
    width:200px;
  }
  .form-inline{
    .form-control{
      width:200px;
    }
  }
</style>
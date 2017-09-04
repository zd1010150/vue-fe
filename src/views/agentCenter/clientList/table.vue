<i18n src="../i18n.yaml"></i18n>
<template>
  <div class="row">
		<div class="col-lg-12 col-md-12">
  		<chp-panel :canCollapse="false" :canClose="false" :isLoading="loadingStatus">
  	    <template slot="title">{{ $t('clientList') }}</template>
  	    <chp-table slot="body" chp-sort="calories" chp-sort-type="desc" @sort="sortRow" >
          <chp-table-header>
            <chp-table-row>
              <chp-table-head chp-numeric>MT4#</chp-table-head>
              <chp-table-head >{{ $t('account.name') }}</chp-table-head>
              <chp-table-head chp-sort-by="ForexVolume" chp-numeric>
              {{ $t('trade.fx') }}({{ $t('trade.lots') }})
              </chp-table-head>
              <chp-table-head chp-sort-by="OilVolume" chp-numeric>
              {{ $t('trade.oil') }}({{ $t('trade.lots') }})
              </chp-table-head>
              <chp-table-head chp-sort-by="MetalsVolume" chp-numeric>
              {{ $t('trade.metal') }}({{ $t('trade.lots') }})
              </chp-table-head>
              <chp-table-head chp-sort-by="CFDsVolume" chp-numeric>
              {{ $t('trade.cfd') }}{{ $t('trade.lots') }}
              </chp-table-head>
              <chp-table-head chp-sort-by="ForexComProfit" chp-numeric>
              {{ $t('trade.fx') }}{{ $t('trade.com') }}
              </chp-table-head>
              <chp-table-head chp-sort-by="OilComProfit" chp-numeric>
              {{ $t('trade.oil') }}{{ $t('trade.com') }}
              </chp-table-head>
              <chp-table-head chp-sort-by="MetalsComProfit" chp-numeric>
              {{ $t('trade.metal') }}{{ $t('trade.com') }}
              </chp-table-head>
              <chp-table-head chp-sort-by="CFDsComProfit" chp-numeric>
              {{ $t('trade.cfd') }}{{ $t('trade.com') }}
              </chp-table-head>
              <chp-table-head chp-sort-by="TotalComProfitAgent" chp-numeric>
              {{ $t('trade.totalCom') }}{{ $t('trade.com') }}
              </chp-table-head>
            </chp-table-row>
          </chp-table-header>
  		    <chp-table-body>
            <chp-table-row v-for="(row, rowIndex) in histories" :key="rowIndex" >
              <chp-table-cell v-for="(column, columnIndex) in row" :key="columnIndex" :chp-numeric="columnIndex != 'name' ">
              {{column}}
              </chp-table-cell>
            </chp-table-row>
          </chp-table-body>
        </chp-table>
      </chp-panel>
	  </div>
  </div>
</template>
<script>
	import mt4Service from 'services/mt4Service'
  import validateMixin from 'mixins/validatemix.js'
  import loadingMix from 'mixins/loading'
  import {Validator} from 'vee-validate'
	export default{
		mixins: [validateMixin,loadingMix],
		props:{
      agentId:[String,Number]
    },
		data () {
        return{
          innerAgentId:this.agentId,
          histories: null,
          model:{
          	keywords:""
          },
          sort:""
        }
     },
    watch:{
    	agentId:function(val){
        this.innerAgentId = val
        if(val){
          this.fetchData()
        }
      }
    },
    methods : {
      filterFields(originData){
      	if(originData && originData.length > 0){
        this.histories = originData.map(function(row,index) {
            return {
      				mt4_id : row.mt4_id,
              name: row.first_name+" " + row.last_name,
              ForexVolume: row.ForexVolume,
              OilVolume:row.OilVolume,
              MetalsVolume:row.MetalsVolume,
              CFDsVolume:row.CFDsVolume,
              ForexComProfit:row.ForexComProfit,
              OilComProfit:row.OilComProfit,
              MetalsComProfit:row.MetalsComProfit,
              CFDsComProfit:row.CFDsComProfit,
              TotalComProfitAgent:row.TotalComProfitAgent
				    }
      		});
      	}else{
          this.histories = [];
        }
      },
      async fetchData(){
        this.loadingStatus = true
        let self = this
        let {data,message,success} = await mt4Service.getAffiliateList(this.innerAgentId,this.model)
        this.loadingStatus = false
        if(success){
            this.filterFields(data.data)
      		}
      },
      async research(){
        console.log("---",this.model)
        let validateResult = await this.$validator.validateAll();
        if(validateResult){
          this.fetchData()
        }
      },
      sortRow({name,type}){
        this.sort = (type=="desc" ?"-":"" )+ name
        this.fetchData()
      }

    }
}
</script>
<style lang="less">
  .form-inline{
  	text-align: left;
    .keywords,.research-btn{
    	vertical-align: middle;
		text-align: left;
    }
    .keywords{
    	margin-bottom: 0px;
    }
  }
</style>
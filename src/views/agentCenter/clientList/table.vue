<i18n src="../i18n.yaml"></i18n>
<template>

	<div class="row">
		<div class="col-lg-12 col-md-12">
		<chp-panel :canCollapse="false" :canClose="false" :isLoading="loadingStatus">
	      <template slot="title">Client List</template>
	      	<chp-data-table slot="body" :isDisplayFilterToolbar="isDisplayFilterToolbar"
                      :pageSize = "pageSize"
                      :rowsTotal = "rowsTotal"
                      :pageOptions = "pageOptions"
                      :canAdd = "false"
                      @toggleDisplayFilterToolbar="toggleDisplayFilterToolbar"
                      @pageSizeChange="pageSizeChange"
                      @pageNumberChange="pageNumberChange"
      >
        

        <!--过滤的toolbar begin-->
          
          <div slot="filterToolbar" class="data-table-filter-panel">
          	<div class="row" >
              <div class="col-sm-12 visible-sm visible-xs">
                <mu-icon-button @click="toggleDisplayFilterToolbar(false)" class="pull-right">
                  <i class="fa fa-close "></i>
               </mu-icon-button>
              </div>
              <div class="col-md-10 col-sm-12">
                 <form class="form-inline">
                    <div class="form-group">
                    	<mu-text-field :hintText="$t('ui.textField.keywords')" class="form-control keywords" name="keywords" :v-model="model.keywords" v-validate="'required'" data-vv-value-path="model.keywords" data-vv-name="keywords" data-vv-validate-on="blur"/>
                       <span slot="required" class="error" v-if="errors.has('keywords:required')">{{errors.first('keywords:required')}}</span>
                     	<chp-button class="mb-xs mt-xs mr-xs btn btn-primary print-btn research-btn" @click="research">
                      	<i class="fa fa-search "></i>
                    	</chp-button>
                    </div>
                    
                  </form>
              </div>
              <div class="col-md-2 hidden-sm hidden-xs">
                <mu-icon-button @click="toggleDisplayFilterToolbar(false)" class="pull-right">
                  <i class="fa fa-close "></i>
               </mu-icon-button>
              </div>
            </div>
          </div>
        
        <!--过滤操作的toolbar end-->
		<chp-table slot="table" chp-sort="calories" chp-sort-type="desc" @sort="sortRow" >
          <chp-table-header>
            <chp-table-row>
              <chp-table-head >MT4#</chp-table-head>
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
	</div>
</div>
	
</template>
<script>
	
    import dataTableService from 'services/dataTableService'
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
          innerAgentId:"",
          isDisplayFilterToolbar : false,
          chpSelection: false, //每一行是否可选
          pageIndex:1,
          pageSize:5,
          rowsTotal:100,
          pageOptions:[5,20,30],
          histories: null,
          model:{
          	kewords:""
          },
          sort:""
        }
     },
    watch:{
    	pageSize:function(val){
        this.fetchDepositeData({
        pageIndex:this.pageIndex,
        pageSize:val
      });
      },
      pageIndex:function(val){
        this.fetchDepositeData({
        pageIndex:val,
        pageSize:this.pageSize
      });
      },
      agentId:function(val){
        this.innerAgentId = val
        this.fetchDepositeData()
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
      async fetchDepositeData(params={}){
        this.loadingStatus = true
        let self = this
        let {data,message,success} = await dataTableService.pagingQuery(Object.assign({
      			url:'/affiliate/'+self.innerAgentId+'/customers'
      		},{
              pageIndex:this.pageIndex,
              pageSize:this.pageSize,
              sort:this.sort
           },{queryParameter:this.model},params))
        this.loadingStatus = false
        if(success){
            
      			this.filterFields(data.data)
      			this.pageIndex = data.current_page
      			this.rowsTotal = data.total
      			this.pageSize = Number(data.per_page)
      		}
      },
      async research(){
          let validateResult = await this.$validator.validateAll();
          if(validateResult){
            this.fetchDepositeData()
          }
      },
      toggleDisplayFilterToolbar(val){
        this.isDisplayFilterToolbar = val
      },
      sortRow({name,type}){
          this.sort = (type=="desc" ?"-":"" )+ name
          this.fetchDepositeData()
      },
      pageSizeChange(newSize){
        this.pageSize = newSize
      },
      pageNumberChange(newIndex){
        this.pageIndex = newIndex
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
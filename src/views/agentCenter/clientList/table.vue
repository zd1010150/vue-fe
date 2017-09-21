<i18n src="../i18n.yaml"></i18n>
<template>
  <div class="row">
		<div class="col-lg-12 col-md-12">
  		<chp-panel :canCollapse="false" :canClose="false" :isLoading="loadingStatus">
  	    <template slot="panelTitle">{{ $t('clientList') }}</template>
        <chp-data-table :isDisplayFilterToolbar="true" :canPaging="false" slot="body">
          <form class="form-inline" slot="filterToolbar">
            <div class="form-group" :class="errorClass('startDate')">
              <chp-date-picker :hintText="$t('ui.datePicker.startDate')" 
                                v-model.lazy="model.start_date" 
                                @input="changeStartday" 
                                :required="true"  
                                v-validate="'required'" 
                                data-vv-value-path="model.start_date" 
                                data-vv-name="startDate" 
                                data-vv-validate-on="change" 
                                class="date"
                                :fullWidth="true"
                                :maxDate="maxStartDate"/>
              <span slot="password" class="error" v-if="errors.has('startDate:required')">
                {{errors.first('startDate:required')}}
              </span>
            </div>
            <div class="form-group">
              <chp-date-picker :hintText="$t('ui.datePicker.endDate')" 
                                @input="changeEndday" 
                                :minDate = "minEndDate" 
                                v-model.lazy="model.end_date"  
                                v-validate="'required'" 
                                data-vv-value-path="model.end_date" 
                                data-vv-name="endDate"
                                :required="true" 
                                class="date"
                                :fullWidth="true"
                                data-vv-validate-on="change"/>
              <span slot="password" class="error" v-if="errors.has('endDate:required')">
                {{errors.first('endDate:required')}}
              </span>
            </div>
            <div class="form-group search">
              <mu-text-field  :hintText = "$t('clientListTable.keywordsHint')"
                              class="form-control keywords"
                              />
              <div class="wrapper-search-btn">
                <chp-button class="btn btn-primary print-btn" @click="research">
                  <i class="fa fa-search "></i> 
                  <span class="hidden-xs">{{ $t('ui.button.search') }}</span>
                </chp-button>
              </div>
            </div>
          </form>
    	    <chp-table  chp-sort="calories" chp-sort-type="desc" @sort="sortRow" slot="table">
            <chp-table-header>
              <chp-table-row>
                <chp-table-head chp-numeric>MT4#</chp-table-head>
                <chp-table-head class="name">{{ $t('account.name') }}</chp-table-head>
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
                <chp-table-cell v-for="(column, columnIndex) in row" :key="columnIndex" :chp-numeric="columnIndex != 'name' " :class="columnIndex">
                {{column}}
                </chp-table-cell>
              </chp-table-row>
            </chp-table-body>
          </chp-table>
        </chp-data-table>
      </chp-panel>
	  </div>
  </div>
</template>
<script>
	import mt4Service from 'services/mt4Service'
  import validateMixin from 'mixins/validatemix.js'
  import loadingMix from 'mixins/loading'
  import { Validator } from 'vee-validate'
  import { aMonthDate } from 'utils/dateUtil'
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
          	keywords:"",
            start_date:"",
            end_date:""
          },
          sort:"",
          minEndDate:"",
          maxStartDate:"",
        }
     },
    watch:{
    	agentId:function(val){
        this.innerAgentId = val
        if(val){
          this.fetchData()
        }
      },
      'model.start_date' : function(val){
        this.minEndDate = val
      },
      'model.end_date':function(val){
        this.maxStartDate = val
      }
    },
    created(){
      let { now,monthAgo } = aMonthDate()
      this.$set(this.model,'start_date',monthAgo)
      this.$set(this.model,'end_date',now)
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
        let validateResult = await this.$validator.validateAll();
        if(validateResult){
          this.fetchData()
        }
      },
      changeEndday(val){
        this.model.endDay = val
      } ,
      changeStartday(val){
        this.model.startDay = val
      },
      sortRow({name,type}){
        this.sort = (type=="desc" ?"-":"" )+ name
        this.fetchData()
      }

    }
}
</script>
<style lang="less" scoped>
  @import "~assets/less/variable.less";
  .form-inline{
    text-align: right;
    width:100%;
    .date{
      text-align: left;
      width:140px;
    }
    .keywords,.wrapper-search-btn{
    	vertical-align: middle;
		  text-align: left;
      display: inline-block;
      margin:0px;
    }
    .keywords{
    	width:140px;
    }
  }
  @media(max-width:@screen-sm-min){
    .filter-toolbar{
      text-align: center;
      .form-inline{
        text-align: left;
        .form-group{
          display: block;
          margin-bottom: 15px;
        }
        .form-group.search{
          display: table;
          width:100%;
          .keywords{
            width:100%;
          }
          .wrapper-search-btn{
            display: table-cell;
            text-align: right;
          }
        }
        .date{
          width:100%;        
        }
      }
    }
  }

  .chp-table-head,.chp-table-cell{
    &.name{
      width:200px;
      white-space: nowrap;
    }
  }
</style>
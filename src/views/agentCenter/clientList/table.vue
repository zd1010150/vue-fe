<i18n src="../i18n.yaml"></i18n>
<template>
  <div class="row">
		<div class="col-lg-12 col-md-12">
  		<chp-panel :canCollapse="false" :canClose="false" :isLoading="loadingStatus">
  	    <template slot="panelTitle">{{ $t('clientList') }}</template>
        <chp-data-table slot="body" :isDisplayFilterToolbar="isDisplayFilterToolbar"
                  :pageSize = "pageSize"
                  :rowsTotal = "rowsTotal"
                  :pageOptions = "pageOptions"
                  :canAdd = "false"
                  @toggleDisplayFilterToolbar="toggleDisplayFilterToolbar"
                  @pageSizeChange="pageSizeChange"
                  @pageNumberChange="pageNumberChange">
          <div slot="filterToolbar" class="data-table-filter-panel">
            <div class="row" >
              <div class="col-md-12 col-sm-12">
                <form class="form-inline">
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
                  <div class="form-group">
                    <mu-text-field  :hintText = "$t('clientListTable.keywordsHint')"
                                    class="form-control keywords"
                                    :fullWidth="true"
                                    v-model="model.keywords"
                                    />
                  </div>
                  <div class="form-group search">
                    <div class="btn-wrapper">
                      <chp-button class="btn btn-primary" @click="research">
                        <i class="fa fa-search pr-sm"></i>{{ $t('ui.button.search')}}
                      </chp-button>
                    </div>
                    <div class="btn-wrapper">
                      <chp-button class="btn btn-danger" @click="toggleDisplayFilterToolbar(false)">
                        <i class="fa fa-close br-xs"> </i> {{ $t('ui.button.cancel')}}
                      </chp-button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
    	    <chp-table  chp-sort="calories" chp-sort-type="desc" @sort="sortRow" slot="table">
            <chp-table-header>
              <chp-table-row>
                <chp-table-head chp-numeric>MT4#</chp-table-head>
                <chp-table-head class="name">{{ $t('account.name') }}</chp-table-head>
                <chp-table-head chp-sort-by="forex" chp-numeric>
                {{ $t('trade.fx') }}({{ $t('trade.lots') }})
                </chp-table-head>
                <chp-table-head chp-sort-by="oil" chp-numeric>
                {{ $t('trade.oil') }}({{ $t('trade.lots') }})
                </chp-table-head>
                <chp-table-head chp-sort-by="metal" chp-numeric>
                {{ $t('trade.metal') }}({{ $t('trade.lots') }})
                </chp-table-head>
                <chp-table-head chp-sort-by="cfd" chp-numeric>
                {{ $t('trade.cfd') }}{{ $t('trade.lots') }}
                </chp-table-head>
                <chp-table-head chp-sort-by="forexComm" chp-numeric>
                {{ $t('trade.fx') }}{{ $t('trade.com') }}
                </chp-table-head>
                <chp-table-head chp-sort-by="oilComm" chp-numeric>
                {{ $t('trade.oil') }}{{ $t('trade.com') }}
                </chp-table-head>
                <chp-table-head chp-sort-by="metalComm" chp-numeric>
                {{ $t('trade.metal') }}{{ $t('trade.com') }}
                </chp-table-head>
                <chp-table-head chp-sort-by="cfdComm" chp-numeric>
                {{ $t('trade.cfd') }}{{ $t('trade.com') }}
                </chp-table-head>
                <chp-table-head chp-sort-by="totalComm" chp-numeric>
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
          isDisplayFilterToolbar : false,
          pageIndex:1,
          pageSize:5,
          rowsTotal:100,
          pageOptions:[5,20,30],
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
      },
      pageSize:function(val){
        this.fetchData({
          pageIndex:this.pageIndex,
          pageSize:val
        });
      },
      pageIndex:function(val){
        this.fetchData({
          pageIndex:val,
          pageSize:this.pageSize
        });
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
              name: row.name,
              ForexVolume: row.forex,
              OilVolume:row.oil,
              MetalsVolume:row.metal,
              CFDsVolume:row.cfd,
              ForexComProfit:row.forexComm,
              OilComProfit:row.oilComm,
              MetalsComProfit:row.metalComm,
              CFDsComProfit:row.cfdComm,
              TotalComProfitAgent:row.totalComm
				    }
      		});
      	}else{
          this.histories = [];
        }
      },
      async fetchData(){
        this.loadingStatus = true
        let {data,message,success} = await mt4Service.getAffiliateList(this.innerAgentId,this.model,this.pageSize,this.pageIndex,this.sort)
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
      },
      toggleDisplayFilterToolbar(val){
        this.isDisplayFilterToolbar = val
      },
      pageSizeChange(newSize){
        this.pageSize = newSize
        this.pageIndex = 1
      },
      pageNumberChange(newIndex){
        this.pageIndex = newIndex
      }

    }
}
</script>
<style lang="less" scoped>
  @import "~assets/less/variable.less";
  @import "~assets/less/variable.less";
  .form-inline{
    text-align: right;
    width:100%;
    .date,.keywords{
      text-align: left;
      width:140px;
    }
    .btn-wrapper{
      display: inline-block;
    }
    .keywords{
      margin: 0px;
    }
  }
   @media(max-width:@screen-sm-min){
    .filter-toolbar{
      .form-inline{
        .form-group{
          display: block;
          margin-bottom: 15px;
        }
        .form-group.search{
          display: table;
          width:100%;
          .btn-wrapper{
            display: table-cell;
            width:50%;
            padding:0px 5px;
            .btn{
              width:100%;
            }
          }
        }
        text-align: left;
        .date,.keywords{
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
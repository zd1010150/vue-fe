
<i18n src="../i18n.yaml"></i18n>
<template>
	<div class="col-lg-12 col-md-12">
		<chp-panel :canCollapse="false" :canClose="false" :isLoading="loadingStatus">
      <template slot="panelTitle">{{ $t('deposit.paymentHistory')}}</template>
    	<chp-data-table slot="body" :isDisplayFilterToolbar="isDisplayFilterToolbar"
                  :pageSize = "pageSize"
                  :rowsTotal = "rowsTotal"
                  :pageOptions = "pageOptions"
                  :canAdd = "false"
                  @toggleDisplayFilterToolbar="toggleDisplayFilterToolbar"
                  @pageSizeChange="pageSizeChange"
                  @pageNumberChange="pageNumberChange">
        <!--过滤的toolbar begin-->
        <div slot="filterToolbar" class="data-table-filter-panel">
          <div class="row" >
            <div class="col-md-12 col-sm-12">
               <form class="form-inline">
                  <div class="form-group" :class="errorClass('startDate')">
                    <chp-date-picker  :hintText="$t('ui.datePicker.startDate')" 
                                      v-model.lazy="model.startDay" 
                                      @input="changeStartday" 
                                      :fullWidth="true" 
                                      :required="true"  
                                      v-validate="'required'" 
                                      data-vv-value-path="model.startDay" 
                                      data-vv-name="startDate" 
                                      data-vv-validate-on="change"
                                      class="date" 
                                      :maxDate="maxStartDate"/>
                    <span slot="password" class="error" v-if="errors.has('startDate:required')">
                      {{errors.first('startDate:required')}}
                    </span>
                  </div>
                  <div class="form-group" :class="errorClass('endDate')">
                    <chp-date-picker  :hintText="$t('ui.datePicker.endDate')" 
                                      @input="changeEndday" 
                                      :minDate = "minEndDate" 
                                      v-model.lazy="model.endDay"  
                                      v-validate="'required'" 
                                      data-vv-value-path="model.endDay" 
                                      data-vv-name="endDate" 
                                      :fullWidth="true" 
                                      :required="true"
                                      class="date" 
                                      data-vv-validate-on="change"/>
                    <span slot="password" class="error" v-if="errors.has('endDate:required')">
                      {{errors.first('endDate:required')}}
                    </span>
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
        <!--过滤操作的toolbar end-->
        <chp-table slot="table" chp-sort="calories" chp-sort-type="desc" @sort="sortRow" >
          <chp-table-header>
            <chp-table-row>
              <chp-table-head chp-sort-by="order_time">{{ $t('withdrawal.time')}}</chp-table-head>
              <chp-table-head chp-sort-by="mt4_id" width="100px">{{ $t('withdrawal.account')}}</chp-table-head>
              <chp-table-head chp-sort-by="method" width="100px">{{ $t('withdrawal.methods')}}</chp-table-head>
              <chp-table-head chp-sort-by="top_up_amount">{{ $t('withdrawal.amount')}}</chp-table-head>
              <chp-table-head chp-sort-by="currency_type">{{ $t('withdrawal.currency')}}</chp-table-head>
		        </chp-table-row>
          </chp-table-header>
		      <chp-table-body>
            <chp-table-row v-for="(row, rowIndex) in histories" :key="rowIndex"  :mu-select-fieldion="chpSelection">
              <chp-table-cell v-for="(column, columnIndex) in row" :key="columnIndex" :class="columnIndex">
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
    import dataTableService from 'services/dataTableService'
    import validateMixin from 'mixins/validatemix.js'
    import loadingMix from 'mixins/loading'
    import {Validator} from 'vee-validate'
	export default{
		mixins: [validateMixin,loadingMix],
		data () {
        return{
          isDisplayFilterToolbar : false,
          chpSelection: false, //每一行是否可选
          pageIndex:1,
          pageSize:5,
          rowsTotal:100,
          pageOptions:[5,20,30],
          histories: null,
          model:{
          	startDay:"",
          	endDay:""
          },
          minEndDate:"",
          maxStartDate:"",
          sort:""
        }
     },
    watch:{
    	'model.startDay' : function(val){
    		this.minEndDate = val;
    	},
      'model.endDay':function(val){
        this.maxStartDate = val;
      },
      pageSize:function(val){
        this.fetchDepositeData({
          pageIndex:this.pageIndex,
          pageSize:val
        })
      },
      pageIndex:function(val){
        this.fetchDepositeData({
          pageIndex:val,
          pageSize:this.pageSize
        })
      }
    },
    created(){
      this.fetchDepositeData({
    		pageIndex:this.pageIndex,
    		pageSize:this.pageSize
    	})
    },
    methods : {
      changeEndday(val){
      	this.model.endDay = val;
      }	,
      changeStartday(val){
      	this.model.startDay = val;
      },
      filterFields(originData){
      	if(originData && originData.length > 0){
        this.histories = originData.map(function(row,index) {
            return {
      				order_time : row.order_time,
      				mt4_id : row.mt4_id,
      				method : row.method,
      				top_up_amount: row.top_up_amount,
      				currency_type: row.currency_type
				    }
      		});
      	}else{
          this.histories = []
        }
      },
      async fetchDepositeData(params){
        this.loadingStatus = true
      	let {data,message,success} = await dataTableService.pagingQuery(Object.assign({
      			url:'/deposit'
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
          let validateResult = await this.$validator.validateAll()
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
  .form-inline{
    text-align: right;
    width:100%;
    .date{
      text-align: left;
      width:140px;
    }
    .btn-wrapper{
      display: inline-block;
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
        .date{
          width:100%;        
        }
      }
    }
  }
  .chp-table-head,.chp-table-cell{
    &.order_time{
      width:250px;
      white-space: nowrap;
    }
  }
</style>
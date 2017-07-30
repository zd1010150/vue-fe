<template>
	<div class="col-lg-12 col-md-12">
		<chp-panel :canCollapse="false" :canClose="false" :isLoading="loadingStatus">
	      <template slot="title">Payment History</template>
	      	<chp-data-table slot="body" :isDisplayFilterToolbar="isDisplayFilterToolbar"
                      :pageSize = "pageSize"
                      :rowsTotal = "rowsTotal"
                      :pageOptions = "pageOptions"
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
                    <div class="form-group" :class="errorClass('startDate')">
                      <chp-date-picker :hintText="$t('ui.datePicker.startDate')" v-model.lazy="model.startDay" @input="changeStartday" :fullWidth="true" :required="true"  v-validate="'required'" data-vv-value-path="model.startDay" data-vv-name="startDate" data-vv-validate-on="change" :maxDate="maxStartDate"/>
                       <span slot="password" class="error"
                      v-if="errors.has('startDate:required')">{{errors.first('startDate:required')}}</span>
                    </div>
                    <div class="form-group " :class="errorClass('endDate')">
                      <chp-date-picker :hintText="$t('ui.datePicker.endDate')" @input="changeEndday" :minDate = "minEndDate" v-model.lazy="model.endDay"  v-validate="'required'" data-vv-value-path="model.endDay" data-vv-name="endDate" :fullWidth="true" :required="true" data-vv-validate-on="change"/>
                       <span slot="password" class="error"
                      v-if="errors.has('endDate:required')">{{errors.first('endDate:required')}}</span>
                    </div>
                    <chp-button class="mb-xs mt-xs mr-xs btn btn-primary print-btn" @click="research">
                      <i class="fa fa-search "></i>
                    </chp-button>
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
          filterPanelOpen:"open"
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
      });
      },
      pageIndex:function(val){
        this.fetchDepositeData({
        pageIndex:val,
        pageSize:this.pageSize
      });
      },
      isDisplayFilterToolbar:function(val){
        if(val){
          this.filterPanelOpen = "open"
        }else{
          this.filterPanelOpen = "false"
        }
      }
    },
    created(){
      
    	this.fetchDepositeData({
    		pageIndex:this.pageIndex,
    		pageSize:this.pageSize
    	});
    },
    methods : {
      changeEndday(val){
      	this.model.endDay = val;
        console.log(this.errors);
      }	,
      changeStartday(val){
      	this.model.startDay = val;
         console.log(this.errors);
      },
      filterFields(originData){
      	if(originData && originData.length > 0){
          
      	this.histories = originData.map(function(row,index) {
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
      async fetchDepositeData(params){
        console.log(params);
        this.loadingStatus = true;
      	let {data,message,success} = await dataTableService.pagingQuery(Object.assign({
      			url:'/deposit'
      		},{
              pageIndex:this.pageIndex,
              pageSize:this.pageSize,
           },{queryParameter:this.model},params));
        this.loadingStatus = false;
        this.$nextTick(function(){
          console.log(this.loadingStatus);
        });
          if(success){
            
      			this.filterFields(data.data);
      			this.pageIndex = data.current_page;
      			this.rowsTotal = data.total;
      			this.pageSize = Number(data.per_page);
      		}
      },
      async research(){
        console.log(this.errors);
        try{
            let validateResult = await this.$validator.validateAll();
            console.log(this.model,JSON.stringify(this.errors),validateResult,"====");
            if(validateResult){
              console.log("validate success");
              this.fetchDepositeData();
            }
        }catch(err){
          console.log(err);
        }
        
          //console.log(this.$validator.validate('startDate'));
      },
      toggleDisplayFilterToolbar(val){
        console.log("it is toggle",val);
        this.isDisplayFilterToolbar = val
      },
      sortRow({name,type}){
          console.log("sort",name,type);
          this.fetchDepositeData();
      },
      pageSizeChange(newSize){
        this.pageSize = newSize;
      },
      pageNumberChange(newIndex){
        console.log(newIndex);
        this.pageIndex = newIndex;
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
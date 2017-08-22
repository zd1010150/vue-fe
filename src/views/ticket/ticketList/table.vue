<i18n src="../i18n.yaml"></i18n>
<template>
	<div class="col-lg-12 col-md-12">
		<chp-panel :canCollapse="false" :canClose="false" :isLoading="loadingStatus">
	      <template slot="title">Ticket List</template>
      	<chp-data-table 
        slot="body" 
        :isDisplayFilterToolbar="isDisplayFilterToolbar" 
        :canFilter = "true" 
        :canPaging="true"
        :pageSize = "pageSize"
        :rowsTotal = "rowsTotal"
        :pageOptions = "pageOptions"
        @toggleDisplayFilterToolbar="toggleDisplayFilterToolbar"
        @pageSizeChange="pageSizeChange"
        @pageNumberChange="pageNumberChange">
        <template slot="addToolbar">
          <chp-button class=" btn btn-primary mr-xs" @click="add">
            <i class="fa fa-plus mr-xs"></i>{{ $t('addNew')}}
          </chp-button>
        </template>
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
                      <chp-date-picker :hintText="$t('ui.datePicker.startDate')" v-model.lazy="model.start_time" @input="changestart_time" :fullWidth="true" :required="true"  v-validate="'required'" data-vv-value-path="model.start_time" data-vv-name="startDate" data-vv-validate-on="change" :maxDate="maxStartDate"/>
                       <span slot="password" class="error"
                      v-if="errors.has('startDate:required')">{{errors.first('startDate:required')}}</span>
                    </div>
                    <div class="form-group " :class="errorClass('endDate')">
                      <chp-date-picker :hintText="$t('ui.datePicker.endDate')" @input="changeend_time" :minDate = "minEndDate" v-model.lazy="model.end_time"  v-validate="'required'" data-vv-value-path="model.end_time" data-vv-name="endDate" :fullWidth="true" :required="true" data-vv-validate-on="change"/>
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
        <chp-table slot="table" chp-sort="calories" chp-sort-type="desc">
              <chp-table-header>
                <chp-table-row>
				  <chp-table-head chp-sort-by="method">{{ $t('time') }}</chp-table-head>
                  <chp-table-head >{{ $t('account') }}</chp-table-head>
                  <chp-table-head >{{ $t('questionType')}}</chp-table-head>
                  <chp-table-head >{{ $t('subject')}}</chp-table-head>
                  <chp-table-head>{{ $t('status')}}</chp-table-head>
                  <chp-table-head >{{ $t('actions')}}</chp-table-head>
    			</chp-table-row>
              </chp-table-header>
    		  <chp-table-body>
                <chp-table-row v-for="(row, rowIndex) in tickets" :key="rowIndex">
                  <chp-table-cell v-for="(column, columnIndex) in row" :key="columnIndex" >
                    <template v-if="columnIndex == 'status'">
                      {{ $t('statusInfo.'+column) }}
                    </template>
                    <template v-else-if="columnIndex =='id'">
                       <mu-flat-button  @click="detail(column)" label="detail">
                        <i aria-hidden="true" class="fa fa-info-circle"></i> 
                       </mu-flat-button>
                    </template>
                    <template v-else>
                      {{column}}
                    </template>
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
  import  { TABLES  } from "src/config/app.config.js"
  export default{
    mixins: [validateMixin,loadingMix],
    data () {
        return{
          minEndDate:"",
          maxStartDate:"",
          isDisplayFilterToolbar : false,
          chpSelection: false, //每一行是否可选
          pageIndex:1,
          pageSize:5,
          rowsTotal:100,
          pageOptions:[5,10,20,30],
          tickets: null,
          model:{
            start_time:"",
            end_time:""
        }
      }
    },
    watch:{
      "$store.state.refreshTable":function(val){
        if(val == TABLES["TICKET_TABLE"]){
          this.fetchData();
        }
      },
      'model.start_time' : function(val){
        this.minEndDate = val
      },
      'model.end_time' : function(val){
        this.maxStartDate = val
      },
      pageSize:function(val){
        this.fetchData({
          pageIndex:this.pageIndex,
          pageSize:val
        })
      },
      pageIndex:function(val){
        this.fetchData({
          pageIndex:val,
          pageSize:this.pageSize
        })
      }
    },
    created(){
      this.fetchData();
    },
    methods : {
      add(){
        this.$emit("add")
      },
      changeend_time(val){
        this.model.end_time = val
      },
      changestart_time(val){
        this.model.start_time = val
      },
      filterFields(originData){
        if(originData && originData.length > 0){
          this.tickets = originData.map((row,index) => {
            return {
              created_at:row.created_at,
              account_no:row.account_no,
              type:row.type,
              subject:row.subject,
              status:row.status,
              id:row.id 
            }
          })
        }else{
          this.tickets = []
        }
      },
      async fetchData(params){
        this.loadingStatus = true;
        let {data,message,success} = await dataTableService.pagingQuery(Object.assign({
            url:'/tickets'
          },{
              pageIndex:this.pageIndex,
              pageSize:this.pageSize,
              sort:this.sort
           },{queryParameter:this.model},params));
        this.loadingStatus = false;
        if(success){
          this.filterFields(data.data);
          this.pageIndex = data.current_page;
          this.rowsTotal = data.total;
          this.pageSize = Number(data.per_page);
        }
      },
      async research(){
            let validateResult = await this.$validator.validateAll();
            if(validateResult){
              this.fetchData();
            }
       },
      toggleDisplayFilterToolbar(val){
        this.isDisplayFilterToolbar = val
      },
      sortRow({name,type}){
          this.sort = (type=="desc" ?"-":"" )+ name;
          this.fetchData();
      },
      pageSizeChange(newSize){
        this.pageSize = newSize;
      },
      pageNumberChange(newIndex){
        this.pageIndex = newIndex;
      },
      detail(id){
        this.$emit("detail",id)
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
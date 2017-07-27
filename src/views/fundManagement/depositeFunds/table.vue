<template>
	<div class="col-lg-12 col-md-12">
		<chp-panel :canCollapse="false" :canClose="false">
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
        <div slot="filterToolbar">

         <chp-date-picker :hintText="$t('ui.datePicker.startDate')" :value="model.startDay" @input="changeStartday" v-validate="'required'" data-vv-value-path="model.startDay" data-vv-name="startDate"/>

         <chp-date-picker :hintText="$t('ui.datePicker.endDate')" @input="changeEndday" :minDate = "minEndDate" :value="model.endDay" v-validate="'required'" data-vv-value-path="model.endDay" data-vv-name="endDate"/>
			  <span slot="password" class="error"
              v-if="errors.has('endDate:required')">{{errors.first('endDate:required')}}</span>
              <span slot="password" class="error"
              v-if="errors.has('startDate:required')">{{errors.first('startDate:required')}}</span>

		 <chp-button class="mb-xs mt-xs mr-xs btn btn-primary print-btn" @click="research">
            <i class="fa fa-search "></i>
          </chp-button>
          <mu-icon-button @click="closeFilter" class="pull-right">
            <i class="fa fa-times"></i>
          </mu-icon-button>
        </div>
        <!--过滤操作的toolbar begin-->
		<chp-table slot="table" chp-sort="calories" chp-sort-type="desc" @sort="sortRow" >
          <chp-table-header>
            <chp-table-row>
              <chp-table-head chp-sort-by="dessert">Dessert (100g serving)</chp-table-head>
              <chp-table-head chp-sort-by="type" width="100px">Type</chp-table-head>
              <chp-table-head chp-sort-by="calories" chp-numeric chp-tooltip="The total amount of food energy and the given serving size">Calories (g)</chp-table-head>
              <chp-table-head chp-sort-by="fat" chp-numeric chp-tooltip="fat tip is very longlong long long">Fat (g)</chp-table-head>
              <chp-table-head>

                <span>Comments</span>
              </chp-table-head>


            </chp-table-row>
          </chp-table-header>

          <chp-table-body>
            <chp-table-row v-for="(row, rowIndex) in data" :key="rowIndex" :chp-item="row" :chp-selection="chpSelection">
              <chp-table-cell v-for="(column, columnIndex) in row" :key="columnIndex" :chp-numeric="columnIndex !== 'dessert' && columnIndex !== 'comment' && columnIndex !== 'type'">
                <template v-if="columnIndex === 'comment'" >
                  {{ column || '  &nbsp;' }}
                  <mu-icon-button class="edit-icon">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </mu-icon-button>
                </template>



                <chp-select hintText="Type"
                            :name="'type' + columnIndex"
                            :id="'type' + columnIndex"
                            v-model="nutrition[rowIndex].type"
                            v-if="columnIndex === 'type'"
                            :fullWidth="true"
                           
                >

                  <mu-menu-item value="ice_cream" title="Ice Cream"></mu-menu-item>
                  <mu-menu-item value="pastry" title="Pastry"></mu-menu-item>
                  <mu-menu-item value="other" title="Other"></mu-menu-item>
                </chp-select>

                <span v-if="columnIndex !== 'type' && columnIndex !== 'comment'" class="chp-cell-content">{{ column }}</span>
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
	export default{
		mixins: [validateMixin],
		data () {
        return{
          isDisplayFilterToolbar : false,
          chpSelection: false, //每一行是否可选
          selectedRows: [],
          pageIndex:1,
          pageSize:5,
          rowsTotal:100,
          pageOptions:[5,20,30],
          data: [],
          model:{
          	startDay:"",
          	endDay:""
          },
          minEndDate:""
        }
     } ,
    watch:{
    	'model.startDay' : function(val){
    		this.minEndDate = val;
    	}
    },
    methods : {
      changeEndday(val){
      	this.model.endDay = val;
      }	,
      changeStartday(val){
      	this.model.startDay = val;
      },
      async fetchDepositeData(params){
      	try{
      		let {data,message,success} = await dataTableService.paginQuery(Object.assign({
      			url:'/deposit',
      		},params));
      		if(success){
      			this.data = data.data;
      			this.pageIndex = data.current_page;
      			this.rowsTotal = data.total;
      			this.pageSize = data.per_page;
      		}else{
      			throw new Error(message);
      		}
      	}catch(error){
      		this.toastr.error(this.$t("info."+error.message));
        }
      	
      },
      research(){
      	this.fetchDepositeData(Object.assign({
	          	page:this.pageIndex,
	      		pageSize:this.pageSize,
			},this.model));
        },
      closeFilter()
      {
        this.isDisplayFilterToolbar = false
      },
      toggleDisplayFilterToolbar(val){

          this.isDisplayFilterToolbar = val
      },
      sortRow({name,type}){
          console.log("sort",name,type);
          this.fetchDepositeData({

          });
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
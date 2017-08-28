<i18n src="../i18n.yaml"></i18n>
<template>
	<div class="col-lg-12 col-md-12">
		<chp-panel :canCollapse="false" :canClose="false" >
	      <template slot="title">Online Training List</template>
      	<chp-data-table slot="body" 
                        :canAdd = "false"
                        :isDisplayFilterToolbar="false" 
                        :canFilter = "false" 
                        :canPaging="false">
        
          <chp-table slot="table" chp-sort="calories" chp-sort-type="desc">
              <chp-table-header>
                <chp-table-row>
                  <chp-table-head>{{ $t('onlineTraining.subject') }}</chp-table-head>
                  <chp-table-head>{{ $t('onlineTraining.presenter') }}</chp-table-head>
                  <chp-table-head>{{ $t('onlineTraining.date')}}</chp-table-head>
                  <chp-table-head>{{ $t('onlineTraining.time')}}</chp-table-head>
                  <chp-table-head>{{ $t('onlineTraining.status')}}</chp-table-head>
    			</chp-table-row>
              </chp-table-header>
    		  <chp-table-body>
                <chp-table-row v-for="(row, rowIndex) in innerTrainings" :key="rowIndex">
                  <chp-table-cell v-for="(column, columnIndex) in row" :key="columnIndex" >
                    
                    <template v-if="columnIndex == 'date'">
                      {{ column | beijingDate }}
                    </template>
                    <template v-else-if="columnIndex =='time'">
                      {{ $t('onlineTraining.bjTime') }}{{ column | beijingTime }}
                    </template>
                    <template v-else-if="columnIndex =='status'">
                      {{ $t('onlineTraining.allStatus.'+column) }}
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
 import bankCardService from 'services/bankCardService'
 import filters from "src/filters"
 export default{
    filters,
		props:{
      trainings : Array
    },
    computed:{
      innerTrainings:function(){
        return this.trainings.map((t)=>{
          return {
            subject: t.title + " -- " + t.subtitle,
            presenter: t.presenter,
            date: t.start,
            time:t.start,
            status:t.start > new Date() ? 'end' : (t.enrolled ? 'enrolled':'unenrolled')
          }
        })
      }
    },
    methods : {
      filterFields(originData){
      	if(originData && originData.length > 0){
        this.originData = originData;  
      	this.bankCards = originData.map(function(row,index) {
            return {
              
      				method : row.method,
      				bank_name : row.bank_name,
      				account : row.account,
      				swift : row.swift,
      				document : row.document,
              status: row.status,
              id: row.id // 一定要把id放到最后编辑
				    }
      		});
      	}else{
          this.bankCards = [];
        }
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
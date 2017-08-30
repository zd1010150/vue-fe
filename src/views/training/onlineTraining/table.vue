<i18n src="../i18n.yaml"></i18n>
<template>
<div class="row pt-lg">
   <div class="col-lg-12 col-md-12">
  		<chp-panel :canCollapse="false" :canClose="false" >
  	       <template slot="title">Online Training List</template>
        	 <template slot="subtitle">
            ACY稀万国际分析师位大家推出全新的网络课程，不管你是外汇新手还是有一定交易时间的投资者，我们相信只有打下扎实的基础才能在外汇市场中生存
            <h4 class="text-dark pb-none mb-none">ACY 授课官方YY 频道号：12345678 </h4>
           </template>
            <chp-table slot="body" chp-sort="calories" chp-sort-type="desc">
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
                        {{ $t('onlineTraining.bjTime') }} : {{ column | beijingTime }}
                      </template>
                      <template v-else-if="columnIndex =='status'" >
                         <span v-if="column =='unenrolled'" class="text-primary" @click="register(rowIndex)">
                            {{ $t('onlineTraining.allStatus.'+column) }}
                          </span>
                          <span v-if="column =='enrolled'" class="text-success">
                            {{ $t('onlineTraining.allStatus.'+column) }}
                          </span>
                          <span v-if="column =='end'" class="text-danger">
                            {{ $t('onlineTraining.allStatus.'+column) }}
                          </span>
                      </template>
                      <template v-else>
                        {{column}}
                      </template>
                    </chp-table-cell>
                  </chp-table-row>
                </chp-table-body>
              </chp-table>
          
        </chp-panel>
    </div>
  </div>  
</template>
<script>
 import filters from "src/filters"
 import trainingService from "services/trainingService"

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
            date: Number(t.start)*1000,
            time: Number(t.start)*1000,
            status:Number(t.start)*1000 < new Date() ? 'end' : (t.enrolled ? 'enrolled':'unenrolled')
          }
        })
      }
    },
    methods : {
      async register(rowIndex){
            let id = this.trainings[rowIndex].id
            let {success,data} = await trainingService.registerOnlineTraining(id)
            if(success){
              this.$emit('refresh')
              this.toastr.info(this.$t("info.SUCCESS"))
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
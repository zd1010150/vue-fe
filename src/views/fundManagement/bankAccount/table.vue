<i18n src="../i18n.yaml"></i18n>
<template>
	<div class="col-lg-12 col-md-12">
		<chp-panel :canCollapse="false" :canClose="false" :isLoading="loadingStatus">
	      <template slot="title">银行卡管理</template>
      	<chp-data-table slot="body" :isDisplayFilterToolbar="false" :canFilter = "false" :canPaging="false">
          <template slot="addBtnText">{{ $t('bankcard.newBtnText')}}</template> 
          
          <chp-table slot="table" chp-sort="calories" chp-sort-type="desc">
              <chp-table-header>
                <chp-table-row>
                  <chp-table-head chp-sort-by="method">{{ $t('bankcard.method') }}</chp-table-head>
                  <chp-table-head chp-sort-by="bank_name" >{{ $t('bankcard.bank_name') }}</chp-table-head>
                  <chp-table-head chp-sort-by="account" width="200px">{{ $t('bankcard.account')}}</chp-table-head>
                  <chp-table-head chp-sort-by="swift">{{ $t('bankcard.swift')}}</chp-table-head>
                  <chp-table-head>{{ $t('bankcard.attachment')}}</chp-table-head>
                  <chp-table-head chp-sort-by="status">{{ $t('bankcard.status')}}</chp-table-head>
                  <chp-table-head >{{ $t('bankcard.Action')}} </chp-table-head>
    			</chp-table-row>
              </chp-table-header>
    		  <chp-table-body>
                <chp-table-row v-for="(row, rowIndex) in bankCards" :key="rowIndex">
                  <chp-table-cell v-for="(column, columnIndex) in row" :key="columnIndex" >
                    <mu-icon-button  @click="previewImage(column)" class="text-primary" v-if="columnIndex == 'document'">
                      <i class="fa fa-paperclip" aria-hidden="true"></i>
                    </mu-icon-button>  
                    <template v-else-if="columnIndex == 'status'">
                      {{$t('bankcard.bankStatus.'+column)}}
                    </template>
                    <template v-else-if="columnIndex =='id'">
                       <mu-icon-button  @click="edit(column)" v-if="row.status == 2">
                        <i aria-hidden="true" class="fa fa-pencil"></i> 
                       </mu-icon-button>
                       <mu-icon-button  @click="deleteRow(column)">
                        <i aria-hidden="true" class="fa fa-trash-o"></i> 
                       </mu-icon-button>
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
    <chp-image-preview :src="documentSrc" :open="documentOpen" @close="closePreview"></chp-image-preview>
	</div>
</template>
<script>
    import bankCardService from 'services/bankCardService'
    import validateMixin from 'mixins/validatemix.js'
    import loadingMix from 'mixins/loading'
    import {Validator} from 'vee-validate'
	export default{
		mixins: [validateMixin,loadingMix],
		data () {
        return{
          originData: null,
          prompting:"",
          bankCards:null,
          documentSrc : "",
          documentOpen : false,
          selected : null
        }
     },
    watch:{
    	
    },
    created(){
      
    	this.fetchBankcardData();
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
      },
      async fetchBankcardData(){
        let {success,data} = await bankCardService.getBankCard();
        if(success && data){
         this.filterFields(data);
        }
      	return {data};
      },
      async fetchPromptingMessage(){

      },
      previewImage(src){
        console.log("===",src,this.documentSrc)
        this.documentSrc = src
        this.documentOpen = true
      },
      closePreview(){
        this.documentOpen = false
      },
      async editfunction(id){
        let {success} = await bankCardService.deleteBankCard(id)
        if(success){
          this.toastr.info(this.$t("info.success"))
        }
        this.fetchBankcardData()
      },
      deleteRow:function(){

      }

    },
    watch:{
      '$store.state.language':function(val,oldVal){
        this.prompting = this.fetchPromptingMessage(val)
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
<i18n src="../i18n.yaml"></i18n>
<template>
	<div class="col-lg-12 col-md-12">
		<chp-panel :canCollapse="false" :canClose="false" :isLoading="loadingStatus">
	      <template slot="panelTitle">{{ $t('bankcard.bankCardRecord') }}</template>
      	<chp-data-table slot="body" :isDisplayFilterToolbar="false" :canFilter = "false" :canPaging="false">
        <template slot="addToolbar">
          <chp-button class=" btn btn-primary mr-xs" @click="add">
            <i class="fa fa-plus mr-xs"></i>{{ $t('bankcard.newBtnText')}}
          </chp-button>
        </template>
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
                      <chp-tooltip chp-direction="bottom" v-if="column == CARD_STATUS.reject">{{ originData[rowIndex].comment}}</chp-tooltip>
                      {{$t('bankcard.bankStatus.'+column)}}
                    </template>
                    <template v-else-if="columnIndex =='id'">
                       <mu-icon-button  @click="deleteRow(column)">
                        <i aria-hidden="true" class="fa fa-trash-o"></i> 
                       </mu-icon-button>
                       <mu-icon-button  @click="editRow(column)" v-if="row.status == CARD_STATUS.reject">
                        <i aria-hidden="true" class="fa fa-pencil"></i> 
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
    <chp-dialog-confirm :chp-title="$t('ui.dialog.confirm.title')"
                        :chp-content-html="$t('bankcard.deleteDialogText')"
                        :chp-ok-text="$t('ui.button.confirm')"
                        :chp-cancel-text="$t('ui.button.cancel')"
                        @close="closeConfirmDialog"
                        ref="confirmDeleteDailog"/>
	</div>
</template>
<script>
    const CARD_STATUS = {
      reject: "Reject",
      approve: "Approve",
      pending: "Pending"
    }
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
          selected : null,
          editId : null
        }
     },
    created(){
      
    	this.fetchBankcardData()
    },
    methods : {
      refresh(){
        this.fetchBankcardData()
      },
      add(){
        this.$emit('add')
      },
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
      previewImage(src){
        this.documentSrc = src
        this.documentOpen = true
      },
      closePreview(){
        this.documentOpen = false
      },
      async deleteData(id){
        let {success} = await bankCardService.deleteBankCard(id)
        if(success){
          this.toastr.info(this.$t("info.SUCCESS"))
        }
        this.fetchBankcardData()
      },
      deleteRow(id){
        this.editId = id;
        this.$refs.confirmDeleteDailog.open()
      },
      closeConfirmDialog(status){
        if(status == 'ok'){
          this.deleteData(this.editId)
        }else{
          this.editId = null
        }
      },
      editRow(id){
          this.$emit("edit",id)
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
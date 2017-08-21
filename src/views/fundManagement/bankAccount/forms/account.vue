<template lang="html">

      <form slot="body" class="form-horizontal form-bordered " method="POST"  target="_blank" ref="accountForm">
       <div class="form-group" :class="errorClass('bankName')">
          <label class="control-label col-md-3">Bank 
            <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-6" >
            <mu-text-field v-model="model.bank_name" :disabled="!isCUP" v-validate="'required'" data-vv-value-path="model.bank_name" data-vv-name="bankName"  class="form-control"   :fullWidth="true" />
            
            <span slot="required" class="error" v-if="errors.has('bankName:required')">{{errors.first('bankName:required')}}</span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('bankAccount')">
          <label class="control-label col-md-3">Account Number
            <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-6">
            <mu-text-field v-model="model.account"  v-validate="'required'" data-vv-value-path="model.account" data-vv-name="bankAccount"  class="form-control"   :fullWidth="true" />
            
            <span slot="required" class="error" v-if="errors.has('bankAccount:required')">
              {{errors.first('bankAccount:required')}}
            </span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('bankProvince')" v-if="isCUP">
          <label class="control-label col-md-3">Bank Province
          <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-6">
            <mu-text-field v-model="model.province"  v-validate="'required'" data-vv-value-path="model.province" data-vv-name="bankProvince"  class="form-control"   :fullWidth="true" />
            
            <span slot="required" class="error" v-if="errors.has('bankProvince:required')">{{errors.first('bankProvince:required')}}</span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('bankCity')" v-if="isCUP">
          <label class="control-label col-md-3">Bank City
          <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-6">
            <mu-text-field v-model="model.city"  v-validate="'required'" data-vv-value-path="model.account" data-vv-name="bankCity"  class="form-control"   :fullWidth="true" />
            
            <span slot="required" class="error" v-if="errors.has('bankCity:required')">{{errors.first('bankCity:required')}}</span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('branchName')" v-if="isCUP">
          <label class="control-label col-md-3">Branch Name
            <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-6">
            <mu-text-field v-model="model.address"  v-validate="'required'" data-vv-value-path="model.address" data-vv-name="branchName"  class="form-control"   :fullWidth="true" />
            
            <span slot="required" class="error" v-if="errors.has('branchName:required')">{{errors.first('branchName:required')}}</span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('swift')" v-if="isCUP">
          <label class="control-label col-md-3">Swift
            <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-6">
            <mu-text-field v-model="model.swift"  v-validate="'required'" data-vv-value-path="model.swift" data-vv-name="swift"  class="form-control"   :fullWidth="true" />
            
            <span slot="required" class="error" v-if="errors.has('swift:required')">{{errors.first('swift:required')}}</span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('bankDocument')">
          <label class="control-label col-md-3">Uploads bill
            <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-6" >
          <transition-group name="chp-fade" mode="out-in">
            <div v-show="model.document.length > 0" key="attachment">
              <a :href="model.document"  target="_blank">附件</a>
              <mu-icon-button @click.stop="deleteDocument"><i class="fa fa-times" aria-hidden="true"></i></mu-icon-button>
            </div>
            <div v-show="model.document.length <=0 "  key="upload" >
              <chp-file-upload 
              :extensions="uploadConfig.bill.extensions"
              :size="uploadConfig.bill.size"
              name="document" 
              drop=".dropFileAreaDiv" 
              :dropDirectory="false" 
              :multiple="false"
              :post-action="dropPostAction" 
              @input="dropInputFunction" 
              ref="dropUploads" class="form-control dropFileArea">  
              <div class="dropFileAreaDiv">
                  <h6> Drop File Here or Click to Upload </h6>
                  <P>Bank Account Statement or  Online Banking e-statement </P>
                  <div v-html="promotingMsg"></div>
                  <P>Only Accept: png, jpg,jpeg,bmp, pdf</P>
                
              </div>
            </chp-file-upload> 
            </div>
            
          </transition-group>
         <input type="hidden" v-model="model.document" v-validate="'required'" data-vv-value-path="model.document" data-vv-name="bankDocument"  >
         <span slot="required" class="error" v-if="errors.has('bankDocument:required')">{{errors.first('bankDocument:required')}}</span>
          </div>
        </div>
     </form> 
</template>

<script>

import validateMixin from 'mixins/validatemix'
import configService from 'services/configService' 
import bankCardService from 'services/bankCardService'
import { UPLOAD_DOCUMENT_URL } from "src/config/url.config.js"  
import { UPLOAD_CONFIG,TABLES } from "src/config/app.config.js"
import {SET_REFRESH_TABLE} from "store/mutation-types"
import { assignToObject } from "src/utils/objectUtil"
export default {
  mixins:[validateMixin],
	data(){
      return {
        innerMethod:"",
        innerEditObj:"",
        uploadConfig:UPLOAD_CONFIG,
        isCUP:true,
        promotingMsg:"",
        dropPostAction:UPLOAD_DOCUMENT_URL+"/bill",
        editCardId:null,
        isEdit:false,
        editId:null,
        originModel:{
          province:"",
          city : "",
          address:"",
          account:"",
          swift:"",
          bank_name : "",
          method: "",
          document:""
        },
        model:{
          province:"",
          city : "",
          address:"",
          account:"",
          swift:"",
          bank_name : "",
          method: "",
          document:""
        }
      }
    },
    props:{
      method:String,
      editObj:Object
    },
    methods:{
    	async fetchPromtingMessage(val){
        this.$emit('loading',true)
        let key =  "prompting_message_"+(val == "en" ?"en":"cn"),
            {success,data} = await configService.getConfigByKey({fields:[key]});
        this.promotingMsg = data[key];
        this.$emit('loading',false)
    	},
    	
      dropInputFunction(files,isAllsuccess,error){
        this.$refs.dropUploads.active = true;
        console.log("ifiles:",JSON.stringify(files),error,isAllsuccess);
        if(isAllsuccess){
          this.$set(this.model,"document",files[0].response.data.url);
        }else{
          this.$set(this.model,"document","")
          
          this.toastr.error(this.$t("info.UPLOAD_ERROR."+error[0]))
        }
      },
      async submit(){
        console.log("",this.model.document,this.$validator,this.$validator.fieldBag,this.$validator.errorBag);
        let validateResult = await this.$validator.validateAll();
        console.log(validateResult);
        if(validateResult){
          let res;
          if(this.editId){
            res = await bankCardService.updateBankCard(this.editId,this.model);
          }else{
            res = await bankCardService.addBankCard(this.model);
          }
          let {success}=res;
          if(success){
            this.toastr.info(this.$t("info.SUCCESS"));
            this.$store.commit(SET_REFRESH_TABLE,TABLES["BANK_CARD_TABLE"]);
            this.$emit('close');
          }
        }
         
      },
      deleteDocument(){
        this.$set(this.model,"document","");
      },
      initModel:function(){
        this.isEdit = this.innerEditObj !=null
        if(this.isEdit){//如果是编辑
          this.editId = this.innerEditObj.id;
          this.model = Object.assign({},this.model,assignToObject(this.originModel,this.innerEditObj));
        }else{
          this.editId = null;
          this.model = Object.assign({},this.model,this.originModel,{method:this.innerMethod,bank_name:this.innerMethod});
        }
         this.isCUP = this.model.method == "CUP";
      }
        
    },
    mounted(){
      console.log(this.editObj);
      this.innerMethod = this.method;
      this.innerEditObj = this.editObj;
      this.initModel();
    	this.fetchPromtingMessage(this.$store.state.language);
    },

    watch :{
      "$store.state.language" : function(val,oldVal){
        if(val == oldVal){ return;}
        this.fetchPromtingMessage(val);
      },
      method:function(val){
        this.innerMethod = val
      },
      editObj:function(val){
        this.innerEditObj = val
      },
      innerMethod : function(val,oldVal){
       this.initModel();
      },
      innerEditObj:function(val){
        this.initModel();
      }
    }
  }
</script>
<style lang="less">
  .dropFileArea{
    max-height:300px;
    min-height:30px;
    width:100%;
    height:auto;
    overflow: auto;
    .file-uploads{
      width:100%;
    }
  }
</style>


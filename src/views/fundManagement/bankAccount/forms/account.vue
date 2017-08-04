<template lang="html">

      <form slot="body" class="form-horizontal form-bordered " method="POST"  target="_blank" ref="accountForm">
       <div class="form-group" :class="errorClass('bankName')">
          <label class="control-label col-md-3">Bank 
            <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-6" >
            <mu-text-field v-model="model.bank_name"  v-validate="'required'" data-vv-value-path="model.bank_name" data-vv-name="bankName"  class="form-control"   :fullWidth="true" />
            
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
        <div class="form-group" :class="errorClass('bankProvince')">
          <label class="control-label col-md-3">Bank Province
          <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-6">
            <mu-text-field v-model="model.province"  v-validate="'required'" data-vv-value-path="model.province" data-vv-name="bankProvince"  class="form-control"   :fullWidth="true" />
            
            <span slot="required" class="error" v-if="errors.has('bankProvince:required')">{{errors.first('bankProvince:required')}}</span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('bankCity')">
          <label class="control-label col-md-3">Bank City
          <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-6">
            <mu-text-field v-model="model.city"  v-validate="'required'" data-vv-value-path="model.account" data-vv-name="bankCity"  class="form-control"   :fullWidth="true" />
            
            <span slot="required" class="error" v-if="errors.has('bankCity:required')">{{errors.first('bankCity:required')}}</span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('branchName')">
          <label class="control-label col-md-3">Branch Name
            <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-6">
            <mu-text-field v-model="model.address"  v-validate="'required'" data-vv-value-path="model.address" data-vv-name="branchName"  class="form-control"   :fullWidth="true" />
            
            <span slot="required" class="error" v-if="errors.has('branchName:required')">{{errors.first('branchName:required')}}</span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('swift')">
          <label class="control-label col-md-3">Swift
            <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-6">
            <mu-text-field v-model="model.swift"  v-validate="'required'" data-vv-value-path="model.swift" data-vv-name="swift"  class="form-control"   :fullWidth="true" />
            
            <span slot="required" class="error" v-if="errors.has('swift:required')">{{errors.first('swift:required')}}</span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('bankDocument')">
          <label class="control-label col-md-3">Uploads</label>
          <div class="col-md-6" >
            <chp-file-upload 
              :extensions="['png', 'jpg','jpeg','bmp','pdf']"
              name="document" 
              drop=".dropFileArea" 
              :dropDirectory="false" 
              :multiple="true"
              :post-action="dropPostAction" 
              @input="dropInputFunction" 
              ref="dropUploads">  
              <div class="form-control dropFileArea" @click="dropInputFunction">
                <h6> Drop File Here or Click to Upload </h6>
                <P>Bank Account Statement or  Online Banking e-statement </P>
                <P>{{promotingMsg}}</P>
                <P>Only Accept: png, jpg,jpeg,bmp, pdf</P>
              </div>
            </chp-file-upload> 
             <input type="hidden" v-validate="'required'" data-vv-value-path="model.document" data-vv-name="bankDocument"  >
             <span slot="required" class="error" v-if="errors.has('bankDocument:required')">{{errors.first('bankDocument:required')}}</span>
          </div>
        </div>
     </form> 
</template>

<script>

import validateMixin from 'mixins/validatemix'
import configService from 'services/configService' 
import { UPLOAD_DOCUMENT_URL } from "src/config/url.config.js"  
export default {
  mixins:[validateMixin],
	data(){
      return {
        promotingMsg:"",
        dropPostAction:UPLOAD_DOCUMENT_URL+"/bill",
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
      method:String
    },
    methods:{
    	async fetchPromtingMessage(val){
        this.$emit('loading',true)
        let key =  "prompting_message_"+(val == "en" ?"en":"cn"),
            {success,data} = await configService.getConfigByKey(key);
        this.promotingMsg = data[key];
        this.$emit('loading',false)
    	},
    	
      dropInputFunction(files,isAllsuccess,error){
        this.$refs.dropUploads.active = true;
        console.log("input files drop:",JSON.stringify(response));
        if(isAllsuccess){
          this.model.document = files[0].response.data.url;
        }else{

        }
      },
      submit(){
         
         new Promise();
      }
    },
    created(){
    	this.fetchPromtingMessage(this.$store.state.language);
    },
    watch :{
      "$store.state.language" : function(val,oldVal){
        if(val == oldVal){ return;}
        this.fetchPromtingMessage(val);
      },
      method : function(val,oldVal){
        this.model.method = val;
      }
    }
  }
</script>


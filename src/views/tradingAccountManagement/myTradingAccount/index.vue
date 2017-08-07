<template>
 <div class="container-fluid" >
    
    <div class="row">
    	<div class="col-lg-12 col-md-12">
			<chp-panel :canCollapse="false" :canClose="false" :isLoading="loadingStatus">
				 <template slot="title">Register for Sub Account</template>
				 <form slot="body" class="form-horizontal form-bordered " method="POST"  target="_blank" ref="accountForm">
			       <div class="form-group" :class="errorClass('bankName')">
			          <label class="control-label col-md-3">Plat Form 
			            <span class="required" aria-required="true">*</span>
			          </label>
			          <div class="col-md-6" >
			            <chp-select v-model="model.method" v-validate="'required'" data-vv-value-path="model.method" name="withdrawMethod" :hintText="nullHintText">
			              <template v-for="(value,key) in methodsAndAccounts">
			                <mu-menu-item :value="key" :title="$t('payMentMethod.'+key)" key="key"/>
			              </template>
			            </chp-select>
			            
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
		 <div class="row" slot="footer">
		      <div class="col-md-6 col-sm-6 col-xs-6" >
		          <chp-button class="mb-xs mt-xs mr-xs btn btn-default print-btn" @click="previous" v-if="activeStepTab !='tab1'">
		            <i class="fa fa-angle-left hidden-sm hidden-xs"></i> {{ $t('ui.button.previous') }}
		          </chp-button>
		          
		      </div>
		       <div class="col-md-6 col-sm-6 col-xs-6" >
		       	<chp-button class="mb-xs mt-xs mr-xs btn btn-default print-btn pull-right" @click="next" v-if="activeStepTab !='tab3'">
		           {{ $t('ui.button.next') }}
		           <i class="fa fa-angle-right hidden-sm hidden-xs"></i> 
		          </chp-button>
		          <chp-button class="mb-xs mt-xs mr-xs btn btn-primary print-btn pull-right" @click="submit" v-if="activeStepTab =='tab3'" :diabled="hasSubmit">
		           {{ $t('ui.button.submit') }}
		           <i class="fa fa-check hidden-sm hidden-xs"></i> 
		          </chp-button>
		       </div>
		    </div>
			</chp-panel>
		</div>
    </div>
</div>
</template>
<script>
	
  export default{
		data(){
			return {
				model :{
					plat_form:"",
					account_type:"",
					lever:"",
					base_currency:"",
					reason:""
				}
			}
		}
	}
</script>

<i18n src="../i18n.yaml"></i18n>
<template>
<div class="col-lg-12 col-md-12">
 <chp-panel :canCollapse="false" :canClose="false" :isLoading="loadingStatus">
  <template slot="panelTitle">{{ $t('addNew') }}</template>
  <form slot="body" class="form-horizontal form-bordered ">
    
    <div class="form-group" :class="errorClass('account')">
      <label class="control-label col-md-3">
      	{{ $t('account') }}
       <span class="required" aria-required="true">*</span>
       </label>
      <div class="col-md-6" >
        <mu-select-field v-model="model.account_no" 
                    v-validate="'required'" 
                    data-vv-value-path="model.account_no" 
                    data-vv-name="account" >
          <template v-for="mt4 in originMt4">
            <mu-menu-item :value="mt4.id" :title="mt4.text" key="mt4.id"/>
          </template>
        </mu-select-field>
         <span slot="required" class="error" v-if="errors.has('account:required')">{{errors.first('account:required')}}</span>
      </div>
    </div>
    <div class="form-group" :class="errorClass('questionType')">
      <label class="control-label col-md-3">
        {{ $t('questionType') }}
        <span class="required" aria-required="true">*</span>
      </label>
      <div class="col-md-6" >
        <mu-select-field v-model="model.type" v-validate="'required'" data-vv-value-path="model.type" data-vv-name="questionType" >
          <template v-for="(q,key) in questionType">
            <mu-menu-item :value="q.code" :title="q.text" key="key"/>
          </template>
        </mu-select-field>
         <span slot="required" class="error" v-if="errors.has('questionType:required')">{{errors.first('questionType:required')}}</span>
      </div>
    </div>
    <div class="form-group" :class="errorClass('subject')">
      <label class="control-label col-md-3">
        {{ $t('subject') }}
        <span class="required" aria-required="true">*</span>
      </label>
      <div class="col-md-6">
        <mu-text-field v-model="model.subject" 
                        v-validate="'required'" 
                        data-vv-value-path="model.subject" 
                        data-vv-name="subject"  
                        class="form-control" 
                        :fullWidth="true" />
        <span slot="required" class="error" v-if="errors.has('subject:required')">{{errors.first('subject:required')}}
        </span>
      </div>
    </div>
    
    <div class="form-group">
          <label class="control-label col-md-3">
          {{ $t('attach') }}
          </label>
          <div class="col-md-6" >
          <transition-group name="chp-fade" mode="out-in">
            <div v-show="model.attachment.length > 0" key="attachment">
              <a :href="model.attachment"  target="_blank">
                {{ $t('ui.upload.attachment') }} 
              </a>
              <mu-icon-button @click.stop="deleteDocument"><i class="fa fa-times" aria-hidden="true"></i></mu-icon-button>
            </div>
            <div v-show="model.attachment.length <=0 "  key="upload" >
              <chp-file-upload 
              :extensions="uploadConfig.img.extensions"
              :size="uploadConfig.img.size"
              name="file" 
              drop=".dropFileAreaDiv" 
              :dropDirectory="false" 
              :multiple="false"
              :post-action="dropPostAction" 
              @input="dropInputFunction" 
              ref="dropUploads" class="form-control dropFileArea">  
              <div class="dropFileAreaDiv">
                  <h6> {{ $t('ui.upload.tips') }} </h6>
                  <P> {{ $t('ui.upload.accepts') }}: png, jpg,jpeg,bmp</P>
              </div>
            </chp-file-upload> 
            </div>
            
          </transition-group>
         <input type="hidden" v-model="model.attachment">
         </div>
    </div>
    <div class="form-group" :class="errorClass('content')">
      <label class="control-label col-md-3">{{ $t('content') }}
      <span class="required" aria-required="true">*</span></label>
      <div class="col-md-6" >
         <mu-text-field 
         hintText="" 
         multiLine 
         :fullWidth="true" 
         class="form-control" 
         v-model="model.content" 
         :rows="6" 
         :rowsMax="6"
         v-validate="'required'" 
         data-vv-value-path="model.content" 
         data-vv-name="content"
         />
         <span slot="required" class="error" v-if="errors.has('content:required')">{{errors.first('content:required')}}</span>
      </div>
    </div>
 </form> 
 <div class="row" slot="footer">
  <div class="col-md-6 col-md-offset-3 " >
      <chp-button class="mb-xs mt-xs mr-xs btn btn-primary print-btn" @click="submit" :disabled="disableSubmit">
        <i class="fa fa-paper-plane-o hidden-sm hidden-xs"></i> {{ $t('ui.button.send') }}
      </chp-button>
      <chp-button class="mb-xs mt-xs mr-xs btn btn-default print-btn" @click="cancel">
       <i class="fa fa-times hidden-sm hidden-xs"></i> {{ $t('ui.button.discard') }}
      </chp-button>
  </div>
 </div>
 </chp-panel>
</div>
</template>
<script>
	import validateMixin from 'mixins/validatemix'
	import loadingMix from 'mixins/loading'
	import { UPLOAD_ASSET_URL } from "src/config/url.config.js"  
	import { UPLOAD_CONFIG} from "src/config/app.config.js"
  import ticketService from 'services/ticketService'
  
	export default{
		mixins:[validateMixin,loadingMix],
		data(){
			return{
				originMt4:null,
				questionType:[],
				disableSubmit:false,
				baseCurrency:"",
				uploadConfig:UPLOAD_CONFIG,
        dropPostAction:UPLOAD_ASSET_URL,
				model:{
					account_no:"",
					type:"",
					subject:"",
					content:"",
					attachment:"",
          fileid:0
				}
			}
		},
		created(){
			this.fetchMT4()
      this.fetchTypes()
		},
		methods:{
			async submit(){
				this.disableSubmit = true
				let validateResult = await this.$validator.validateAll()
        if(validateResult){
          let {message,success,data} = await ticketService.addTicket(this.model)
          if(success){
             this.toastr.info(this.$t("info.SUCCESS"))
             this.$emit("close")
          }
        }
		    this.disableSubmit = false
			},
			cancel(){
				this.$emit('cancel')
			},
			fetchMT4(){
	      this.originMt4 = this.$store.state.mt4Accounts.map((mt4)=>{
            return {
              id:mt4.mt4_id,
              text:"#"+mt4.mt4_id
            }
	      });
		    this.$set(this.model,"account_no",this.originMt4[0].id)
		  },
	    deleteDocument(){
      		this.$set(this.model,"attachment","")
    	},
      mapTypes(data){
        this.questionType = data.map((item,index)=>{
            return {
              code : item,
              text: this.$t('type.'+item)
            }
        })
        this.$set(this.model,"type",this.questionType[0].code)
      },
      async fetchTypes(){
        this.loadingStatus = true
        let {success,data} = await ticketService.getTicketTypes()
        if(success){
          this.mapTypes(data)
        }
        this.loadingStatus = false
      },
  		dropInputFunction(files,isAllsuccess,error){
        if(isAllsuccess){
          this.$set(this.model,"fileid",files[0].data.fileid)
          this.$set(this.model,"attachment",files[0].data.url)
        }else{
          this.$set(this.model,"attachment","")
          this.$set(this.model,"fileid","")
          this.toastr.error(this.$t("info.UPLOAD_ERROR."+error[0]))
        }
  		},
		}
	}
</script>

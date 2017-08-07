<i18n src="../../i18n.yaml"></i18n>
<template lang="html">
	<div class="row padding-20">
		<p class="center-block" v-html="terms"></p>
      	<div class="form-group" :class="errorClass('terms')">
      		<div class="">
        	<chp-checkbox  name="terms" nativeValue="checkedIterms" v-model="checkedIterms" data-vv-value-path="checkedIterms" v-validate="'required'" data-vv-name="terms" data-vv-validate-on="input" type="checkbox">
           {{ $t('withdrawal.note')}} 
          </chp-checkbox>
	        <span class=""></span>
	        <br>
	        <span slot="required" class="error" v-if="errors.has('terms:required')">{{errors.first('terms:required')}}</span>
      </div>
    </div>
	</div>
</template>

<script>
import configService from 'services/configService' 
import validateMixin from 'mixins/validatemix'

export default {
   mixins:[validateMixin],
   data(){
   	return {
	   	terms:null,
	   	configKey:"",
	   	checkedIterms:[]
   	}
   },
   watch :{
   	"$store.state.language" : function(val,oldVal){
   		if(val == oldVal){ return;}
   		this.fetchTerms(val);
   	}
   },
   created(){
   		this.fetchTerms(this.$store.state.language);
   },
   methods:{
   	async fetchTerms(val){
   		this.$emit("loading",true)
   		let key =  "withdraw_terms_"+(val == "en" ?"en":"cn"),
            {success,data} = await configService.getConfigByKey({fields:[key]});
        if(success && data){
			this.terms = data[key]
        }
   		this.$emit("loading",false);
   	},
   	async validate (){
   		return await this.$validator.validateAll();
   	},
    init(){
      this.checkedIterms.splice(0,this.checkedIterms.length);
    }
   }
  }
</script>


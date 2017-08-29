<template>
	<div class="row">
		<div class="col-lg-6 col-xs-12">
			<slot></slot>
			{{ $store.state.userInfo.agentActiveDay}}
			
		</div>
		<div class="col-lg-6 col-xs-12 pull-right">

			<form class="form-inline">
		        <div class="form-group" :class="errorClass('startDate')">
		            <chp-date-picker :hintText="$t('ui.datePicker.startDate')" 
						          v-model.lazy="model.start_date" 
						          :fullWidth="true" 
						          :required="true"  
						          v-validate="'required'" 
						          data-vv-value-path="model.start_date" 
						          data-vv-name="startDate" 
						          data-vv-validate-on="change" 
						          :maxDate="maxStartDate"
						          :minDate="minStartDate"/>
		            <span slot="password" 
		       			  class="error"
		                  v-if="errors.has('startDate:required')">
		                 {{errors.first('startDate:required')}}
		            </span>
		        </div>
		        <div class="form-group " :class="errorClass('endDate')">
		           <chp-date-picker :hintText="$t('ui.datePicker.endDate')" 
							        :minDate = "minEndDate"
							        :maxDate = "maxEndDate" 
						            v-model.lazy="model.end_date"  
						            v-validate="'required'" 
						            data-vv-value-path="model.end_date" 
						            data-vv-name="endDate" 
						            :fullWidth="true" 
						            :required="true" 
						            data-vv-validate-on="change"/>
		            <span slot="password" 
		       		 	  class="error"
		                  v-if="errors.has('endDate:required')">
		      			{{errors.first('endDate:required')}}
		            </span>
		        </div>
		        <chp-button class="mb-xs mt-xs mr-xs btn btn-primary print-btn" @click="research">
		          <i class="fa fa-search "></i>
		        </chp-button>
	      </form>
		</div>
	</div>
</template>
<script>
	import { timePickerFormat } from 'utils/dateUtil'
	import validateMixin from 'mixins/validatemix.js'
	export default{
		mixins:[validateMixin],
		data(){
			return {
				model:{
					start_date:'',
					end_date:''
				},
				maxStartDate:'' ,
				minStartDate: this.$store.state.userInfo.agentActiveDay,
				maxEndDate:timePickerFormat(new Date().getTime()),
				minEndDate: ''
			}
		},
		watch:{
			'model.start_date' : function(val){
    			this.minEndDate = val
    		},
      		'model.end_date':function(val){
        		this.maxStartDate = val
      		},
		},
		methods:{
			async research(){
				let validateResult = await this.$validator.validateAll()
		        if(validateResult){
		          this.$emit('research',this.model)
		        }
			}
		}
	}
</script>
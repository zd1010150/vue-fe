<template>
	<div class="row pb-sm pr-md">
		<div class="col-left pl-lg pb-sm">
			<slot></slot>

		</div>
		<div class="col-right">
			<form class="form-inline">
		        <div class="form-group" :class="errorClass('startDate')">
		            <chp-date-picker :hintText="$t('ui.datePicker.startDate')"
		            			  class="date start-date" 
						          v-model.lazy="model.start_date" 
						          :fullWidth="true" 
						          :required="true"  
						          v-validate="'required'" 
						          data-vv-value-path="model.start_date" 
						          data-vv-name="startDate" 
						          data-vv-validate-on="input"
						          :value = "model.start_date" 
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
		           					class="date end-date" 
							        :minDate = "minEndDate"
							        :maxDate = "maxEndDate" 
						            v-model.lazy="model.end_date"  
						            v-validate="'required'" 
						            data-vv-value-path="model.end_date" 
						            data-vv-name="endDate" 
						            :value = "model.end_date" 
						            :fullWidth="true" 
						            :required="true" 
						            data-vv-validate-on="input"/>
		            <span slot="password" 
		       		 	  class="error"
		                  v-if="errors.has('endDate:required')">
		      			{{errors.first('endDate:required')}}
		            </span>
		        </div>
		        <div class="form-group btn-search">
			        <chp-button class=" btn btn-primary print-btn" @click="research">
			          <i class="fa fa-search "></i>
			        </chp-button>
		        </div>
	      </form>
		</div>
	</div>
</template>
<script>
	import { timePickerFormat,aMonthDate } from 'utils/dateUtil'
	import validateMixin from 'mixins/validatemix.js'
	export default{
		mixins:[validateMixin],
		props:{
			agent:[String,Number]
		},
		data(){
			return {
				model:{
					start_date:'',
					end_date:''
				},
				maxStartDate:'' ,
				minStartDate: '',
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
      		agent:function(val){
      			let agent = this.$store.state.agentAccounts.filter((item)=>{
      				return item.mt4_id == this.agent
      			})
      			this.minStartDate = agent && agent.length > 0 ? (agent[0].created_at.split(' ')[0].trim()) : ""
      		}
		},
		methods:{
			async research(){
				let validateResult = await this.$validator.validateAll()
		        if(validateResult){
		          this.$emit('research',this.model)
		        }
			}
		},
		mounted(){
			let { now,monthAgo } = aMonthDate()
			this.$set(this.model,'start_date',monthAgo)
			this.$set(this.model,'end_date',now)
			this.$emit('research',{
				start_date :monthAgo,
				end_date : now})
		}
	}
</script>
<style lang="less" scoped>
	@import "~assets/less/variable.less";
	.row{
		.col-right{
			float:right;
		}
		.col-left{
			float: left;
		}
	}
	@media(max-width:@screen-sm-min){
		.row{
			.col-right,.col-left{
				float:none;
			}
			.form-inline{
				padding-left: 10px;
			}
			.form-group{
				float:left;
				padding-left: 3px;
				&.btn-search{
					button{
						margin:4px;
					}
				}
			}
			.date{
				width:120px;
			}
		}
	}
</style>
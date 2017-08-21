
<template>
	<div class="col-md-12 col-sm-12 filter pt-sm pr-none pl-none">
        <form class="form-inline">
            <div class="form-group" :class="errorClass('startDate')">
              <chp-date-picker class="date start-date" :hintText="$t('ui.datePicker.startDate')" v-model.lazy="model.startDay" @input="changeStartday" :fullWidth="true" :required="true"  v-validate="'required'" data-vv-value-path="model.startDay" data-vv-name="startDate" data-vv-validate-on="change" :maxDate="maxStartDate"/>
               <span  class="error"
              v-if="errors.has('startDate:required')">{{errors.first('startDate:required')}}</span>
            </div>
            <div class="form-group " :class="errorClass('endDate')">
              <chp-date-picker class="date end-date" :hintText="$t('ui.datePicker.endDate')" @input="changeEndday" :minDate = "minEndDate" v-model.lazy="model.endDay"  v-validate="'required'" data-vv-value-path="model.endDay" data-vv-name="endDate" :fullWidth="true" :required="true" data-vv-validate-on="change"/>
               <span class="error"
              v-if="errors.has('endDate:required')">{{errors.first('endDate:required')}}</span>
              <chp-button class="mb-xs mt-xs mr-xs btn btn-primary print-btn research-btn" @click="research">
              		<i class="fa fa-search "></i>
              </chp-button>
            </div>
            
        </form>
	</div>
</template>
<script>
	import validateMixin from 'mixins/validatemix.js'
	export default{
		mixins:[validateMixin],
		data(){
			return {
				minEndDate:"",
          		maxStartDate:"",
          		model:{
					startDay:"",
					endDay:""
				},
			}
		},
		methods:{
			changeEndday(val){
		      	this.model.endDay = val;
		    },
	      	changeStartday(val){
		      	this.model.startDay = val
		   	},
		   	async research(){
	            let validateResult = await this.$validator.validateAll();
	            if(validateResult){
	              this.$emit("refetchChartData",this.model.startDay,this.model.endDay);
	            }
	       	},
	    },
        watch:{
  			'model.startDay' : function(val){
    			this.minEndDate = val;
    		},
      		'model.endDay':function(val){
       			this.maxStartDate = val;
     		}

  		}
	}
</script>
<style lang="less" scoped>
@import "~assets/less/variable.less";
	.filter{
		.form-inline{
			text-align: right;
		}
		.form-group{
			text-align: left;
		}
		.start-date{
			vertical-align: middle;
		}
		.end-date{
			vertical-align: middle;
		}
		.research-btn{
			vertical-align: middle;
		}

	}
	@media(max-width:@screen-sm-min){
		.filter{
		   
			.form-group{
				text-align: left;
				display: inline-block;
			}
			.date{
				width:120px;
			}
		}
	}
</style>
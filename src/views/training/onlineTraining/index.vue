<template>
	<div class="fluid-container">
		<enrolled-training :trainings="enrolledTrainings" @refresh="refresh"></enrolled-training>
		<training-table :trainings="allTrainings" @refresh="refresh"></training-table>
	</div>
</template>
<script>
import trainingRouteMixin from 'src/mixins/trainingRouteMixin'
import enrolled from "./enrolledTraining"
import table from "./table"
import trainingService from "services/trainingService"
import { SET_CONTENT_LOADING } from 'store/mutation-types'
import { ZH_LANGUAGE } from 'src/config/app.config.js'
export default{
	mixins:[trainingRouteMixin],
	components:{
		'enrolled-training' :enrolled,
		'training-table' : table
	},
	data(){
		return {
			language: this.$store.state.language,
			allTrainings : [],
			enrolledTrainings:[]
		}
	},
	methods:{
		async fetchTraining(){
			this.$store.commit(SET_CONTENT_LOADING,true)
			let {success,data} = await trainingService.getOnlineTraining(this.language == "zh" ? "mandarin" : "english")
			this.$store.commit(SET_CONTENT_LOADING,false)
			if(success){

				this.allTrainings= data.paginatedList
				console.log(this.allTrainings,"=====")
			}
		},
		refresh(){
			this.fetchTraining()
		}
	},
	watch:{
		"$store.state.language" : function(val){
			if(val !== ZH_LANGUAGE){
				this.$router.push("/403")
			}else{
				this.fetchTraining()
			}
		},
		allTrainings : function(val){
			this.enrolledTrainings = val.filter((t)=>{
				return t.enrolled
			})
		}
	},
	created(){
		this.fetchTraining()
	}
}
	
</script>
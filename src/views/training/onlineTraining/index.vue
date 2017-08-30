<template>
	<div class="fluid-container">
		<enrolled-training :trainings="enrolledTrainings" @refresh="refresh"></enrolled-training>
		<training-table :trainings="allTrainings" @refresh="refresh"></training-table>
	</div>
</template>
<script>
import enrolled from "./enrolledTraining"
import table from "./table"
import trainingService from "services/trainingService"
import { SET_CONTENT_LOADING } from 'store/mutation-types'
export default{
	components:{
		'enrolled-training' :enrolled,
		'training-table' : table
	},
	data(){
		return {
			language: this.$store.state.language,
			allTrainings : []
		}
	},
	methods:{
		async fetchTraining(){
			this.$store.commit(SET_CONTENT_LOADING,true)
			let {success,data} = await trainingService.getOnlineTraining(this.language == "zh" ? "mandarin" : "english")
			this.$store.commit(SET_CONTENT_LOADING,false)
			if(success){
				this.allTrainings= data.paginatedList
			}
		},
		refresh(){
			this.fetchTraining()
		}
	},
	watch:{
		"$store.state.language" : function(val){
			console.log(val)
			this.language = val
			this.fetchTraining()
		}
	},
	computed:{
		enrolledTrainings : function(){
			return this.allTrainings.filter((t)=>{
				return t.enrolled
			})
		}
	},
	created(){
		this.fetchTraining()
	}
}
	
</script>
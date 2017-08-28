<template>
	<div class="fluid-container">
		<enrolled-training :trainings="enrolledTrainings"></enrolled-training>
		<training-table :trainings="allTrainings"></training-table>
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
			lanuage: this.$store.state.language,
			allTrainings : []
		}
	},
	methods:{
		async fetchTraining(language){
			this.$store.commit(SET_CONTENT_LOADING,true)
			let {success,data} = await trainingService.getOnlineTraining(this.lanuage=="zh" ? "mandarin" : "english")
			this.$store.commit(SET_CONTENT_LOADING,false)
			if(success){
				this.allTrainings= data.paginatedList
			}
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
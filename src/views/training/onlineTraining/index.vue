<template>
	<div class="fluid-container">
		<enrolled-training></enrolled-training>
		<training-table></training-table>
	</div>
</template>
<script>
import enrolled from "./enrolledTraining"
import table from "./table"
import trainingService from "services/trainingService"
export default{
	components:{
		'enrolled-training' :enrolled,
		'training-table' : table
	}
}
	
</script>
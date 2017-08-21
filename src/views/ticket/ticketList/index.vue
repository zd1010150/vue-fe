<template>
	<div class="container-fluid" >
    	<div class="row">
    		<chp-expand-transition>
    			<ticket-list-add v-if="show" @cancel="cancel"></ticket-list-add>
    		</chp-expand-transition>
    	</div>
    	<div class="row">
    		<ticket-list-table @add="addNew"></ticket-list-table>
    	</div>
    </div>
</template>
<script>
	import tableList from "./table.vue"
	import addNewTicket from "./add.vue"
	export default{
		data(){
			return {
				show:false
			}
		},
		components:{
			"ticket-list-table" : tableList,
			"ticket-list-add" : addNewTicket
		},
		methods:{
			addNew(){
				this.show = true
			},
			cancel(){
				this.show = false
			}
		}
	}
</script>
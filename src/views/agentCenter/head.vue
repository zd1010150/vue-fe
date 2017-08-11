<template>
	<div class="row">
		<div class="col-md-12 col-lg-12">
			<div class="col-md-6 col-lg-6 col-sm-6 col-xs-6">
				<h3 class="pull-left">代理号：</h3>
				 <mu-select-field v-model="agent" multiple label="选择多个" @change="change">
				 <template v-for='m in MT4'>
				 	<mu-menu-item :value='m.mt4_id' :title="m.mt4_id"></mu-menu-item>	
				 </template>
				 </mu-select-field>
			</div>
			<div class="col-md-6 col-lg-6 col-sm-6 col-xs-6">
				
			</div>
		</div>
	</div>
</template>
<script>
import mt4Service from 'services/mt4Service'
	export default{
		data(){
			return{
				MT4:[],
				agent:"",
				balance:"",
				commission:"",
				client:""
			}
		},
		methods:{
			change(val){
				this.$emit('agentChange',val);
			}
		},
		watch:{
			agent:function(val,oldVal){
				if ( val== oldVal ) return;
				//this.MT4



			},
			async fetchAgentMT4Account(){

			}
		},
		created(){

		}

	}
</script>
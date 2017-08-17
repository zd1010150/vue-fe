<template>
	<div class="row  mt4-select-row pb-lg">
		<div class="col-md-12 col-lg-12">
			<div class="col-md-6 col-lg-6 col-sm-12 col-xs-12 pl-none">
				<span class="mt4-title">代理号：</span>
				 <!-- <mu-select-field v-model="agent" multiple label="选择多个" @change="change">
				 <template v-for='m in MT4'>
				 	<mu-menu-item :value='m.mt4_id' :title="m.mt4_id"></mu-menu-item>	
				 </template>
				 </mu-select-field> -->

				 <mu-flat-button class="select-mt4" :class="{'open' : open}" ref="selectMT4" @click="toggle" href="javascript:void(0)">
				 	<strong class="amount mt4 text-dark">{{agent}}</strong>
				    <i class="fa custom-caret"></i>
				 </mu-flat-button>
				  <mu-popover :trigger="trigger" :open="open" :value="agent">
				    <mu-menu @change="change">
				      
				    <template v-for='m in MT4'>
				 		<mu-menu-item :value='m.mt4_id' :title="m.mt4_id + ''"></mu-menu-item>	
				 	</template>
				    </mu-menu>
				  </mu-popover>
			</div>
			<div class="col-md-6 col-lg-6 col-sm-12 col-xs-12 pl-none pr-none ">
				<table class="total-table ">
					<tr>
						<td> 可提取佣金：</td>
						<td>总用户余额：</td>
						<td>总用户数：</td>
					</tr>
					<tr class="number">
						<td>
							<strong class="lead text-dark">{{model.balance}}</strong>
							<span>{{model.baseCurrency}}</span>	
						</td>
						<td>
							<strong class="lead text-dark">73899.98 </strong>
							<span>USD</span>
						</td>
						<td>
							<strong class="lead text-dark">300</strong>
							<span>位</span>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>
<script>
import mt4Service from 'services/mt4Service'
	export default{
		data(){
			return{
				trigger:null,
				open:false,
				MT4:[],
				agent:"122",
				origiModel:{
							balance : "",
							baseCurrency : ""
						}
				
			}
		},
		methods:{
			change(val){
				this.agent = val;
				console.log(val);
				this.$emit('agentChange',val);
				this.open = false
			},
			toggle(){
				this.open = !this.open
			}
		},
		watch:{
			agent:function(val,oldVal){
				if ( val== oldVal ) return;

			},
			async fetchAgentMT4Account(){

			}
		},
		computed:{
			model : function(){
				let tmp = this.MT4.map((mt4)=>{
					if(mt4.mt4_id == this.agent){
						return {
							balance : mt4.balance,
							baseCurrency : mt4.base_currency
						}
					}
				});
				return tmp.length > 0 ? tmp[0] : this.origiModel
			}
		},
		created(){
			this.MT4 = this.$store.state.agentAccounts
			this.agent = this.MT4.length > 0 ?this.MT4[0].mt4_id :""
			this.$emit("agentChange",this.agent);
		},
		mounted(){
			this.trigger = this.$refs.selectMT4.$el
		}

	}
</script>
<style lang="less">
@import "~assets/less/variable.less";
@import "~assets/less/transition.less";
	.mt4-select-row{
		.mt4-title{
			font-size: 2.0rem;
			vertical-align: middle;	
		}
		.select-mt4{
			&.open{
				.fa{
					transform: rotate(180deg) translate3D(0,0,0)
				}
			}
			&:hover{
				text-decoration: none;
				color:@blue-color !important;
				background-color: transparent;
			}
			vertical-align: middle;	
			strong.mt4{
				font-size: 2.4rem;
			}
			.fa{
				transition : @arrow-rotate-transition;
				display: inline-block;
				margin-left: 20px;
				width:10px;
				height:10px;
				font-size: 16px;
				font-weight: bold;
				&:before{
					    content: "\f107";
				}
			}
		}
		.total-table{
			float:right;
			width:100%;
			td{
				width:33.333%;
				text-align:left;
				padding: 0px 5px;
			}
			.number{
				td{
					text-align:left;

				}
			}
		}
	}
	@media(max-width:@screen-sm-min){
		.mt4-select-row{
			.total-table{
				float:left;
				padding-top: 10px;		
			}
		}
	}

</style>
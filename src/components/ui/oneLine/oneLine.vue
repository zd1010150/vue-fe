<template>
	<p>
		<span v-if="isHtml" v-html="innerContent"></span>
		<span v-else> {{ innerContent }} </span>
		<chp-tooltip> {{ content }}</chp-tooltip>
	</p>
</template>
<script>
	export default{
		props:{
			lens:Number,
			content:String,
			isHtml:false,
			mark:{
				type:String,
				default: '...'
			}
		},
		computed:{
			innerContent(){
				if( this.content.length < this.lens){
					return this.content
				}else{
					return this.content.substr(0,this.lens) + this.mark
				}
			}
		}
	}
</script>
<style>
	p{
		margin:0px;
	}
</style>
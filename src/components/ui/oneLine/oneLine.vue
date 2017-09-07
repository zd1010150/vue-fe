<template>
	<span>
		{{ innerContent }}
	</span>
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
				return this.content.substr(0,this.lens) + this.mark
			}
		}
	}
</script>
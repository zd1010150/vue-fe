<template>
	<div class="progress" :class = "bgClasses">
		<div class="progress-bar" 
			role="progressbar" 
			:class="barClasses" 
			aria-valuemax="100" 
			:style="barStyle">
			<slot>
				<span class="sr-only">{{ percentage }}%</span>
			</slot>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			percentage:Number,
			bgClasses:[String,Array],
			barClasses: [String,Array]
		},
		computed:{
			barStyle(){
				return {
					width: (this.percentage || 0 )+ "%"
				}
			}
		}
	}
</script>
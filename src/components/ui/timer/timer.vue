
<template>
	<span> {{ timeSpan }}</span>
</template>
<script>
	import { numberToTime } from "src/utils/dateUtil"
	export default{
		data(){
			return {
				timer:null,
				timeSpan:''
			}
		},
		props:{
			startTime:[Date,Number],
			overHint:[String],
			id:[Number]
		},
		mounted(){
			this.start()
		},
		beforeDestroy(){
			if(this.timer){
				clearTimeout(this.timer)
			}
		},
		methods:{
			calculateTimer(){
				//console.log(this.startTime,new Date())
				let span = 0,
					startMillionSeconds = 0
				if(this.startTime instanceof Date){
					startMillionSeconds = this.startTime.getTime()
				}else{
					startMillionSeconds = this.startTime
				}
				span = startMillionSeconds - new Date().getTime()
				if(span <= 0){
					this.timeSpan =  this.overHint || ''
					return false
				}else{
					this.timeSpan =  numberToTime(span,this.$store.state.language)
					return true
				}
			},
			start(){
				let executor = ()=>{
					if(!this.calculateTimer()){
						clearTimeout(this.timer)
					}else{
						this.timer = setTimeout(executor,1000)
					}
				}
				executor()
			}
		}
	}
</script>
<template>
	
		<svg :id="elementId" class="liquid-fill" :style="style"></svg>
	
</template>
<script>
	import { loadLiquidFillGauge } from './liquidFillSrc.js'
	export default{
		data(){
			return {
				elementId:"",
				innerPercentage:0,
				innerConfig:{},
				defaultConfig:{
			        minValue: 0, // The gauge minimum value.
			        maxValue: 100, // The gauge maximum value.
			        circleThickness: 0.1, // The outer circle thickness as a percentage of it's radius.
			        circleFillGap: 0.05, // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
			        circleColor: "#cccccc", // The color of the outer circle.
			        waveHeight: 0.05, // The wave height as a percentage of the radius of the wave circle.
			        waveCount: 1, // The number of full waves per width of the wave circle.
			        waveRiseTime: 1000, // The amount of time in milliseconds for the wave to rise from 0 to it's final height.
			        waveAnimateTime: 1000, // The amount of time in milliseconds for a full wave to enter the wave circle.
			        waveRise: true, // Control if the wave should rise from 0 to it's full height, or start at it's full height.
			        waveHeightScaling: true, // Controls wave size scaling at low and high fill percentages. When true, wave height reaches it's maximum at 50% fill, and minimum at 0% and 100% fill. This helps to prevent the wave from making the wave circle from appear totally full or empty when near it's minimum or maximum fill.
			        waveAnimate: true, // Controls if the wave scrolls or is static.
			        waveColor: "#0088cc", // The color of the fill wave.
			        waveOffset: 0, // The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
			        textVertPosition: .5, // The height at which to display the percentage text withing the wave circle. 0 = bottom, 1 = top.
			        textSize: 0.5, // The relative height of the text to display in the wave circle. 1 = 50%
			        valueCountUp: true, // If true, the displayed value counts up from 0 to it's final value upon loading. If false, the final value is displayed.
			        displayPercent: true, // If true, a % symbol is displayed after the value.
			        textColor: "#cccccc", // The color of the value text when the wave does not overlap it.
			        waveTextColor: "#cccccc" // The color of the value text when the wave overlaps it.
    			}
			}
		},
		props:{
			config:{},
			width:{
				default:'100%'
			},
			height:{
				default:'200px'
			},
			percentage:{
				type:Number,
				default:0
			}
		},
		computed:{
			style:function(){
				return {
					width:this.width,
					height:this.height
				}
			}
		},
		methods:{
			draw(){
				this.remove()
				loadLiquidFillGauge(this.elementId, this.innerPercentage,Object.assign(this.defaultConfig,this.innerConfig));
			},
			remove(){
				let $parent = document.getElementById(this.elementId)
				if($parent){
					let $childNodes = $parent.childNodes
					for(let i=0,len=$childNodes.length;i<len;i++){
						$parent.removeChild($childNodes[i]);
					}
					
				}
			},
			resize(){
				let self = this
				window.requestAnimationFrame(()=>{
						self.draw()
					})
			},
			attachEvent(){
				let self = this
				window.addEventListener('resize',this.resize)
			}
		},
		watch:{
			config:function(val,oldVal){
				if(val == oldVal)return
				this.innerConfig = val
				this.draw()	
			},
			"$store.state.leftSideBarStatus":function(){
				this.draw()
			},
			percentage:function(val,oldVal){
				if(val == oldVal) return
				this.innerPercentage = val
				this.draw()	
			}

		},
		mounted(){
			this.innerConfig = this.config
			this.innerPercentage = this.percentage
			this.draw()
			this.attachEvent()
		},
		created(){
			this.elementId = "liquid-fill-chart-"+Math.ceil(Math.random()*100000) 
		},
		beforeDestroy(){
			window.removeEventListener('resize',this.resize)
		}
	}
</script>


<template>
	<div></div>
</template>
<script>
	import { liquidFillGaugeDefaultSettings,loadLiquidFillGauge } from './liquidFillSrc.js'
	export default{
		methods:{
			draw(){
				var config1 = liquidFillGaugeDefaultSettings();
			    config1.circleColor = "#cccccc";
			    config1.textColor = "#cccccc";
			    config1.waveTextColor = "#cccccc";
			    config1.waveColor = "#0088cc";
			    config1.circleThickness = 0.1;
			    config1.textVertPosition = 0.2;
			    config1.waveAnimateTime = 1000;
			    var gauge1 = loadLiquidFillGauge(this.$el, 20,config1);
			}
		},
		created(){
			this.draw();
		}
	}
</script>
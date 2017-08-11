<template>
 <div :style="style" @resize="resize"></div>

</template>
<script>
	import  echarts from 'echarts'
	
	export default{
		data(){
			return {
				el:"",
				theme:this.$store.state.theme,
				innerOption:this.option,
				myChart:null,
				style:{
					width:this.width,
					height:this.height
				},
				defaultMedia:[{
					option:{
						legend:{
							
						}
					}
				},{
					query:{
						maxWidth: 500
					},
					option:{
						legend:{
							orient:'horizontal',
							right:20
						},
						grid:{
							top: '20%'
						}
					}
				}],
				innerMedia:this.media
			}
		},
		props:{
			externalOption:{
				type:Object,
				default:function(){
					return {};
				}
			},
			width:{
				default:'100%'
			},
			height:{
				default:'300px'

			},
			media:Array
			
		},
		methods:{
			initEcharts(){
				if(this.myChart && (!this.myChart.isDisposed())){ //为了重新切换主题，必须disposed reference https://github.com/ecomfe/echarts/issues/4607
					this.myChart.dispose();
				}
				this.myChart = echarts.init(this.el,this.theme);
				this.rerender();
			},
			rerender(){
				this.myChart.setOption({ 
					baseOption:this.innerOption,
					media:this.innerMedia && this.innerMedia.length > 0 ? this.innerMedia : this.defaultMedia
				});
			},
			resize(){
				let self = this
				window.requestAnimationFrame(()=>{
						console.log("it is resized window",new Date().getTime());
						self.myChart.resize();
					})
			},
			attachEvent(){
				let self = this
				window.addEventListener('resize',this.resize)
			}

		},
		watch:{
			"$store.state.theme":function(val,oldVal){
				if(val == oldVal) return;
				this.theme = val;
				this.initEcharts();
			},
			externalOption:function(val){
				this.innerOption = val;
				this.rerender();
			},
			media:function(val){
				console.log("it is media watch");
				this.innerMedia = val;
				this.rerender();
			},
			"$store.state.leftSideBarStatus":function(){
				this.resize();
			}
		},
		mounted(){
			this.el = this.$el
			this.innerOption = this.externalOption
			console.log("mounted echarts",this.innerOption,this.width);
			this.initEcharts();
			this.attachEvent();
		},
		beforeDestroy(){
			window.removeEventListener('resize',this.resize)
		}
	}
</script>
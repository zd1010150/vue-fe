<template>
 <div :style="style" @resize="resize" class="echart-wrapper"></div>

</template>
<script>
	import  echarts from 'echarts'
	export default{
		data(){
			return {
				el:"",
				theme:this.$store.state.theme,
				innerOption:this.externalOption,
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
					return {}
				}
			},
			width:{
				default:''
			},
			height:{
				default:''

			},
			media:{
				type:Array
			}
			
		},
		methods:{
			initEcharts(){
				if(this.myChart && (!this.myChart.isDisposed())){ //为了重新切换主题，必须disposed reference https://github.com/ecomfe/echarts/issues/4607
					this.myChart.dispose()
				}
				this.myChart = echarts.init(this.el,this.theme);
				this.rerender();
			},
			rerender(){
				this.$emit("rerender")
				this.myChart.setOption({ 
					baseOption:this.innerOption,
					media:this.innerMedia && this.innerMedia.length > 0 ? this.innerMedia : this.defaultMedia
				});
			},
			resize(){
				let self = this
				this.$emit("resize")
				window.requestAnimationFrame(()=>{
						self.myChart.resize()
					})
			},
			attachEvent(){
				let self = this
				window.addEventListener('resize',this.resize)
			}

		},
		watch:{
			"$store.state.theme":function(val,oldVal){
				if(val == oldVal) return
				this.theme = val
				this.initEcharts()
			},
			externalOption:function(val){
				this.innerOption = val
				this.rerender()
			},
			media:function(val){
				this.innerMedia = val
				this.rerender()
			},
			"$store.state.leftSideBarStatus":function(){
				this.resize();
			}
		},
		mounted(){
			this.el = this.$el
			this.initEcharts()
			this.attachEvent()
		},
		beforeDestroy(){
			window.removeEventListener('resize',this.resize)
		}
	}
</script>
<style lang="less">
	@import "~assets/less/variable.less";	
	.echart-wrapper{
		width:100%;
		height:300px;
	}
	@media(max-width:@screen-sm-min){
		.echart-wrapper{
			width:100%;
			height:400px;
			overflow: auto;
		}
	}

	
</style>
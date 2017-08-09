<template>
	<div class="container-fluid" >
	   <h3>META Trader 4</h3>
	    <div class="row">
	    	<div class="col-lg-12 col-md-12">
	    		<div id="statistics" class="statistics"></div>
	    	</div>
	    </div>
	</div>
</template>
<script>
import  echarts from 'echarts'


	export default{
		data(){
			return {
				option:{
					textStyle : {
						color:'#000'
					}
				},
				defaultOption:{
				    tooltip: {
				        trigger: 'axis'
				    },
				    legend: {
				        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    toolbox: {
				        feature: {
				            saveAsImage: {}
				        }
				    },
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: ['周一','周二','周三','周四','周五','周六','周日']
				    },
				    yAxis: {
				        type: 'value'
				    },
				    series: [
				        {
				            name:'邮件营销',
				            type:'line',
				            stack: '总量',
				            data:[120, 132, 101, 134, 90, 230, 210]
				        },
				        {
				            name:'联盟广告',
				            type:'line',
				            stack: '总量',
				            data:[220, 182, 191, 234, 290, 330, 310]
				        },
				        {
				            name:'视频广告',
				            type:'line',
				            stack: '总量',
				            data:[150, 232, 201, 154, 190, 330, 410]
				        },
				        {
				            name:'直接访问',
				            type:'line',
				            stack: '总量',
				            data:[320, 332, 301, 334, 390, 330, 320]
				        },
				        {
				            name:'搜索引擎',
				            type:'line',
				            stack: '总量',
				            data:[820, 932, 901, 934, 1290, 1330, 1320]
				        }
				    ]
				},
				myChart:null
			}
		},
		methods:{
			draw(){
				// 基于准备好的dom，初始化echarts实例
				this.myChart = echarts.init(document.getElementById('statistics'));
				this.option = Object.assign({},this.option,this.defaultOption);
				// 绘制图表
				this.myChart.setOption(this.option);
			}
		},
		mounted(){
			this.draw();
		},
		watch:{
			'$store.state.theme' : function(val){

				this.$set(this.option.textStyle,"color",val == "dark" ? '#fff' : '#000');
				console.log("theme",this.option.textStyle.color);
			},
			'option.textStyle.color' : function(val){

				this.myChart.setOption(this.option);
			}
		}
	}
</script>
<style lang="less">
	#statistics{
		width:100%;
		height:500px;
	}
	.statistics{
		color:black;
	}
	html.dark{
		.statistics{
			color:#ffffff;
		}
	}
</style>
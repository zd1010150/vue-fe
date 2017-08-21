<template>
	<div class="container-fluid" >
	   <h3>META Trader 4</h3>
	    <div class="row">
    		<div class="col-lg-12 col-md-12">
    		    <h4>line chart</h4>
	    		<chp-echart	:externalOption="defaultOption" ></chp-echart>
	    		<h4>circle pie chart</h4>
	    		<chp-circle-chart ></chp-circle-chart>
	    		<h4>liquid fill pie chart</h4>
	    		<chp-liquid-fill :percentage="20" ></chp-liquid-fill>
	    	</div>
	    </div>
	</div>
</template>
<script>

	export default{
		data(){
			return {
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
				circleOption:{
					grid:{
						width:140,
						height:140
					},
					 tooltip: {
				        trigger: 'item',
				        formatter: "{b}: {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        x: 'left',
				        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
				    },
				    graphic:[{
			           	type:'group',
				    	left:'center',
				    	top:'50%',
				    	children:[
				    		{
				    			type:'text',
				    			id:'level',
				    			z:100,
				    			style:{
				    				text:'等级10\n\n10000/999999',
				    				fill:'#ccc',
				    				lineHeight:16,
				    				font: 'bold 14px Microsoft YaHei',
				    				textAlign: 'center'
				    			}

				    		}
				    	]
				    }],
				    series: [
				        {
				            
				            type:'pie',
				            radius: ['55%', '62%'],
				            avoidLabelOverlap: false,
				            startAngle:360,
				            label: {
				                normal: {
				                    show: false,
				                    position: 'center'
				                },
				                emphasis: {
				                    show: false
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            data:[
				                {value:9000, name:'已完成手数'},
				                {value:1000, name:'剩余手树',itemStyle:{ normal:{
				                	color:'#ccc'
				                }}}
				            ]
				        }
				    ]
				}
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
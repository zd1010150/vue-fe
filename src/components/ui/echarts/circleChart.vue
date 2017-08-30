<template>
	<e-charts :externalOption="innerOption" :width="width" :height="height" :media="media"></e-charts>
</template>
<script>
	import echarts from './echarts.vue'
	const DEFAULT_OPTION = {
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
				            radius: ['78%', '88%'],
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
	export default{
		components:{
			'e-charts':echarts
		},
		props:{
			externalOption:{
				type:Object,
				default:function(){
					{}
				}
			},
			width:{
				default:'160px'
			},
			height:{
				default:'160px'

			},
			media:{
				type:Array,
				default:function(){
					return []
				}
			}
		},
		data(){
			return {
				innerOption : Object.assign({},DEFAULT_OPTION,this.externalOption)
			}
		}
	}
</script>
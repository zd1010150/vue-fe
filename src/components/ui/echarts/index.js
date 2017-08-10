import  echarts from 'echarts'
import darkEchart from 'src/config/darkChartConfig.json'
import lightEchart from 'src/config/lightChartConfig.json'
import myEchart from './echarts.vue' 

echarts.registerTheme('dark',darkEchart)
echarts.registerTheme('light',lightEchart)
echarts.id = "dandan"

export default function install(Vue){
	Vue.component("chp-echart",myEchart)
}
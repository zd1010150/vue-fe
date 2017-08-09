/**
 * echarts相关mixin
 * 
 */
export default{
	data(){
			return {

				echartFontStyle: {
					lightFontColor : "#777",
					darkFontColor: "#808697"
				},
				echartOption:{
					textStyle : {
						color:'#000'
					}
				}
			}
		},
		watch:{
			'$store.state.theme' : function(val){
				this.$set(this.echartOption.textStyle,"color",val == "dark" ? this.echartFontStyle.darkFontColor : this.echartFontStyle.lightFontColor);
			}
		}
}
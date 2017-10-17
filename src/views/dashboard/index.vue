<template>
	<div class="container-fluid dashboard-container">		
			<div class="main-body" :style="mainBodyWidth">
				<div class="row">
					<dashboard-carousel></dashboard-carousel>
				</div>
				<div class="activity">
					<dashboard-activity></dashboard-activity>
				</div>
				<div class="row">
					<dashboard-mt4></dashboard-mt4>
					<dashboard-announcement></dashboard-announcement>
				</div>
				<div class="row">
					<dashboard-analysis></dashboard-analysis>
				</div>
				<div class="row">
					<dashboard-videos></dashboard-videos>
					<dashboard-books></dashboard-books>
				</div>
			</div>
			<div class="fix-activity" v-show="activityData">
				<dashboard-activity @getActivityData="getActivityData"></dashboard-activity>
			</div>
	</div>
	
</template>
<script>
	import carousel from './carousel'
	import activity from './activity'
	import mt4 from './mt4'
	import announcement from './announcement'
	import analysis from './analysis'
	import books from './books'
	import videos from './videos'
	export default{
		data(){
			return {
				activityData : false
			}
		},
		components:{
			'dashboard-carousel':carousel,
			'dashboard-activity':activity,
			'dashboard-mt4':mt4,
			'dashboard-announcement':announcement,
			'dashboard-analysis':analysis,
			'dashboard-books':books,
			'dashboard-videos':videos,
		},
		methods:{
			getActivityData(data){
				this.activityData = data
			}
		},
		computed: {
			mainBodyWidth () {
				if(this.activityData) {
					return {
						width : '76%'
					}
				}else{
					return {
						width : '100%'
					}
				}
			}
		}
	}
</script>
<style lang="less">
	@import "~assets/less/variable.less";
	.dashbord-fix-height-panel{
		height: 319px;
		.panel-body{
			height:255px;
			overflow:auto;
			width:100%;
			table{
				max-width: 100%;
				&.no-header{
					tr:first-child{
						td{
							border-top:none;
						}
					}
				}
			}
			.one-line{
				max-width: 300px;
				height:20px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
		}
	}
	@media(max-width:@screen-sm-min){
		.dashbord-fix-height-panel{
			height: auto;
			.panel-body{
				height:auto;
			}
		}
	}
	.fix-activity {
		position: fixed;
		right: 0;
		top: 22px;
		padding: 130px 25px 15px 0px;
		width: 20%;
		box-sizing: border-box;
		height: 100%;
	}
	@media screen and (min-width:1600px) {
		.activity {
			display: none;
		}
		.main-body {
			width:76%;
		}
		
	}
	@media screen and (max-width:1599px) {
		.fix-activity {
			display: none;
		}
		.main-body {
			width:100% !important;
		}
	}
	
</style>

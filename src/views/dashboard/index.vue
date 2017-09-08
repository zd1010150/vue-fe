<template>
	<div class="container-fluid">
		<div class="row">
			<dashboard-carousel></dashboard-carousel>
		</div>
		<dashboard-activity></dashboard-activity>
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
		components:{
			'dashboard-carousel':carousel,
			'dashboard-activity':activity,
			'dashboard-mt4':mt4,
			'dashboard-announcement':announcement,
			'dashboard-analysis':analysis,
			'dashboard-books':books,
			'dashboard-videos':videos,
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
</style>

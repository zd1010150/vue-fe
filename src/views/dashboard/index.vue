<template>
	<div class="container-fluid">
		<div class="row first-row">
			<dashboard-carousel class="dashboard-carousel pr-lg" @resize="resize" ></dashboard-carousel>
			<dashboard-activity class="mt4-activity" ref="activity"></dashboard-activity>
		</div>
		<div class="row">
			<dashboard-mt4></dashboard-mt4>
			<dashboard-announcement></dashboard-announcement>
		</div>
		<div class="row">
			<dashboard-analysis></dashboard-analysis>
			<dashboard-books></dashboard-books>
			<dashboard-videos></dashboard-videos>
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
		},
		methods:{
			resize(height){
				this.$refs.activity.resize(height)
			}
		}
	}
</script>
<style lang="less">
	.first-row{
		.dashboard-carousel{
			width: 66.66%;
			float:left;
		}
		.mt4-activity{
			width:33.33%;
		}
	}
	@media(max-width:1680px){
		.first-row{
			.dashboard-carousel{
				width: 100%;
				float: none;
				padding: 0px 15px;
			}
			.mt4-activity{
				width:100%;
				padding: 0px 15px;
				.panel{
					margin-bottom: 10px;
				}
			}
		}
	}
</style>
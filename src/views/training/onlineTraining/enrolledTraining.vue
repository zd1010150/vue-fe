<template>
	<div class="row">
		<template v-for="(t,index) in trainings">
			<div class="col-md-4 col-lg-4 col-xl-4" :key="index">
				<section class="panel panel-featured-left panel-featured-primary">
					<div class="panel-body">
						<div class="widget-summary">
							<div class="widget-summary-col">
								<div class="summary">
									<h4 class="title">{{ t.title }}</h4>
									<div class="description">{{ t.subtitle }}</div>
									<div class="text-dark">{{ t.start | beijingZoneTime }}</div>
								</div>
								<div class="summary-footer clearfix">
									<span>timer:</span>
									<span class="timer text-dark">1天2小时30分</span>
									<chp-button class="mb-xs mt-xs mr-xs btn btn-danger print-btn pull-right">
				                        <i class="fa fa-times pr-xs"></i> {{ $t('ui.button.withdraw') }}
				                    </chp-button>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</template>
	</div>
</template>
<script>
	import filters from "src/filters"
	export default{
		filters,
		props:{
			trainings:Array
		},
		created(){
			
		}
	}
</script>
<style lang="less" scoped>
	section{
		.summary{
			padding-bottom: 10px;
		}
		.summary-footer{
			line-height: 30px;
			span{
				line-height: 38px;
				display: inline-block;
				height:38px;
			}
		}
	}
</style>
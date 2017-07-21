<template>
	<div class="col-lg-12">
		<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
			
			<div class="method">
				<div class="method-bg">
					<img src="/static/images/Union-pay-icon.png" alt="" class="">
				</div>
				<span class="method-title">Wire Transfers</span>
			</div>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
			doku
		</div>
		<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
			fasa
		</div>
		<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
			union pay
		</div>
	</div>
</template>
<script>
	export default{}
</script>
<style lang="less">
@import "~assets/less/variable.less";
	.method{
		.method-bg{
			width:114px;
			height:114px;
			border-radius: 50%;
			position:relative;
			background-color: @dark-component-border-color;
			display: table-cell;
			vertical-align: middle;
			text-align: center;
			img{
				vertical-align: middle;
		
			}
		}
	}
</style>
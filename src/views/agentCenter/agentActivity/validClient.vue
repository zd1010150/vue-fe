<template>
	<div class="row">
		<div class="col-lg-12 col-md-12">
				<h4 class="pull-left">PC platform</h4><span></span>
				<section class="panel panel-horizontal">
					<div class="panel-body p-lg">
						<table class="client-table">
							<tr>
								<td class="padding-10">有效客户数：</td>
								<td class="padding-10">总客户数：</td>
							</tr>
							<tr>
								<td class="padding-10"><span class="lead text-dark padding-right-10">456789</span>位</td>
								<td class="padding-10"><span class="lead text-dark padding-right-10">10000</span>位</td>
							</tr>
						</table>
						<div class="progress progress-striped progress-xs m-sm light">
							<div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
								<span class="sr-only">60%</span>
							</div>
						</div>
						<p class="padding-10 pb-none padding-top-20">
							<span class="level lead pr-md">等级10</span>
						<span class="number">9999/1000000</span>
						</p>
						

								
					</div>
					<header class="panel-heading bg-white p-none">
						<div class="panel-heading-icon bg-primary mt-sm ">
							<i class="fa fa-music"></i>
						</div>
					</header>
					
				</section>
		</div>
	</div>
</template>
<script>
	export default{

	}
</script>
<style lang="less">
	@import "~assets/less/variable.less";
	.client-table{
		
	}
	
</style>
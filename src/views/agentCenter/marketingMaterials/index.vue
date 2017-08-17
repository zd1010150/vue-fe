<template>
	<div class="fluid-container">
	<div class="row">
		<div class="col-lg-12 col-md-12">
			<chp-tabs :isJustified="true"  :value="activeStepTab"  @change = "handleStepTabChange">
      			<template slot="header">
	        		<chp-tab-header href="tab1">Account</chp-tab-header>
	       			 <chp-tab-header href="tab2">Profile</chp-tab-header>
	      		</template>
      			<template slot="content">
      			 	<chp-tab-content id="tab1" class="row">
						<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
							<section class="picture">
								<div class="pic">
									<img class="img-responsive" src="http://s3img.city.sina.com.cn/xiancheng/common/thumbnail/0/572c261447243db5d8c25020c8e314b8.jpg" alt="">
								</div>
								<p class="size">Image Size:600*120</p>
								<p>
									<chp-button class="mb-xs mt-xs  btn btn-primary print-btn" >
										copy URL
									</chp-button>	
								</p>
							</section>
						</div>
						<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
							
							<section class="picture">
								<div class="pic">
									<img class="img-responsive" src="http://images2.china.com/travel/zh_cn/newlvyou/wanle/food/11075021/20120202/17010383_2012020209345111860900.jpg" alt="">
								</div>
								<p class="size">Image Size:600*120</p>
								<p>
									<chp-button class="mb-xs mt-xs  btn btn-primary print-btn" >
										copy URL
									</chp-button>	
								</p>
							</section>
						</div>
						<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
							
							<section class="picture">
								<div class="pic">
									<img class="img-responsive" src="http://p3.pstatp.com/large/3c4000ca62150b1cb1f" alt="">
								</div>
								<p class="size">Image Size:600*120</p>
								<p>
									<chp-button class="mb-xs mt-xs  btn btn-primary print-btn" >
										copy URL
									</chp-button>	
								</p>
							</section>
						</div>
						<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
							
							<section class="picture">
								<div class="pic">
									<img class="img-responsive" src="http://s3img.city.sina.com.cn/xiancheng/common/thumbnail/0/572c261447243db5d8c25020c8e314b8.jpg" alt="">
								</div>
								<p class="size">Image Size:600*120</p>
								<p>
									<chp-button class="mb-xs mt-xs  btn btn-primary print-btn" >
										copy URL
									</chp-button>	
								</p>
							</section>
						</div>
                    </chp-tab-content>
                    <chp-tab-content id="tab2">

                      第2个tab的内容
                    </chp-tab-content>
				</template>
			</chp-tabs>
		</div>
	</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				activeStepTab:'tab1'
			}
		},
		methods:{
			handleStepTabChange:function(id){
				this.activeStepTab = id
			}
		}
	}
</script>
<style lang="less">
	.picture{
		.pic{
			max-height:300px;
			height:300px;
			display: table-cell;
			vertical-align: middle;
			
		}
		.pic img{
			vertical-align: middle;
			max-width:100%;
		}
	}
</style>
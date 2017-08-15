<template>
	<div class="container-fluid" >
		<div class="row pt-none">
			<div class="col-lg-12 col-md-12">
			<section class="one-mt4-section">
				<header class="clearfix">
					<div class="col-lg-6 col-md-6 col-xs-12 mt4-account p-none">
						<span class="mt4-title">MT4 Account:</span>
						<strong class="amount mt4 text-dark">45555</strong>
				    	<span class="text-primary">(Type:ECNSTP)</span>	
					</div>
					<div class="col-lg-6 col-md-6 col-xs-12 text-right p-none operate">
						<chp-button class="mb-xs mt-xs mr-xs btn btn-default print-btn" >
					       Change password
					    </chp-button>
				       	<chp-button class="mb-xs mt-xs mr-xs btn btn-default print-btn">
				       		Withdrawal
				      	</chp-button>
						<chp-button class="mb-xs mt-xs mr-xs btn btn-default print-btn">
							Deposit funds
						</chp-button>
					</div>
				</header>
				<div class="charts pt-lg">
				<dl slot="subtitle" class="subtitle clearfix visible-xs">
							<dt class="info-title">Balance</dt>
							<dd class="amount info-number text-dark">23333</dd>
							<dt class="info-title">Currency</dt>
							<dd class="amount info-number text-dark">23333</dd>
							<dt class="info-title">Leverage</dt>
							<dd class="amount info-number text-dark leverage">
								<chp-select :value="'500'">
					              <template v-for="(l,index) in leverages">
					                <mu-menu-item :value="l.val" :title="l.title" key="index"/>
					              </template>
				           		 </chp-select> 
							</dd>
							
							
						</dl>
					<chp-panel  :canCollapse="true" :canClose="false" collapsePanelText="detaile" expandPanelText="close" :isHeaderTransparent="true" :showActionRipple="false">
						
						<dl slot="subtitle" class="subtitle clearfix hidden-xs">
							<dt class="info-title">Balance</dt>
							<dd class="amount info-number text-dark">23333</dd>
							<dt class="info-title">Currency</dt>
							<dd class="amount info-number text-dark">23333</dd>
							<dt class="info-title">Leverage</dt>
							<dd class="amount info-number text-dark leverage">
								<chp-select :value="'500'">
					              <template v-for="(l,index) in leverages">
					                <mu-menu-item :value="l.val" :title="l.title" key="index"/>
					              </template>
				           		 </chp-select> 
							</dd>
							
							
						</dl>
						<div slot="body">
							<div class="row">
								dddd
							</div>
						</div>
					</chp-panel>
				</div>
				<footer></footer>
			</section>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				leverages : this.$store.state.leverage
			}
		},
		mounted(){
			console.log(this.leverages);
		}

	}
</script>
<style lang="less">
@import "~assets/less/variable.less";
	.one-mt4-section{
		header{
			.mt4-account{
				height:40px;
				line-height: 40px;
				.mt4{
					font-size: 2.4rem;
				}
			}
		}
		.subtitle{
			margin:0px;
			
			dt,dd{
				font-weight: normal;
				display: inline-block;
				vertical-align: baseline;
			}
			dt{
				font-size: 1.6rem;
			}
			dd{ 
				font-size: 2.4rem;
				padding-right: 20px;
			}
			.leverage{
				width:110px;
				position: relative;
				.chp-select{
					padding-top: 5px;
					position:absolute;
					top:-25px;
				}
			}
		}
		.panel{
			&.panel-collapsed{
				.panel-heading{
					border-bottom: 2px solid #0088CC;
    				border-radius: 2px 3px 0px 0px !important;
				}
				.panel-body{
					border-bottom: none;
				}
			}
			.panel-heading{
				overflow: hidden;
				padding-bottom: 0px;
				padding-top:0px;
				height:45px;
				.panel-subtitle{
					margin:0px 0px;
					height:100%;
				}
				.panel-actions{
					padding: 0px 10px;
					background-color: @light-component-bg-color;
					top:0px;
					bottom:0px;
					border-top: 3px solid #0088CC;
    				border-radius: 5px 5px 0px 0px ;
					a.action-text{
						&:hover{
							background-color:  @light-component-bg-color;	
						}
						color:@blue-color;
					}
				}
			}
			.panel-body{
				border-bottom: 2px solid #0088CC;
			}
		}
	}
	html.dark{
		.one-mt4-section{
			.panel{
				.panel-heading{
					.panel-actions{
						background-color: @dark-panel-body-bg-color;
						a.action-text{
							&:hover{
								background-color:  @dark-panel-body-bg-color;	
							}
						}
					}
				}
			}
		}
	}
	@media (max-width:@screen-sm-min){
		.one-mt4-section{
			header{
				.operate{
					text-align: left;
				}
			}
			.panel{
				.panel-actions{
					flot:right;
					position:absolute;
					margin-bottom:0px;
					button{
						float:left !important;
					}
				}
			}
		}
	}
</style>
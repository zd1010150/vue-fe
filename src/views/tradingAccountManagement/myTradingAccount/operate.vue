<i18n src="../i18n.yaml"></i18n>
<template>
	<div class="col-lg-6 col-md-6 col-xs-12 text-right p-none operate">
		<chp-button class="mb-xs mt-xs  btn btn-primary print-btn" @click="modifyPwd">
	        {{ $t('changePwd') }}
	    </chp-button>
       	<chp-button class="mb-xs mt-xs  btn btn-primary print-btn" @click="withdrawal">
       		{{ $t('fund.withdraw') }}
      	</chp-button>
		<chp-button class="mb-xs mt-xs  btn btn-primary print-btn" @click="deposite">
			{{ $t('fund.deposit') }}
		</chp-button>
	</div>
</template>

<script>
	import mt4Service from 'services/mt4Service'
	import { SET_ASYNC_LOADING } from 'store/mutation-types'
	export default{
		props:{
			mt4Id:[String,Number]
		},
		methods:{
			async modifyPwd(){
				this.$store.commit(SET_ASYNC_LOADING,true)
				let {success,data} = await mt4Service.modifyAccountPWD(this.mt4Id)
				this.$store.commit(SET_ASYNC_LOADING,false)
				if(success){
					this.toastr.info(this.$t('modifyPwdNotification'))
				}
			},
			withdrawal(){
				this.$router.push({
					path:'/fund-manager/withdrawal',
					query:{
							mt4Id:this.mt4Id
						}
					})
			},
			deposite(){
				this.$router.push({
					path:'/fund-manager/deposite-funds',
					query:{
							mt4Id:this.mt4Id
						}
					})
			}
		}
	}

</script>
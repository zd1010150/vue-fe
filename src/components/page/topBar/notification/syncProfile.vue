<i18n src="../i18n.yaml"></i18n>
<template>
	<li>
        <mu-icon-button  class="dropdown-toggle notification-icon" data-toggle="dropdown" @click="syncProfile">
          	<i class="fa fa-refresh"></i>
        </mu-icon-button>
        <chp-tooltip chp-direction="bottom">
            {{ $t('notification.syncProfile.hintMsg') }} 
          </chp-tooltip>
        <chp-dialog-confirm
		  :chp-title="$t('ui.dialog.confirm.title')"
		  :chp-content-html="$t('notification.syncProfile.prompMsg')"
		  :chp-ok-text="$t('ui.button.confirm')"
		  :chp-cancel-text="$t('ui.button.cancel')"
		  @close="refreshConfirmDialog"
		  ref="confirmRefeshDailog"/>
		  <chp-dialog-alert
		  :chp-content-html="$t('notification.syncProfile.tooManyTimes')"
		  :chp-ok-text="$t('ui.button.confirm')"
		  ref="refreshAlertDialog"/>
    </li>
</template>
<script>
	import userService from 'services/userService'
	import { MAX_SYNC_TIME } from 'src/config/app.config'
	import { SET_SYNC_TIME } from 'store/mutation-types'
	export default{
		
		methods:{
			async syncProfile(){
				console.log(this.$store.state.syncTime)
				if((!this.$store.state.syncTime) || (new Date().getTime() - this.$store.state.syncTime > MAX_SYNC_TIME*60*1000)){
					let {success} = await userService.syncProfile()
					if(success){
						this.$refs.confirmRefeshDailog.open()
						this.$store.commit(SET_SYNC_TIME,new Date())
					}
				}else{
					this.$refs.refreshAlertDialog.open()
				}
				
			},
			refreshConfirmDialog(status){
				 if(status == 'ok'){
         			window.location.reload(true) 
       			}
			}
		}
	}
</script>
<i18n src="../i18n.yaml"></i18n>
<template>
	<li>
        <a href="javascript:void(0)" class="dropdown-toggle notification-icon" data-toggle="dropdown" @click="syncProfile">
          	<i class="fa fa-refresh"></i>
        </a>
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
    </li>
</template>
<script>
	import userService from 'services/userService'
	export default{
		methods:{
			async syncProfile(){
				let {success} = await userService.syncProfile()
				if(success){
					this.$refs.confirmRefeshDailog.open()
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
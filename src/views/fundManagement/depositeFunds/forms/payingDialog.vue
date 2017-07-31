<template>
	<!-- <chp-dialog chp-open-from="trigger" chp-close-to="trigger" ref="infodialog">
        <chp-dialog-title>Create new note</chp-dialog-title>

        <chp-dialog-content>
          
        </chp-dialog-content>

        <chp-dialog-actions>
          <chp-button class="btn btn-default " @click="closeDialog">{{$t('ui.buttons.close')}}</chp-button>
        </chp-dialog-actions>
      </chp-dialog> -->
      <chp-dialog-alert
  		  chp-content="请支付成功后，点击本确定按钮"
		  :chp-ok-text="$t('ui.button.confirm')"
		  ref="infoDialog"
		  @close="close"
		  >
	  </chp-dialog-alert>
</template>
<script>
	export default{
		methods:{
			close(){
				this.$emit('close');
			},
			open(){
				this.$refs.infoDialog.open();
			}
		}
	}
</script>
<i18n src="../i18n.yaml"></i18n>
<template>
  <li>
    <mu-icon-button class="dropdown-toggle notification-icon" data-toggle="dropdown" @click="syncProfile">
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

  export default {

    methods: {
      async syncProfile () {
        let syncTime = this.$store.state.syncTime + ''
        // 因为是将时间存入localsrage,localstrage只能存入字符串，这会导致取出的时间格式是“”2017-09-21T01:27:27.082Z“”,同理，将null型值存入localstorage的时候会存入“null”
        if (syncTime === 'null' || (new Date() - new Date(this.$store.state.syncTime.replace(/"|'/g, '')) > MAX_SYNC_TIME * 60 * 1000)) {
          let {success} = await userService.syncProfile()
          if (success) {
            this.$refs.confirmRefeshDailog.open()
            this.$store.commit(SET_SYNC_TIME, new Date())
          }
        } else {
          this.$refs.refreshAlertDialog.open()
        }
      },
      refreshConfirmDialog (status) {
        if (status === 'ok') {
          window.location.reload(true)
        }
      }
    }
  }
</script>

<i18n src="../i18n.yaml"></i18n>
<template>
  <ul class="notifications">
    <notification-sync-profile></notification-sync-profile>
    <notification-lottery-activity></notification-lottery-activity>
    <notification-notice></notification-notice>
  </ul>
</template>

<script>
  import notice from './notice'
  import syncProfile from './syncProfile'
  import lotteryActivity from './lotteryActivity'

  export default {
    components: {
      'notification-notice': notice,
      'notification-sync-profile': syncProfile,
      'notification-lottery-activity': lotteryActivity
    }
  }
</script>

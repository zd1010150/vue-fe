<template lang="html">

      <form slot="body" class="form-horizontal form-bordered " method="POST"  target="_blank" ref="accountForm">

        <div class="form-group">
          <label class="control-label col-md-3">{{ $t('account.first_name')}}</label>
          <div class="col-md-6">
            <mu-text-field v-model="userInfo.first_name"   class="form-control"   :fullWidth="true" :disabled="true"/>
          </div>
        </div>
       <div class="form-group">
          <label class="control-label col-md-3">{{ $t('account.last_name')}}</label>
          <div class="col-md-6">
            <mu-text-field v-model="userInfo.last_name"   class="form-control"   :fullWidth="true" :disabled="true"/>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-md-3">{{ $t('account.email')}}</label>
          <div class="col-md-6">
            <mu-text-field v-model="userInfo.email"   class="form-control"   :fullWidth="true" :disabled="true"/>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-md-3">{{ $t('account.phone')}}</label>
          <div class="col-md-6">
            <mu-text-field v-model="userInfo.phone"   class="form-control"   :fullWidth="true" :disabled="true"/>
          </div>
        </div>
      </form>

</template>

<script>
export default {
  computed: {
    userInfo: function () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    async validate () {
      return true
    }
  }
}
</script>


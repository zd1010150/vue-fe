<i18n src="../i18n.yaml"></i18n>
<template>
  <div class="center-block pb-lg pt-lg">
    <h4>{{ $t('closeTicket.title') }}</h4>
    <p class="text-danger">{{ $t('closeTicket.prompt') }}</p>
    <p>
      <chp-button class="mb-xs mt-xs mr-xs btn btn-primary print-btn" @click="submit" :disabled="disableSubmit">
        <i class="fa fa-check hidden-sm hidden-xs"></i> {{ $t('ui.button.submit') }}
      </chp-button>
      <chp-button class="mb-xs mt-xs mr-xs btn btn-default print-btn" @click="cancel">
        <i class="fa fa-times hidden-sm hidden-xs"></i> {{ $t('ui.button.cancel') }}
      </chp-button>
    </p>
  </div>
</template>
<script>
  import ticketService from 'services/ticketService'

  export default {
    data () {
      return {
        disableSubmit: false
      }
    },
    props: {
      ticketId: String
    },
    methods: {
      async submit () {
        this.disableSubmit = true
        let {message, success} = await ticketService.closeTicket(Number(this.ticketId))
        if (success) {
          this.toastr.info(this.$t('info.SUCCESS'))
          this.$emit('submit')
        } else {
          if (message === 'TICKET_CLOSED') {
            this.$emit('cancel')
          }
        }
        this.$emit('refresh')
        this.disableSubmit = false
      },
      cancel () {
        this.$emit('cancel')
      }
    }
  }
</script>
<style>
  .center-block {
    text-align: center;
  }
</style>

<template>
  <chp-dialog class="chp-dialog-confirm" ref="dialog" @close="fireCloseEvent('cancel')">
    <chp-dialog-title v-if="chpTitle">{{ chpTitle }}</chp-dialog-title>

    <chp-dialog-content v-if="chpContentHtml" v-html="chpContentHtml"></chp-dialog-content>
    <chp-dialog-content v-else>{{ chpContent }}</chp-dialog-content>

    <chp-dialog-actions>
      <chp-button class="chp-primary" @click="close('cancel')">{{ chpCancelText }}</chp-button>
      <chp-button class="chp-primary" @click="close('ok')">{{ chpOkText }}</chp-button>
    </chp-dialog-actions>
  </chp-dialog>
</template>

<script>
  export default {
    name: 'chp-dialog-confirm',
    props: {
      chpTitle: String,
      chpContent: String,
      chpContentHtml: String,
      chpOkText: {
        type: String,
        default: 'Ok'
      },
      chpCancelText: {
        type: String,
        default: 'Cancel'
      }
    },
    data: () => ({
      debounce: false
    }),
    methods: {
      fireCloseEvent(type) {
        if (!this.debounce) {
          this.$emit('close', type);
        }
      },
      open() {
        this.$emit('open');
        this.debounce = false;
        this.$refs.dialog.open();
      },
      close(type) {
        this.fireCloseEvent(type);
        this.debounce = true;
        this.$refs.dialog.close();
      }
    },
    mounted() {
      if (!this.chpContent && !this.chpContentHtml) {
        throw new Error('Missing chp-content or chp-content-html attributes');
      }
    }
  };
</script>

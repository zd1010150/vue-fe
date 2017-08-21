<template>
  <chp-dialog class="chp-dialog-confirm" ref="dialog" @close="fireCloseEvent('cancel')" :scrollable="scrollable">
     <template v-if="chpTitle" slot="title">
      {{ chpTitle }}
    </template>

    <template v-if="chpContentHtml" >
      <div v-html="chpContentHtml" slot="body"></div>
    </template>
    <template v-else slot="body">{{ chpContent }}</template>

    <template slot="footer">
     <chp-button class="chp-primary" @click="close('cancel')">{{ chpCancelText }}</chp-button>
      <chp-button class="chp-primary" @click="close('ok')">{{ chpOkText }}</chp-button>
    </template>
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
      },
      scrollable: {
        type: Boolean,
        default: false
      },
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

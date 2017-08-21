<template>
  <chp-dialog class="chp-dialog-alert" ref="dialog" @close="fireCloseEvent()" :scrollable="scrollable">
   
    <template v-if="chpTitle" slot="title">
      {{ chpTitle }}
    </template>
    <template v-if="chpContentHtml" v-html="chpContentHtml">
      <div v-html="chpContentHtml" slot="body"></div>
    </template>
    <template v-else slot="body">{{ chpContent }}</template>

    <template slot="footer">
      <chp-button class="chp-primary" @click="close()">{{ chpOkText }}</chp-button>
    </template>

  </chp-dialog>
</template>

<script>
  export default {
    name: 'chp-dialog-alert',
    props: {
      chpTitle: String,
      chpContent: String,
      chpContentHtml: String,
      chpOkText: {
        type: String,
        default: 'Ok'
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
      fireCloseEvent() {
        if (!this.debounce) {
          this.$emit('close');
        }
      },
      open() {
        this.$emit('open');
        this.debounce = false;
        this.$refs.dialog.open();
      },
      close() {
        this.fireCloseEvent();
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

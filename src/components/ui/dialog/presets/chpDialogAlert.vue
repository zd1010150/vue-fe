<template>
  <chp-dialog class="chp-dialog-alert" ref="dialog" @close="fireCloseEvent()">
    <chp-dialog-title v-if="chpTitle">{{ chpTitle }}</chp-dialog-title>

    <chp-dialog-content v-if="chpContentHtml" v-html="chpContentHtml"></chp-dialog-content>
    <chp-dialog-content v-else>{{ chpContent }}</chp-dialog-content>

    <chp-dialog-actions>
      <chp-button class="chp-primary" @click="close()">{{ chpOkText }}</chp-button>
    </chp-dialog-actions>
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
      }
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

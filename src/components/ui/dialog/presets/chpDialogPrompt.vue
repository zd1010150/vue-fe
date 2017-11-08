<template>
  <chp-dialog class="chp-dialog-prompt" ref="dialog" @close="fireCloseEvent('cancel')" :scrollable="scrollable">

    <template v-if="chpTitle" slot="title">
      {{ chpTitle }}
    </template>
    <template v-if="chpContentHtml" v-html="chpContentHtml" slot="body"></template>
    <template v-if="chpContent" slot="body">{{ chpContent }}</template>
    <template v-else slot="body">
      <mu-text-field ref="input"
                     :id="chpInputId"
                     :name="chpInputName"
                     :maxLength="chpInputMaxlength"
                     :hintText="chpInputPlaceholder"
                     class="form-control"
                     :value="value"
                     @keydown.enter.native="confirmValue"

      ></mu-text-field>

    </template>
    <template slot="footer">
      <chp-button class="chp-primary" @click="close('cancel')">{{ chpCancelText }}</chp-button>
      <chp-button class="chp-primary" @click="confirmValue">{{ chpOkText }}</chp-button>
    </template>
  </chp-dialog>
</template>

<script>
  export default {
    name: 'chp-dialog-prompt',
    props: {
      value: {
        type: [String, Number],
        required: true
      },
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
      chpInputId: String,
      chpInputName: String,
      chpInputMaxlength: [String, Number],
      chpInputPlaceholder: String,
      scrollable: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      debounce: false
    }),
    methods: {
      fireCloseEvent (type) {
        if (!this.debounce) {
          this.$emit('close', type)
        }
      },
      open () {
        this.$emit('open')
        this.debounce = false
        this.$refs.dialog.open()

        window.setTimeout(() => {
          this.$refs.input.$el.focus()
        })
      },
      close (type) {
        this.fireCloseEvent(type)
        this.debounce = true
        this.$refs.dialog.close()
      },
      confirmValue () {
        this.$emit('input', this.$refs.input.$el.value)
        this.close('ok')
      }
    }
  }
</script>

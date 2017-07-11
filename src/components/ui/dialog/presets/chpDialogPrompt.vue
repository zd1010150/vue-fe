<template>
  <chp-dialog class="chp-dialog-prompt" ref="dialog" @close="fireCloseEvent('cancel')">
    <chp-dialog-title v-if="chpTitle">{{ chpTitle }}</chp-dialog-title>

    <chp-dialog-content v-if="chpContentHtml" v-html="chpContentHtml"></chp-dialog-content>
    <chp-dialog-content v-if="chpContent">{{ chpContent }}</chp-dialog-content>

    <chp-dialog-content>


        <mu-text-field ref="input"
                       :id="chpInputId"
                       :name="chpInputName"
                       :maxLength="chpInputMaxlength"
                       :hintText="chpInputPlaceholder"
                       class="form-control"
                       :value="value"
                       @keydown.enter.native="confirmValue"

        ></mu-text-field>
    </chp-dialog-content>
    <chp-dialog chp-open-from="#fab" chp-close-to="#fab" ref="dialog2">
      <chp-dialog-title>Create new note</chp-dialog-title>

      <chp-dialog-content>
        <form>

        </form>
      </chp-dialog-content>

      <chp-dialog-actions>
        <chp-button class="chp-primary" @click="closeDialog('dialog2')">Cancel</chp-button>
        <chp-button class="chp-primary" @click="closeDialog('dialog2')">Create</chp-button>
      </chp-dialog-actions>
    </chp-dialog>

    <chp-dialog-actions>
      <chp-button class="chp-primary" @click="close('cancel')">{{ chpCancelText }}</chp-button>
      <chp-button class="chp-primary" @click="confirmValue">{{ chpOkText }}</chp-button>
    </chp-dialog-actions>
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
      chpInputPlaceholder: String
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

        window.setTimeout(() => {
          this.$refs.input.$el.focus();
        });
      },
      close(type) {
        this.fireCloseEvent(type);
        this.debounce = true;
        this.$refs.dialog.close();
      },
      confirmValue() {
        this.$emit('input', this.$refs.input.$el.value);
        this.close('ok');
      }
    }
  };
</script>

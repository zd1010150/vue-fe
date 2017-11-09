<template>
  <div class="chp-table-edit" @keydown.esc="closeDialog">
    <div class="chp-table-edit-trigger" :class="triggerClasses" @click.stop="openDialog">
      {{ value || chpPlaceholder }}
    </div>

    <div class="chp-table-dialog" :class="dialogClasses" ref="dialog">
      <mu-text-field ref="input"
                     :id="chpId"
                     :name="chpName"
                     :maxlength="chpMaxlength"
                     @keydown.enter.native="confirmDialog"
                     :value="value"
                     :hintText="chpPlaceholder"
                     class="form-control"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'chp-table-edit',
    props: {
      value: [String, Number],
      chpLarge: Boolean,
      chpId: String,
      chpName: String,
      chpPlaceholder: String,
      chpMaxlength: [Number, String]
    },
    data () {
      return {
        active: false
      }
    },
    computed: {
      triggerClasses () {
        return {
          'chp-edited': this.value
        }
      },
      dialogClasses () {
        return {
          'chp-active': this.active,
          'chp-large': this.chpLarge
        }
      },
      realValue () {}
    },
    methods: {
      openDialog () {
        this.active = true
        this.$refs.input.$el.focus()
        document.addEventListener('click', this.closeDialogOnOffClick)
      },
      closeDialog () {
        if (this.active) {
          this.active = false
          this.$refs.input.$el.blur()
          document.removeEventListener('click', this.closeDialogOnOffClick)
        }
      },
      closeDialogOnOffClick (event) {
        if (!this.$refs.dialog.contains(event.target)) {
          this.closeDialog()
        }
      },
      confirmDialog () {
        let value = this.$refs.input.$el.value

        this.closeDialog()
        this.$emit('input', value)
        this.$emit('edited', value)
      }
    }
  }
</script>

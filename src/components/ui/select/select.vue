<template>
  <div class="chp-select form-control" :class="{selectOpen}">

    <select-field :name="name" :label="label" :labelFloat="labelFloat" :labelClass="labelClass" :labelFocusClass="labelFocusClass" :disabled="disabled"
                  :hintText="hintText" :hintTextClass="hintTextClass" :helpText="helpText" :helpTextClass="helpTextClass"
                  :errorText="errorText" :errorColor="errorColor" :icon="icon" :iconClass="iconClass" :maxHeight="maxHeight"
                  :autoWidth="autoWidth" :fullWidth="fullWidth" :underlineShow ="underlineShow"
                  :underlineClass="underlineClass"
                  :underlineFocusClass="underlineFocusClass"
                  :dropDownIconClass="dropDownIconClass"
                  :value="value"
                  :multiple="multiple"
                  :scroller="scroller"
                  :separator="separator"
                  @input="input"
                  @change="change"
                  @open="open"
                  @close="close"

    >

      <slot></slot>
    </select-field>
    <i class="fa custom-caret"></i>
  </div>

</template>

<script>
  import selectField from 'muse-ui/src/selectField'
  import './select.less'
  export default {
    name: 'chp-select',
    components: {
      'select-field': selectField
    },
    data(){
        return {
            selectOpen: false

        }
    },
    props: {
      name: {
        type: String
      },
      label: {
        type: String
      },
      labelFloat: {
        type: Boolean,
        default: false
      },
      labelClass: {
        type: [String, Array, Object]
      },
      labelFocusClass: {
        type: [String, Array, Object]
      },
      disabled: {
        type: Boolean,
        default: false
      },
      hintText: {
        type: String
      },
      hintTextClass: {
        type: [String, Array, Object]
      },
      helpText: {
        type: String
      },
      helpTextClass: {
        type: [String, Array, Object]
      },
      errorText: {
        type: String
      },
      errorColor: {
        type: String
      },
      icon: {
        type: String
      },
      iconClass: {
        type: [String, Array, Object]
      },
      maxHeight: {
        type: Number
      },
      autoWidth: {
        type: Boolean,
        default: false
      },
      fullWidth: {
        type: Boolean,
        default: true
      },
      underlineShow: {
        type: Boolean,
        default: true
      },
      underlineClass: {
        type: [String, Array, Object]
      },
      underlineFocusClass: {
        type: [String, Array, Object]
      },
      dropDownIconClass: {
        type: [String, Array, Object]
      },
      value: {},
      multiple: {
        type: Boolean,
        default: false
      },
      scroller: {},
      separator: {
        type: String,
        default: ','
      }
    },
    methods: {
      input (val){
          this.$emit("input",val);
      },
      change(val){
          this.$emit("change",val);
      },
      open(){
        this.$emit("open");
        this.selectOpen = true;
      },
      close(){
          this.$emit("close");
        this.selectOpen = false;
      }
    }
  }
</script>




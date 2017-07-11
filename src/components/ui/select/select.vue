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

<style lang="less">
  @import "~assets/less/transition.less";
.chp-select{
  display:inline-block;
  position:relative;
  padding:4px 0px 6px;
  .mu-text-field{
    bottom:3px;
    padding:0px;
    .mu-text-field-content{
      .mu-dropDown-menu + div{
        margin-top: -1px;
        .mu-text-field-line{
          visibility: hidden;
        }
      }
      .mu-dropDown-menu{
        padding:0px 12px;
      }
    }
  }
  .fa{
    font-size:14px;
    font-weight:bold;
    color:#000011;
    transition : @arrow-rotate-transition;
    position:absolute;
    top:10px;
    right:12px;
    &:before{
       content: "\f0dd";
       position: relative;
       bottom: 3px;
     }
  }
  &.selectOpen{
    .fa{
      transform: rotate(180deg) translate3D(0,0,0);
    }
  }
  .mu-dropDown-menu-icon{
    visibility: hidden;
  }
}
html.dark .chp-select{
  .fa{
    color:#c3c3c3;
  }
}



</style>


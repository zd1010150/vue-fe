<template>
  <div :class="classes">
    <ul :class="headerClasses">
      <slot name="header"></slot>
    </ul>
    <div class="tab-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'chp-tabs',
    props: {
      value: {},
      isJustified: {
        type: Boolean,
        default: false
      },
      isPrimary: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'tabs'
      }
    },
    computed: {
      classes () {
        return {
          'tabs-primary': this.isPrimary,
          'tabs': this.type === 'tabs',
          'wizard-tabs': this.type === 'wizard'
        }
      },
      headerClasses () {
        return [this.type === 'tabs' ? 'nav nav-tabs' : 'wizard-steps'].concat([this.isJustified ? 'nav-justified' : ''])
      }
    },
    methods: {
      handleTabClick (href) { // 这个事件必须传
        if (this.value !== href) {
          this.$emit('change', href)
        }
      }
    }
  }
</script>
<style lang='less'>
  @import "~assets/less/variable.less";

  .nav-tabs.nav-justified {
    li.active a {
      border-top: 3px solid @blue-color !important;
      color: @blue-color !important;

    }
  }

</style>



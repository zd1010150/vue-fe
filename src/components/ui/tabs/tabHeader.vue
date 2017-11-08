<template>
  <li :class="classes">
    <a class="text-center" aria-expanded="false" @click="tabClick">
      <slot></slot>
    </a>
  </li>
</template>
<script>
  export default {
    name: 'chp-tab',
    watch: {
      active (href, oldHref) {
        if (href === oldHref) return
        if (href) this.$emit('active')
      }
    },
    props: {
      href: {
        type: String
      }
    },
    computed: {
      active () {
        return (!_.isNull(this.href)) && this.$parent.value === this.href
      },
      classes () {
        return {
          'active': this.active
        }
      }
    },

    methods: {
      tabClick (e) {
        if (this.$parent.handleTabClick) this.$parent.handleTabClick(this.href, this)
        this.$emit('click', e)
      }
    }
  }
</script>

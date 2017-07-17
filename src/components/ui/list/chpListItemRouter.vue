<template>
  <li class="chp-list-item" :class="classes" :disabled="disabled">
    <slot />
    <chp-ink-ripple :disabled="disabled" />
  </li>
</template>

<script>
  export default {
    name: 'chp-list-item',
    props: {
      disabled: Boolean
    },
    computed: {
      classes() {
        return {
          'chp-disabled': this.disabled
        };
      }
    }
  };
</script>

<template>
  <td class="chp-table-cell" :class="classes">
    <div class="chp-table-cell-container">
      <slot></slot>
    </div>
  </td>
</template>

<script>
  export default {
    name: 'chp-table-cell',
    props: {
      chpNumeric: Boolean
    },
    data: () => ({
      hasAction: false
    }),
    computed: {
      classes() {
        return {
          'chp-numeric': this.chpNumeric,
          'chp-has-action': this.hasAction
        };
      }
    },
    mounted() {
      if (this.$children.length > 0) {
        this.hasAction = true;
      }
    }
  };
</script>

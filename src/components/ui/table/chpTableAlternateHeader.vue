<template>
  <div class="chp-table-alternate-header" :class="[classes]">
    <chp-toolbar>
      <div class="chp-counter">
        <span ref="counter">{{ numberOfSelected }}</span>
        <span>{{ chpSelectedLabel }}</span>
      </div>
      <slot></slot>
    </chp-toolbar>
  </div>
</template>

<script>

  import getClosestVueParent from '../core/utils/getClosestVueParent';

  export default {
    name: 'chp-table-alternate-header',
    props: {
      chpSelectedLabel: {
        type: String,
        default: 'selected'
      }
    },
    data() {
      return {
        classes: {},
        tableInstance: {}
      };
    },
    computed: {
      numberOfSelected() {
        return this.tableInstance.numberOfSelected || 0;
      }
    },
    mounted() {
      this.parentCard = getClosestVueParent(this.$parent, 'chp-table-card');

      this.$nextTick(() => {
        this.tableInstance = this.parentCard.tableInstance;

        this.$watch('tableInstance.numberOfSelected', () => {
          this.$refs.counter.textContent = this.tableInstance.numberOfSelected;
          this.classes = {
            'chp-active': this.tableInstance.numberOfSelected > 0
          };
        });
      });
    }
  };
</script>

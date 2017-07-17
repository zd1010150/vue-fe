<template>
  <div
    class="chp-menu-content"
    @keydown.esc.prevent="close"
    @keydown.tab.prevent="close"
    @keydown.up.prevent="highlightItem('up')"
    @keydown.down.prevent="highlightItem('down')"
    @keydown.enter="fireClick"
    @keydown.space="fireClick"
    tabindex="-1">
    <chp-list>
      <slot></slot>
    </chp-list>
  </div>
</template>

<script>
  export default {
    name: 'chp-menu-content',
    data() {
      return {
        oldHighlight: false,
        highlighted: false,
        itemsAmount: 0
      };
    },
    methods: {
      close() {
        this.highlighted = false;
        this.$parent.close();
      },
      highlightItem(direction) {
        this.oldHighlight = this.highlighted;

        if (direction === 'up') {
          if (this.highlighted === 1) {
            this.highlighted = this.itemsAmount;
          } else {
            this.highlighted--;
          }
        }

        if (direction === 'down') {
          if (this.highlighted === this.itemsAmount) {
            this.highlighted = 1;
          } else {
            this.highlighted++;
          }
        }
      },
      fireClick() {
        if (this.highlighted > 0) {
          this.getOptions()[this.highlighted - 1].$el.click();
        }
      },
      getOptions() {
        return this.$children[0].$children.filter((child) => {
          return child.$el.classList.contains('chp-option');
        });
      }
    },
    mounted() {
      if (!this.$parent.$el.classList.contains('chp-menu')) {
        this.$destroy();

        throw new Error('You must wrap the chp-menu-content in a chp-menu');
      }
    }
  };
</script>

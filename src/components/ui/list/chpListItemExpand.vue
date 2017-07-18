<template>
  <li class="chp-list-item chp-list-item-expand" :class="classes" >
    <div class="chp-list-item-container chp-button">
      <slot></slot>


      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </div>

    <chp-button type="button" class="chp-button-ghost" @click="toggleExpandList" :disabled="disabled"></chp-button>

    <div class="chp-list-expand" ref="expand" :class="expandClasses" :style="expandStyles">
      <slot name="expand"></slot>
    </div>
  </li>
</template>

<script>
  import getClosestVueParent from '../core/utils/getClosestVueParent';

  export default {
    name: 'chp-list-item',
    props: {
      disabled: Boolean,
      chpExpandMultiple: Boolean,
      open:Boolean
    },
    data() {
      return {
        parentList: false,
        active: false,
        height: 0,
        contentObserver: null,
        transitionOff: true
      };
    },
    computed: {
      classes() {
        return {
          'chp-disabled': this.disabled,
          'chp-active': this.active
        };
      },
      expandClasses() {
        return {
          'chp-transition-off': this.transitionOff
        };
      },
      expandStyles() {
        return {
          'margin-bottom': this.height
        };
      }
    },
    methods: {
      resetSiblings() {
        this.parentList.$children.forEach((child) => {
          if (child.$el !== this.$el && child.$el.classList.contains('chp-list-item-expand')) {
            child.active = false;
          }
        });
      },
      calculatePadding() {
        window.requestAnimationFrame(() => {
          this.height = -this.$el.scrollHeight + 'px';

          window.setTimeout(() => {
            this.transitionOff = false;
          });
        });
      },
      toggleExpandList($event) {
        if (!this.chpExpandMultiple) {
          this.resetSiblings();
        }

        this.calculatePadding();
        this.active = !this.active;
        this.$emit('click', $event);
      },
      recalculateAfterChange() {
        this.transitionOff = true;
        this.calculatePadding();
      },
      observeChildChanges() {
        this.contentObserver = new MutationObserver(this.recalculateAfterChange);
        this.contentObserver.observe(this.$refs.expand, {
          childList: true,
          characterData: true,
          subtree: true
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.parentList = getClosestVueParent(this.$parent, 'chp-list');
        this.calculatePadding();
        this.observeChildChanges();
        window.addEventListener('resize', this.recalculateAfterChange);
      });
    },
    beforeDestroy() {
      if (this.contentObserver) {
        this.contentObserver.disconnect();
      }

      window.removeEventListener('resize', this.recalculateAfterChange);
    },
    watch:{
      open (val,oldVal){
          this.active = val
      }
    }
  };
</script>

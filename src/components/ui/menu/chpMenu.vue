<template>
  <div class="chp-menu">
    <slot></slot>

    <chp-backdrop class="chp-menu-backdrop chp-transparent chp-active" ref="backdrop" @close="close"></chp-backdrop>
  </div>
</template>

<style lang="scss" src="./chpMenu.scss"></style>

<script>
  import transitionEndEventName from '../core/utils/transitionEndEventName';
  import getInViewPosition from '../core/utils/getInViewPosition';

  export default {
    props: {
      chpSize: {
        type: [Number, String],
        default: 0
      },
      chpDirection: {
        type: String,
        default: 'bottom right'
      },
      chpAlignTrigger: {
        type: Boolean,
        default: false
      },
      chpOffsetX: {
        type: [Number, String],
        default: 0
      },
      chpOffsetY: {
        type: [Number, String],
        default: 0
      },
      chpCloseOnSelect: {
        type: Boolean,
        default: true
      }
    },
    data: () => ({
      active: false
    }),
    watch: {
      chpSize(current, previous) {
        if (current >= 1 && current <= 7) {
          this.removeLastSizeMenuContentClass(previous);
          this.addNewSizeMenuContentClass(current);
        }
      },
      chpDirection(current, previous) {
        this.removeLastDirectionMenuContentClass(previous);
        this.addNewDirectionMenuContentClass(current);
      },
      chpAlignTrigger(trigger) {
        this.handleAlignTriggerClass(trigger);
      }
    },
    methods: {
      validateMenu() {
        if (!this.menuContent) {
          this.$destroy();

          throw new Error('You must have a chp-menu-content inside your menu.');
        }

        if (!this.menuTrigger) {
          this.$destroy();

          throw new Error('You must have an element with a chp-menu-trigger attribute inside your menu.');
        }
      },
      removeLastSizeMenuContentClass(size) {
        this.menuContent.classList.remove('chp-size-' + size);
      },
      removeLastDirectionMenuContentClass(direction) {
        this.menuContent.classList.remove('chp-direction-' + direction.replace(/ /g, '-'));
      },
      addNewSizeMenuContentClass(size) {
        this.menuContent.classList.add('chp-size-' + size);
      },
      addNewDirectionMenuContentClass(direction) {
        this.menuContent.classList.add('chp-direction-' + direction.replace(/ /g, '-'));
      },
      handleAlignTriggerClass(trigger) {
        if (trigger) {
          this.menuContent.classList.add('chp-align-trigger');
        }
      },
      getPosition(vertical, horizontal) {
        let menuTriggerRect = this.menuTrigger.getBoundingClientRect();

        let top = vertical === 'top'
          ? menuTriggerRect.top + menuTriggerRect.height - this.menuContent.offsetHeight
          : menuTriggerRect.top;

        let left = horizontal === 'left'
          ? menuTriggerRect.left - this.menuContent.offsetWidth + menuTriggerRect.width
          : menuTriggerRect.left;

        top += parseInt(this.chpOffsetY, 10);
        left += parseInt(this.chpOffsetX, 10);

        if (this.chpAlignTrigger) {
          if (vertical === 'top') {
            top -= menuTriggerRect.height + 11;
          } else {
            top += menuTriggerRect.height + 11;
          }
        }

        return { top, left };
      },
      calculateMenuContentPos() {
        let position;

        if (!this.chpDirection) {
          position = this.getPosition('bottom', 'right');
        } else {
          position = this.getPosition.apply(this, this.chpDirection.trim().split(' '));
        }

        position = getInViewPosition(this.menuContent, position);

        this.menuContent.style.top = position.top + window.pageYOffset + 'px';
        this.menuContent.style.left = position.left + window.pageXOffset + 'px';
      },
      recalculateOnResize() {
        window.requestAnimationFrame(this.calculateMenuContentPos);
      },
      open() {
        if (document.body.contains(this.menuContent)) {
          document.body.removeChild(this.menuContent);
        }

        document.body.appendChild(this.menuContent);
        document.body.appendChild(this.backdropElement);
        window.addEventListener('resize', this.recalculateOnResize);

        this.calculateMenuContentPos();

        getComputedStyle(this.menuContent).top;
        this.menuContent.classList.add('chp-active');
        this.menuContent.focus();
        this.active = true;
        this.$emit('open');
      },
      close() {
        let close = (event) => {
          if (this.menuContent && event.target === this.menuContent) {
            let activeRipple = this.menuContent.querySelector('.chp-ripple.chp-active');

            this.menuContent.removeEventListener(transitionEndEventName, close);
            this.menuTrigger.focus();
            this.active = false;

            if (activeRipple) {
              activeRipple.classList.remove('chp-active');
            }

            document.body.removeChild(this.menuContent);
            document.body.removeChild(this.backdropElement);
            window.removeEventListener('resize', this.recalculateOnResize);
          }
        };

        this.menuContent.addEventListener(transitionEndEventName, close);
        this.menuContent.classList.remove('chp-active');
        this.$emit('close');
      },
      toggle() {
        if (this.active) {
          this.close();
        } else {
          this.open();
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.menuTrigger = this.$el.querySelector('[chp-menu-trigger]');
        this.menuContent = this.$el.querySelector('.chp-menu-content');
        this.backdropElement = this.$refs.backdrop.$el;
        this.validateMenu();
        this.handleAlignTriggerClass(this.chpAlignTrigger);
        this.addNewSizeMenuContentClass(this.chpSize);
        this.addNewDirectionMenuContentClass(this.chpDirection);
        this.$el.removeChild(this.$refs.backdrop.$el);
        this.menuContent.parentNode.removeChild(this.menuContent);
        this.menuTrigger.addEventListener('click', this.toggle);
      });
    },
    beforeDestroy() {
      if (document.body.contains(this.menuContent)) {
        document.body.removeChild(this.menuContent);
        document.body.removeChild(this.backdropElement);
      }

      this.menuTrigger.removeEventListener('click', this.toggle);
      window.removeEventListener('resize', this.recalculateOnResize);
    }
  };
</script>

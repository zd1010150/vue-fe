<template>
  <span class="chp-tooltip" :class="classes" :style="style">
    <slot></slot>
  </span>
</template>

<style lang="scss" src="./chpTooltip.scss"></style>

<script>
  import transitionEndEventName from '../core/utils/transitionEndEventName';

  export default {
    name: 'chp-tooltip',
    props: {
      chpDirection: {
        type: String,
        default: 'bottom'
      },
      chpDelay: {
        type: String,
        default: '0'
      }
    },
    data: () => ({
      active: false,
      parentClass: null,
      transitionOff: false,
      topPosition: false,
      leftPosition: false
    }),
    computed: {
      classes() {
        const cssClasses = {
          'chp-active': this.active,
          'chp-transition-off': this.transitionOff,
          'chp-tooltip-top': this.chpDirection === 'top',
          'chp-tooltip-right': this.chpDirection === 'right',
          'chp-tooltip-bottom': this.chpDirection === 'bottom',
          'chp-tooltip-left': this.chpDirection === 'left'
        };

        if (this.parentClass) {
          cssClasses[this.parentClass] = true;
        }

        return cssClasses;
      },
      style() {
        return {
          'transition-delay': this.chpDelay + 'ms',
          top: this.topPosition + 'px',
          left: this.leftPosition + 'px'
        };
      }
    },
    watch: {
      chpDirection() {
        this.calculateTooltipPosition();
      }
    },
    methods: {
      removeTooltips() {
        if (this.tooltipElement.parentNode) {
          this.tooltipElement.removeEventListener(transitionEndEventName, this.removeTooltips);
          this.tooltipElement.parentNode.removeChild(this.tooltipElement);
        }
      },
      calculateTooltipPosition() {
        let position = this.parentElement.getBoundingClientRect();
        let cssPosition = {};
        console.log("this.$el.offsetHeight",this.parentElement,position.top,position.left,this.$el.offsetHeight)  
        switch (this.chpDirection) {
          case 'top':
            cssPosition.top = position.top - this.$el.offsetHeight;
            cssPosition.left = position.left + position.width / 2;

            break;

          case 'right':
            cssPosition.top = position.top;
            cssPosition.left = position.left + position.width;

            break;

          case 'bottom':
            cssPosition.top = position.bottom;
            cssPosition.left = position.left + position.width / 2;

            break;

          case 'left':
            cssPosition.top = position.top;
            cssPosition.left = position.left - this.$el.offsetWidth;

            break;

          default:
            console.warn(`Invalid ${this.chpDirection} option to chp-direction option`);
        }

        this.topPosition = cssPosition.top;
        this.leftPosition = cssPosition.left;
      },
      generateTooltipClasses() {
        let classes = [];

        [...this.parentElement.classList].forEach((cssClass) => {
          if (cssClass.indexOf('chp-') >= 0 && cssClass !== 'chp-active') {
            classes.push(cssClass + '-tooltip');
          }
        });

        this.parentClass = classes.join(' ');
      },
      open() {
        this.removeTooltips();
        this.$nextTick(() => {
          document.body.appendChild(this.tooltipElement);
          getComputedStyle(this.tooltipElement).top;
          this.transitionOff = true;
          this.generateTooltipClasses();
          this.calculateTooltipPosition();

          window.setTimeout(() => {
            this.transitionOff = false;
            this.active = true;
          }, 10);
        });
      },
      close() {
        this.active = false;
        this.tooltipElement.removeEventListener(transitionEndEventName, this.removeTooltips);
        this.tooltipElement.addEventListener(transitionEndEventName, this.removeTooltips);
      }
    },
    mounted() {
      this.$nextTick(() => {

        this.tooltipElement = this.$el;
        this.parentElement = this.tooltipElement.parentNode;
        if(this.$el && this.parentElement){
          this.parentElement.removeChild(this.$el);
          this.parentElement.addEventListener('mouseenter', this.open);
          this.parentElement.addEventListener('focus', this.open);
          this.parentElement.addEventListener('mouseleave', this.close);
          this.parentElement.addEventListener('blur', this.close);
        }

      });
    },
    beforeDestroy() {
      this.active = false;

      this.removeTooltips();

      if (this.parentElement) {
        this.parentElement.removeEventListener('mouseenter', this.open);
        this.parentElement.removeEventListener('focus', this.open);
        this.parentElement.removeEventListener('mouseleave', this.close);
        this.parentElement.removeEventListener('blur', this.close);
      }
    }
  };
</script>

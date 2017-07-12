<template>
  <div class="chp-dialog-container panel" :class="[ classes]" @keyup.esc.stop="closeOnEsc" tabindex="0">
    <div class="chp-dialog" ref="dialog" :style="styles" :class="dialogClasses">
      <slot></slot>
    </div>

    <chp-backdrop class="chp-dialog-backdrop" :class="classes" v-if="chpBackdrop" ref="backdrop" @close="chpClickOutsideToClose && close()"></chp-backdrop>
  </div>
</template>

<style lang="scss" src="./chpDialog.scss"></style>

<script>

  import transitionEndEventName from '../core/utils/transitionEndEventName';

  export default {
    name: 'chp-dialog',
    props: {
      chpClickOutsideToClose: {
        type: Boolean,
        default: true
      },
      chpEscToClose: {
        type: Boolean,
        default: true
      },
      chpBackdrop: {
        type: Boolean,
        default: true
      },
      chpOpenFrom: String,
      chpCloseTo: String,
      chpFullscreen: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      active: false,
      transitionOff: false,
      dialogTransform: ''
    }),
    computed: {
      classes() {
        return {
          'chp-active': this.active
        };
      },
      dialogClasses() {
        return {
          'chp-fullscreen': this.chpFullscreen,
          'chp-transition-off': this.transitionOff,
          'chp-reference': this.chpOpenFrom || this.chpCloseTo
        };
      },
      styles() {
        return {
          transform: this.dialogTransform
        };
      }
    },
    methods: {
      removeDialog() {
        if (document.body.contains(this.dialogElement)) {
          this.$el.parentNode.removeChild(this.$el);
        }
      },
      calculateDialogPos(ref) {
        const reference = document.querySelector(ref);

        if (reference) {
          const openFromRect = reference.getBoundingClientRect();
          const dialogRect = this.dialogInnerElement.getBoundingClientRect();
          const widthInScale = openFromRect.width / dialogRect.width;
          const heightInScale = openFromRect.height / dialogRect.height;
          let distance = {
            top: -(dialogRect.top - openFromRect.top),
            left: -(dialogRect.left - openFromRect.left + openFromRect.width)
          };

          if (openFromRect.top > dialogRect.top + dialogRect.height) {
            distance.top = openFromRect.top - dialogRect.top;
          }

          if (openFromRect.left > dialogRect.left + dialogRect.width) {
            distance.left = openFromRect.left - dialogRect.left - openFromRect.width;
          }

          this.dialogTransform = `translate3D(${distance.left}px, ${distance.top}px, 0) scale(${widthInScale}, ${heightInScale})`;
        }
      },
      open() {
        document.body.appendChild(this.dialogElement);
        this.transitionOff = true;
        this.calculateDialogPos(this.chpOpenFrom);

        window.setTimeout(() => {
          this.dialogElement.focus();
          this.transitionOff = false;
          this.active = true;
        });

        this.$emit('open');
      },
      closeOnEsc() {
        if (this.chpEscToClose) {
          this.close();
        }
      },
      close() {
        if (document.body.contains(this.dialogElement)) {
          this.$nextTick(() => {
            let cleanElement = () => {
              let activeRipple = this.dialogElement.querySelector('.chp-ripple.chp-active');

              if (activeRipple) {
                activeRipple.classList.remove('chp-active');
              }

              this.dialogInnerElement.removeEventListener(transitionEndEventName, cleanElement);
              document.body.removeChild(this.dialogElement);
              this.dialogTransform = '';
            };

            this.transitionOff = true;
            this.dialogTransform = '';
            this.calculateDialogPos(this.chpCloseTo);

            window.setTimeout(() => {
              this.transitionOff = false;
              this.active = false;
              this.dialogInnerElement.addEventListener(transitionEndEventName, cleanElement);
            });

            this.$emit('close');
          });
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.dialogElement = this.$el;
        this.dialogInnerElement = this.$refs.dialog;
        this.removeDialog();
      });
    },
    beforeDestroy() {
      this.removeDialog();
    }
  };
</script>

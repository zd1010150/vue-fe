<template>
  <div class="chp-dialog-container panel" :class="[ classes]" @keyup.esc.stop="closeOnEsc" tabindex="0">
    <div class="chp-dialog" ref="dialog" :style="styles" :class="dialogClasses">
      
      <div class="panel-heading" v-if="showTitle" ref="title" :class="headerClass">
        <h2 class="panel-title">
          <slot name="title"></slot>
        </h2>
      </div>

      <div class="panel-body" ref="elBody" :style="bodyStyle" :class="bodyClass">
        <div class="modal-wrapper">
          <slot name="body"></slot>
        </div>
      </div>

      <div class="panel-footer" v-if="showFooter" ref="footer" :class="footerClass">
        <div class="row">
          <div class="col-md-12 text-right">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>

    </div>

    <chp-backdrop class="chp-dialog-backdrop" :class="classes" v-if="chpBackdrop" ref="backdrop" @close="chpClickOutsideToClose && close()"></chp-backdrop>
  </div>
</template>

<style lang="scss" src="./chpDialog.scss"></style>

<script>

  import transitionEndEventName from '../core/utils/transitionEndEventName';
  import convertClass from '../core/utils/convertClass.js'
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
      },
      scrollable: {
        type: Boolean,
        default: false
      },
      actionsContainerClass: { //actionsContainerClass  String,Object,Array 操作按钮容器样式, 同 class 绑定方式一致
        type: [String, Array, Object]
      },
      bodyClass: {
        type: [String, Array, Object]
      },
    },
    data: () => ({
      active: false,
      transitionOff: false,
      dialogTransform: ''
    }),
    computed: {
      bodyStyle () {
        return {
          'overflow-x': 'auto',
          'overflow-y': this.scrollable ? 'auto' : 'hidden',
          '-webkit-overflow-scrolling': 'touch'
        }
      },
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
      },
      headerClass () {
        const {scrollable} = this
        const classNames = []
        if (scrollable) classNames.push('scrollable')
        return classNames.concat(convertClass(this.titleClass))
      },
      footerClass () {
        const {scrollable} = this
        const classNames = []
        if (scrollable) classNames.push('scrollable')
        return classNames.concat(convertClass(this.actionsContainerClass))
      },
      showTitle () {
        return this.title || (this.$slots && this.$slots.title && this.$slots.title.length > 0)
      },
      showFooter () {
        return this.$slots && this.$slots.footer && this.$slots.footer.length > 0
      },
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
      /**
       * 为了兼容处理滚动穿透的问题，reference https://github.com/pod4g/tool/wiki/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E6%BB%9A%E5%8A%A8%E7%A9%BF%E9%80%8F%E9%97%AE%E9%A2%98
       * 
       */
      handleWindowOnOpen(){ 
        document.body.dataset.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        document.body.classList.add('dialog-open')
      
      // 把脱离文档流的body拉上去！否则页面会回到顶部！
        document.body.style.top = - document.body.dataset.scrollTop + 'px'

      },
      handleWindowOnClose(){
        document.body.classList.remove('dialog-open')
        document.body.scrollTop = document.documentElement.scrollTop = document.body.dataset.scrollTop
      },
      open() {
        document.body.appendChild(this.dialogElement);
        this.transitionOff = true;
        this.calculateDialogPos(this.chpOpenFrom);
        this.setMaxDialogContentHeight();
        this.handleWindowOnOpen()
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
          this.handleWindowOnClose();
        }
      },
      setMaxDialogContentHeight () {
        const dialogEl = this.$refs.dialog
        if (!dialogEl) return
        if (!this.scrollable) {
          dialogEl.style.maxHeight = ''
          return
        }

        let maxDialogContentHeight = window.innerHeight - 2 * 10
        const { footer, title, elBody } = this.$refs
        if (footer) maxDialogContentHeight -= footer.offsetHeight
        if (title) maxDialogContentHeight -= title.offsetHeight
        if (elBody) {
          let maxBodyHeight = maxDialogContentHeight
          if (footer) maxBodyHeight -= footer.offsetHeight
          if (title) maxBodyHeight -= title.offsetHeight
          elBody.style.maxHeight = maxBodyHeight + 'px'
        }
        dialogEl.style.maxHeight = maxDialogContentHeight + 'px'
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
<style>
  body.dialog-open {
    position: fixed;
    width: 100%;
  }
</style>

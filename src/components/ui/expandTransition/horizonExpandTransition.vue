<template>
  <transition name="chp-expand"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave" mode="out-in" >
    <slot></slot>
  </transition>
</template>

<script>
export default {
  
  methods: {
    beforeEnter (el) {
      el.dataset.oldPaddingLeft = el.style.paddingLeft
      el.dataset.oldPaddingRight = el.style.paddingRight
      el.style.width = '0'
    },
    enter (el) {
      el.dataset.oldOverflow = el.style.overflow
      el.style.display = 'block'
      if (el.scrollHeight !== 0) {
        el.style.width = el.scrollWidth + 'px'
        el.style.paddingLeft = el.dataset.oldPaddingLeft
        el.style.paddingRight = el.dataset.oldPaddingRight
      } else {
        el.style.width = ''
        el.style.paddingLeft = el.dataset.oldPaddingLeft
        el.style.paddingRight = el.dataset.oldPaddingRight
      }
      el.style.overflow = 'hidden'
    },
    afterEnter (el) {
      el.style.display = ''
      // uc浏览器上设置height会闪屏
      el.style.width = ''
      el.style.overflow = el.dataset.oldOverflow
      el.style.paddingLeft = el.dataset.oldPaddingLeft
      el.style.paddingRight = el.dataset.oldPaddingRight
  },
    beforeLeave (el) {
      el.dataset.oldPaddingLeft = el.style.paddingLeft
      el.dataset.oldPaddingRight = el.style.paddingRight
      el.dataset.oldOverflow = el.style.overflow
      el.style.display = 'block'
      if (el.scrollWidth!== 0) {
        el.style.width = el.scrollWidth + 'px'
      }
      el.style.overflow = 'hidden'
    },
    leave (el) {
      if (el.scrollWidth !== 0) {
        setTimeout(() => {
          el.style.width = 0
          el.style.paddingLeft = 0
          el.style.paddingRight = 0
        })
      }
    },
    afterLeave (el) {
      el.style.display = 'none'
      el.style.width = ''
      el.style.overflow = el.dataset.oldOverflow
      el.style.paddingLeft = el.dataset.oldPaddingLeft
      el.style.paddingRight = el.dataset.oldPaddingRight
    }
  }
}
</script>

<style lang="less">
@import "~assets/less/transition.less";
.chp-expand-enter-active,
.chp-expand-leave-active {
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
 // transition:@swift-ease-in-out
}
.chp-expand-enter-active{
  transition:@swift-ease-in;
}
.chp-expand-leave-active{
  transition:@swift-ease-out;
}
</style>

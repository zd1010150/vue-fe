<template>
  
  <chp-button  class="mu-pagination-item" :class="{'circle': isCircle, 'active': isActive}":centerRipple="false" :disabled="disabled"
  @click="handleClick"  @hover="handleHover" @hoverExit="handleHoverExit" containerElement="div">
  <span v-if="index">{{index}}</span>
  <slot></slot>
</chp-button>
</template>
<script>
export default{
    props: {
      icon: {
        type: String
      },
      index: {
        type: Number
      },
      isCircle: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      isActive: {
        type: Boolean,
        default: false
      },
      identifier: {
        type: String
      }
    },
    methods:{
      handleHover (event){
        this.$emit("hover",event);
      },
      handleHoverExit (event) {
          this.$emit('hoverExit', event)
      },
      handleClick(index){
        this.$emit("click",index);
      }
    }
  }
</script>

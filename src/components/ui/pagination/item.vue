<template>
  <mu-page-item :icon="icon" :index="index" :isCircle="isCircle" :disabled="disabled" :isActive="isActive"
  :identifier="identifier" @click="handleClick" @hoverExit="handleHoverExit" @hover="handleHover"
  >
    <slot></slot>
  </mu-page-item>
</template>
<script>
import muPageItem from "muse-ui/src/pagination/pageItem"
  export default{
    components :{
      'mu-page-item' : muPageItem
    },
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

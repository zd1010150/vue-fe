<template>

  <chp-button  class="mu-pagination-item btn " :class="{'circle': isCircle, 'active': isActive}":centerRipple="false" :disabled="disabled"
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
      handleClick(){
        if (this.index) {
          this.$emit('click', this.index)
        } else {
          this.$emit('click', this.identifier)
        }
      }
    }
  }
</script>
<style lang="less">
  .mu-pagination-item{

    background-color: transparent;

    > span{
        display: block;
        position:absolute;
        top:0px;
        padding:0px 0px 5px 0px;
      }

  }
html.dark{
  .mu-pagination-item{
    &:hover{
      color:#fff;
     }
  }
}
</style>

<template>
  <section class="panel" :class="classes">

      <chp-panel-header @close="closePanel" @collapse="collapsePanel" :isTransparent="isHeaderTransparent"
                    :canCollapse="canCollapse" :canClose="canClose">
          <h2 class="panel-title">
            <slot name="title"></slot>
          </h2>
          <p class="panel-subtitle">
            <slot name="subtitle"></slot>
          </p>
      </chp-panel-header>


      <expand-transition>
        <div class="panel-body" ref="panelBody" v-if="isOpen">
          <slot name="body"></slot>
        </div>
      </expand-transition>
    <div class="panel-footer" v-if="hasFooter">
      <slot name="footer"></slot>
    </div>
  </section>
</template>

<script>
  import panelHeader from './panelHeader.vue'
  import expandTransition from '../core/expandTransition.vue'
  export default{
    name: 'chp-panel',
    data(){
      return {
          isOpen : this.defaultStatus == "open" ? true : false
      };
    },
    computed: {

      classes(){
          return {
            'panel-collapsed' : !(this.isOpen)
          }
      }
    },

    components: {
      chpPanelHeader: panelHeader,
      'expand-transition': expandTransition
    },
    props: {
      defaultStatus:{
          type:String,
          default:"open"
      },
      canClose:{
          type:Boolean,
          default:true
      },
      canCollapse:{
          type:Boolean,
          default:true
      },
      isHeaderTransparent:{
          type:Boolean,
          default:false
      },
      hasFooter:{
        type:Boolean,
        default:false
      }
    },
    methods: {
      closePanel(){
        console.log("panel colse");
        this.isOpen=false;
        this.$emit("closePanel");
      },
      collapsePanel(){

        this.isOpen = !(this.isOpen);
        console.log("panel collapse",this.isOpen);
        this.$emit("collapsePanel",this.isOpen);
      }
    }
  }

</script>
<style lang="less">
  /*panel style*/
  @import "~assets/less/transition.less";
  /*.panel{
    .panel-body{
      opacity: 1;
      transform: scale(1) translateZ(0);
      transition: @panel-open-transition;
      height:auto;
      will-change: transform,opacity,height;
      transform-origin: top left;
    }

    &.panel-collapsed{
      .panel-body{
        opacity:0;
        height:0;
        transform: scale(.9,.85) translateZ(0);
        transition:@panel-close-transition
      }

    }
  }*/
</style>

<template>
  <section class="panel" :class="classes">
      <header class="panel-heading" :class="headerClasses">
        <div class="panel-actions">
          <a href="javascript:void(0)" 
             class="panel-action panel-action-toggle" 
             :class="headerCollapseClasses" 
             v-if="canCollapse" 
             @click.stop = "collapsePanel">
              {{ isOpen ? expandPanelText : collapsePanelText }}
          </a>
          <a href="javascript:void(0)" 
             class="panel-action panel-action-dismiss" 
             :class="headerCloseClasses" 
             v-if="canClose"  
             @click.stop = "closePanel">
             {{closeText}}
          </a>
        </div>
         <h2 class="panel-title">
            <slot name="panelTitle"></slot>
          </h2>
          <p class="panel-subtitle">
            <slot name="subtitle"></slot>
          </p>
      </header>
      <div class="panel-body" :class=" {'loading-overlay-showing':isLoading } " ref="panelBody" v-show="isOpen" >
        <slot name="body"></slot>
        <div class="loading-overlay" style="border-radius: 0px 0px 5px 5px;">
          <div class="bounce-loader">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
          </div>
        </div>
      </div>
      <div class="panel-footer" v-if="hasfooter">
        <slot name="footer"></slot>
      </div>
  </section>
</template>

<script>
 export default{
    name: 'chp-panel',
    data(){
      return {
        hasfooter: true,
        hasTitle: true,
        isOpen : true,
        headerClasses: {
          'panel-heading-transparent' : this.isHeaderTransparent
        },
        headerCollapseClasses: this.collapsePanelText || this.expandPanelText ? 'action-text' : '',
        headerCloseClasses: this.closeText ? 'action-text' : ''
      }
    },
    computed: {
      classes(){
          return {
            'panel-collapsed' : !(this.isOpen)
          }
      }
    },
    mounted(){
      this.hasfooter = this.$slots.footer && this.$slots.footer.length>0
      this.hasTitle = this.$slots.title || this.$slots.subtitle
      this.initPanel()
    },
    methods: {
      initPanel(){
        this.isOpen = this.defaultStatus == "open"
      },
      closePanel(){
        this.isOpen = false
        this.$emit("closePanel")
      },
      collapsePanel(){
        this.isOpen = !(this.isOpen)
        this.$emit("collapsePanel",this.isOpen)
      },
      expandPanel(){
        this.isOpen = true
      },
      shrinkPanel(){
        this.isOpen = false
      }
    },
    watch:{
      defaultStatus(val){
        this.isOpen = val=="open"? true : false
      },
      isLoading(val){}
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
      },
      isLoading:{
        type:Boolean,
        default:false
      },
      expandPanelText:{
        type:String,
        default:''
      },
      closeText:{
        type:String,
        default:''
      },
      collapsePanelText:{
        type:String,
        default:''
      },
      showActionRipple:{
          type:Boolean,
          default:true
      }
    }
  }
</script>
<style lang="less">
  @import "~assets/less/transition.less";
  .panel{
    .panel-body{
      position: relative;
      visibility: visible;
    }
  }
  .panel-action.action-text{
    width:auto;
    display: inline-block;
    padding:10px ;
  }
</style>

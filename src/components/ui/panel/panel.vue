<template>
  <section class="panel" :class="classes">
      <chp-panel-header @close="closePanel" 
                        @collapse="collapsePanel" 
                        :isTransparent="isHeaderTransparent"
                        :canCollapse="canCollapse" 
                        :canClose="canClose" 
                        :collapsePanelText="collapsePanelText"
                        :expandPanelText="expandPanelText"
                        :closeText="closeText"
                        :showActionRipple ="showActionRipple"
                        :defaultStatus = "headerStatus">
          <h2 class="panel-title">
            <slot name="title"></slot>
          </h2>
          <p class="panel-subtitle">
            <slot name="subtitle"></slot>
          </p>
      </chp-panel-header>
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
  import panelHeader from './panelHeader.vue'
  
  export default{
    name: 'chp-panel',
    data(){
      return {
        hasfooter: true,
        hasTitle:true,
        isOpen : this.defaultStatus == "open" ? true : false
      };
    },
    computed: {
      classes(){
          return {
            'panel-collapsed' : !(this.isOpen)
          }
      },
      headerStatus(){

        return this.isOpen ? "open" : "close"
      }
    },
    mounted(){
      this.hasfooter = this.$slots.footer && this.$slots.footer.length>0;
      this.hasTitle = this.$slots.title || this.$slots.subtitle ;
    },
    components: {
      chpPanelHeader: panelHeader
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
    },
    methods: {
      closePanel(){
        this.isOpen=false;
        this.$emit("closePanel");
      },
      collapsePanel(){
        this.isOpen = !(this.isOpen);
        this.$emit("collapsePanel",this.isOpen);
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
        this.isOpen = val=="open"?true:false;
      },
      isLoading(val){
        
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
</style>

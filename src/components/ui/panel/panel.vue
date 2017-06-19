<template>
  <section class="panel" :class="classes">

      <chp-panel-header @close="closePanel" @collapse="collapsePanel" :isTransparent="isHeaderTransparent"
                    :canCollapse="canCollapse" :canClose="canClose">

          <slot name="title"></slot>

      </chp-panel-header>



    <div class="panel-body" ref="panelBody">
      <slot name="body"></slot>
    </div>

    <div class="panel-footer" v-if="hasFooter">
      <slot name="footer"></slot>
    </div>
  </section>
</template>

<script>
  import panelHeader from './panelHeader.vue'

  export default{
    name: 'chp-panel',
    data(){
      return {};
    },
    computed: {
      isOpen (){
        return this.defaultStatus == "open" ? true : false
      },
      classes(){
          return {
            'panel-collapsed' : !(this.isOpen)
          }
      }
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
      }
    },
    methods: {
      closePanel(){
        this.$emit("closePanel");
      },
      collapsePanel(){
        this.isOpen = !this.isOpen;
        this.$emit("collapsePanel",this.isOpen);
      }
    }
  }

</script>

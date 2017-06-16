<template>
  <section class="panel" :class="classes">
    <chp-panel-header @close="closePanel" @collapse="collapsePanel" :isTransparent="isHeaderTransparent"
                      :canCollapse="canCollapse" :canClose="canClose" :isOpen="isOpen"></chp-panel-header>
    <div class="panel-body" ref="panelBody"></div>
    <div class="panel-footer"></div>
  </section>
</template>

<script>
  import panelHeader from './panelHeader.vue'

  export default{
    name: 'chp-panel',
    data(){

    },
    computed: {

      isOpen (){
        return this.defaultStatus == "open" ? true : false
      },
      classes(){
          return {
            'panel-collapsed' : !isOpen
          }
      }
    },
    components: {
      chpPanelHeader: panelHeader
    },
    props: {
      defaultStaus:{
          type:String,
          default:"open"
      }
    },
    methods: {
      closePanel(){
        this.$emit("closePanel");
      },
      collapsePanel(){
        this.isOpen = !this.isOpen;
        this.$emit("collapsePanel",this.isOpen);
      },
      calculatePadding() {
        window.requestAnimationFrame(() => {
          this.height = -this.$el.scrollHeight + 'px';

          window.setTimeout(() => {
            this.transitionOff = false;
          });
        });
      },
    }
  }

</script>

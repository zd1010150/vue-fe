<template>
    <header class="panel-heading" :class="classes">
      <div class="panel-actions">
      <a href="javascript:void(0)" class="panel-action panel-action-toggle" :class="collapseClasses" v-if="canCollapse" @click.stop = "collapseHandler">
         {{ isCollapsed ? collapsePanelText : expandPanelText}}
        </a>
        <a href="javascript:void(0)" class="panel-action panel-action-dismiss" :class="closeClasses" v-if="canClose"  @click.stop = "closeHandler">
         {{closeText}}
        </a>
      </div>

      <slot></slot>
      <chp-ink-ripple v-if="showActionRipple"></chp-ink-ripple>
    </header>

</template>

<script>
  export default{
    data(){
      return {
        isCollapsed:this.defaultStatus != "open" 
      }
    },
    name: 'chp-panel-header',
    props:{
        isTransparent:{
          type:Boolean,
          default:true
        },
        canCollapse:{
          type:Boolean,
          default:true
        },
        canClose:{
          type: Boolean,
          default:true
        },
        defaultStatus:{
          type:String
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
    computed:{
      classes(){
          return {
              'panel-heading-transparent' : this.isTransparent
          }
      },
      collapseClasses(){
        if(this.collapsePanelText || this.expandPanelText){
          return 'action-text'
        }else{
          return ''
        }
      },
      closeClasses(){
        if(this.closeText){
          return 'action-text'
        }else{
          return ''
        }
      }

    },
    methods:{
        closeHandler(){
            this.$emit("close");
        },
        collapseHandler(){
            this.isCollapsed  = !this.isCollapsed
            this.$emit("collapse");
        }
    },
    watch:{
      defaultStatus:function(val){
        this.isCollapsed = val!="open"
      }
    }
  }

</script>
<style lang="less">
  .panel-action.action-text{
    width:auto;
    display: inline-block;
    padding:10px ;
  }
</style>

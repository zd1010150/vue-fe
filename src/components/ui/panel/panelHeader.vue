<template>
    <header class="panel-heading" :class="classes">
      <div class="panel-actions">
        <a href="javascript:void(0)" class="panel-action panel-action-toggle" v-if="canCollapse" @click.stop = "collapseHandler"></a>
        <a href="javascript:void(0)" class="panel-action panel-action-dismiss" v-if="canClose"  @click.stop = "closeHandler"></a>
      </div>

      <slot></slot>
      <chp-ink-ripple></chp-ink-ripple>
    </header>

</template>

<script>
  export default{
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
        }
    },
    computed:{
      classes(){
          return {
              'panel-heading-transparent' : this.isTransparent
          }
      }
    },
    methods:{
        closeHandler(){
            this.$emit("close");
        },
        collapseHandler(){
            this.$emit("collapse");
        }
    }
  }

</script>

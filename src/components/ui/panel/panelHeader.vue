<template>
    <header class="panel-heading" :class="{panel-heading-transparent : isTransparent}">
      <div class="panel-actions">
        <a href="javascript:void(0)" class="panel-action panel-action-toggle" v-if="canCollapse" @click.stop = "collapseHandler"></a>
        <a href="javascript:void(0)" class="panel-action panel-action-dismiss" v-if="canClose"  @click.stop = "closeHandler"></a>
      </div>
      <h2>
        <slot name="title"></slot>
      </h2>
      <p class="panel-subtitle">
        <slot name="subTitle"></slot>
      </p>
      <chp-ink-ripple></chp-ink-ripple>
    </header>

</template>

<script>
  export default{
    name: 'chp-panel',
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
    methods:{
        closeHandler(){
            this.$emit("close");
        },
        collapseHandler(){
            this.$emit("collapse");
        }
    },
    mounted:{

    }
  }

</script>

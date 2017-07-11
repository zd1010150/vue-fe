<template>
  <div class="tab-pane" :class = "{'active' : isActive}">
    <slot></slot>

  </div>
</template>
<script>
  export default{
      name:"chp-tab-content",

      computed:{
        isActive () {

          return (!_.isNull(this.id)) && this.$parent.value === this.id
        }
      },
      props: {
        href: {
          type: String
        },
        id: {}
      }
  }
</script>

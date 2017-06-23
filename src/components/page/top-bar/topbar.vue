<template lang="html">
  <div>
    <div class="logo-container">
      <chp-button></chp-button>
      <div class="visible-xs toggle-sidebar-left" data-toggle-class="sidebar-left-opened" data-target="html"
           data-fire-event="sidebar-left-opened">
        <i class="fa fa-bars" aria-label="Toggle sidebar"></i>
      </div>
    </div>
    <chp-header-right></chp-header-right>


  </div>

</template>
<script>
  import chpHeaderRight from './headerRight.vue'
  export default{
    components: {
      chpHeaderRight: chpHeaderRight
    },
    name: "chpTopBar"

  }

</script>


<style lang="css">
</style>

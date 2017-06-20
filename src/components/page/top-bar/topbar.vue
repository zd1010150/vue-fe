<template lang="html">
  <div>
    <div class="logo-container">
      <a href="../" class="logo">
        <img src="assets/images/logo-default.png" width="75" height="35" alt="Porto Admin">
      </a>
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

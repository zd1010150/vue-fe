<template>
  <section class="body-sign">
    <div class="center-sign">
      <slot name="content"></slot>
    </div>
  </section>
</template>
<script>
  export default {
    name: 'log-layout'
  }
</script>
<style lang="scss">
  .body-sign {
    .panel-sign {
      .panel-heading {
        padding: 0px;
      }
    }
  }

  html .panel.panel-sign .panel-heading-transparent + .panel-body {
    border-radius: 5px 0 5px 5px;
  }
</style>

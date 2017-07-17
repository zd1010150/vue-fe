<template>


    <md-speed-dial md-open="hover" md-direction="bottom" class="md-fab-top-left" md-theme="light-blue">
        <md-button class="md-fab" md-fab-trigger>
          <md-icon md-icon-morph></md-icon>
          <md-icon>add</md-icon>
        </md-button>

        <md-button class="md-fab md-primary md-mini md-clean">
          <md-icon>note_add</md-icon>
        </md-button>

        <md-button class="md-fab md-primary md-mini md-clean">
          <md-icon>alarm_add</md-icon>
        </md-button>
    </md-speed-dial>

</template>
<script>
  export default{
    name:"dashboard"
  }
</script>

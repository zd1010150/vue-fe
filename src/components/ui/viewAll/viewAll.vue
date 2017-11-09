<template>
  <a class="pull-right" :href="href">
    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
    <chp-ink-ripple></chp-ink-ripple>
    <chp-tooltip> {{ $t('ui.button.viewAll') }}</chp-tooltip>
  </a>
</template>
<script>
  export default {
    props: {
      href: String
    }
  }
</script>

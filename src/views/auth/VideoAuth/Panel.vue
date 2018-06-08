<template>
  <section class="panel">
    <header class="panel-heading">
      {{ title }}
    </header>
    <div class="panel-body">
      <slot name="body"></slot>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'auth-panel',
    data () {
      return {
        isOpen: true
      }
    },
    mounted () {
      this.initPanel()
    },
    methods: {
      initPanel () {
        console.log('init panel')
      }
    },
    props: {
      title: {
        type: String,
        required: true
      }
    }
  }
</script>
<style lang="less">
</style>

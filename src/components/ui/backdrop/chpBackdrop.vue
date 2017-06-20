<template>
  <div class="chp-backdrop" @click="close" @keyup.esc="close"></div>
</template>

<style lang="scss" src="./chpBackdrop.scss"></style>

<script>
  export default {
    methods: {
      close() {
        this.$emit('close');
      }
    }
  };
</script>

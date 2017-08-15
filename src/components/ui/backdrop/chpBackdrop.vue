<template>
  <div class="chp-backdrop" @click="close" @keyup.esc="close"></div>
</template>

<style lang="scss" src="./chpBackdrop.scss"></style>

<script>
  export default {
  	data(){
  		return{
  			oldOverflow:""
  		}
  	},
    methods: {
      close() {
      	// window.document.body.style.over = this.oldOverflow
        this.$emit('close');
      }
    },
    mounted(){
    	// this.oldOverflow = window.document.body.style.overflow
    	// window.document.body.style.overflow = "hidden"
    }
  };
</script>

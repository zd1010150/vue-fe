<template>
  <chp-main-layout>
    <div slot="content-body" class="content-wrapper">
        <transition name="slide-fade" mode="out-in">
          <router-view></router-view>
        </transition>
   </div>
  </chp-main-layout>
</template>
<script>
  export default{}
</script>
<style lang="less">
  .content-wrapper{
  	& > .container-fluid{
		padding-right:0px;
		padding-left: 0px;
  	}
  }
</style>

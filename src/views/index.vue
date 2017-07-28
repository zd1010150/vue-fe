<template>
  <chp-main-layout>
    <div slot="content-body">
        <transition name="slide-fade" mode="out-in">
          <router-view></router-view>
        </transition>
   </div>
  </chp-main-layout>
</template>
<script>



  export default{

    
  }
</script>
<style lang="less">
  
</style>

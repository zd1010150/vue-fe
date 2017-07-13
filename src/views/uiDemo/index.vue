<template>
  <chp-main-layout>
    <div class="row" slot="content-body">
      <ul>
        <li>
          <router-link to="/uiDemo/ui-component" >ui-component</router-link>
        </li>
        <li>
          <router-link to="/uiDemo/form-validate" >form-validate</router-link>
        </li>
      </ul>
        <transition name="slide-fade" mode="out-in">
          <router-view></router-view>
        </transition>
   </div>
  </chp-main-layout>
</template>
<script>



  export default{
    data(){
        return {
          transitionName:"slide"
        }
    },
    watch: {
      '$route' (to, from) {
          console.log(to.path,from.path);
      }
    }
  }
</script>
<style lang="less">
  @import "~assets/less/transition.less";
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition:  @swift-ease-in;
  }
  .slide-fade-leave-active {
    transition:  @swift-ease-out;
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for <2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>

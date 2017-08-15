<template>
  <chp-main-layout >
    <div slot="content-body" class="content-wrapper" :class="{'loading-overlay-showing':isLoading}">
        <transition name="slide-fade" mode="out-in">
          <router-view v-if="begainRouter"></router-view>
        </transition>
        <div class="loading-overlay page-loading" >
          <div class="bounce-loader">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
          </div>
        </div>
   </div>
  </chp-main-layout>
</template>
<script>
  export default{
    data(){
      return {
        isLoading : false,
        begainRouter:false
      }
    },
   async created(){
      //做一些初始化工作，拿一些数据
      console.log("====");
      let self = this
      this.isLoading = true
      Promise.all([await this.$store.dispatch("getMT4Accounts"),await this.$store.dispatch("getLeverage")]).then(function(){
        self.isLoading = false
        self.begainRouter = true
      })
    },
    watch:{
      $route(val, oldVal){
        console.log(val,"index");
      }
    }
  }
</script>
<style lang="less">
  .content-wrapper{
  	& > .container-fluid{
		padding-right:0px;
		padding-left: 0px;
  	}
    position: relative;
  }
  .page-loading{
    position:fixed;

    z-index:9999999;
  }
</style>

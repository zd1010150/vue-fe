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
   <div slot="footer" v-html="$store.state.terms[$store.state.language]" class="page-footer pt-lg mt-lg">
     
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
      let self = this
      this.isLoading = true
      Promise.all([await this.fetchMt4(),await this.fetchConfig()]).then(function(){
        self.isLoading = false
        self.begainRouter = true
      })
    },
    methods:{
      async fetchMt4(){
        return await this.$store.dispatch("getMT4Accounts")
      },
      async fetchConfig(){
        return await this.$store.dispatch("getLeverageAndTerms")
      }
    },
    watch:{
      "$store.state.language" (val){
        this.terms = this.$store.state.terms[val]
      }
    }
  }
</script>
<style lang="less">
.content-wrapper{
    min-height: ~"calc(100vh - 256px)";
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
  .page-footer{
    border-top:1px solid #666;
  }
</style>

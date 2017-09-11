<template>
  <div class="method  center-block" :class="{active:isActive}">
    <div class="method-bg" @click="chosePaymentMethods">
      <img :src="bgUrl" alt="" class="">
    </div>
    <div class="method-title">{{title}}</div>
  </div>
</template>
<script>
  export default{
      props:{
          isActive :{
              type:Boolean,
              default:false
          },
          value: {
              type:String,
              required:true
          },
          bgUrl:{
              type:String
          },
          title:{
              type:String
          },
          methodCode:{
            type:String,
            required:true
          }
      },
      methods:{
        chosePaymentMethods(){
          this.$emit('chosePaymentMethod',this.value,this.methodCode);
        }
      }
  }
</script>
<style lang="less">
  @import "~assets/less/variable.less";

  .method{
    display:table-cell;
    &.active{
      .method-bg{
        background-color: @light-component-accent-bg-color;
        
      }
    }
      .method-bg{
        width:114px;
        height:114px;
        border-radius: 50%;
        position:relative;
        background-color:@light-component-bg-color;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
      img{
        vertical-align: middle;
        &.doku{
         width:36px;
       }
      }
    }
    .method-title{
      width: 100%;
      margin:15px auto;
      text-align: center;
    }
  }
  html.dark{
    .method{
      .method-bg{
        background-color: @dark-component-border-color;
      }
      &.active{
        .method-bg{
          background-color: @dark-component-accent-bg-color;
        }
      }
    }
  }
</style>

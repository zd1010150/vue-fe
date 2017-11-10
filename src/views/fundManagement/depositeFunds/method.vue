<template>
  <div class="method  center-block mb-lg" :class="{active:isActive}">
    <div class="method-bg " :class="classes" @click="chosePaymentMethods">
      <img :src="bgUrl" alt="" class="">
    </div>
    <h5 class="method-title" :class="{'text-dark' : isActive}">{{title}}</h5>
  </div>
</template>
<script>
  export default {
    props: {
      isActive: {
        type: Boolean,
        default: false
      },
      value: {
        type: String,
        required: true
      },
      bgUrl: {
        type: String
      },
      title: {
        type: String
      },
      type: {
        typs: String
      }
    },
    methods: {
      chosePaymentMethods () {
        this.$emit('chosePaymentMethod', this.value, this.type)
      }
    },
    computed: {
      classes () {
        return this.isActive ? 'mu-paper mu-paper-circle mu-paper-round mu-paper-3' : ''
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "~assets/less/variable.less";

  .method {
    display: table;
    width: 80%;
    &.active {
      .method-bg {
        background-color: @light-component-accent-bg-color;
      }
    }
    .method-bg {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      position: relative;
      background-color: @light-component-bg-color;
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      img {
        vertical-align: middle;
        width: 50px;

      }
    }
    .method-title {
      display: table-cell;
      vertical-align: middle;
      text-align: left;
      padding-left: 10px;
    }
  }

  html.dark {
    h5 {
      color: inherit;
    }
    .method {
      .method-bg {
        background-color: @dark-component-border-color;
      }
      &.active {
        .method-bg {
          background-color: #ffffff;

        }
      }
    }
  }
</style>

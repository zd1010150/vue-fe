<i18n src="./i18n.yaml"></i18n>
<template>
  <div class="panel-body sidebar-profile">
    <div class="widget-summary widget-summary-xlg">
      <div class="widget-summary-col widget-summary-col-icon">
        <mu-avatar src="static/images/xx.jpg" slot="avatar" :size="80" class="summary-icon bg-primary"/>
      </div>
      <div class="widget-summary-col">
        <div class="summary">
          <h4 class="title">{{ $t('hello')}}</h4>
          <div class="info">
            <strong class="username">{{$store.state.userInfo.name}}</strong>
          </div>
        </div>
        <div class="summary-footer">
          <router-link to="" class="text-muted">{{ $t('viewProfile') }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
      name :"leftSideBarProfile"
  }
</script>
<style lang="less">
@import "~assets/less/variable.less";

  .sidebar-profile.panel-body{

    .widget-summary{
       .summary-footer{

        border-top:1px solid @blue-color;
      }
    }

  }
</style>

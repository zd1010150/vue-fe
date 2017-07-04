<template>
  <div class="panel-body sidebar-profile">
    <div class="widget-summary widget-summary-xlg">
      <div class="widget-summary-col widget-summary-col-icon">
        <mu-avatar src="static/images/xx.png" slot="avatar" :size="80" class="summary-icon bg-primary"/>
      </div>
      <div class="widget-summary-col">
        <div class="summary">
          <h4 class="title">Hello</h4>
          <div class="info">
            <strong class="username">中国名字有多</strong>
          </div>
        </div>
        <div class="summary-footer">
          <a class="text-muted">(view profile)</a>
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

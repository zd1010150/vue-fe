<i18n src="./i18n.yaml"></i18n>
<template>
  <div class="panel-body sidebar-profile">
    <div class="widget-summary widget-summary-xlg">
      <div class="widget-summary-col widget-summary-col-icon">
      
         <chp-file-upload name="document" :extensions="['png','bmp','jpg','jpeg']"  :post-action="postAction" @input="inputFunction" >
          <mu-avatar :src="$store.state.userInfo.avatar"  :size="80" class="summary-icon bg-primary"/>
        </chp-file-upload>
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
  import { UPLOAD_DOCUMENT_URL } from "src/config/url.config.js"
  export default{
      name :"leftSideBarProfile",
      data(){
        return {
          postAction : UPLOAD_DOCUMENT_URL+"/avatar"
        }
      },
      methods:{
        inputFunction(response,success,errors){
          console.log(response);
          let {status_code,message,data} = response[0].response;
          if(status_code != 0){
            this.toastr.error(this.$t("info."+message));
          }else{
            this.$store.state.userInfo.avatar = data.url;
          }
          
        },
        changeAvatar(){

        }
    }
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

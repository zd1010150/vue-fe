<i18n src="./i18n.yaml"></i18n>
<template>
  <div class="sidebar-widget widget-tasks">
    <div class="widget-header">
      <h6> {{ $t('contactUs') }} </h6>
    </div>
    <div class="widget-content">
      <a  v-if="$i18n.locale == 'zh'"
          class="mb-xs mt-xs mr-xs btn btn-default btn-block"
          target="_blank" 
          href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDA5NzY1MV8zMjQ1ODJfODAwMDk3NjUxXzJf">
        <i class="fa fa-qq"></i>
        {{ $t('QQ') }}
      </a>

      <a  class="mb-xs mt-xs mr-xs btn btn-default btn-block" 
          target="_blank"
          href="https://secure.livechatinc.com/licence/4905761/open_chat.cgi">
        <i class="fa fa-comments-o"></i>
        Live Chat
      </a>
      <a class="mb-xs mt-xs mr-xs btn btn-default btn-block" 
                  :href="commonQuestion[$i18n.locale]"
                  target="_blank"
                  >
        <i class="fa fa-quora"></i>
        {{ $t('commonQuestion') }} 
      </a>
    </div>
  </div>
</template>
<script>
  import { COMMON_QUESTION } from "src/config/url.config.js"
export default{
  data(){
    return {
      commonQuestion : COMMON_QUESTION
    }
  }
}
</script>
<tyle lang="less">
  .leftsidebar-contact{
    height:107px;
  }
</tyle>

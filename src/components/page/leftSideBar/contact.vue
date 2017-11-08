<i18n src="./i18n.yaml"></i18n>
<template>
  <div class="sidebar-widget widget-tasks">
    <div class="widget-header">
      <h6> {{ $t('contactUs') }} </h6>
    </div>
    <div class="widget-content">
      <a v-if="$i18n.locale == 'zh'"
         class="mb-xs mt-xs mr-xs btn btn-default btn-block"
         target="_blank"
         :href="externalUrl.qq">
        <i class="fa fa-qq"></i>
        {{ $t('QQ') }}
      </a>

      <a class="mb-xs mt-xs mr-xs btn btn-default btn-block"
         target="_blank"
         :href="externalUrl.livechat">
        <i class="fa fa-comments-o"></i>
        {{ $t('liveChat')}}
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
  import { COMMON_QUESTION, EXTERNAL_URL } from 'src/config/url.config.js'

  export default {
    data () {
      return {
        commonQuestion: COMMON_QUESTION,
        externalUrl: EXTERNAL_URL
      }
    }
  }
</script>
<tyle lang="less">
  .leftsidebar-contact{
  height:107px;
  }
</tyle>

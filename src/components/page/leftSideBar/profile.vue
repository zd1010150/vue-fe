<i18n src="./i18n.yaml"></i18n>
<template>
  <div class="panel-body sidebar-profile">
    <div class="widget-summary widget-summary-xlg">
      <div class="widget-summary-col widget-summary-col-icon">
        <chp-file-upload name="document" :extensions="['png','bmp','jpg','jpeg']" :post-action="postAction"
                         @input="inputFunction">
          <mu-avatar :src="$store.state.userInfo.avatar" :size="100" class="summary-icon bg-primary"
                     imgClass="avatar-img"/>
        </chp-file-upload>
      </div>
      <div class="widget-summary-col">
        <div class="summary">
          <div class="info">
            {{ $t('hello')}}
          </div>
          <h4 class="title"> {{$store.state.userInfo.name}} </h4>
        </div>
        <div class="summary-footer">
          <router-link to="/setting" class="text-muted pull-right">{{ $t('viewProfile') }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { UPLOAD_DOCUMENT_URL } from 'src/config/url.config'
  import { SET_USERINFO } from 'store/mutation-types'

  export default {
    name: 'leftSideBarProfile',
    data () {
      return {
        postAction: UPLOAD_DOCUMENT_URL + '/avatar'
      }
    },
    methods: {
      inputFunction (response, isAllsuccess, errors) {
        if (isAllsuccess) {
          this.$store.commit(SET_USERINFO, Object.assign({}, this.$store.state.userInfo, {avatar: response[0].data.url}))
        } else {
          this.toastr.error(this.$t('info.UPLOAD_ERROR.' + errors[0]))
        }
      }
    }
  }
</script>
<style lang="less">
  @import "~assets/less/variable.less";

  .sidebar-profile.panel-body {
    .avatar-img {
      border: 4px solid #fff;
      border-radius: 50px;
    }
    .widget-summary {
      .summary-footer {
        border-top: 1px solid @blue-color;
      }
    }

  }
</style>

<template>  
  <div class="topbar row">
    <div class="title col-sm-6">账户认证</div>
    <div class="col-sm-6 text-right">
      <a
        class="mb-xs mt-xs mr-xs btn btn-default"
        target="_blank"
        :href="externalUrl.qq"
      >
        <i class="fa fa-qq"></i>
        在线QQ
      </a>
      <a
        class="mb-xs mt-xs mr-xs btn btn-default"
        target="_blank"
        :href="externalUrl.livechat"
      >
        <i class="fa fa-comments-o"></i>
        在线聊天
      </a>
      <div id="userbox" class="userbox" :class="{opened:open}">
        <chp-button class="userbox-toggle-btn" @click="toggleOperationPopover" ref="toggleBtn">
          <figure class="profile-picture">
            <mu-avatar :src="$store.state.userInfo.avatar" slot="avatar" :size="35" class="summary-icon bg-primary "/>
          </figure>
          <div class="profile-info">
            <span class="name word-wrap">{{ $store.state.userInfo.name}}</span>
          </div>
          <i class="fa custom-caret"></i>
          <chp-tooltip chp-direction="bottom">{{ $store.state.userInfo.name}}</chp-tooltip>
        </chp-button>
        <mu-popover :trigger="trigger" :open="open" @close="handleClose" popoverClass="userbox-dropdown-menu">
          <ul class="list-unstyled">
            <li class="divider"></li>
            <li>
              <a role="menuitem" tabindex="-1" href="javascript:void(0)" class="logout-item" @click="logout">
                <i class="fa fa-power-off"></i>
                {{ $t('userbox.logout') }}
              </a>
            </li>
            <li class="divider"></li>
          </ul>
        </mu-popover>
        <chp-dialog-confirm
          :chp-content-html="$t('logoutDialogHtml')"
          :chp-ok-text="$t('ui.button.confirm')"
          :chp-cancel-text="$t('ui.button.cancel')"
          @close="confirmLogout"
          ref="confirmLogoutDialog">
        </chp-dialog-confirm>
      </div>
    </div>
  </div>
</template>
<script>
  import { EXTERNAL_URL } from 'src/config/url.config.js'
  import { SET_TOKEN, SET_USERINFO } from 'store/mutation-types.js'
  
  export default {
    data () {
      return {
        externalUrl: EXTERNAL_URL,
        open: false,
        trigger: null
      }
    },
    mounted: function () {
      this.trigger = this.$refs.toggleBtn.$el
    },
    methods: {
      confirmLogout (val) {
        if (val === 'ok') {
          this.$store.dispatch('logout').then(() => {
            this.$store.commit(SET_USERINFO, null)
            this.$store.commit(SET_TOKEN, null)
            this.$router.replace('/login')
          })
        }
      },
      logout () {
        this.$refs.confirmLogoutDialog.open()
      },
      handleClose () {
        this.open = false
      },
      toggleOperationPopover () {
        this.open = !this.open
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "~assets/less/variable.less";
  
  .topbar {
    border-bottom: 2px solid #303138;
  }

  .title {
    font-size: 2rem;
    line-height: 56px;
    color: #fff;
    padding-left: 35px;
  }

  @media (max-width: @screen-sm-min) {
    .panel {
      font-size: 1.1rem;
    }
  }
</style>

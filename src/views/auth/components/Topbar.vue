<i18n src="../../../components/page/topBar/i18n.yaml"></i18n>
<template>  
  <div class="topbar row">
    <div class="title responsive col-sm-3">账户认证</div>
    <div class="btns responsive col-sm-9 text-right clearfix">
      <div class="mobileTitle">账户认证</div>
      <a
        class="mr-sm btn btn-default externalBtn responsive"
        target="_blank"
        :href="externalUrl.qq"
      >
        <i class="fa fa-qq"></i>
        <span>在线QQ</span>
      </a>
      <a
        class="btn btn-default externalBtn responsive"
        target="_blank"
        :href="externalUrl.livechat"
      >
        <i class="fa fa-comments-o"></i>
        <span>在线聊天</span>
      </a>
      <div id="userbox" class="userbox responsive" :class="{opened:open}">
        <chp-button class="userbox-toggle-btn" @click="toggleOperationPopover" ref="toggleBtn">
          <figure class="profile-picture">
            <mu-avatar :src="$store.state.userInfo.avatar" slot="avatar" :size="30" class="summary-icon bg-primary "/>
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
<style lang="less">
  @import "~assets/less/variable.less";

  html {
    .mobileTitle {
      color: @light-font-bright-color
    }

    &.dark {
      .mobileTitle {
        color: @light-color
      }
    }    
  }

  .mobileTitle {
    font-size: 1.4em;
    display: none;
    position: absolute;
    left: 50%;
    margin-left: -35px;
    top: 15px;
  }

  @media (max-width: @screen-sm-min) {
    .title.responsive {
      display: none;
    }
    
    .btns.responsive {
      padding: 1em 2em;
      position: relative;

      .mobileTitle {
        display: block;
      }

      .externalBtn.responsive,
      .externalBtn.responsive:active {
        border-radius: 50%;
        height: 30px;
        width: 30px;
        padding: 3px 0 0;
        border-color: #fff;

        > span {
          display: none;
        }
      }

      .userbox {
        .userbox-toggle-btn {
          height: 30px;
          padding: 0;
          text-align: left;
        }

        .profile-picture {
          margin-right: 5px;
          height: 100%;

          img {
            width: 100%;
          }
        }

        .custom-caret {
          vertical-align: middle;
        }
      }
    }    
  }
</style>
<style lang="less" scoped>
  @import "~assets/less/variable.less";
  
  html {
    .title {
      color: @light-font-bright-color
    }
    .topbar {
      border-bottom: 2px solid #dadada;
    }

    &.dark {
      .title {
        color: @light-color
      }
      .topbar {
        border-bottom: 2px solid #303138;
      }
    }    
  }  

  .title {
    font-size: 2rem;
    line-height: 56px;
    padding-left: 35px;
  }

  @media (max-width: @screen-sm-min) {
    .panel {
      font-size: 1.1rem;
    }    
  }
</style>

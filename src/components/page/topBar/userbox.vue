<i18n src="./i18n.yaml"></i18n>
<template>
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
          <a role="menuitem" tabindex="-1" href="#/setting">
            <i class="fa fa-user"></i>
            {{ $t('userbox.myProfile') }}
          </a>
        </li>
        <li>
          <a role="menuitem" tabindex="-1" href="#/changePassword">
            <i class="fa fa-lock"></i>
            {{ $t('userbox.modifyPassword') }}
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" @click="changeTheme('dark')" class="color-item">
            <mu-radio name="theme" nativeValue="dark" v-model="theme" slot="left" @change="changeTheme"
                      class="item-icon"/>
            <span class="item-title">{{$t('themes.dark')}}</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" @click="changeTheme('light')" class="color-item">
            <mu-radio name="theme" nativeValue="light" v-model="theme" slot="left" @change="changeTheme"
                      class="item-icon"/>
            <span class="item-title">{{$t('themes.light')}}</span>
          </a>
        </li>
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
</template>
<script>
  import changeTheme from 'utils/theme.js'
  import { SET_THEME, SET_TOKEN, SET_USERINFO } from 'store/mutation-types.js'

  export default {
    data () {
      return {
        open: false,
        trigger: null
      }
    },
    computed: {
      theme: {
        set (theme) {
          this.$store.commit(SET_THEME, theme)
        },
        get () {
          return this.$store.state.theme
        }
      }
    },
    mounted () {
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
      changeTheme (theme) {
        this.theme = theme
        changeTheme(theme)
      },
      toggleOperationPopover () {
        this.open = !this.open
      },
      handleClose () {
        this.open = false
      }
    }
  }
</script>
<style lang="less">
  @import "~assets/less/variable.less";
  @import "~assets/less/transition.less";

  .hidden {
    display: none;
  }

  .userbox {
    width: 200px;
    i {
      transition: @arrow-rotate-transition;
    }
    &.opened i {
      transform: rotate(180deg) translate3D(0, 0, 0);
    }
    .userbox-toggle-btn {
      height: 57px;
      padding-left: 10px;
      padding-right: 10px;
      width: 100%;
      background-color: transparent;
      &.hover {
        background-color: transparent;
      }
    }
    .profile-picture {
      display: inline-block;
      margin: 0px 10px 0px;

    }
    .profile-info {
      margin: 0px;
      display: inline-block;
      text-align: left;
      .name {
        .text-line-no-wrap(1, 1.3rem, 85px);
        width: 50px;
        max-width: 50px;
      }
    }
    .fa {
      width: 10px;
      margin: 0px 0px 0px 10px;
    }
  }

  .mu-popover.userbox-dropdown-menu {
    padding: 10px;
    width: 180px;
    .item-icon {
      margin-right: 13px;
      margin-bottom: 0px;
    }
    .color-item {
      padding: 5px 15px;
    }
    .logout-item {
      padding-left: 18px;
    }
    a:hover {
      background-color: @blue-color;
      color: @light-reverse-font-color;
      text-decoration: none;
    }
    a:not(.color-item) {
      i {
        padding: 2px 0px;
      }
    }
  }

  @media only screen and (max-width: 767px) {
    .userbox {
      width: 140px;
      margin-top: 0px;
      margin-left: 0px;
      .userbox-toggle-btn {
        padding: 5px 0px 0px;
      }
      .profile-picture {
        margin: 0px;
      }

      .fa {
        display: inline-block;
        margin: 0px;
      }
      &:after {
        height: 78px;
        display: none;
      }

    }

    .mu-popover.userbox-dropdown-menu {
      width: 135px;
      margin-left: 0px;
      margin-top: 4px;
      a {
        padding: 5px 10px;
      }

      .logout-item {
        padding: 5px 8px;
      }
      .color-item {
        padding: 5px 5px;
      }
      i {
        margin-right: 3px;
      }
      .item-icon {
        margin-right: 0px;
        margin-bottom: 0px;
      }
    }
  }
</style>

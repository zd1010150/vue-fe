<i18n src="./i18n.yaml">




</i18n>
<template>
  <div class="header-right">
    <span class="separator"></span>

    <ul class="notifications">
      <li>
        <a href="#" class="dropdown-toggle notification-icon" data-toggle="dropdown">
          <i class="fa fa-tasks"></i>
          <span class="badge">3</span>
        </a>

        <div class="dropdown-menu notification-menu large">
          <div class="notification-title">
            <span class="pull-right label label-default">3</span>
            Tasks
          </div>

          <div class="content">
            <ul>
              <li>
                <p class="clearfix mb-xs">
                  <span class="message pull-left">Generating Sales Report</span>
                  <span class="message pull-right text-dark">60%</span>
                </p>
                <div class="progress progress-xs light">
                  <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                       style="width: 60%;"></div>
                </div>
              </li>

              <li>
                <p class="clearfix mb-xs">
                  <span class="message pull-left">Importing Contacts</span>
                  <span class="message pull-right text-dark">98%</span>
                </p>
                <div class="progress progress-xs light">
                  <div class="progress-bar" role="progressbar" aria-valuenow="98" aria-valuemin="0" aria-valuemax="100"
                       style="width: 98%;"></div>
                </div>
              </li>

              <li>
                <p class="clearfix mb-xs">
                  <span class="message pull-left">Uploading something big</span>
                  <span class="message pull-right text-dark">33%</span>
                </p>
                <div class="progress progress-xs light mb-xs">
                  <div class="progress-bar" role="progressbar" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100"
                       style="width: 33%;"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </li>
      <li>
        <a href="#" class="dropdown-toggle notification-icon" data-toggle="dropdown">
          <i class="fa fa-envelope"></i>
          <span class="badge">4</span>
        </a>

        <div class="dropdown-menu notification-menu">
          <div class="notification-title">
            <span class="pull-right label label-default">230</span>
            Messages
          </div>

          <div class="content">
            <ul>
              <li>
                <a href="#" class="clearfix">
                  <figure class="image">
                    <img src="assets/images/!sample-user.jpg" alt="Joseph Doe Junior" class="img-circle">
                  </figure>
                  <span class="title">Joseph Doe</span>
                  <span class="message">Lorem ipsum dolor sit.</span>
                </a>
              </li>
              <li>
                <a href="#" class="clearfix">
                  <figure class="image">
                    <img src="assets/images/!sample-user.jpg" alt="Joseph Junior" class="img-circle">
                  </figure>
                  <span class="title">Joseph Junior</span>
                  <span class="message truncate">Truncated message. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacinia orci. Proin vestibulum eget risus non luctus. Nunc cursus lacinia lacinia. Nulla molestie malesuada est ac tincidunt. Quisque eget convallis diam, nec venenatis risus. Vestibulum blandit faucibus est et malesuada. Sed interdum cursus dui nec venenatis. Pellentesque non nisi lobortis, rutrum eros ut, convallis nisi. Sed tellus turpis, dignissim sit amet tristique quis, pretium id est. Sed aliquam diam diam, sit amet faucibus tellus ultricies eu. Aliquam lacinia nibh a metus bibendum, eu commodo eros commodo. Sed commodo molestie elit, a molestie lacus porttitor id. Donec facilisis varius sapien, ac fringilla velit porttitor et. Nam tincidunt gravida dui, sed pharetra odio pharetra nec. Duis consectetur venenatis pharetra. Vestibulum egestas nisi quis elementum elementum.</span>
                </a>
              </li>
              <li>
                <a href="#" class="clearfix">
                  <figure class="image">
                    <img src="assets/images/!sample-user.jpg" alt="Joe Junior" class="img-circle">
                  </figure>
                  <span class="title">Joe Junior</span>
                  <span class="message">Lorem ipsum dolor sit.</span>
                </a>
              </li>
              <li>
                <a href="#" class="clearfix">
                  <figure class="image">
                    <img src="assets/images/!sample-user.jpg" alt="Joseph Junior" class="img-circle">
                  </figure>
                  <span class="title">usernameis :{{ username }}</span>
                  <span class="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacinia orci. Proin vestibulum eget risus non luctus. Nunc cursus lacinia lacinia. Nulla molestie malesuada est ac tincidunt. Quisque eget convallis diam.</span>
                </a>
              </li>
            </ul>

            <hr>

            <div class="text-right">
              <a href="#" class="view-more">View All</a>
            </div>
          </div>
        </div>
      </li>

    </ul>

    <span class="separator"></span>
    <chp-top-bar-language></chp-top-bar-language>
    <span class="separator"></span>
    <div id="userbox" class="userbox">

      <mu-list class="userbox-setting">
        <mu-list-item title="张丹丹丹" toggleNested :open="false" titleClass="username"
                      nestedListClass="userbox-operation-list">
          <mu-avatar slot="left" src="/static/images/xx.png"/>
          <mu-list-item title="My Photo" slot="nested">
            <mu-icon slot="left" value="perm_media"/>
          </mu-list-item>
          <mu-list-item title="Setting" slot="nested">
            <mu-icon slot="left" value="settings"/>
          </mu-list-item>

          <mu-list-item :title="$t('logout')" slot="nested" @click="logout">
            <mu-icon slot="left" value="power_settings_new"/>
          </mu-list-item>

          <mu-divider />
          <mu-list-item disableRipple @click="changeTheme('dark')" :title="$t('themes.dark')" slot="nested">
            <mu-radio  name="theme" nativeValue="dark" v-model="theme" slot="left" @change="changeTheme"/>
          </mu-list-item>
          <mu-list-item disableRipple @click="changeTheme('light')" :title="$t('themes.light')" slot="nested">
            <mu-radio  name="theme" nativeValue="light" v-model="theme" slot="left" @change="changeTheme"/>
          </mu-list-item>

        </mu-list-item>
      </mu-list>
    </div>
  </div>
</template>

<script>

  import {SET_THEME} from 'store/mutation-types.js'
  import ChpTopBarLanguage from './language.vue'

  import changeTheme  from 'utils/theme.js'

  export default {
    name: "chpTopBar",
    props: ["username"],
    components: {"chp-top-bar-language": ChpTopBarLanguage},
    data(){
      return {}
    },

    computed: {
      theme: {
        set(theme){
          this.$store.commit(SET_THEME, theme)
        },
        get(){
          return this.$store.state.theme
        }
      }
    },
    methods: {
      logout(){
//        this.$store.dispatch("logout").then(() => {
//          this.$router.push("/");
//        })
        alert("logout");
      },
      changeTheme (theme) {
        this.theme = theme
        changeTheme(theme)
      }
    },
    mounted(){



    }

  }
</script>
<style lang="less">
  @import "~lesshat/lesshat.less";

  .language-select {
    width: 110px;
    margin-right: 20px;
    .mu-text-field-help {
      top: 13px;
    }
  }
  .notifications {
    margin: 4px 0px 0px;
  }

  .userbox {
    display: inline-block;
    margin: 0px 17px 0px;

    .mu-item-title {
      font-size: 1.2rem;
    }

    .userbox-setting {
      overflow: visible;
      padding: 0px;
      .mu-item-content {
        .flex(none);
        width: 63px;
      }

      .userbox-operation-list {
        position: absolute;
        overflow: visible;
        padding: 8px 0px 0px;
        .mu-item-content {
          .flex(1);
          width: auto;
        }
        .mu-item {
          padding: 16px 0px;
        }
        .mu-item-wrapper {

          &>div{
            margin-left: 0px !important;
          }

          .show-left {
            padding-left: 60px;
          }

        }
      }
    }
  }
</style>

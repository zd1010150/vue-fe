<i18n>
  en:
    topbar:
      theme: Theme
      language: Language
      changeLanguage: Change Language
      changeTheme: Change Theme
    languages:
      english: english
      chinese: chinese
    themes:
      dark: dark
      light: light
  zh:
    topbar:
      theme: 主题
      language: 语言
      changeLanguage: 更改语言
      changeTheme: 更改主题
    languages:
      english: 英语
      chinese: 普通话
    themes:
      dark: 深色
      light: 浅色
</i18n>
<template>
  <div class="header-right">


    <span class="separator"></span>

    usernameis :{{ username }}
    <button v-on:click="logout">logout</button>

    <label for="language"> {{ $t("topbar.language") }}</label>

    <select class="form-control" name="movie" id="language" v-model="language">
      <option value="en">{{ $t("topbar.languages.english") }}</option>
      <option value="zh">{{ $t("topbar.languages.chinese") }}</option>
    </select>

    <label for="theme">{{ $t("topbar.theme")}}</label>
    <select name="movie" class="form-control" id="theme" v-model="theme">
      <option value="dark">{{ $t("topbar.themes.dark") }}</option>
      <option value="">{{ $t("topbar.themes.light") }}</option>
    </select>
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
                  <span class="title">Joseph Junior</span>
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
      <li>
        <a href="#" class="dropdown-toggle notification-icon" data-toggle="dropdown">
          <i class="fa fa-bell"></i>
          <span class="badge">3</span>
        </a>

        <div class="dropdown-menu notification-menu">
          <div class="notification-title">
            <span class="pull-right label label-default">3</span>
            Alerts
          </div>

          <div class="content">
            <ul>
              <li>
                <a href="#" class="clearfix">
                  <div class="image">
                    <i class="fa fa-thumbs-down bg-danger"></i>
                  </div>
                  <span class="title">Server is Down!</span>
                  <span class="message">Just now</span>
                </a>
              </li>
              <li>
                <a href="#" class="clearfix">
                  <div class="image">
                    <i class="fa fa-lock bg-warning"></i>
                  </div>
                  <span class="title">User Locked</span>
                  <span class="message">15 minutes ago</span>
                </a>
              </li>
              <li>
                <a href="#" class="clearfix">
                  <div class="image">
                    <i class="fa fa-signal bg-success"></i>
                  </div>
                  <span class="title">Connection Restaured</span>
                  <span class="message">10/10/2016</span>
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

    <div id="userbox" class="userbox">
      <chp-menu chp-align-trigger>
        <chp-button chp-menu-trigger class="user-box-trigger-btn">
           <figure class="profile-picture">
              <img src="assets/images/!logged-user.jpg" alt="Joseph Doe" class="img-circle"
                   data-lock-picture="assets/images/!logged-user.jpg">
            </figure>
            <div class="profile-info" data-lock-name="John Doe" data-lock-email="johndoe@okler.com">
              <span class="name">John Doe Junior</span>
              <span class="role">administrator</span>
            </div>

            <i class="fa custom-caret"></i>
        </chp-button>
        <chp-menu-content class="user-box-menu-content">
          <chp-menu-item href="#">
         <i class="fa fa-user"></i> My Profile

          </chp-menu-item>
          <chp-menu-item href="#">
            <i class="fa fa-lock"></i> Lock Screen
          </chp-menu-item>
          <chp-menu-item>
            <i class="fa fa-power-off"></i> Logout

          </chp-menu-item>
        </chp-menu-content>
      </chp-menu>
    </div>
  </div>
</template>

<script>
  import {SET_THEME, SET_LANGUAGE} from "store/mutation-types.js"
  export default {
    name: "chpHeaderRight",
    props: ["username"],
    data(){
      return {}
    },

    computed: {
      language: {
        set (newValue){

          this.$store.commit(SET_LANGUAGE, newValue)
          this.$i18n.locale = newValue;
        },
        get(){
          return this.$store.state.language;
        }

      },
      theme: {
        set(newValue){
          this.$store.commit(SET_THEME, newValue)
        },
        get(){
          return this.$store.state.theme
        }
      }
    },
    methods: {
      logout(){
        this.$store.dispatch("logout").then(() => {
          this.$router.push("/");
        })
      }
    }
  }
</script>
<style lang="scss">
  .userbox{
    .user-box-trigger-btn{
      background-color: transparent;
    }

  }
  .user-box-menu-content{
    width:203px;
    .chp-list-item-container{
      text-align: left;
    }
  }


</style>

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
<template lang="html">
  <div>
    usernameis :{{ username }}
    <button v-on:click="logout">logout</button>
    <md-input-container>
      <label for="language"> {{ $t("topbar.language") }}</label>
      
      <md-select name="movie" id="language" v-model="language">
        <md-option value="en">{{ $t("topbar.languages.english") }}</md-option>
        <md-option value="zh">{{ $t("topbar.languages.chinese") }}</md-option>
      </md-select>
    </md-input-container>
    <md-input-container>
      <label for="theme">{{ $t("topbar.theme")}}</label>
      <md-select name="movie" id="theme" v-model="theme">
        <md-option value="dark">{{ $t("topbar.themes.dark") }}</md-option>
        <md-option value="">{{ $t("topbar.themes.light") }}</md-option>
      </md-select>
    </md-input-container>
  </div>

</template>

<script>
  import {SET_THEME, SET_LANGUAGE} from "store/mutation-types.js"
  export default {
    name: "topbar",
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
          this.$store.commit(SET_THEME,newValue)
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

<style lang="css">
</style>

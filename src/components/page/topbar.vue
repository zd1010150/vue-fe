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

      <label for="language"> {{ $t("topbar.language") }}</label>

      <select name="movie" id="language" v-model="language">
        <option value="en">{{ $t("topbar.languages.english") }}</option>
        <option value="zh">{{ $t("topbar.languages.chinese") }}</option>
      </select>

      <label for="theme">{{ $t("topbar.theme")}}</label>
      <select name="movie" id="theme" v-model="theme">
        <option value="dark">{{ $t("topbar.themes.dark") }}</option>
        <option value="">{{ $t("topbar.themes.light") }}</option>
      </select>
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

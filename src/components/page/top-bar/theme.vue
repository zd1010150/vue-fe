<i18n src="./i18n.yaml"></i18n>
<template>
  <mu-select-field @change="changeTheme" class="language-select">
    <mu-menu-item value="light">
      <span slot="title"> {{ $t("themes.light") }}</span>
    </mu-menu-item>
    <mu-menu-item value="dark">
      <span slot="title">{{ $t("themes.dark") }}</span>
    </mu-menu-item>
  </mu-select-field>
</template>
<script>
  import light from 'components/ui/muse-ui/theme-light.less'
  import dark from 'components/ui/muse-ui/theme-dark.less'
  import {SET_THEME} from "store/mutation-types.js"
  export default {
    name: 'chpTopBarTheme',
    data () {
      return {
        themes: {
          light,
          dark
        }
      }
    },
    computed: {
      theme: {
        set(newValue){
          let $html = document.querySelector("html");
          $html.classList.toggle("dark", newValue == "dark");
          this.$store.commit(SET_THEME, newValue)
        },
        get(){
          return this.$store.state.theme
        }
      }
    },
    methods: {
      changeTheme (theme) {
        this.theme = theme
        const styleEl = this.getThemeStyle()
        styleEl.innerHTML = this.themes[theme] || ''
      },
      getThemeStyle () {
        const themeId = 'muse-theme'
        let styleEl = document.getElementById(themeId)
        if (styleEl) return styleEl
        styleEl = document.createElement('style')
        styleEl.id = themeId
        document.body.appendChild(styleEl)
        return styleEl
      }
    }
  }
</script>

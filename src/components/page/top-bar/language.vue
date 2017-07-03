<i18n>
"zh":
  "hello": "你好 component"
"en":
  "hello": "Hello component"
</i18n>
<template>

  <div class="toggle-language">
    <mu-icon-button ref="toggleLanguage" @click="togglePopover" class="toggle-language-btn">
      <mu-avatar src="/static/images/gb.svg" v-if ="language == 'en'" :size="30"/>
      <mu-avatar src="/static/images/cn.svg" v-else :size="30"/>
    </mu-icon-button>

    <mu-popover :trigger="trigger" ref="languagePopover" :open="open" @close="" :anchorOrigin='{"vertical":"top","horizontal":"left"}' :targetOrigin='{"vertical":"top","horizontal":"left"}'>
      <mu-list  @change="switchLanguage" @itemClick="togglePopover" class="language-list">
        <mu-list-item value="en">
          <mu-avatar src="/static/images/gb.svg" slot="leftAvatar" :size="30"/>
        </mu-list-item>
        <mu-list-item value="zh">
          <mu-avatar src="/static/images/cn.svg" slot="leftAvatar" :size="30"/>
        </mu-list-item>
      </mu-list>
    </mu-popover>


  </div>
</template>
<script>
  import {SET_LANGUAGE} from "store/mutation-types.js";
  import i18n from "src/i18n"
  export default{
    data(){
      return {
        trigger: null,
        open: false
      }
    },
    mounted(){
      this.trigger = this.$refs.toggleLanguage.$el;
    },
    computed: {

      selectedLanguageLabel(){
        return this.$t("language");
      },
      language: {
        set (newValue){

          this.$store.commit(SET_LANGUAGE, newValue)
          i18n.locale = newValue;
          /*console.log("newValue",this.$i18n.getLocaleMessage(newValue));
          this.$i18n.setLocaleMessage(newValue,this.$i18n.getLocaleMessage(newValue));*/
        },
        get(){
          return this.$store.state.language;
        }

      }
    },
    methods: {
      togglePopover(){
        this.open = !this.open;
      },
      switchLanguage(language){
          this.language = language;
      }
    }
  }
</script>
<style lang="less">
  .toggle-language {
    display: inline-block;
    height:48px;
    vertical-align: middle;
    .toggle-language-btn{
      padding:0px 12px;
      & > div{
          height:30px;
          }
    }

  }
  .language-list{
    width:65px;
  }
</style>

<i18n src="./i18n.yaml"></i18n>
<template>

  <div class="toggle-language">


    <mu-icon-button ref="toggleLanguage" @click="togglePopover">
      <mu-avatar src="/static/images/gb.svg"/>
    </mu-icon-button>

    <!--<mu-select-field @change="switchLanguage" :helpText= "selectedLanguageLabel" class="language-select" >
    <mu-menu-item value="en">
    <span slot="title"> {{ $t("languages.english") }}</span>
    </mu-menu-item>
    <mu-menu-item value="zh">
    <span slot="title">{{ $t("languages.chinese") }}</span>
    </mu-menu-item>
    </mu-select-field>-->
    <!--<mu-dropDown-menu :value="language" @change="switchLanguage">
        <mu-menu-item value="en">
          <mu-avatar src="/static/images/gb.svg" slot="leftAvatar"/>
        </mu-menu-item>
        <mu-menu-item value="zh">
          <mu-avatar src="/static/images/cn.svg" slot="leftAvatar"/>
        </mu-menu-item>
      </mu-dropDown-menu>-->
    <mu-popover :trigger="trigger" :open="open" @close="" :anchorOrigin='{"vertical":"top","horizontal":"left"}' :targetOrigin='{"vertical":"top","horizontal":"left"}'>
      <mu-list value="language" @change="switchLanguage">
        <mu-list-item value="en">
          <mu-avatar src="/static/images/gb.svg" slot="leftAvatar"/>
        </mu-list-item>
        <mu-list-item value="zh">
          <mu-avatar src="/static/images/cn.svg" slot="leftAvatar"/>
        </mu-list-item>
      </mu-list>
    </mu-popover>


  </div>
</template>
<script>
  import {SET_LANGUAGE} from "store/mutation-types.js";
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
          this.$i18n.locale = newValue;
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
  }
</style>


<template>
 <div class="toggle-language">
    <mu-icon-button ref="toggleLanguage" @click="togglePopover" class="toggle-language-btn">
      <mu-avatar src="/static/images/gb.svg" v-if ="language == 'en'" :size="30"/>
      <mu-avatar src="/static/images/cn.svg" v-else :size="30"/>
    </mu-icon-button>

    <mu-popover popoverClass="language-list-wrapper" :trigger="trigger" ref="languagePopover" :open="open" @close="handleClose" :anchorOrigin='{"vertical":"top","horizontal":"middle"}' :targetOrigin='{"vertical":"top","horizontal":"middle"}'>
      <mu-paper  :zDepth="1" class="paper-wrapper">
        <mu-list  @change="switchLanguage" @itemClick="togglePopover" class="language-list" :value="language">
          <mu-list-item value="en">
            <mu-avatar src="/static/images/gb.svg" slot="leftAvatar" :size="30"/>
          </mu-list-item>
          <mu-list-item value="zh" >
            <mu-avatar src="/static/images/cn.svg" slot="leftAvatar" :size="30"/>
          </mu-list-item>
        </mu-list>
      </mu-paper>
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
      },
      handleClose(){
          this.open = false;
      }
    }
  }
</script>
<style lang="less">
  @import "~assets/less/variable.less";
  .toggle-language {
    display: inline-block;
    height:30px;
    line-height: 30px;
    vertical-align: middle;
    .toggle-language-btn{
      width:30px;
      height:30px;
      display:inline-block;
    }
  }
  .mu-popover.language-list-wrapper{
    background-color: transparent;
    box-shadow: none;
    .paper-wrapper{
      position:relative;
      top:-12px;
      left:1px;
    }
  }
  .language-list{
    width:65px;
    padding:0px;
    .mu-item.selected{
      background-color: @blue-color;
    }
  }
  @media only screen and (max-width: 767px) {
    .header{
      .toggle-language{
        float:right;
        margin-right: 20px;
        margin-top:17px;
      }
    }
  }

</style>

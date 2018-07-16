<template>
  <chp-panel
    :canCollapse='false'
    :canClose='false'
    headerCls='compactHeader'
  >
    <template slot="panelTitle">
      <i class="fa fa-lightbulb-o lightOn" aria-hidden="true"></i>
      认证需求
    </template>
    <div slot="body">
      <div class="testimony" v-html="terms">
        
      </div>
      <div role="placeholder" class="mt-lg" />
      <BigFileUploader />
    </div>
  </chp-panel>
</template>
<script>
  import BigFileUploader from './BigFileUploader'
  import authenService from 'services/authenService'

  export default {
    data () {
      return {
        terms: ''
      }
    },
    components: {
      'BigFileUploader': BigFileUploader
    },
    methods: {
      async getVideoTerm () {
        let {success, data} = await authenService.getVideoAuthTerm()
        if (success) {
          this.terms = data.terms
        }
      }
    },
    mounted () {
      this.getVideoTerm()
    }
  }
</script>
<style lang="less" scoped>
  @import "~assets/less/variable.less";

  // For Themes
  html {
    .panel {
      color: @light-font-color;
    }

    &.dark {
      .panel {
        color: @light-color;
      }
    }
  }

  @media (max-width: @screen-sm-min) {
    .panel {
      font-size: 1.1rem;
    }
  }
</style>
<style lang="less">
  // TODO: Upgrade vueloader to 12.2+ will enable scoped deep selector.
  //       Now, we need a extra class to make it work
  //       Or have to find out why panel title DOM doesn't have scoped id like others
  @import "~assets/less/variable.less";

  .panel {
    .compactHeader {
      padding: 10px;

      .panel-actions,
      .panel-subtitle {
        display: none;
      }

      .panel-title {
        .lightOn {
          margin-right: 5px;
        }
      }
    }
  }

  .testimony {
    p {
      line-height: 2em;
      font-size: 1.1em;
    }

    span {
      text-decoration: underline;
      font-weight: 700;
    }

    .subtestimony {
      padding-left: 1.4em;
    }
  }

  @media (max-width: @screen-sm-min) {
    .panel {
      .compactHeader {
        .panel-title {
          font-size: 1.4rem;
        }
      }
    }
  }
</style>

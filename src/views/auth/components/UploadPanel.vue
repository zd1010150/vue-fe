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
      <div class="testimony">
        <p>1. 正面录制自己手持<span>身份证</span>和<span>出金银行卡</span></p>
        <p>2. 并且阅读以下条款：</p>
        <div class="subtestimony">
          <p>a. 本人同意并且接受ACY官网上面风险提示页面里面的所有风险</p>
          <p>b. 本人对自己的个人行为负责，在自愿和完全了解风险的前提下入金进行外汇保证金交易</p>
          <p>c. 本人使用自己的银行账户在自己授权的前提下入金进行外汇保证金交易</p>
          <p>d. 现申请把账户资金提取到本人的XXX银行（哪家银行）卡，尾号是XXXX（出金卡最后四位数），请ACY稀万予以审核</p>
          <p>e. 本人愿意承担在出金过程中，通过银行及支付公司转账出现的任何法律风险</p>
        </div>        
      </div>
      <div role="placeholder" class="mt-lg" />
      <BigFileUploader />
    </div>
  </chp-panel>
</template>
<script>
  import BigFileUploader from './BigFileUploader'

  export default {
    components: {
      'BigFileUploader': BigFileUploader
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

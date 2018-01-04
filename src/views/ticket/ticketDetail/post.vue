<i18n src="../i18n.yaml"></i18n>
<template>
  <li class="post clearfix " :class="{'right-post' : authorId == $store.state.userInfo.id }">
    <div class="avator">
      <mu-avatar :src="authorId == $store.state.userInfo.id ? headLogo : logos[$store.state.language]" :size="60"
                 class="summary-icon bg-primary "/>

    </div>
    <div class="post-content clearfix">
      <div class="post-wrapper">
        <p class="title">
          <i class="fa fa-calendar"></i>
          {{postTime}}
        </p>
        <p><i class="fa fa-user" aria-hidden="true"></i>
          By
          <span class="text-primary">
					 	<span v-if="authorId == $store.state.userInfo.id">
					 		{{username}}
					 	</span>
					 	<span v-else>
					 		{{ admin }}
					 	</span>
					 </span>
        </p>
        <p class="content" v-if="authorId == $store.state.userInfo.id">
          {{content}}
        </p>
        <p class="content" v-else v-html="content">

        </p>

        <p class="attachment" v-if=" path && path.length > 0">
          <template v-if="isPdf(path)">
            <a :href="path" target="_blank"><i class="fa fa-file-pdf-o pr-sm" aria-hidden="true"></i>{{ $t('attach') }}</a>
          </template>
          <template v-else>
            <img :src="path" alt="" @click="showPreview"/>
            <span class="zoom text-dark" @click="showPreview"><i class="fa fa-search-plus" aria-hidden="true"></i></span>
          </template>
        </p>
      </div>
    </div>
    <chp-image-preview :src="path" :open="documentOpen" @close="closePreview"></chp-image-preview>
  </li>
</template>
<script>
  import { ACY_ADMIN, ACY_ADMIN_HEAD_LOGO } from 'src/config/app.config.js'
  import regex from 'src/utils/regx'
  export default {
    data () {
      return {
        documentOpen: false,
        admin: ACY_ADMIN[this.$store.state.language],
        logos: ACY_ADMIN_HEAD_LOGO
      }
    },
    props: {
      username: '',
      authorId: '',
      content: '',
      path: '',
      headLogo: '',
      postTime: ''
    },
    methods: {
      closePreview () {
        this.documentOpen = false
      },
      showPreview () {
        this.documentOpen = true
      },
      isPdf (path) {
        const fileType = regex.fileType.exec(path)[0].toUpperCase()
        return fileType === 'PDF'
      }
    },
    watch: {
      '$store.state.language': function (val) {
        this.admin = ACY_ADMIN[val]
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "~assets/less/variable.less";

  .post {
    margin-bottom: 20px;
    p {
      margin-bottom: 0px;
      &:last-child {
        margin-bottom: 0px;
      }
      &.content {
        padding-top: 10px;
        text-align: left;
      }
      &.attachment {
        position: relative;
        padding-top: 20px;
        .zoom {
          display: inline-block;
          position: absolute;
          bottom: 0px;
          right: 0px;
          font-size: 20px;
          padding: 5px;
          background-color: rgba(150, 150, 150, .6)
        }
      }
    }
    .avator {
      width: 60px;
      float: left;
      display: inline-block;
    }
    .post-content {
      position: relative;
      float: left;
      max-width: 60%;
      &:before {
        font: normal normal normal 20px/1 FontAwesome;
        content: "\f0d9";
        position: absolute;
        left: 4px;
        top: 18px;
        color: @light-component-bg-color;
        display: inline-block;
      }

    }
    .post-wrapper {
      border-radius: 10px;
      padding: 20px 20px;
      margin-left: 10px;
      background-color: @light-component-bg-color;
      img {
        max-width: 100%;
      }

    }
    &.right-post {
      .avator {
        float: right;
      }
      .post-content {
        float: right;
        text-align: right;
        &:before {
          font: normal normal normal 20px/1 FontAwesome;
          content: "\f0da";
          position: absolute;
          right: 4px;
          top: 18px;
          color: @light-component-bg-color;
          display: inline-block;
        }
      }
      .post-wrapper {
        margin-left: 0px;
        margin-right: 10px;
      }
    }
  }

  @media (max-width: @screen-sm-min) {
    .post {
      .post-content {
        max-width: 60%;
      }

    }
  }

  html.dark {
    .post {
      .post-content {
        &:before {
          color: @dark-hover-color;
        }
      }
      .post-wrapper {
        background-color: @dark-hover-color;
      }
    }
  }
</style>

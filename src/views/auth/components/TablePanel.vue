<template>  
  <chp-panel
    :canCollapse='false'
    :canClose='false'
    headerCls='compactHeader'
  >
    <template slot="panelTitle">已上传视频审核状态</template>
    <div slot="body">
      <div class="mb-sm">
        <i class="fa fa-info-circle"></i>        
        我们会在两个工作日内进行审核，如有任何疑问，请随时联系我们的客服。
      </div>
      <table class="table responsive" style="table-layout: fixed;">
        <thead>
          <tr>
            <th>创建时间</th>
            <th>文件名</th>
            <th>状态</th>
            <th>备注</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(a, i) in authVideos" :key="a.id">
            <td>{{ a.createdAt }}</td>
            <td>{{ a.name }}</td>
            <td>{{ a.status }}</td>
            <td class="comment truncate">
              <span :title="a.comment">{{ a.comment }}</span>
              <a :data-id="a.id" href="javascript:void(0)" @click="showComment">查看</a>
            </td>
            <td>
              <mu-icon-button
                @click="deleteVideo(a)"
                v-if="a.statusId !== 1"
              >
                <i aria-hidden="true" class="fa fa-trash-o"></i>
              </mu-icon-button>
            </td>
          </tr>
        </tbody>
      </table>
      <chp-dialog-alert
        :chp-title="'备注'"
        :chpContentHtml="comment"
        :chp-ok-text="$t('ui.button.confirm')"
        ref="commentDialog"/>
    </div>
  </chp-panel>
</template>
<script>
  import videoServices from 'services/videoServices'

  export default {
    data () {
      return {
        authVideos: [],
        dialogHidden: true,
        comment: 'testing comment inside'
      }
    },
    created () {
      this.fetchAuthVideosList()
    },
    watch: {
      '$store.state.authVideos' () {
        this.authVideos = this.$store.state.authVideos
      }
    },
    methods: {
      async fetchAuthVideosList () {
        return this.$store.dispatch('fetchAuthVideosList')
      },
      async deleteVideo ({ vid }) {
        let result = await videoServices.deleteVideoById(vid)
        if (result.message === 'SUCCESS') {
          // refetch video list after delete
          this.fetchAuthVideosList()
        }
      },
      showComment (e) {
        const record = this.authVideos.find((video) => video.id === Number(e.target.dataset.id))
        this.comment = record.comment
        this.$refs.commentDialog.open()
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "~assets/less/variable.less";
  
  // For Themes
  html {
    table {
      background: @light-bg-color;
    }

    &.dark {
      table {
        background: @dark-bg-color;
      }
    }    
  }  

  table.responsive {
    th,
    th:last-child,
    td,
    td:last-child {
      width: 20%;
      text-align: center!important;
      vertical-align: middle!important;
    }

    td {
      &.comment {
        span {
          display: inline;
        }
        a {
          display: none;
        }
      }
    }
  }

  @media (max-width: @screen-sm-min) {
    .panel {
      font-size: 1.1rem;
    }

    table.responsive {
      .mu-icon-button {
        height: 16px;
      }
      td {
        &.comment {
          span {
            display: none;
          }
          a {
            display: inline;
          }
        }
      }
    }
  }
</style>
<style lang="less">
  // TODO: Upgrade vueloader to 12.2+ will enable scoped deep selector.
  //       Now, we need a extra class to make it work
  //       Or have to find out why panel title DOM doesn't have scoped id like others
  @import "~assets/less/variable.less";

  .truncate {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .panel {
    .compactHeader {
      padding: 10px;

      .panel-actions,
      .panel-subtitle {
        display: none;
      }      
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
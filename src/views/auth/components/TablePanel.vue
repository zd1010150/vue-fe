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
      <table class="table darkTheme responsive">
        <thead>
          <tr>
            <th>创建时间</th>
            <th>文件名</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(a, i) in authVideos" :key="a.id">
            <td>{{ a.createdAt }}</td>
            <td>{{ a.name }}</td>
            <td>{{ a.status }}</td>
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
    </div>
  </chp-panel>
</template>
<script>
  import videoServices from 'services/videoServices'

  export default {
    data () {
      return {
        authVideos: []
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
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "~assets/less/variable.less";
  
  table.darkTheme {
    background: @dark-bg-color;
  }

  table.responsive {
    th,
    th:last-child,
    td,
    td:last-child {
      width: 25%;
      text-align: center!important;
      vertical-align: middle!important;
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
<i18n src="./i18n.yaml"></i18n>
<template>
  <div class="col-lg-6 col-md-6 col-xs-12">
    <chp-panel :canCollapse="false" :canClose="false" :isLoading="loadingStatus" class="dashbord-fix-height-panel">
      <template slot="panelTitle">
        {{ $t("notification.announcement") }}
        <chp-view-all href="#/notice"></chp-view-all>
      </template>
      <template slot="body">
        <table class="table mb-none no-header">
          <tbody>
          <tr v-for="(a,index) in announcements" :key="Math.random()">
            <td>
              <chp-one-line :isHtml="true" :content='a.content' :lens="20"></chp-one-line>
            </td>
            <td width="150px"> {{ a.dateTime}} </td>
          </tr>
          </tbody>
        </table>
      </template>
    </chp-panel>
  </div>
</template>
<script>
  import notificationService from 'services/notificationService'
  import loading from 'src/mixins/loading'

  export default {
    mixins: [loading],
    data () {
      return {
        announcements: []
      }
    },
    methods: {
      mapData (data) {
        this.announcements = Object.assign({}, data.map((a) => {
          if (a.category !== 'wp') {
            a.content = '<a href="#/notice">' + a.content + '</a>'
          }
          return a
        }))
      },
      async fetchData () {
        this.loadingStatus = true
        let {success, data} = await notificationService.getNoticeByType('announcement', {
          language: this.$store.state.language,
          pageIndex: 1,
          pageSize: 5
        })
        this.loadingStatus = false
        if (success) {
          this.mapData(data.data)
        }
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      '$store.state.language': function () {
        this.fetchData()
      }
    }
  }
</script>

<i18n src="../../i18n.yaml"></i18n>
<template>
  <chp-panel :canCollapse="false"
             :canClose="false"
             :showActionRipple="false"
             :isLoading="loadingStatus"
             ref="panel">
    <template slot="panelTitle">
      {{ $t("charts.activeClientStatistics") }}
      <span class="chart-specification-tip pull-right">
				<i class="fa fa-info-circle" aria-hidden="true"></i>
				<chp-tooltip chp-direction="left">{{ $t('charts.clientChart.activeIconTip') }}</chp-tooltip>
			</span>
    </template>
    <div slot="body">
      <div class="col-md-12 col-sm-12 pr-none pl-none">
        <chp-echart :media="media" :externalOption="option" v-if="option"></chp-echart>
      </div>
    </div>
  </chp-panel>
</template>
<script>
  import tradeService from 'services/tradeService'
  import loadingMix from 'mixins/loading'
  import { LINE_OPTION_CONFIG, LINE_MEDIA_CONFIG } from 'src/config/chart.config.js'

  export default {
    mixins: [loadingMix],
    data () {
      return {
        chartData: null,
        media: [{
          query: {
            maxWidth: 768,
            minWidth: 400
          },
          option: {
            legend: {
              orient: 'horizontal',
              // padding:10
              left: 'center'
            },
            grid: {
              left: '10%',
              top: '10%'
            }
          }
        },
        {
          query: {
            maxWidth: 400
          },
          option: {
            legend: {
              orient: 'horizontal',
              // padding:10
              left: '20%'
            },
            grid: {
              top: '15%',
              left: '15%'
            }
          }
        }],
        option: null
      }
    },
    methods: {
      mapData (data) {
        let series = {clients: [], accounts: []},
          yAxis = [{
            name: this.$t('trade.trader'),
            type: 'value'
          }],
          xAxis = {
            type: 'category',
            boundaryGap: false,
            data: []
          },
          legend = {
            data: [{
              name: this.$t('trade.activeClient'),
              icon: 'circle'
            }, {
              name: this.$t('trade.totalClient'),
              icon: 'circle'
            }]
          }
        for (let c in data.activeClients) {
          xAxis.data.push(c)
          series.clients.push(data.activeClients[c])
          series.accounts.push(data.allClients[c])
        }
        this.option = Object.assign({}, LINE_OPTION_CONFIG, {
          legend,
          xAxis,
          yAxis,
          series: [
            {
              name: this.$t('trade.activeClient'),
              data: series.clients,
              type: 'line'
            },
            {
              name: this.$t('trade.totalClient'),
              data: series.accounts,
              type: 'line'
            }]
        })
      },
      async fetchData ({mt4_id, start_date, end_date}) {
        this.loadingStatus = true
        let {success, data} = await tradeService.getAccountsAndActiveClient({mt4_id, start_date, end_date})
        this.loadingStatus = false
        if (success) {
          this.mapData(data)
        }
      },
      research ({mt4_id, start_date, end_date}) {
        this.fetchData({mt4_id, start_date, end_date})
      }
    }
  }
</script>

<i18n src="../../i18n.yaml"></i18n>
<template>
  <chp-panel :canCollapse="false"
             :canClose="false"
             :showActionRipple="false"
             :isLoading="loadingStatus"
             ref="panel">
    <template slot="panelTitle">
      {{ $t("charts.traderVolumePercentageStatistics") }} ({{ $t('trade.lots') }})
      <span class="chart-specification-tip pull-right">
				<i class="fa fa-info-circle" aria-hidden="true"></i>
				<chp-tooltip chp-direction="left">{{ $t('charts.volumeChart.productsVolumeIconTip') }}</chp-tooltip>
			</span>
    </template>
    <div slot="body" class="row">
      <div class="col-lg-6 col-md-6 col-sm-12 pr-lg pl-none content-center">
        <chp-echart :media="media" :externalOption="option" v-if="option"></chp-echart>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 pr-none pl-none ">
        <table class="table table-striped ">
          <thead>
          <tr>
            <th></th>
            <th><i class="fa fa-circle chart-blue" aria-hidden="true"></i> {{ chartData.current.time}}</th>
            <th><i class="fa fa-circle chart-red" aria-hidden="true"></i> {{ chartData.last.time}}</th>
            <th><i class="fa fa-circle chart-green" aria-hidden="true"></i> {{ $t("charts.monthlyAverage") }}</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{ $t('trade.fx') }}</td>
            <td>{{chartData.current.forex}}</td>
            <td>{{chartData.last.forex}}</td>
            <td>{{chartData.avg.forex}}</td>
          </tr>
          <tr>
            <td>{{ $t('trade.metal') }}</td>
            <td>{{chartData.current.metal}}</td>
            <td>{{chartData.last.metal}}</td>
            <td>{{chartData.avg.metal}}</td>
          </tr>
          <tr>
            <td>{{ $t('trade.cfd') }}</td>
            <td>{{chartData.current.cfd}}</td>
            <td>{{chartData.last.cfd}}</td>
            <td>{{chartData.avg.cfd}}</td>
          </tr>
          <tr>
            <td>{{ $t('trade.oil') }}</td>
            <td>{{chartData.current.oil}}</td>
            <td>{{chartData.last.oil}}</td>
            <td>{{chartData.avg.oil}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

  </chp-panel>
</template>
<script>
  import tradeService from 'services/tradeService'
  import loadingMix from 'mixins/loading'
  import { LINE_OPTION_CONFIG } from 'src/config/chart.config.js'

  export default {
    mixins: [loadingMix],
    data () {
      return {
        chartData: {current: {}, avg: {}, last: {}},
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
              top: '10%',
              containLabel: true
            }
          }
        },
        {
          query: {
            maxWidth: 400
          },
          option: {
            legend: {
              orient: 'vertical',
              // padding:10
              left: '20%'
            },
            grid: {
              top: '25%',
              left: '20%',
              containLabel: true
            }
          }
        }
        ],
        option: null
      }
    },
    methods: {
      mapData (data) {
        let yAxis = [{
            name: this.$t('trade.lots'),
            type: 'value'
          }],
          xAxis = {
            type: 'category',
            boundaryGap: true,
            data: []
          }

        xAxis.data.push(this.$t('trade.fx'))
        xAxis.data.push(this.$t('trade.metal'))
        xAxis.data.push(this.$t('trade.cfd'))
        xAxis.data.push(this.$t('trade.oil'))
        this.option = Object.assign({},
          LINE_OPTION_CONFIG,
          {
            xAxis,
            yAxis,
            series: [
              {
                name: data.current.time,
                data: this.getBarSeriesData(data, 'current'),
                type: 'bar',
                barGap: 0,
                barWidth: 10,
                barMinHeight: 1

              },
              {
                name: data.last.time,
                data: this.getBarSeriesData(data, 'last'),
                type: 'bar',
                barWidth: 10,
                barMinHeight: 1
              }, {
                name: this.$t('charts.monthlyAverage'),
                data: this.getBarSeriesData(data, 'avg'),
                type: 'bar',
                barWidth: 10,
                barMinHeight: 1
              }]
          })
      },
      getBarSeriesData (data, type) {
        return [
          data[type].forex,
          data[type].metal,
          data[type].cfd,
          data[type].oil
        ]
      },
      async fetchData ({mt4_id, start_date, end_date}) {
        this.loadingStatus = true
        let {success, data} = await tradeService.getAverageVolume({mt4_id, start_date, end_date})
        this.loadingStatus = false
        if (success) {
          this.mapData(data)
          this.chartData = Object.assign({}, data)
          this.$emit('totalChange', data)
        }
      },
      research ({mt4_id, start_date, end_date}) {
        this.fetchData({mt4_id, start_date, end_date})
      }
    }
  }
</script>

<i18n src="../../i18n.yaml"></i18n>
<template>
  <div class="tab">
    <agent-statistics-time-picker @research="research" :agent="agent">
      <ul class="total-info">
        <li>
          {{ $t('trade.activeClient') }} : <span class="text-dark info-number"> {{ totalClients.activeClients}} </span>
          <chp-tooltip chp-direction="bottom">{{ $t('charts.clientChart.activeTraderTip') }}</chp-tooltip>
        </li>
        <li>
          {{ $t('trade.trader') }} : <span class="text-dark info-number"> {{ totalClients.allClients}}  </span>
          <chp-tooltip chp-direction="bottom">{{ $t('charts.clientChart.traderTip') }}</chp-tooltip>
        </li>
      </ul>
    </agent-statistics-time-picker>
    <agent-statistics-client-chart-1 ref="chart1"></agent-statistics-client-chart-1>
    <agent-statistics-client-chart-2 ref="chart2" :agent="agent"
                                     @totalChange="totalChange"></agent-statistics-client-chart-2>

  </div>
</template>
<script>
  import timePicker from '../timePicker'
  import chart1 from './chart1'
  import chart2 from './chart2'

  export default {
    props: {
      agent: [String, Number]
    },
    data () {
      return {
        start_date: '',
        end_date: '',
        totalClients: {
          activeClients: 0,
          allClients: 0
        }
      }
    },
    components: {
      'agent-statistics-time-picker': timePicker,
      'agent-statistics-client-chart-1': chart1,
      'agent-statistics-client-chart-2': chart2
    },
    methods: {
      refresh () {
        if (this.agent) {
          let model = {mt4_id: this.agent, start_date: this.start_date, end_date: this.end_date}
          this.$refs.chart1.research(model)
          this.$refs.chart2.research(model)
        }
      },
      research ({startDate, endDate}) {
        this.start_date = startDate
        this.end_date = endDate
        this.refresh()
      },
      totalChange (val) {
        this.totalClients = Object.assign({}, val)
      }
    },
    watch: {
      agent: function (val) {
        this.refresh()
      },
      '$store.state.language' () {
        this.refresh()
      }
    }
  }
</script>
<style scoped lang="less">
  .total-info {
    padding: 0px;
    margin: 0px;
    overflow: hidden;
    list-style-type: none;
    li {
      float: left;
    }
  }

  .info-number {
    font-size: 1.7rem;
    padding-right: 20px;

  }
</style>

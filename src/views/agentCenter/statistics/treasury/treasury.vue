<i18n src="../../i18n.yaml"></i18n>
<template>
  <div class="tab">
    <agent-statistics-time-picker @research="research" :agent="agent">
      <ul class="total-info">
        <li>
          {{ $t('trade.deposit') }} : <span class="text-dark info-number">
            <chp-money :money = "totalTreasurys.total_clients_deposit" />
          </span>
          <chp-tooltip chp-direction="bottom">{{ $t('charts.treasuryChart.depositTip') }}</chp-tooltip>
        </li>
        <li>
          {{ $t('trade.withdrawal') }} : <span class="text-dark info-number"> <chp-money :money = "totalTreasurys.total_clients_withdraw" />  </span>
          <chp-tooltip chp-direction="bottom">{{ $t('charts.treasuryChart.withdrawalTip') }}</chp-tooltip>
        </li>
        <li>
          {{ $t('trade.withdrawaledCom') }} : <span class="text-dark info-number"> <chp-money :money = "totalTreasurys.total_withdraw || 0" />  </span>
          <chp-tooltip chp-direction="bottom">{{ $t('charts.treasuryChart.comTip') }}</chp-tooltip>
        </li>

      </ul>
    </agent-statistics-time-picker>
    <agent-statistics-treasury-chart-1 ref="chart1" @totalChange="totalChange"></agent-statistics-treasury-chart-1>
    <agent-statistics-treasury-chart-2 ref="chart2"></agent-statistics-treasury-chart-2>
    <agent-statistics-treasury-chart-3 ref="chart3"></agent-statistics-treasury-chart-3>
  </div>
</template>
<script>
  import timePicker from '../timePicker'
  import chart1 from './chart1'
  import chart2 from './chart2'
  import chart3 from './chart3'

  export default {
    props: {
      agent: [String, Number]

    },
    data () {
      return {
        start_date: '',
        end_date: '',
        totalTreasurys: {
          total_clients_deposit: 0,
          total_clients_withdraw: 0,
          total_withdraw: 0
        }
      }
    },
    components: {
      'agent-statistics-time-picker': timePicker,
      'agent-statistics-treasury-chart-1': chart1,
      'agent-statistics-treasury-chart-2': chart2,
      'agent-statistics-treasury-chart-3': chart3
    },
    methods: {
      refresh () {
        if (this.agent) {
          let model = {mt4_id: this.agent, start_date: this.start_date, end_date: this.end_date}
          this.$refs.chart1.research(model)
          this.$refs.chart2.research(model)
          this.$refs.chart3.research(model)
        }
      },
      research ({startDate, endDate}) {
        this.start_date = startDate
        this.end_date = endDate
        this.refresh()
      },
      totalChange (val) {
        this.totalTreasurys = Object.assign({}, val)
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
<style lang="less" scoped>
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

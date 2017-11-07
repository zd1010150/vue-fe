<template>
  <div class="row pb-sm pr-md">
    <div class="col-left pl-lg pb-sm">
      <slot></slot>

    </div>
    <div class="col-right">
      <form class="form-inline">
        <div class="form-group" :class="errorClass('startDate')">
          <chp-date-picker :hintText="$t('ui.datePicker.startDate')"
                           class="date start-date"
                           v-model.lazy="model.startDate"
                           :fullWidth="true"
                           :required="true"
                           v-validate="'required'"
                           data-vv-value-path="model.startDate"
                           data-vv-name="startDate"
                           data-vv-validate-on="input"
                           :value="model.startDate"
                           :maxDate="maxStartDate"
                           :minDate="minStartDate"/>
          <span slot="password"
                class="error"
                v-if="errors.has('startDate:required')">
		                 {{errors.first('startDate:required')}}
		            </span>
        </div>
        <div class="form-group " :class="errorClass('endDate')">
          <chp-date-picker :hintText="$t('ui.datePicker.endDate')"
                           class="date end-date"
                           :minDate="minEndDate"
                           :maxDate="maxEndDate"
                           v-model.lazy="model.endDate"
                           v-validate="'required'"
                           data-vv-value-path="model.endDate"
                           data-vv-name="endDate"
                           :value="model.endDate"
                           :fullWidth="true"
                           :required="true"
                           data-vv-validate-on="input"/>
          <span slot="password"
                class="error"
                v-if="errors.has('endDate:required')">
		      			{{errors.first('endDate:required')}}
		            </span>
        </div>
        <div class="form-group btn-search">
          <chp-button class=" btn btn-primary print-btn" @click="research">
            <i class="fa fa-search "></i>
          </chp-button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import { timePickerFormat, aMonthDate } from 'utils/dateUtil'
  import validateMixin from 'mixins/validatemix.js'

  export default {
    mixins: [validateMixin],
    props: {
      agent: [String, Number]
    },
    data () {
      return {
        model: {
          startDate: '',
          endDate: ''
        },
        maxStartDate: '',
        minStartDate: '',
        maxEndDate: timePickerFormat(new Date().getTime()),
        minEndDate: ''
      }
    },
    watch: {
      'model.startDate': function (val) {
        this.minEndDate = val
      },
      'model.endDate': function (val) {
        this.maxStartDate = val
      },
      agent () {
        this.calculateMinStartDate()
      }
    },
    methods: {
      async research () {
        let validateResult = await this.$validator.validateAll()
        if (validateResult) {
          this.$emit('research', this.model)
        }
      },
      calculateMinStartDate () {
        let _agent = this.$store.state.agentAccounts.filter((item) => {
          return item.mt4_id === this.agent
        })
        this.minStartDate = _agent && _agent.length > 0 ? (_agent[0].created_at.split(' ')[0].trim()) : ''
      }
    },
    mounted () {
      let {now, monthAgo} = aMonthDate()
      this.$set(this.model, 'startDate', monthAgo)
      this.$set(this.model, 'endDate', now)
      this.$emit('research', {
        startDate: monthAgo,
        endDate: now
      })
    },
    activated () {
      this.calculateMinStartDate()
    }
  }
</script>
<style lang="less" scoped>
  @import "~assets/less/variable.less";

  .row {
    .col-right {
      float: right;
    }
    .col-left {
      float: left;
    }
  }

  @media (max-width: @screen-sm-min) {
    .row {
      .col-right, .col-left {
        float: none;
      }
      .form-inline {
        padding-left: 10px;
      }
      .form-group {
        float: left;
        padding-left: 3px;
        &.btn-search {
          button {
            margin: 4px;
          }
        }
      }
      .date {
        width: 120px;
      }
    }
  }
</style>

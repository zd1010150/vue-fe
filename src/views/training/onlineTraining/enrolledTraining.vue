<i18n src="../i18n.yaml"></i18n>
<template>
  <div class="row" v-if="trainings && trainings.length > 0">
    <div class="col-lg-12 col-md-12 col-xs-12 mb-lg bottom-2px-border">
      <h3 class="text-dark">{{ $t('onlineTraining.enrolledOnlineTraining') }}</h3>
    </div>
    <template v-for="(t,index) in trainings">
      <div class="col-md-4 col-lg-4 col-xl-4" :key="Math.random()">
        <section class="panel panel-featured-left panel-featured-primary">
          <div class="panel-body">
            <div class="widget-summary">
              <div class="widget-summary-col">
                <div class="summary">
                  <h4 class="title">{{ t.title }}</h4>
                  <div class="description">{{ t.subtitle }}</div>
                  <div class="text-dark">{{ Number(t.start) * 1000 | beijingZoneTime }}</div>
                </div>
                <div class="summary-footer clearfix">
                  <span>{{ $t('onlineTraining.timer') }}:</span>
                  <span class="timer text-dark">
									<chp-timer :startTime="Number(t.start)*1000"
                             :overHint="$t('onlineTraining.allStatus.end')"
                             :id="index"/>

									</span>
                  <chp-button class="mb-xs mt-sm  btn btn-xs btn-danger  pull-right" @click="showConfirmDialog(t.id)">
                    <i class="fa fa-times pr-xs"></i> {{ $t('ui.button.withdraw') }}
                  </chp-button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </template>
    <chp-dialog-confirm :chp-title="$t('ui.dialog.confirm.title')"
                        :chp-content-html="$t('onlineTraining.withdrawDialogText')"
                        :chp-ok-text="$t('ui.button.confirm')"
                        :chp-cancel-text="$t('ui.button.cancel')"
                        @close="closeConfirmDialog"
                        ref="confirmDeleteDailog"/>
  </div>
</template>
<script>
  import filters from 'src/filters'
  import trainingService from 'services/trainingService'

  export default {
    filters,
    data () {
      return {
        editId: null
      }
    },
    props: {
      trainings: Array
    },
    methods: {
      showConfirmDialog (id) {
        this.editId = id
        this.$refs.confirmDeleteDailog.open()
      },
      closeConfirmDialog (status) {
        if (status === 'ok') {
          this.withdrawTraining()
        } else {
          this.editId = null
        }
      },
      async withdrawTraining () {
        if (this.editId) {
          let {success} = await trainingService.cancelOnlineTraining(this.editId)
          if (success) {
            this.$emit('refresh')
            this.toastr.info(this.$t('info.SUCCESS'))
          }
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  section {
    .summary {
      padding-bottom: 10px;
    }
    .summary-footer {
      line-height: 30px;
      span {
        line-height: 38px;
        display: inline-block;
        height: 38px;
      }
    }
  }
</style>

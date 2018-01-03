<i18n src="../i18n.yaml"></i18n>
<template>
  <section class="pt-lg pb-lg ">
    <form class="form-horizontal form-bordered form-bordered col-lg-12 col-md-12">
      <div class="form-group">
        <label class="control-label col-md-2">
          {{ $t('attach') }}
        </label>
        <div class="col-md-10">
          <transition-group name="chp-fade" mode="out-in">
            <div v-show="model.attachment.length > 0" key="attachment">
              <a :href="model.attachment" target="_blank">{{ $t('attach') }}</a>
              <mu-icon-button @click.stop="deleteDocument"><i class="fa fa-times" aria-hidden="true"></i>
              </mu-icon-button>
            </div>
            <div v-show="model.attachment.length <=0 " key="upload">
              <chp-file-upload
                :extensions="uploadConfig.bill.extentions"
                :size="uploadConfig.bill.size"
                name="file"
                drop=".dropFileAreaDiv"
                :dropDirectory="false"
                :multiple="false"
                :post-action="dropPostAction"
                @input="dropInputFunction"
                ref="dropUploads" class="form-control dropFileArea">
                <div class="dropFileAreaDiv">
                  <h6> {{ $t('ui.upload.tips') }} </h6>
                  <P>{{ $t('ui.upload.accepts') }} : png, jpg,jpeg,bmp, pdf</P>
                </div>
              </chp-file-upload>
            </div>
          </transition-group>
          <input type="hidden" v-model="model.attachment">
        </div>
      </div>
      <div class="form-group" :class="errorClass('content')">
        <label class="control-label col-md-2">{{ $t('content') }}
          <span class="required" aria-required="true">*</span></label>
        <div class="col-md-10">
          <mu-text-field
            hintText=""
            multiLine
            :fullWidth="true"
            class="form-control"
            v-model="model.content"
            :rows="6"
            :rowsMax="6"
            v-validate="'required|min:10|max:200'"
            data-vv-value-path="model.content"
            data-vv-name="content"
          />
          <span class="error" v-if="errors.has('content:required')">{{errors.first('content:required')}}</span>
          <span class="error" v-if="errors.has('content:min')">{{errors.first('content:min')}}</span>
          <span class="error" v-if="errors.has('content:max')">{{errors.first('content:max')}}</span>
        </div>
      </div>
      <div class="col-lg-9 col-lg-offset-2 col-md-9 col-md-offset-2 ">
        <chp-button class="btn-primary" @click="submit" :disabled="disableSubmit">
          <i class="fa fa-send-o pr-xs"></i>
          Send
        </chp-button>
        <chp-button class="btn-default" @click="cancel">
          <i class="fa fa-times pr-xs"></i>
          Discard
        </chp-button>
      </div>
    </form>
  </section>
</template>
<script>
  import validateMixin from 'mixins/validatemix'
  import { UPLOAD_ASSET_URL } from 'src/config/url.config.js'
  import { UPLOAD_CONFIG } from 'src/config/app.config.js'
  import ticketService from 'services/ticketService'

  export default {
    mixins: [validateMixin],
    props: {
      ticketId: String
    },
    data () {
      return {
        disableSubmit: false,
        uploadConfig: UPLOAD_CONFIG,
        dropPostAction: UPLOAD_ASSET_URL,
        model: {
          fileid: 0,
          content: '',
          attachment: '',
          ticket_id: Number(this.ticketId || '')
        }
      }
    },
    activated () {
      this.resetForm()
    },
    methods: {
      resetForm () {
        this.$set(this.model, 'content', '')
        this.$set(this.model, 'attachment', '')
      },
      deleteDocument () {
        this.$set(this.model, 'attachment', '')
      },
      dropInputFunction (files, isAllsuccess, error) {
        if (isAllsuccess) {
          this.$set(this.model, 'fileid', files[0].data.fileid)
          this.$set(this.model, 'attachment', files[0].data.url)
        } else {
          this.$set(this.model, 'attachment', '')
          this.$set(this.model, 'fileid', '')
          this.toastr.error(this.$t('info.UPLOAD_ERROR.' + error[0]))
        }
      },
      async submit () {
        this.disableSubmit = true
        let validateResult = await this.$validator.validateAll()
        if (validateResult) {
          let {message, success} = await ticketService.replayTicket(this.model)
          if (success) {
            this.toastr.info(this.$t('info.SUCCESS'))
            this.$emit('submit')
          } else {
            if (message === 'TICKET_CLOSED') {
              this.$emit('cancel')
            }
          }
        }
        this.$emit('refresh')
        this.disableSubmit = false
      },
      cancel () {
        this.$emit('cancel')
      }
    }
  }
</script>
<style lang="less" scoped>
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      float: left;
    }
  }
</style>

<i18n src="../../../../i18n.yaml"></i18n>
<template lang="html">

      <form slot="body" class="form-horizontal form-bordered " method="POST"  target="_blank" ref="accountForm">
       <div class="form-group" :class="errorClass('bankName')">
          <label class="control-label col-md-3">
            {{ $t('bankcard.bank_name') }}
            <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-6" >
            <mu-text-field  v-model="branchObj.bankName"
                            v-validate="'required'"
                            data-vv-value-path="branchObj.bank_id"
                            data-vv-name="bankName"
                            class="form-control"
                            disabled
                            :fullWidth="true" />
            <span slot="required" class="error" v-if="errors.has('bankName:required')">{{errors.first('bankName:required')}}</span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('bankProvince')" >
          <label class="control-label col-md-3">
            {{ $t('bankcard.province') }}
            <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-6">
            <mu-text-field  v-model="branchObj.provinceName"
                            v-validate="'required'"
                            data-vv-value-path="branchObj.province_id"
                            data-vv-name="bankProvince"
                            class="form-control"
                            disabled
                            :fullWidth="true" />

            <span slot="required" class="error" v-if="errors.has('bankProvince:required')">{{errors.first('bankProvince:required')}}</span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('bankCity')" >
          <label class="control-label col-md-3">
            {{ $t('bankcard.city') }}
            <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-6">
            <mu-text-field  v-model="branchObj.cityName"
                            v-validate="'required'"
                            data-vv-value-path="branchObj.city_id"
                            data-vv-name="bankCity"
                            class="form-control"
                            disabled
                            :fullWidth="true" />

            <span slot="required" class="error" v-if="errors.has('bankCity:required')">{{errors.first('bankCity:required')}}</span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('branchName')" >
          <label class="control-label col-md-3">
            {{ $t('bankcard.branchName') }}
            <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-6">
            <mu-text-field  v-model="branchObj.branchName"
                            v-validate="'required'"
                            data-vv-value-path="branchObj.branch_id"
                            data-vv-name="branchName"
                            class="form-control"
                            disabled
                            :fullWidth="true" />

            <span slot="required" class="error" v-if="errors.has('branchName:required')">{{errors.first('branchName:required')}}</span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('phone')">
        <label class="control-label col-md-3">{{ $t('bankcard.phone') }}
          <span class="required" aria-required="true">*</span>
        </label>
        <div class="col-md-6">
          <mu-text-field  v-model="model.phone"
                          v-validate="'required'"
                          data-vv-value-path="model.phone"
                          data-vv-name="phone"
                          class="form-control"
                          :fullWidth="true" />
          <span class="error"> * {{ $t('bankcard.phoneTip') }}</span>
          <div slot="required" class="error" v-if="errors.has('phone:required')">{{errors.first('phone:required')}}</div>
        </div>
      </div>
        <div class="form-group" :class="errorClass('bankAccount')">
          <label class="control-label col-md-3">
            {{ $t('bankcard.account') }}
            <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-6">
            <mu-text-field  v-model="model.account"
                            v-validate="'required'"
                            data-vv-value-path="model.account"
                            data-vv-name="bankAccount"
                            class="form-control"
                            :fullWidth="true" />

            <span slot="required" class="error" v-if="errors.has('bankAccount:required')">
              {{errors.first('bankAccount:required')}}
            </span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('swift')">
          <label class="control-label col-md-3">Swift
            <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-6">
            <mu-text-field  v-model="model.swift"
                            v-validate="'required'"
                            data-vv-value-path="model.swift"
                            data-vv-name="swift"
                            class="form-control"
                            :fullWidth="true" />

            <span slot="required" class="error" v-if="errors.has('swift:required')">{{errors.first('swift:required')}}</span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('bankDocument')">
          <label class="control-label col-md-3">
            {{ $t('bankcard.uploadsBill') }}
            <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-6" >
          <transition-group name="chp-fade" mode="out-in">
            <div v-show="model.document.length > 0" key="attachment">
              <a :href="model.document"  target="_blank"> {{ $t('bankcard.attachment') }}</a>
              <mu-icon-button @click.stop="deleteDocument"><i class="fa fa-times" aria-hidden="true"></i></mu-icon-button>
            </div>
            <div v-show="model.document.length <=0 "  key="upload" >
              <chp-file-upload
              :extensions="uploadConfig.bill.extentions"
              :size="uploadConfig.bill.size"
              name="document"
              drop=".dropFileAreaDiv"
              :dropDirectory="false"
              :multiple="false"
              :post-action="dropPostAction"
              @input="dropInputFunction"
              ref="dropUploads" class="form-control dropFileArea">
              <div class="dropFileAreaDiv">
                <h6> {{ $t('ui.upload.tips') }} </h6>
                <P>{{ $t('bankcard.uploadNote') }}</P>
                <div v-html="promotingMsg"></div>
                <P>{{ $t('ui.upload.accepts') }} : {{ uploadConfig.bill.extentions.join(",") }}</P>
              </div>
            </chp-file-upload>
            </div>
          </transition-group>
         <input type="hidden" v-model="model.document" v-validate="'required'" data-vv-value-path="model.document" data-vv-name="bankDocument"  >
         <span slot="required" class="error" v-if="errors.has('bankDocument:required')">{{errors.first('bankDocument:required')}}</span>
          </div>
        </div>
     </form>
</template>

<script>

import validateMixin from 'mixins/validatemix'
import configService from 'services/configService'
import bankCardService from 'services/bankCardService'
import { UPLOAD_DOCUMENT_URL } from 'src/config/url.config.js'
import { UPLOAD_CONFIG } from 'src/config/app.config.js'
import { assignToObject } from 'src/utils/objectUtil'
export default {
  mixins: [validateMixin],
  data () {
    return {
      innerMethod: this.method,
      innerEditObj: this.editObj,
      uploadConfig: UPLOAD_CONFIG,
      promotingMsg: '',
      dropPostAction: UPLOAD_DOCUMENT_URL + '/bill',
      isEdit: false,
      editId: null,
      originModel: {
        account: '',
        swift: '',
        method: '',
        document: '',
        phone: ''
      },
      model: {
        account: '',
        swift: '',
        method: '',
        document: '',
        phone: ''
      }
    }
  },
  props: {
    method: String,
    editObj: Object,
    branchObj: Object
  },
  methods: {
    async fetchPromtingMessage (val) {
      this.$emit('loading', true)
      let key = 'prompting_message_' + (val === 'en' ? 'en' : 'cn'),
        {data} = await configService.getConfigByKey({fields: [key]})
      this.promotingMsg = data[key]
      this.$emit('loading', false)
    },
    dropInputFunction (files, isAllsuccess, error) {
      if (isAllsuccess) {
        this.$set(this.model, 'document', files[0].data.url)
      } else {
        this.$set(this.model, 'document', '')
        this.toastr.error(this.$t('info.UPLOAD_ERROR.' + error[0]))
      }
      this.$validator.validate('bankDocument', this.model.document)
    },
    async submit () {
      let validateResult = await this.$validator.validateAll()
      const { bank_id, province_id, city_id, branch_id } = this.branchObj,
        formData = Object.assign({}, this.model, { bank_id, province_id, city_id, branch_id })
      if (validateResult) {
        let res
        if (this.editId) {
          res = await bankCardService.updateChinaBankCard(this.editId, formData)
        } else {
          res = await bankCardService.addChinaBankCard(formData)
        }
        let { success } = res
        if (success) {
          this.toastr.info(this.$t('info.SUCCESS'))
          this.$emit('refresh')
        }
      }
    },
    deleteDocument () {
      this.$set(this.model, 'document', '')
    },
    initModel: function () {
      this.isEdit = this.innerEditObj !== null
      if (this.isEdit) { // 如果是编辑
        this.editId = this.innerEditObj.id
        this.model = Object.assign({}, this.model, assignToObject(this.originModel, this.innerEditObj))
      } else {
        this.editId = null
        this.model = Object.assign({}, this.model, this.originModel, {method: this.innerMethod, bank_name: this.innerMethod, phone: (this.$store.state.userInfo && this.$store.state.userInfo.phone) || ''})
      }
    }

  },
  mounted () {
    this.initModel()
    this.fetchPromtingMessage(this.$store.state.language)
  },
  watch: {
    '$store.state.language' (val, oldVal) {
      this.fetchPromtingMessage(val)
    },
    method (val) {
      this.innerMethod = val
    },
    editObj (val) {
      this.innerEditObj = val
    },
    innerMethod (val, oldVal) {
      this.initModel()
    },
    innerEditObj (val) {
      this.initModel()
    }
  }
}
</script>



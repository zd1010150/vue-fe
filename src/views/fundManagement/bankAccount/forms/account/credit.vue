<i18n src="../../../i18n.yaml"></i18n>
<template lang="html">
    <form slot="body" class="form-horizontal form-bordered " method="POST"  target="_blank" ref="accountForm">
       <div class="form-group" :class="errorClass('bankName')">
          <label class="control-label col-md-3">
            {{ $t('bankcard.bank_name') }}
            <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-6" >
            <mu-select-field  v-model="model.bank_name"
                              v-validate="'required'"
                              data-vv-value-path="model.bank_name"
                              data-vv-name="bankName">
              <mu-menu-item value="Visa" title="Visa" />
              <mu-menu-item value="Master" title="Master" />
            </mu-select-field>
            <span slot="required" class="error" v-if="errors.has('bankName:required')">{{errors.first('bankName:required')}}</span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('firstSix')">
          <label class="control-label col-md-3">
            {{ $t('bankcard.creditPreSixNumber') }}
            <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-6 col-xs-10">
            <mu-text-field  v-model="firstSix"
                            v-validate="'required|digits:6'"
                            data-vv-value-path="firstSix"
                            data-vv-name="firstSix"
                            class="form-control"
                            :fullWidth="true" />

            <chp-image-preview src="./static/images/credit-card.jpg" :open="documentOpen" @close="closeImg"/>
            <span class="error" v-if="errors.has('firstSix:required')">
              {{errors.first('firstSix:required')}}
            </span>
            <span class="error" v-if="errors.has('firstSix:digits')">
              {{errors.first('firstSix:digits')}}
            </span>
          </div>
          <a href="javascript:void(0)" @click="showImg" class="tip">
              <i class="fa fa-info-circle" aria-hidden="true"></i>
            </a>
        </div>
        <div class="form-group" :class="errorClass('lastFour')">
          <label class="control-label col-md-3">
            {{ $t('bankcard.creditAfterFourNumber') }}
            <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-6">
            <mu-text-field  v-model="lastFour"
                            v-validate="'required|digits:4'"
                            data-vv-value-path="lastFour"
                            data-vv-name="lastFour"
                            class="form-control"
                            :fullWidth="true" />

            <span class="error" v-if="errors.has('lastFour:required')">
              {{errors.first('lastFour:required')}}
            </span>
            <span class="error" v-if="errors.has('lastFour:digits')">
              {{errors.first('lastFour:digits')}}
            </span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('bankDocument')">
          <label class="control-label col-md-3">
            {{ $t('bankcard.uploadCreditCard') }}
            <span class="required" aria-required="true">*</span>
          </label>
          <div class="col-md-3 mt-xs">
            <transition-group name="chp-fade" mode="out-in">
              <div v-show="model.document.length > 0" key="attachment">
                <a :href="model.document"  target="_blank"> {{ $t('bankcard.uploadFrontSide') }}</a>
                <mu-icon-button @click.stop="deleteDocument"><i class="fa fa-times" aria-hidden="true"></i></mu-icon-button>
              </div>
              <div v-show="model.document.length <=0 "  key="upload" >
                <chp-file-upload  :extensions="uploadConfig.bill.extentions"
                                  :size="uploadConfig.bill.size"
                                  name="document"
                                  drop=".dropFileAreaDiv"
                                  :dropDirectory="false"
                                  :multiple="false"
                                  :post-action="dropPostAction"
                                  @input="uploadFrontSide"
                                  ref="dropUploads"
                                  class="form-control dropFileArea">
                  <div class="dropFileAreaDiv">
                      <h6 class="text-muted"> {{ $t('ui.upload.tips') }} </h6>
                      <h5>{{ $t('bankcard.uploadFrontSide') }}</h5>
                      <P class="text-muted">{{ $t('ui.upload.accepts') }} : png, jpg,jpeg,bmp, pdf</P>
                  </div>
                </chp-file-upload>
              </div>
            </transition-group>
            <input  type="hidden"
                    v-model="model.document"
                    v-validate="'required'"
                    data-vv-value-path="model.document"
                    data-vv-name="frontCreditCard" >
            <span slot="required"
                 class="error"
                 v-if="errors.has('frontCreditCard:required')">
                  {{errors.first('frontCreditCard:required')}}
            </span>
          </div>
          <div class="col-md-3 mt-xs">
            <transition-group name="chp-fade" mode="out-in">
              <div v-show="model.document_2.length > 0" key="attachment">
                <a :href="model.document_2"  target="_blank"> {{ $t('bankcard.uploadBackSide') }}</a>
                <mu-icon-button @click.stop="deleteDocument('back')"><i class="fa fa-times" aria-hidden="true"></i></mu-icon-button>
              </div>
              <div v-show="model.document_2.length <=0 "  key="upload" >
                <chp-file-upload  :extensions="uploadConfig.bill.extentions"
                                  :size="uploadConfig.bill.size"
                                  name="document"
                                  drop=".dropFileAreaDiv"
                                  :dropDirectory="false"
                                  :multiple="false"
                                  :post-action="dropPostAction"
                                  @input="uploadBackSide"
                                  ref="dropUploads"
                                  class="form-control dropFileArea">
                  <div class="dropFileAreaDiv">
                      <h6 class="text-muted"> {{ $t('ui.upload.tips') }} </h6>
                      <h5>{{ $t('bankcard.uploadBackSide') }}</h5>
                      <P class="text-muted">{{ $t('ui.upload.accepts') }} : png, jpg,jpeg,bmp, pdf</P>
                  </div>
                </chp-file-upload>
              </div>
            </transition-group>
            <input  type="hidden"
                    v-model="model.document_2"
                    v-validate="'required'"
                    data-vv-value-path="model.document_2"
                    data-vv-name="backCreditCard" >
            <span slot="required"
                 class="error"
                 v-if="errors.has('backCreditCard:required')">
                  {{errors.first('backCreditCard:required')}}
            </span>
          </div>
          <div class="col-md-6 col-md-offset-3 pt-sm text-primary">
            <i class="fa fa-info-circle" aria-hidden="true"></i>
            {{ $t('bankcard.uploadCreditCardHint') }}
          </div>
        </div>
     </form>
</template>

<script>
  import validateMixin from 'mixins/validatemix'
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
        dropPostAction: UPLOAD_DOCUMENT_URL + '/bill',
        isEdit: false,
        editId: null,
        firstSix: '',
        lastFour: '',
        documentOpen: false,
        originModel: {
          province: '',
          city: '',
          address: '',
          account: '',
          swift: '',
          bank_name: 'Visa',
          method: '',
          document: '',
          document_2: ''
        },
        model: {
          province: '',
          city: '',
          address: '',
          account: '',
          swift: '',
          bank_name: '',
          method: '',
          document: '',
          document_2: ''
        }
      }
    },
    props: {
      method: String,
      editObj: Object
    },
    methods: {
      uploadBackSide (files, isAllsuccess, error) {
        if (isAllsuccess) {
          this.$set(this.model, 'document_2', files[0].data.url)
        } else {
          this.$set(this.model, 'document_2', '')
          this.toastr.error(this.$t('info.UPLOAD_ERROR.' + error[0]))
        }
        this.$validator.validate('backCreditCard', this.model.document_2)
      },
      uploadFrontSide (files, isAllsuccess, error) {
        if (isAllsuccess) {
          this.$set(this.model, 'document', files[0].data.url)
        } else {
          this.$set(this.model, 'document', '')
          this.toastr.error(this.$t('info.UPLOAD_ERROR.' + error[0]))
        }
        this.$validator.validate('frontCreditCard', this.model.document)
      },
      async submit () {
        let validateResult = await this.$validator.validateAll()
        if (validateResult) {
          let res
          if (this.editId) {
            res = await bankCardService.updateBankCard(this.editId, this.model)
          } else {
            res = await bankCardService.addBankCard(this.model)
          }
          let { success } = res
          if (success) {
            this.toastr.info(this.$t('info.SUCCESS'))
            this.$emit('refresh')
          }
        }
      },
      deleteDocument (type) {
        if (type === 'back') {
          this.$set(this.model, 'document_2', '')
        } else {
          this.$set(this.model, 'document', '')
        }
      },
      initModel: function () {
        this.isEdit = this.innerEditObj !== null
        if (this.isEdit) { // 如果是编辑
          this.editId = this.innerEditObj.id
          this.model = Object.assign({}, this.model, assignToObject(this.originModel, this.innerEditObj))
          let arrNumbers = /^(\d{6})(.*?)(\d{4})$/.exec(this.model.account)
          if (arrNumbers.length > 3) {
            this.firstSix = arrNumbers[1]
            this.lastFour = arrNumbers[3]
          }
        } else {
          this.editId = null
          this.model = Object.assign({}, this.model, this.originModel, {method: this.innerMethod})
          this.firstSix = ''
          this.lastFour = ''
        }
      },
      showImg () {
        this.documentOpen = true
      },
      closeImg () {
        this.documentOpen = false
      }

    },
    mounted () {
      this.initModel()
    },
    watch: {
      method: function (val) {
        this.innerMethod = val
      },
      editObj: function (val) {
        this.innerEditObj = val
      },
      innerMethod: function (val, oldVal) {
        this.initModel()
      },
      innerEditObj: function (val) {
        this.initModel()
      },
      firstSix (val) {
        this.model.account = val + '******' + this.lastFour
      },
      lastFour (val) {
        this.model.account = this.firstSix + '******' + val
      }
    }
  }
</script>

<style lang="less" scoped>
  .tip{
    padding-top:4px;
    display: inline-block;
    font-size: 16px;
  }
</style>

<i18n src="../../i18n.yaml"></i18n>
<template>
  <chp-panel :canCollapse="false" :canClose="false" :isLoading="loadingStatus" :isShowHeader="false">
    <div slot="body">
      <div class="form-group" :class="errorClass('bankName')">
        <label class="control-label col-md-3">
          {{ $t('bankcard.bank_name') }}
          <span class="required" aria-required="true">*</span>
        </label>
        <div class="col-md-6" >
          <mu-select-field v-model="selected.bank_id"
                           :maxHeight="300"
                           data-vv-value-path="selected.bank_id"
                           v-validate="'required'"
                           data-vv-name="bankName">
            <template v-for="b in banks">
              <mu-menu-item :value="b.id" :title="b.name" />
            </template>
          </mu-select-field>
          <span slot="required" class="error" v-if="errors.has('bankName:required')">{{errors.first('bankName:required')}}</span>
        </div>
      </div>
    <div class="form-group" :class="errorClass('bankProvince')">
        <label class="control-label col-md-3">
          {{ $t('bankcard.selectProvince') }}
          <span class="required" aria-required="true">*</span>
        </label>
        <div class="col-md-6" >
          <mu-select-field v-model="selected.province_id"
                           :maxHeight="300"
                           data-vv-value-path="selected.province_id"
                           v-validate="'required'"
                           data-vv-name="bankProvince">
            <template v-for="p in provinces">
              <mu-menu-item :value="p.id" :title="p.name" />
            </template>
          </mu-select-field>
          <span slot="required" class="error" v-if="errors.has('bankProvince:required')">{{errors.first('bankProvince:required')}}</span>
        </div>
      </div>
      <div class="form-group" :class="errorClass('bankCity')">
        <label class="control-label col-md-3">
          {{ $t('bankcard.selectCity') }}
          <span class="required" aria-required="true">*</span>
        </label>
        <div class="col-md-6" >
          <mu-select-field v-model="selected.city_id"
                           :maxHeight="300"
                           data-vv-name="bankCity"
                           v-validate="'required'"
                           data-vv-value-path="selected.city_id"
          >
            <template v-for="c in cities">
              <mu-menu-item :value="c.id" :title="c.name" />
            </template>
          </mu-select-field>
          <span slot="required" class="error" v-if="errors.has('bankCity:required')">{{errors.first('bankCity:required')}}</span>
        </div>
      </div>
      <div class="form-group" >
        <label class="control-label col-md-3">
          {{ $t('bankcard.branchKey') }}
        </label>
        <div class="col-md-6" >
          <mu-text-field  v-model="keywords"
                          class="form-control"
                          :fullWidth="true" />
        </div>
        <div class="col-md-3" >
          <chp-button class="mb-xs mt-xs mr-xs btn btn-primary print-btn" @click="search">
            <i class="fa fa-search hidden-sm hidden-xs"></i> {{ $t('bankcard.searchBranch') }}
          </chp-button>
        </div>
      </div>
      <div class="form-group">

      </div>

    <div class="form-group" :class="errorClass('branchName')">
      <label class="control-label col-md-3">
        {{ $t('bankcard.branchBank') }}
        <span class="required" aria-required="true">*</span>
      </label>
      <div class="col-md-6" >
        <mu-select-field v-model="selected.branch_id"
                         :maxHeight="300"
                         v-validate="'required'"
                         data-vv-value-path="selected.branch_id"
                         data-vv-name="branchName"
        >
          <template v-for="b in branches">
            <mu-menu-item :value="b.id" :title="b.name" />
          </template>
        </mu-select-field>
        <span slot="required" class="error" v-if="errors.has('branchName:required')">{{errors.first('branchName:required')}}</span>
      </div>
    </div>

    </div>
  </chp-panel>
</template>
<script>
  /* eslint-disable no-extra-boolean-cast,camelcase,one-var */
  import _ from 'lodash'
  import bankCardService from 'services/bankCardService'
  import loadingMix from 'mixins/loading'
  import validateMixin from 'mixins/validatemix'

  export default {
    mixins: [validateMixin, loadingMix],
    data () {
      return {
        branches: [],
        provinces: [],
        cities: [],
        banks: [],
        keywords: '',
        selected: {
          province_id: '',
          city_id: '',
          bank_id: '', // 银行名
          branch_id: '' // 支行名
        }
      }
    },
    props: {
      editObj: Object
    },
    mounted () {
      this.init()
    },
    watch: {
      editObj: function (val) {
        this.init()
      },
      'selected.province_id': function () {
        const province = this.provinces.filter(p => p.id === this.selected.province_id)
        this.cities = province.length > 0 && province[0].cities ? province[0].cities : []
        this.selected = Object.assign({}, this.selected, { city_id: this.cities.length > 0 ? this.cities[0].id : '' })
        this.search()
      },
      'selected.city_id': function () {
        this.search()
      },
      'selected.bank_id': function () {
        this.search()
      }
    },
    methods: {
      async validate () {
        const validate = await this.$validator.validateAll()
        return validate
      },
      getSelected () {
        const _province = this.provinces.filter(p => p.id === this.selected.province_id)[0]
        const provinceName = _province.name
        const _city = _province.cities.filter(c => c.id === this.selected.city_id)
        const cityName = _city[0].name
        const bankName = this.banks.filter(b => b.id === this.selected.bank_id)[0].name
        const branchName = this.branches.filter(b => b.id === this.selected.branch_id)[0].name
        return Object.assign({}, this.selected, {
          provinceName,
          cityName,
          bankName,
          branchName
        })
      },
      async search () {
        const { province_id, city_id, bank_id } = this.selected
        if (_.isEmpty(`${province_id}`) || _.isEmpty(`${city_id}`) || _.isEmpty(`${bank_id}`)) {
          return
        }
        this.loadingStatus = true
        let {success, data} = await bankCardService.searchBranch({
          provinceId: this.selected.province_id,
          cityId: this.selected.city_id,
          bankId: this.selected.bank_id,
          keywords: this.keywords
        })
        if (success && data) {
          this.branches = data
          if (data.length > 0) {
            this.selected = Object.assign({}, this.selected, { branch_id: data[0].id })
          } else {
            this.selected = Object.assign({}, this.selected, { branch_id: '' })
          }
        }
        this.loadingStatus = false
      },
      async fetchProvince () {
        let {success, data} = await bankCardService.fetchProvince()
        if (success && data) {
          this.provinces = data
          if (data.length > 0) {
            this.selected = Object.assign({}, this.selected, { province_id: data[0].id })
            if (data[0].cities && data[0].cities.length > 0) {
              this.selected = Object.assign({}, this.selected, { city_id: data[0].cities[0].id })
            }
          }
        }
        return data
      },
      async fetchBanks () {
        let {success, data} = await bankCardService.getBanks()
        if (success && data) {
          this.banks = data
          if (data.length > 0) {
            this.selected = Object.assign({}, this.selected, { bank_id: data[0].id })
          }
        }
        return data
      },
      async init () {
        this.loadingStatus = true
        await this.fetchProvince()
        await this.fetchBanks()
        await this.search()
        this.loadingStatus = false
        if (!!this.editObj) {
          const {province_id, city_id, bank_id, branch_id} = this.editObj
          this.selected = Object.assign({}, this.selected, {province_id, city_id, bank_id, branch_id})
        }
      }
    }
  }
</script>

<i18n src="../../i18n.yaml"></i18n>
<template lang="html">
	<div class="form-group">
      <label class="control-label col-md-3">
         {{ $t('bankcard.method') }}
         <span class="required" aria-required="true">*</span>
      </label>
      <div class="col-md-6" >
         <mu-select-field v-model="innerMethod" @input="methodChange" :disabled="editObj!=null">
          <template v-for="m in methods">
            <mu-menu-item :value="m.method" :title="$t('bankcard.methodType.'+m.title)" />
          </template>
		    </mu-select-field>
      </div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      innerMethod: null,
      originMethods: [{
        title: 'cup',
        type: ['en', 'zh'],
        method: 'CUP'
      }, {
        title: 'doku',
        type: ['en'],
        method: 'DOKU'
      }, {
        title: 'fasa',
        type: ['en'],
        method: 'FASA'
      }, {
        title: 'credit',
        type: ['en'],
        method: 'CREDIT'
      }],
      methods: []
    }
  },
  props: {
    method: String,
    editObj: Object
  },
  watch: {
    '$store.state.language': function (val, oldVal) {
      debugger
      this.filterMethodsByLanguage(val)
    },
    editObj: function (val) {
      this.isEdit = val !== null
      this.initMethods()
    },
    editMethod: function (val) {
      this.initMethods()
    }
  },
  methods: {
    methodChange () {
      this.$emit('methodChange', this.innerMethod)
    },
    filterMethodsByLanguage (val) {
      this.methods = this.originMethods.filter((method) => {
        return method.type.indexOf(val) > -1
      })
      this.innerMethod = this.methods[0].method
      this.$emit('methodChange', this.innerMethod)
    },
    initMethods () {
      let isEdit = this.editObj !== null
      if (!isEdit) {
        this.filterMethodsByLanguage(this.$store.state.language)
      } else {
        this.methods = this.originMethods.filter((m) => {
          return m.method === this.method
        })
        this.innerMethod = this.method
      }
    }
  },
  mounted () {
    this.initMethods()
  }
}
</script>
<style>
   .control-label{
      text-align: right;
      padding-top: 8px;
   }
</style>

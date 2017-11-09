<template>
  <p>
    <span v-if="isHtml" v-html="innerHtml"></span>
    <span v-else> {{ innerContent }} </span>
    <template v-if="needTooltip">
      <chp-tooltip v-if="!isHtml"> {{ content }}</chp-tooltip>
      <chp-tooltip v-else> {{ innerContent }}</chp-tooltip>
    </template>
  </p>
</template>
<script>
  /* eslint-disable no-useless-escape */
  const HTML_REG = /(\<[a](.*?)\>)(.*?)(\<\/[a]\>)/i
  export default {
    props: {
      lens: Number,
      content: String,
      isHtml: false,
      needTooltip: true,
      mark: {
        type: String,
        default: '...'
      }
    },
    computed: {
      innerHtml () {
        let arr = HTML_REG.exec(this.content)
        if (this.isHtml && arr && arr.length === 5) {
          return arr[1] + this.substrLen(arr[3]) + arr[4]
        } else return this.content
      },
      innerContent () {
        let arr = HTML_REG.exec(this.content)
        if (this.isHtml && arr && arr.length === 5) {
          return arr[3]
        } else return this.substrLen(this.content)
      }
    },
    methods: {
      substrLen (str) {
        if (str && str.length < this.lens) {
          return str
        } else {
          return str.substr(0, this.lens) + this.mark
        }
      }
    }
  }
</script>
<style>
  p {
    margin: 0px;
  }
</style>

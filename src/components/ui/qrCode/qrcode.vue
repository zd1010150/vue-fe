
<template>
  <img
    :className="classes"
    :src="imgSrc"
    :style="styles"
    alt="qr_code"
  />
</template>
<script>
  import qrImage from 'qr-image'
  export default {
    data () {
      return {
        imgSrc: '',
        styles: {
          width: this.width,
          height: this.height
        }
      }
    },
    mounted () {
      this.imgSrc = this.generateQrCode()
    },
    props: {
      width: [String, Number],
      height: [String, Number],
      classes: [String, Array],
      url: [String, Number],
      margin: {
        type: Number,
        default: 1
      }
    },
    methods: {
      generateQrCode () {
        const pngBuffer = qrImage.imageSync(this.url, {
          type: 'png',
          margin: this.margin
        })
        return `data:image/png;base64,${pngBuffer.toString('base64')}`
      }
    }
  }
</script>


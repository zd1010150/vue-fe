<template>
  <chp-panel>
    <template slot="panelTitle">Dialog</template>
    <template slot="panelSubtitle">custom,scroll,alert,confirm,prompt,imagePreview</template>
    <div class="form-horizontal form-bordered" slot="body">
      <h4>Dialog</h4>
      <chp-dialog-prompt
        :chp-title="prompt.title"
        :chp-ok-text="prompt.ok"
        :chp-cancel-text="prompt.cancel"
        @open="onOpen"
        @close="onClose"
        v-model="prompt.value"
        ref="dialog6"
      >
      </chp-dialog-prompt>

      <chp-button class="chp-primary chp-raised" @click="openDialog('dialog6')">Prompt</chp-button>

      <chp-dialog chp-open-from="#fab" chp-close-to="#fab" ref="dialog2">
        <chp-dialog-title>Create new note</chp-dialog-title>

        <chp-dialog-content>
          test
        </chp-dialog-content>

        <chp-dialog-actions>
          <chp-button class="btn btn-default " @click="closeDialog('dialog2')">Cancel</chp-button>
          <chp-button class="btn btn-primary" @click="closeDialog('dialog2')">Create</chp-button>
        </chp-dialog-actions>
      </chp-dialog>

      <mu-icon-button id="fab" @click="openDialog('dialog2')">
        <i class="fa fa-plus"></i>
      </mu-icon-button>
      <chp-button @click="preview" id="preview">
        preview image
      </chp-button>
      <!-- <mu-dialog :open="previewOpen" scrollable @close="previewOpen=false">
        <img src="static/images/1.jpg" class="img-responsive">
      </mu-dialog>  -->
      <chp-image-preview :src="src" :open="previewOpen"></chp-image-preview>
    </div>

  </chp-panel>

</template>
<script>
  export default {
    data () {
      return {
        src: 'static/images/1.jpg',
        previewOpen: false,
        prompt: {
          title: 'What\'s your name?',
          ok: 'Done',
          cancel: 'Cancel',
          id: 'name',
          name: 'name',
          placeholder: 'Type your name...',
          maxlength: 30,
          value: ''
        }
      }
    },
    props: {},
    methods: {
      openDialog (ref) {
        this.$refs[ref].open()
      },
      closeDialog (ref) {
        this.$refs[ref].close()
      },
      onOpen () {
        console.log('Opened')
      },
      onClose (type) {
        console.log('Closed', type)
      },
      preview () {
        this.previewOpen = !this.previewOpen
      }
    },
    watch: {}
  }
</script>


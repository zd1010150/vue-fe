<template>
  <div class="container-fluid">

    <div class="row">
      <withdrawal-forms @refresh="refresh"></withdrawal-forms>
    </div>
    <div class="row funds-table">
      <withdrawal-table ref="table"></withdrawal-table>
    </div>
  </div>
</template>
<script>
  import form from './forms'
  import table from './table'

  export default {
    components: {
      'withdrawal-forms': form,
      'withdrawal-table': table
    },
    methods: {
      refresh () {
        this.$refs.table.refresh()
      }
    }
  }
</script>

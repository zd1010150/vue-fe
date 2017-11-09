<template>
  <div class="container-fluid">

    <div class="row">
      <internal-transfer-form></internal-transfer-form>
    </div>
    <div class="row funds-table">
      <internal-transfer-table></internal-transfer-table>
    </div>
  </div>
</template>
<script>
  import form from './form'
  import table from './table'

  export default {
    components: {
      'internal-transfer-form': form,
      'internal-transfer-table': table
    }
  }
</script>

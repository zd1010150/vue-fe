<template>
  <chp-panel>
    <template slot="panelTitle">Toolbar</template>
    <template slot="panelSubtitle"></template>
    <div class="form-horizontal form-bordered" slot="body">
      <h4>Toolbar</h4>
      <chp-toolbar>
        <div class="chp-toolbar-container row">
          <div class="col-md-2">
            <mu-select-field v-model="pageSize">
              <mu-menu-item :value="10" title="10"/>
              <mu-menu-item :value="20" title="20"/>
              <mu-menu-item :value="30" title="30"/>
              <mu-menu-item :value="40" title="40"/>
            </mu-select-field>
          </div>

          <div class="col-md-10 operaters">
            <mu-icon-button>
              <i class="fa fa-search" aria-hidden="true"></i>
            </mu-icon-button>

            <mu-icon-button>
              <i class="fa fa-filter" aria-hidden="true"></i>
            </mu-icon-button>
          </div>
        </div>
      </chp-toolbar>
      <br/>
    </div>
</chp-panel>

</template>
<script>
  export default {
    props: {
      pageSize: {
        type: Number,
        default: 10
      }
    },
    watch: {
      pageSize (val) {
        this.$emit('pageSizeChanged', val)
      }
    }
  }
</script>
<style class="less">
  button.operater {
    width: 30px;
  }

  .operaters {
    text-align: right;
  }
</style>

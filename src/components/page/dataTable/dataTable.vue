<template>

      <chp-table-card>
        <chp-toolbar v-show="!isDisplayFilter">
          <h1 class="chp-title">Nutrition</h1>
          <mu-icon-button @click="displayFilter">
            <i class="fa fa-filter" aria-hidden="true"></i>
          </mu-icon-button>

          <mu-icon-button @click="add">
            <i class="fa fa-plus" aria-hidden="true"></i>
          </mu-icon-button>
        </chp-toolbar>

        <chp-toolbar v-show="isDisplayFilter">
          <slot name="filterToolbar"></slot>
        </chp-toolbar>

        <chp-table-alternate-header chp-selected-label="selected">

          <slot name="multOperToolbar">

          </slot>
        </chp-table-alternate-header>
        <slot name="table">

        </slot>

        <chp-table-pagination
          chp-size="5"
          chp-total="10"
          chp-page="1"
          chp-label="Rows"
          chp-separator="of"
          :chp-page-options="[5, 10, 25, 50]"
          @pagination="onPagination"></chp-table-pagination>

      </chp-table-card>


</template>
<script>

  export default {
    name:"chp-data-table",
    props:{
      pageSize : {
        type: Number,
        default:10
      },
      isDisplayFilter :{
          type:Boolean,
          default: false
      },
      chpSelection :{
          type:Boolean,
          default: false
      }
    },
    data: () => ({
      total: 150,
      current: 1
    }),
    methods:{
      handlePageClick (newIndex) {
        console.log(newIndex);
      },
      pageSizeChange(newPageSize){
        console.log("pageSizeChanged:",newPageSize);
      },
      onPagination(){

      },
      displayFilter(){
          this.$emit("displayFilter",true);
      },
      selectRow(){
          this.$emit("displayFilter",false);
          console.log("selectroww");
      },
      add(){
          this.$emit("add");
      }
    }
  }
</script>
<style lang="less">
  table th, table td{
  /*text-align: center !important;*/
  &:last-child{
     text-align: left !important;
   }
  }
  .edit-icon{
    font-size: 10px !important;
  }
</style>

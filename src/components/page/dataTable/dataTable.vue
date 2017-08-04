<template>
  <chp-table-card>

    <!--Table header toolbar begin-->
    <chp-toolbar v-show="!isDisplayFilterToolbar">
      <div class="search-row">
        <div class="col-md-4 col-xs-6 text-left" v-if="canPaging">
          <chp-select v-model="innerPageSize" class="pageSelect">
            <mu-menu-item v-for=" (option,index) in pageOptions" :key="index" :value="option" :title="String(option)"></mu-menu-item>
          </chp-select>
          <span class="hidden-sm hidden-xs"> records per page</span>
        </div>
        <div class="col-md-8 col-xs-6 text-right" :class="{'col-md-offset-4':!canPaging,'col-xs-offset-6':!canPaging}">
          <mu-icon-button @click="displayFilter" v-if="canFilter">
            <i class="fa fa-filter" aria-hidden="true"></i>
          </mu-icon-button>
          <template v-if="canAdd">
           <slot name="addToolbar">
             <chp-button class=" btn btn-primary mr-xs" @click="openAddDialog" id="openAddDialogBtn">
             <i class="fa fa-plus mr-xs"></i><slot name="addBtnText">{{ $t('ui.button.add')}}</slot>
            </chp-button>
            <chp-dialog chp-open-from="#openAddDialogBtn" chp-close-to="#openAddDialogBtn" ref="addDialog">
              <slot name="addDialogSlot"></slot>
              <chp-dialog-actions >
                <chp-button class="btn btn-primary" @click="createNewObject">Create</chp-button>
                <chp-button class="btn btn-default " @click="closeDialog('addDialog')">Cancel</chp-button>
              </chp-dialog-actions>
            </chp-dialog>
           </slot>
          </template>
        </div>
      </div>
    </chp-toolbar>
    <!--Table header toolbar end-->

    <!--Filter toolbar begin-->
    
      <chp-toolbar v-show="isDisplayFilterToolbar" class="filter-toolbar">
        <slot name="filterToolbar"></slot>
      </chp-toolbar>
    
    <!--Filter toolbar end-->

    <!--Multi operation toolbar begin-->
    <chp-table-alternate-header chp-selected-label="selected">
      <slot name="multOperToolbar"></slot>
    </chp-table-alternate-header>
    <!--Multi operation toolbar end-->

    <!--Table begin-->
    <slot name="table"></slot>
    <!--Table end-->

    <!--Pagination begin-->
    
    <chp-pagination v-if="canPaging"
      class="pagination-bar "
      :total="rowsTotal"
      :current="currentPage"
      :pageSize="innerPageSize"
      @pageSizeChange="pageSizeChange"
      @pageChange="pageNumberChange"
    ></chp-pagination>
    <!--Pagination end-->

  </chp-table-card>
</template>
<script>

  export default {
    name:"chp-data-table",
    data(){
        return {
          innerPageSize :  this.pageSize
        };
    },
    props:{
      pageSize : {
        type: Number,
        default:10
      },
      rowsTotal:{
        type:Number
      },
      currentPage:{
        type:Number,
        default:1
      },
      pageOptions:{
          type:Array
      },
      canAdd:{
          type:Boolean,
          default: true
      },
      canPaging:{
        type:Boolean,
        default:true
      },
      //是否展示filter按钮
      canFilter:{
          type:Boolean,
          default: true
      },
      //是否展示filter tool bar
      isDisplayFilterToolbar:{
          type:Boolean,
          default: false
      }
    },
    methods:{
      pageNumberChange (newIndex) {
        this.$emit("pageNumberChange",newIndex)
      },
      pageSizeChange(newPageSize){
        this.$emit("pageSizeChange",newPageSize)
      },
      pagination(val){
        this.$emit("pagination",val);
      },
      displayFilter(){
          this.$emit("toggleDisplayFilterToolbar",true);
      },
      selectRow(){
          this.$emit("toggleDisplayFilterToolbar",false);
      },
      openAddDialog(){
          this.openDialog('addDialog');
          this.$emit("openAddDialog");
      },
      openDialog(ref) {
        this.$refs[ref].open();
      },
      closeDialog(ref) {
        this.$refs[ref].close();
      },
      createNewObject(){
        this.closeDialog('addDialog')
        this.$emit("createNewObject");
      }
    }
  }
</script>
<style lang="less">
  @import "~assets/less/variable.less";
  table th, table td{
  /*text-align: center !important;*/
  &:last-child{
     text-align: left !important;
   }
  }
  .edit-icon{
    font-size: 10px !important;
  }
  .pageSelect{
    width:70px;
    margin:7px 0px;
    display: inline-block;
    vertical-align:middle;
    &+span.visible-lg{
      display: inline-block !important;
      vertical-align: middle;
      }
  }
  .search-row{
    width:100%;
    &>div{
        padding:0px;
        &:nth-child(2){
          padding:13px 0px;
         }
      }
  }
  .pagination-bar{
    height:56px;
  }
  .filter-toolbar{

  }
</style>

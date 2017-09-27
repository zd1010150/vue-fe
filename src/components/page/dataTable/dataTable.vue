<i18n src="./i18n.yaml"></i18n>
<template>
  <chp-table-card ref="card" class="data-table">

    <!--Table header toolbar begin-->
    <chp-toolbar v-show="!isDisplayFilterToolbar">
      <div class="search-row">
        <div class="col-md-4 col-xs-4 text-left" v-if="canPaging">
          <mu-select-field v-model="innerPageSize" class="pageSelect">
            <mu-menu-item v-for=" (option,index) in pageOptions" :key="index" :value="option" :title="String(option)"></mu-menu-item>
          </mu-select-field>
          <span class="hidden-sm hidden-xs"> {{ $t('perPage') }}</span>
        </div>
        <div class="col-md-8 col-xs-8 text-right" :class="{'col-md-offset-3':!canPaging,'col-xs-offset-4':!canPaging}">
          <slot name="toolBar">
            <chp-button class=" btn btn-primary mr-xs" @click="displayFilter" v-if="canFilter">
              <i class="fa fa-filter mr-xs hidden-xs"></i>{{ $t('ui.button.search')}}
            </chp-button>
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
          </slot>
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
    <chp-table-alternate-header mu-select-fielded-label="selected">
      <slot name="multOperToolbar"></slot>
    </chp-table-alternate-header>
    <!--Multi operation toolbar end-->

    <!--Table begin-->
    <chp-scroll-bar wrapper="table-main-wrapper" 
                    hBarInternal="tableHorizonInnerBar" 
                    hBar="tableHorizonBar" 
                    :style="styles" 
                    ref="scollerbar">
      <div class="table-container">
        <slot name="table"></slot>
      </div>
    </chp-scroll-bar>
    <!--Table end-->

    <!--Pagination begin-->
    <chp-pagination v-if="canPaging"
                    class="pagination-bar "
                    :total="rowsTotal"
                    :current="currentPage"
                    :pageSize="innerPageSize"
                    @pageSizeChange="pageSizeChange"
                    @pageChange="pageNumberChange"/>
    <!--Pagination end-->

  </chp-table-card>
</template>
<script>
  import "javascript-detect-element-resize"
  export default {
    name:"chp-data-table",
    data(){
        return {
          width:0,
          height:0,
          $table:null,
          $card:null,
          observer:null,
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
      },
      calculateHeight(){
        if(this.$table && this.$card){
          this.height = this.$table.getBoundingClientRect().height + 15
          this.width = this.$card.scrollWidth
        }
      },
    },
    mounted(){
      this.$table = this.$el.querySelector("table")
      this.$card = this.$refs.card.$el
      addResizeListener(this.$table,this.calculateHeight)
    },
    beforeDestory(){
     removeResizeListener(this.$table,this.calculateHeight)
    },
    computed:{
      styles:function(){
        return {
          height:this.height+"px"
        }
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
  .mu-select-field.pageSelect{
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
          padding:9px 0px;
         }
      }
  }
  .pagination-bar{
    height:56px;
  }
  .filter-toolbar{

  }
  .data-table{
    .chp-table{
      display:block;
      box-sizing: border-box;
      overflow-x: visible;
      table{
        width:100%;
        box-sizing: content-box;
        th:last-child,td:last-child{
          padding-right: 24px;
        }
      }
    }
  }
</style>

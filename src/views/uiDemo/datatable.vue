<template>
  <chp-panel>
    <template slot="title">DataTable</template>
    <template slot="subtitle"></template>
    <div class="form-horizontal form-bordered" slot="body">
      <h4>DatePicker8</h4>
      <chp-data-table :isDisplayFilterToolbar="isDisplayFilterToolbar"
                      :pageSize = "pageSize"
                      :rowsTotal = "rowsTotal"
                      :pageOptions = "pageOptions"
                      @toggleDisplayFilterToolbar="toggleDisplayFilterToolbar"
                      @createNewObject="createNewObject"
                      @pageSizeChange="pageSizeChange"
                      @pageNumberChange="pageNumberChange"
                      @pagination = "pagination"
      >
        <!--新增的dialog begin-->
        <template slot="addDialogSlot">
          <chp-dialog-title>Create new Object</chp-dialog-title>
          <chp-dialog-content>add new</chp-dialog-content>
        </template>
        <!--新增的dialog end-->

        <!--过滤的toolbar begin-->
        <div slot="filterToolbar">
          <chp-date-picker container="inline" mode="landscape" hintText="内联横屏模式选择" />
          <chp-date-picker container="inline" mode="landscape" hintText="内联横屏模式选择" />
          <chp-date-picker container="inline" mode="landscape" hintText="内联横屏模式选择" />
          <chp-date-picker container="inline" mode="landscape" hintText="内联横屏模式选择" />
          <chp-date-picker container="inline" mode="landscape" hintText="内联横屏模式选择" />
          <chp-date-picker container="inline" mode="landscape" hintText="内联横屏模式选择" />
          <chp-date-picker container="inline" mode="landscape" hintText="内联横屏模式选择" />
          <chp-date-picker container="inline" mode="landscape" hintText="内联横屏模式选择" />
          <chp-date-picker container="inline" mode="landscape" hintText="内联横屏模式选择" />
          <chp-date-picker container="inline" mode="landscape" hintText="内联横屏模式选择" />

          <mu-icon-button @click="closeFilter">
            <i class="fa fa-times"></i>
          </mu-icon-button>
        </div>
        <!--过滤操作的toolbar begin-->

        <!--批量操作的toolbar begin-->
        <div slot="multOperToolbar">
          <mu-icon-button @click="deleteRows">
           <i class="fa fa-trash-o" aria-hidden="true"></i>
          </mu-icon-button>

          <mu-icon-button >
            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
          </mu-icon-button>
        </div>
        <!--批量操作的toolbar end-->

        <chp-table slot="table" chp-sort="calories" chp-sort-type="desc" @sort="sortRow" @select="selectRow">
          <chp-table-header>
            <chp-table-row>
              <chp-table-head chp-sort-by="dessert">Dessert (100g serving)</chp-table-head>
              <chp-table-head chp-sort-by="type" width="100px">Type</chp-table-head>
              <chp-table-head chp-sort-by="calories" chp-numeric chp-tooltip="The total amount of food energy and the given serving size">Calories (g)</chp-table-head>
              <chp-table-head chp-sort-by="fat" chp-numeric>Fat (g)</chp-table-head>
              <chp-table-head>

                <span>Comments</span>
              </chp-table-head>


            </chp-table-row>
          </chp-table-header>

          <chp-table-body>
            <chp-table-row v-for="(row, rowIndex) in nutrition" :key="rowIndex" :chp-item="row" :chp-selection="chpSelection">
              <chp-table-cell v-for="(column, columnIndex) in row" :key="columnIndex" :chp-numeric="columnIndex !== 'dessert' && columnIndex !== 'comment' && columnIndex !== 'type'">
                <template v-if="columnIndex === 'comment'" >
                  {{ column || '  &nbsp;' }}
                  <mu-icon-button class="edit-icon">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </mu-icon-button>
                </template>



                <chp-select hintText="Type"
                            :name="'type' + columnIndex"
                            :id="'type' + columnIndex"
                            v-model="nutrition[rowIndex].type"
                            v-if="columnIndex === 'type'"
                            :fullWidth="true"
                            @change="updateType(rowIndex)"
                >

                  <mu-menu-item value="ice_cream" title="Ice Cream"></mu-menu-item>
                  <mu-menu-item value="pastry" title="Pastry"></mu-menu-item>
                  <mu-menu-item value="other" title="Other"></mu-menu-item>
                </chp-select>

                <span v-if="columnIndex !== 'type' && columnIndex !== 'comment'" class="chp-cell-content">{{ column }}</span>
              </chp-table-cell>
            </chp-table-row>
          </chp-table-body>
        </chp-table>

      </chp-data-table>
    </div>
  </chp-panel>

</template>
<script >
  import dataTableService from 'services/dataTableService'
  export default{
    data () {
        return{
          isDisplayFilterToolbar : false,
          chpSelection: true, //每一行是否可选
          selectedRows: [],
          pageSize:5,
          rowsTotal:100,
          pageOptions:[5,20,30],
          nutrition: [
            {
              dessert: 'Frozen yogurt',
              type: 'ice_cream',
              calories: '159',
              fat: '6.0',
              comment: 'Icy'
            },
            {
              dessert: 'Ice cream sandwich',
              type: 'ice_cream',
              calories: '237',
              fat: '9.0',
              comment: 'Super Tasty'
            },
            {
              dessert: 'Eclair',
              type: 'pastry',
              calories: '262',
              fat: '16.0',
              comment: ''
            },
            {
              dessert: 'Cupcake',
              type: 'pastry',
              calories: '305',
              fat: '3.7',
              comment: ''
            },
            {
              dessert: 'Gingerbread',
              type: 'other',
              calories: '356',
              fat: '16.0',
              comment: ''
            }
          ]
        }
     } ,
    methods : {

      closeFilter()
      {
        this.isDisplayFilterToolbar = false
      },
      toggleDisplayFilterToolbar(val){

          this.isDisplayFilterToolbar = val
      },
      createNewObject(){
          console.log("createNew");
      },
      deleteRows(){
        console.log("delete these rows",this.selectedRows)
      },
      selectRow(val){
          this.isDisplayFilter = false
          this.selectedRows = val
      },
      sortRow({name,type}){
          console.log("sort",name,type);
      },
      getData(){
        dataTableService.paginQuery();
      },
      pageSizeChange(newSize){
        console.log(newSize);
      },
      pageNumberChange(newIndex){
        console.log(newIndex);
      },
      pagination(val){
          console.log("pagination",val);
      },
      updateType(rowIndex){
        //dataTableService.update();
        console.log("before",this.nutrition[rowIndex].type);
        this.$nextTick(()=>{
          console.log("after",this.nutrition[rowIndex]);
          var obj = this.nutrition[rowIndex];
          //dataTableService.update();

        });
      }

    },
    mounted(){

    }
  }
</script>

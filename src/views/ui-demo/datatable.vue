<template>
  <chp-panel>
    <template slot="title">DataTable</template>
    <template slot="subtitle"></template>
    <div class="form-horizontal form-hordered" slot="body">
      <h4>DatePicker</h4>
      <chp-table-card>
        <chp-toolbar>
          <h1 class="chp-title">Nutrition</h1>
          <mu-icon-button >
            <i class="fa fa-search" aria-hidden="true"></i>
          </mu-icon-button>

          <mu-icon-button >
            <i class="fa fa-filter" aria-hidden="true"></i>
          </mu-icon-button>
        </chp-toolbar>

        <chp-table-alternate-header chp-selected-label="selected">
          <mu-icon-button >
            <i class="fa fa-delete" aria-hidden="true"></i>
          </mu-icon-button>

          <mu-icon-button >
            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
          </mu-icon-button>
        </chp-table-alternate-header>

        <chp-table chp-sort="calories" chp-sort-type="desc">
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
            <chp-table-row v-for="(row, rowIndex) in nutrition" :key="rowIndex" :chp-item="row" chp-selection>
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
                >

                  <mu-menu-item value="ice_cream" title="Ice Cream"></mu-menu-item>
                  <mu-menu-item value="pastry" title="Pastry"></mu-menu-item>
                  <mu-menu-item value="other" title="Other"></mu-menu-item>
                </chp-select>

                <span v-if="columnIndex !== 'type' && columnIndex !== 'comment'">{{ column }}</span>
              </chp-table-cell>
            </chp-table-row>
          </chp-table-body>
        </chp-table>
        <chp-table-pagination
          chp-size="5"
          chp-total="10"
          chp-page="1"
          chp-label="Rows"
          chp-separator="of"
          :chp-page-options="[5, 10, 25, 50]"
          @pagination="onPagination"></chp-table-pagination>

      </chp-table-card>
    </div>

  </chp-panel>

</template>
<script>

  export default {
      props:{
        pageSize : {
            type: Number,
            default:10
        }
      },
    data: () => ({
      total: 150,
      current: 1,
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
      ],
    }),
    methods:{
      handlePageClick (newIndex) {
        console.log(newIndex);
      },
      pageSizeChange(newPageSize){
        console.log("pageSizeChanged:",newPageSize);
      },
      onPagination(){

      }
    }
  }
</script>
<style lang="less">
  table th, table td{
    text-align: center !important;
    &:last-child{
      text-align: left !important;
     }
  }
  .edit-icon{
    font-size: 10px !important;
  }
</style>

/**
 * reference API:http://vuematerial.io/#/components/table
 */
import chpTable from './chpTable.vue';
import chpTableRow from './chpTableRow.vue';
import chpTableHead from './chpTableHead.vue';
import chpTableCell from './chpTableCell.vue';
import chpTableEdit from './chpTableEdit.vue';
import chpTableCard from './chpTableCard.vue';
import chpTableAlternateHeader from './chpTableAlternateHeader.vue';
import chpTablePagination from './chpTablePagination.vue';


export default function install(Vue) {
  Vue.component('chp-table', chpTable);
  Vue.component('chp-table-header', {
    functional: true,
    render: (h, scope) => h('thead', {
      staticClass: 'chp-table-header'
    }, scope.children)
  });
  Vue.component('chp-table-body', {
    functional: true,
    render: (h, scope) => h('tbody', {
      staticClass: 'chp-table-body'
    }, scope.children)
  });
  Vue.component('chp-table-row', chpTableRow);
  Vue.component('chp-table-head', chpTableHead);
  Vue.component('chp-table-cell', chpTableCell);
  Vue.component('chp-table-edit', chpTableEdit);
  Vue.component('chp-table-card', chpTableCard);
  Vue.component('chp-table-alternate-header', chpTableAlternateHeader);
  Vue.component('chp-table-pagination',chpTablePagination);


}

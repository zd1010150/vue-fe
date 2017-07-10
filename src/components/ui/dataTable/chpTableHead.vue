<template>
  <th class="chp-table-head" :class="classes" @click="changeSort">
    <div class="chp-table-head-container">
      <div class="chp-table-head-text chp-test">
        <i class="fa fa-arrow-up chp-sortable-icon" aria-hidden="true"></i>

        <slot></slot>

        <chp-tooltip v-if="chpTooltip">{{ chpTooltip }}</chp-tooltip>
      </div>

      <chp-ink-ripple :chp-disabled="!chpSortBy" />
    </div>
  </th>
</template>

<script>
  import getClosestVueParent from '../core/utils/getClosestVueParent';

  export default {
    name: 'chp-table-head',
    props: {
      chpNumeric: Boolean,
      chpSortBy: String,
      chpTooltip: String
    },
    data() {
      return {
        sortType: null,
        sorted: false,
        parentTable: {}
      };
    },
    computed: {
      classes() {
        const matchSort = this.hasMatchSort();

        if (!matchSort) {
          this.sorted = false;
        }

        return {
          'chp-numeric': this.chpNumeric,
          'chp-sortable': this.chpSortBy,
          'chp-sorted': matchSort && this.sorted,
          'chp-sorted-descending': matchSort && this.sortType === 'desc'
        };
      }
    },
    methods: {
      hasMatchSort() {
        return this.parentTable.sortBy === this.chpSortBy;
      },
      changeSort() {
        if (this.chpSortBy) {
          if (this.sortType === 'asc' && this.sorted) {
            this.sortType = 'desc';
          } else {
            this.sortType = 'asc';
          }

          this.sorted = true;

          this.parentTable.sortType = this.sortType;
          this.parentTable.emitSort(this.chpSortBy);
        }
      },
      initSort() {
        if (this.hasMatchSort()) {
          this.sorted = true;
          this.sortType = this.parentTable.sortType || 'asc';
        }
      }
    },
    mounted() {
      this.parentTable = getClosestVueParent(this.$parent, 'chp-table');
      this.initSort();
      this.parentTable.$on('sortInput', () => {
        this.initSort();
      });
    }
  };
</script>

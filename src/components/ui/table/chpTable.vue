<template>

  <div class="chp-table">
    <table>
      <slot></slot>
    </table>
  </div>

</template>

<style lang="scss" src="./chpTable.scss"></style>

<script>
  import getClosestVueParent from '../core/utils/getClosestVueParent'

  export default {
    name: 'chp-table',
    props: {
      chpSortType: String,
      chpSort: String
    },
    data () {
      return {
        sortType: this.chpSortType,
        sortBy: this.chpSort,
        hasRowSelection: false,
        data: [],
        selectedRows: []
      }
    },
    computed: {
      numberOfRows () {
        return this.data ? this.data.length : 0
      },
      numberOfSelected () {
        return this.selectedRows ? this.selectedRows.length : 0
      }
    },
    methods: {
      emitSort (name) {
        this.sortBy = name
        this.$emit('sort', {
          name,
          type: this.sortType
        })
      },
      emitSelection () {
        this.$emit('select', this.selectedRows)
      },
      removeRow (row, array = null) {
        const list = array || this.data, index = list.indexOf(row)

        if (index !== -1) {
          list.splice(index, 1)
        }
      },
      setRowSelection (isSelected, row) {
        if (isSelected) {
          this.selectedRows.push(row)
          return
        }
        this.removeRow(row, this.selectedRows)
      },
      setMultipleRowSelection (isSelected) {
        this.selectedRows = isSelected ? Object.assign([], this.data) : []
      }
    },
    watch: {
      chpSort () {
        this.sortBy = this.chpSort
        this.$emit('sortInput')
      },
      chpSortType () {
        this.sortType = this.chpSortType
        this.$emit('sortInput')
      }
    },
    mounted () {
      this.parentCard = getClosestVueParent(this.$parent, 'chp-table-card')

      if (this.parentCard) {
        this.parentCard.tableInstance = this
      }
    }
  }
</script>


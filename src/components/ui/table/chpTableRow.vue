<template>
  <tr
    class="chp-table-row"
    :class="classes"
    @click="autoSelect"
    @click.native="autoSelect">
    <chp-table-cell
      v-if="hasSelection"
      class="chp-table-selection">

      <table-checkbox  v-model="checkbox" :nativeValue="chpItem" :disabled="isDisabled" @change="select" @change.native="select"></table-checkbox>


    </chp-table-cell>

    <slot/>
  </tr>
</template>

<script>
  import getClosestVueParent from '../core/utils/getClosestVueParent';
  import uniqueId from '../core/utils/uniqueId';
  import checkBox from './chpTableCheckbox'
  const transitionClass = 'chp-transition-off';

  export default {
    components :{
      'table-checkbox' : checkBox
    },
    name: 'chp-table-row',
    props: {
      chpAutoSelect: Boolean,
      chpSelection: Boolean,
      chpItem: Object
    },
    data() {
      return {
        parentTable: {},
        headRow: false,
        checkbox: false,
        index: 0,
        uuid: `chprow_uuid_${uniqueId()}`
      };
    },
    computed: {
      isDisabled() {
        return !this.chpSelection && !this.headRow;
      },
      hasSelection() {
        return this.chpSelection || this.headRow && this.parentTable.hasRowSelection;
      },
      classes() {
        return {
          'chp-selected': this.checkbox
        };
      }
    },
    watch: {
      chpItem(newValue, oldValue) {
        this.parentTable.data[this.index] = this.chpItem;
        this.handleMultipleSelection(newValue === oldValue);
      }
    },
    methods: {
      setRowSelection(value, row) {
        this.parentTable.setRowSelection(value, row);
      },
      handleSingleSelection(value) {
        this.parentTable.setRowSelection(value, this.chpItem);
        this.parentTable.$children[0].checkbox = this.parentTable.numberOfSelected === this.parentTable.numberOfRows;
      },
      handleMultipleSelection(value) {
        if (this.parentTable.numberOfRows > 25) {
          this.parentTable.$el.classList.add(transitionClass);
        }

        this.parentTable.$children.forEach((row) => {
          row.checkbox = value;
        });

        this.parentTable.setMultipleRowSelection(value);

        window.setTimeout(() =>
          this.parentTable.$el.classList.remove(transitionClass),
          100);
      },
      select(value) {
        if (!this.hasSelection) {
          return;
        }

        if (this.headRow) {
          this.handleMultipleSelection(value);
        } else {
          this.handleSingleSelection(value);
        }

        this.parentTable.emitSelection();
        this.$emit(value ? 'selected' : 'deselected', value);
      },
      autoSelect() {
        if (this.chpAutoSelect && this.hasSelection) {
          this.checkbox = !this.checkbox;
          this.handleSingleSelection(this.checkbox);
          this.parentTable.emitSelection();
        }
      },
      startTableRow() {
        this.parentTable = getClosestVueParent(this.$parent, 'chp-table');

        if (this.$el.parentNode.tagName.toLowerCase() === 'thead') {
          this.headRow = true;
        } else {
          if (!this.chpItem && this.chpSelection) {
            throw new Error('You should set the chp-item property when using chpSelection. Example: <chp-table-row chp-selection :chp-item="ITEM" ...>');
          }

          if (this.chpSelection) {
            this.parentTable.hasRowSelection = true;
          }
          this.parentTable.data.push(this.chpItem);
        }
      }
    },
    destroyed() {
      this.parentTable.removeRow(this.chpItem);
    },
    mounted() {
      this.startTableRow();
    }
  };
</script>

<template>
  <chp-menu-item
    class="chp-option"
    :class="classes"
    @click.native="selectOption"
    tabindex="-1">
    <chp-checkbox class="chp-primary" v-model="check" v-if="parentSelect.multiple">
      <span ref="item">
        <slot></slot>
      </span>
    </chp-checkbox>

    <span ref="item" v-else>
      <slot></slot>
    </span>
  </chp-menu-item>
</template>

<script>
  import getClosestVueParent from '../../core/utils/getClosestVueParent';

  export default {
    props: {
      value: [String, Boolean, Number, Object]
    },
    data: () => ({
      parentSelect: {},
      check: false,
      index: 0
    }),
    computed: {
      isSelected() {
        if (this.value && this.parentSelect.value) {
          let thisValue = this.value.toString();

          if (this.parentSelect.multiple) {
            return this.parentSelect.value.indexOf(thisValue) >= 0;
          }

          return this.value && this.parentSelect.value && thisValue === this.parentSelect.value.toString();
        }

        return false;
      },
      classes() {
        return {
          'chp-selected': this.isSelected,
          'chp-checked': this.check
        };
      }
    },
    methods: {
      isMultiple() {
        return this.parentSelect.multiple;
      },
      setParentOption() {
        if (!this.isMultiple()) {
          this.parentSelect.selectOption(this.value, this.$refs.item.textContent);
        } else {
          this.check = !this.check;
        }
      },
      selectOption($event) {
        this.setParentOption();
        this.$emit('selected', $event);
      }
    },
    watch: {
      isSelected(selected) {
        if (this.isMultiple()) {
          this.check = selected;
        }
      },
      check(check) {
        if (check) {
          this.parentSelect.selectMultiple(this.index, this.value, this.$refs.item.textContent);
        } else {
          this.parentSelect.selectMultiple(this.index);
        }
      }
    },
    mounted() {
      this.parentSelect = getClosestVueParent(this.$parent, 'chp-select');
      this.parentContent = getClosestVueParent(this.$parent, 'chp-menu-content');

      if (!this.parentSelect) {
        throw new Error('You must wrap the chp-option in a chp-select');
      }

      this.parentSelect.optionsAmount++;
      this.index = this.parentSelect.optionsAmount;

      this.parentSelect.multipleOptions[this.index] = {};
      this.parentSelect.options[this.index] = this;

      if (this.isMultiple() && this.parentSelect.value.indexOf(this.value) >= 0 || this.parentSelect.value === this.value) {
        this.setParentOption();
      }
    },
    beforeDestroy() {
      if (this.parentSelect) {
        delete this.parentSelect.options[this.index];
        delete this.parentSelect.multipleOptions[this.index];
      }
    }
  };
</script>

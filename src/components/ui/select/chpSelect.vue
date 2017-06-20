<template>
  <div class="chp-select" :class="[themeClass, classes]">
    <chp-menu :chp-close-on-select="!multiple" @opened="$emit('open')" @closed="$emit('close')" v-bind="chpMenuOptions">
      <slot name="icon"></slot>
      <span class="chp-select-value" chp-menu-trigger ref="value" :style="valueStyle">{{ selectedText || placeholder }}</span>

      <chp-menu-content class="chp-select-content" :class="[themeClass, contentClasses]">
        <slot></slot>
      </chp-menu-content>
    </chp-menu>

    <select :name="name" :id="id" :required="required" :disabled="disabled" tabindex="-1">
      <option selected="true" :value="selectedValue" v-if="!multiple">{{ selectedText }}</option>
      <option selected="true" v-for="option in multipleOptions" v-if="option.value" :value="option.value">{{ option.text }}</option>
    </select>
  </div>
</template>

<style lang="scss" src="./chpSelect.scss"></style>

<script>

  import getClosestVueParent from '../core/utils/getClosestVueParent';
  import isArray from '../core/utils/isArray';

  export default {
    props: {
      name: String,
      id: String,
      required: Boolean,
      multiple: Boolean,
      value: [String, Number, Array],
      disabled: Boolean,
      placeholder: String,
      chpMenuClass: String,
      chpMenuOptions: Object
    },
    data() {
      return {
        selectedValue: null,
        selectedText: null,
        multipleOptions: {},
        options: {},
        optionsAmount: 0
      };
    },
    computed: {
      classes() {
        return {
          'chp-disabled': this.disabled,
          'chp-select-icon': this.hasIcon
        };
      },
      contentClasses() {
        if (this.multiple) {
          return 'chp-multiple ' + this.chpMenuClass;
        }

        return this.chpMenuClass;
      },
      hasIcon() {
        return this.$slots['icon'];
      },
      valueStyle() {
        return this.hasIcon ? {
          display: 'none'
        } : {};
      }
    },
    watch: {
      value(value) {
        this.setTextAndValue(value);
        this.selectOptions(value);
      },
      disabled() {
        this.setParentDisabled();
      },
      required() {
        this.setParentRequired();
      },
      placeholder() {
        this.setParentPlaceholder();
      }
    },
    methods: {
      setParentDisabled() {
        this.parentContainer.isDisabled = this.disabled;
      },
      setParentRequired() {
        this.parentContainer.isRequired = this.required;
      },
      setParentPlaceholder() {
        this.parentContainer.hasPlaceholder = !!this.placeholder;
      },
      selectOptions(modelValue) {
        const optionsArray = Object.keys(this.options).map((el) => this.options[el]);

        if (optionsArray && optionsArray.length) {
          optionsArray.filter((el) => modelValue.indexOf(el.value) !== -1)
            .forEach((el) => {
              el.check = true;
            });
        }
      },
      getSingleValue(value) {
        let output = {};

        Object.keys(this.options).forEach((index) => {
          const options = this.options[index];

          if (options.value === value) {
            output.value = value;
            output.text = options.$refs.item.textContent;
          }
        });

        return output;
      },
      getMultipleValue(modelValue) {
        if (isArray(this.value)) {
          let outputText = [];

          modelValue.forEach((value) => {
            Object.keys(this.options).forEach((index) => {
              const options = this.options[index];

              if (options.value === value) {
                let text = options.$refs.item.textContent;

                this.multipleOptions[index] = {
                  value,
                  text
                };
                outputText.push(text);
              }
            });
          });

          return {
            value: modelValue,
            text: outputText.join(', ')
          };
        }

        return {};
      },
      setTextAndValue(modelValue) {
        const output = this.multiple ?
          this.getMultipleValue(modelValue) :
          this.getSingleValue(modelValue);

        this.selectedValue = output.value;
        this.selectedText = output.text;

        if (this.parentContainer) {
          this.parentContainer.setValue(this.selectedText);
        }
      },
      changeValue(value) {
        this.$emit('input', value);
        this.$emit('change', value);
        this.$emit('selected', value);
      },
      selectMultiple(index, value, text) {
        let values = [];

        this.multipleOptions[index] = {
          value,
          text
        };

        for (var key in this.multipleOptions) {
          if (this.multipleOptions.hasOwnProperty(key) && this.multipleOptions[key].value) {
            values.push(this.multipleOptions[key].value);
          }
        }

        this.changeValue(values);
      },
      selectOption(value, text) {
        this.selectedText = text;
        this.setTextAndValue(value);
        this.changeValue(value);
      }
    },
    mounted() {
      this.parentContainer = getClosestVueParent(this.$parent, 'chp-input-container');

      if (this.parentContainer) {
        this.setParentDisabled();
        this.setParentRequired();
        this.setParentPlaceholder();
        this.parentContainer.hasSelect = true;
      }

      this.setTextAndValue(this.value);
    },
    beforeDestroy() {
      if (this.parentContainer) {
        this.parentContainer.setValue('');
        this.parentContainer.hasSelect = false;
      }
    }
  };
</script>

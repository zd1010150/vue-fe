<template>
  <div class="chp-checkbox" :class="[themeClass, classes]">
    <div class="chp-checkbox-container" @click.stop="toggleCheck" tabindex="0">
      <input type="checkbox" :name="name" :id="id" :disabled="disabled" :value="value" :checked="checked" tabindex="-1">
      <chp-ink-ripple :chp-disabled="disabled" />
    </div>

    <label :for="id || name" class="chp-checkbox-label" v-if="$slots.default">
      <slot></slot>
    </label>
  </div>
</template>

<style lang="scss" src="./chpCheckbox.scss"></style>

<script>


  export default {
    props: {
      name: String,
      value: [String, Boolean],
      id: String,
      disabled: Boolean
    },
    data() {
      return {
        checked: this.value
      };
    },
    computed: {
      classes() {
        return {
          'chp-checked': this.checked,
          'chp-disabled': this.disabled
        };
      }
    },
    watch: {
      value() {
        this.checked = !!this.value;
      }
    },
    methods: {
      toggleCheck($event) {
        if (!this.disabled) {
          this.checked = !this.checked;
          this.$emit('change', this.checked, $event);
          this.$emit('input', this.checked, $event);
        }
      }
    }
  };
</script>

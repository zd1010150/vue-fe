<template>
  <div class="chp-radio" :class="[classes]">
    <div class="chp-radio-container" @click.stop="toggleCheck">
      <input type="radio" :name="name" :id="id" :disabled="disabled" :value="value">
      <chp-ink-ripple :chp-disabled="disabled" />
    </div>

    <label :for="id || name" class="chp-radio-label" v-if="$slots.default" @click="toggleCheck">
      <slot></slot>
    </label>
  </div>
</template>

<style lang="scss" src="./chpRadio.scss"></style>

<script>


  export default {
    name: 'chp-radio',
    props: {
      name: String,
      id: String,
      value: [String, Boolean, Number],
      mdValue: {
        type: [String, Boolean, Number],
        required: true
      },
      disabled: Boolean
    },
    computed: {
      classes() {
        return {
          'chp-checked': typeof this.value !== 'undefined' && this.value !== null && this.mdValue.toString() === this.value.toString(),
          'chp-disabled': this.disabled
        };
      }
    },
    methods: {
      toggleCheck($event) {
        if (!this.disabled) {
          this.$emit('change', this.mdValue, $event);
          this.$emit('input', this.mdValue, $event);
        }
      }
    }
  };
</script>

<template>
  <div class="chp-checkbox" :class="[classes]">
    <div class="chp-checkbox-container" @click.stop="toggleCheck" tabindex="0">
      <input type="checkbox" :disabled="disabled" :name="name" value="nativeValue" :checked="checked">
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
      value: {},
      id: String,
      disabled: Boolean,
      nativeValue: {}
    },
    
    computed: {
      classes() {
        return {
          'chp-checked': this.checked,
          'chp-disabled': this.disabled
        };
      }
    },
    data () {
      return {
        inputValue: this.value,
        checked: this.value.indexOf(this.nativeValue) > -1
      }
    },
    watch: {
      value (val) {
        this.checked = val.indexOf(this.nativeValue) > -1
        this.inputValue = val;
      }
    },    
    methods: {
      toggleCheck() {
        if (!this.disabled) {
          this.checked =  !this.checked;
         
          if(this.checked){
             this.inputValue.push(this.nativeValue);
          }else{
             let index = this.value.indexOf(this.nativeValue);
             this.inputValue.splice(index,1);
          }
          this.$emit('input',this.inputValue);
          this.$emit('change',this.inputValue);
        }
      }
    }
  };
</script>

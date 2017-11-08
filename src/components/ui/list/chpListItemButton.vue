<template>
  <li class="chp-list-item" :class="classes">
    <div class="chp-list-item-container chp-button">
      <slot></slot>
    </div>

    <chp-button type="button" class="chp-button-ghost" @click="$emit('click', $event)"
                :disabled="disabled"></chp-button>
  </li>
</template>

<script>
  export default {
    name: 'chp-list-item',
    props: {
      disabled: Boolean
    },
    computed: {
      classes () {
        return {
          'chp-disabled': this.disabled
        }
      }
    }
  }
</script>

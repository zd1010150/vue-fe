<template>
  <li class="chp-list-item" :class="classes">
    <a class="chp-list-item-container chp-button" :href="href" :target="target" @click="$emit('click', $event)"
       :disabled="disabled">
      <slot/>
    </a>

    <chp-ink-ripple :disabled="disabled"/>
  </li>
</template>

<script>
  export default {
    name: 'chp-list-item',
    props: {
      href: String,
      target: String,
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

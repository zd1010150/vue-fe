<template>
  <button class="btn" :class="classes" :type="type" :disabled="disabled" v-if="!href" @click.stop="clickHandler">
    <chp-ink-ripple :chp-disabled="disabled"></chp-ink-ripple>
    <slot></slot>
  </button>

  <a class="btn" :class="classes" :href="href" :disabled="disabled" :target="target" :rel="newRel" v-else>
    <chp-ink-ripple :chp-disabled="disabled"></chp-ink-ripple>
    <slot></slot>
  </a>
</template>
<script>
  export default {
    name:"chp-button",
    props: {
      href: String,
      target: String,
      rel: String,
      type: {
        type: String,
        default: 'button'
      },
      disabled: {
        type: Boolean,
        default:false
      },
      classes:{
          type: String,
          default:'btn-sm'
      }
    },
    computed: {
      newRel() {
        if (this.target === '_blank') {
          return this.rel || 'noopener';
        }

        return this.rel;
      }
    },
    methods:{
      clickHandler(){
          this.$emit("click");
      }
    }
  };
</script>

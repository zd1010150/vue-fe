<template>
  <li class="chp-list-item" :class="classes">
    <div class="chp-list-item-container chp-button">
      <slot></slot>
    </div>

    <chp-button type="button" class="chp-button-ghost" :disabled="disabled"></chp-button>
  </li>
</template>

<script>
  export default {
    name: 'chp-list-item',
    props: {
      disabled: Boolean
    },
    computed: {
      classes() {
        return {
          'chp-disabled': this.disabled
        };
      }
    }
  };
</script>
<style>
  .chp-button-ghost{
    width: 100%;
    margin: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    border-radius: 0;
    min-width: 88px;
    min-height: 36px;
    margin: 6px 8px;
    padding: 0 16px;
    display: inline-block;
    position: relative;
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    background: none;
    border: 0;
    border-radius: 2px;
    transition: all .4s cubic-bezier(.25,.8,.25,1);
    color: currentColor;
    font-family: inherit;
    font-size: 14px;
    font-style: inherit;
    font-variant: inherit;
    font-weight: 500;
    letter-spacing: inherit;
    line-height: 36px;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    vertical-align: top;
    white-space: nowrap;
  }
</style>

<template lang="html">
  <chp-main-layout>
    <div class="container" slot="content-body">
      <mu-select-field v-model="game2">
        <mu-menu-item value="1" title="阴阳师"/>
        <mu-menu-item value="2" title="影之刃"/>
        <mu-menu-item value="3" title="天下HD"/>
        <mu-menu-item value="4" title="穿越火线"/>
        <mu-menu-item value="5" title="英雄联盟"/>
        <mu-menu-item value="6" title="王者荣耀"/>
      </mu-select-field>
    </div>
    </div>

  </chp-main-layout>

</template>

<script>


  export default {
    name: "main",
    data(){
      return {
          radio1:"2",
        game2:""
      }
    },
    computed: {
      username (){
        if (this.$store.state.userInfo) {
          return this.$store.state.userInfo.name;
        } else {
          return ""
        }
        ;
      }
    }
  }
</script>

<style lang="css">
</style>

<template>
  <transition name="fade" mode="out-in">
    <div class="col-lg-12">
      test form validate router
      <button @click="toggle">toggle</button>
      <transition name="fade" mode="out-in" >
        <span v-if="show">test</span>
      </transition>

    </div>
  </transition>

</template>
<script>
  export default{
      data(){
          return {
              show:true
          }
      },
      methods:{
          toggle(){
              this.show = !this.show
          }
      }
  }
</script>

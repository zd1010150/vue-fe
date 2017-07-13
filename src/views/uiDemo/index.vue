<template>
  <chp-main-layout>
    <div class="row" slot="content-body">
      <ul>
        <li>
          <router-link to="/uiDemo/ui-component" >ui-component</router-link>
        </li>
        <li>
          <router-link to="/uiDemo/form-validate" >form-validate</router-link>
        </li>
      </ul>

        <router-view></router-view>


    </div>
  </chp-main-layout>
</template>
<script>
  export default{
    data(){
        return {
          transitionName:"slide"
        }
    },
    watch: {
      '$route' (to, from) {
          console.log(to.path,from.path);
      }
    }
  }
</script>

<style>
@import './home.css';

</style>

<template>

  <div>
   <hometask ></hometask> 
    <homesuccess></homesuccess> 
   <homefail></homefail>  
  </div>

</template>

<script>
import homesuccess from "./homesuccess.vue";
import hometask from "./hometask.vue";
import homefail from './homefail.vue'
export default {
 
  components: {
    homesuccess,
    hometask,
    homefail
  }
};
</script>
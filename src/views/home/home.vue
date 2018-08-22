<template>
  <div>
   <homean></homean> 
    <homepie></homepie> 
  </div>

</template>

<script>
import homepie from "./homepie.vue";
import homean from "./homeannular.vue";
export default {
  components: {
    homepie,
    homean
  }
};
</script>
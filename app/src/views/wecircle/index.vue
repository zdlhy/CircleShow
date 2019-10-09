<template>
  <div>
    <topHead></topHead>
    <bgTemp class="top-img"></bgTemp>
    <list></list>
  </div>
</template>

<script>
import topHead from "./header";
import bgTemp from "./background"
import list from './list'

export default {
  components: {
    topHead,
    bgTemp,
    list
  }
};
</script>

<style lang="scss" scoped>
</style>
<template>
  <div>
    <topHead></topHead>
    <bgTemp class="top-img"></bgTemp>
    <list></list>
  </div>
</template>

<script>
import topHead from "./header";
import bgTemp from "./background";
import list from "./list";

export default {
  components: {
    topHead,
    bgTemp,
    list
  },
  beforeCreate() {
    if (!this.$store.state.user._id) {
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

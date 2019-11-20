<template>
  <div class="top-head clearfix" :class="{show:showFlag}">
    <i class="right-btn" @click="goPublish"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFlag: true
    };
  },
  mounted() {
    this.$bus.$on("showHeader", () => {
      this.headerClass = true;
    });

    this.$bus.$on("hideHeader", () => {
      this.headerClass = false;
    });
  },
  beforeDestroy() {
    this.$bus.$off('showHeader');
    this.$bus.$off('hideHeader');
  },
  methods: {
    goPublish() {
      if (this.$store.state.user) {
        this.$router.push("/publish");
      } else {
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.top-head {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  padding: 15px;
  background: transparent;
  z-index: 1000;
  &.show{
    background: #eaeaea;
  }
}
.right-btn {
  display: inline-block;
  width: 24px;
  height: 24px;
  background: url("../../assets/circle.png") no-repeat center;
  background-size: 100%;
  float: right;
}
</style>
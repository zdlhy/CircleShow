<template>
  <div class="top-head clearfix" :class="{show:showFlag}">
    <i class="right-btn" @click="goPublish"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFlag: false
    };
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
  background: #eaeaea;
  z-index: 1000;
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
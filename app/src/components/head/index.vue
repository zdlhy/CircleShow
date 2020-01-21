<template>
  <div class="header-bar scale-1px">
    <p class="title">{{title}}</p>
    <div class="left-icon" @click="goBack"></div>
  </div>
</template>
<script>
export default {
  props: ['title'],
  methods: {
    goBack () {
      this.$emit('goBack')
    }
  }
}
</script>
<style lang="scss" scoped>
.header-bar {
  // height: 3rem;
  background: #eee;
  padding: 16px 0;
  position: relative;
  .title {
    color: #000;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    // height: 3rem;
    // line-height: 3rem;
  }
  .left-icon::before {
    content: " ";
    cursor: pointer;
    display: inline-block;
    height: 18px;
    width: 18px;
    border-width: 2px 2px 0 0;
    border-color: #000;
    border-style: solid;
    -webkit-transform: translateY(-50%) matrix(-0.71, 0.71, 0.71, 0.71, 0, 0);
    transform: translateY(-50%) matrix(-0.71, 0.71, 0.71, 0.71, 0, 0);
    position: absolute;
    left: 20px;
    top: 50%;
  }
}
</style>

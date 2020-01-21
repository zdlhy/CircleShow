<template>
  <div class="flex">
    <a href="javascript:;" @click="btn1">{{btn.btn1.name}}</a>
    <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary" :class="{'weui-btn_disabled':btn.btn2.disabled}" :disabled="btn.btn2.disabled" @click="btn2">{{btn.btn2.name}}</a>
  </div>
</template>
<script>
export default {
  props: ['btn'],
  methods: {
    btn1 () {
      if (!this.btn.btn1.disabled) {
        this.$emit('btn1')
      }
    },
    btn2 () {
      if (!this.btn.btn2.disabled) {
        this.$emit('btn2')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 0;
  a:first-child {
    color: #333;
  }
  .weui-btn {
    margin: 0;
  }
}
</style>

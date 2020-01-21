<template>
  <div class="wrap">
    <input type="text" v-model='msg'  @keydown.13="publish"/>
    <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary send-btn" @click="publish">发送</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    publish () {
      this.$emit('publish', this.msg)
      this.msg = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  padding: 10px 10px 10px 20px;
  display: flex;
  input {
    width: 100%;
    padding: 5px 10px;
    font-size: 16px;
    outline: none;
  }
  .send-btn {
    white-space: nowrap;
    margin-left: 10px;
  }
}
</style>

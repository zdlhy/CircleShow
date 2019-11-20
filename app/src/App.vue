<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    /**
     * 解决当浏览器刷新时vuex数据丢失问题
     */
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
      sessionStorage.removeItem('store')
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style lang="scss">
html,body{
  width: 100%;
  height: 100%;
}
*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
.clearfix{
  zoom: 1;
  &::before,&::after{
    display: block;
    height: 0px;
    clear: both;
    content: '';
    overflow: hidden;
  }
}
</style>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

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

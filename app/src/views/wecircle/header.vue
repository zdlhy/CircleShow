<template>
  <div class="top-head clearfix" :class="{show:showFlag}" :style="{opacity:opacity}">
    <i class="right-btn" @click="goPublish"></i>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showFlag: false,
      opacity: 1
    }
  },
  mounted () {
    this.$bus.$on('showHeader', scrollTop => {
      // 230 250 280
      let showMin = 210
      let showMed = 250
      let showMax = 290
      if (scrollTop < showMin) {
        this.showFlag = false
        this.opacity = 1
      } else if (scrollTop >= showMin && scrollTop < showMed) {
        let _opacity = (showMed - scrollTop) / (showMed - showMin)
        this.opacity = _opacity
        this.showFlag = false
      } else if (scrollTop >= showMed && scrollTop < showMax) {
        let _opacity = 1 - (showMax - scrollTop) / (showMax - showMed)
        this.opacity = _opacity
        this.showFlag = true
      } else {
        this.opacity = 1
        this.showFlag = true
      }
    })
  },
  beforeDestroy () {
    this.$bus.$off('showHeader')
    this.$bus.$off('hideHeader')
  },
  methods: {
    goPublish () {
      if (this.$store.state.user) {
        this.$router.push('/publish')
      } else {
        this.$router.push('/login')
      }
    }
  }
}
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
  &.show {
    background: #eaeaea;
  }
}

.show .right-btn {
  background: url("../../assets/circle-b.png") no-repeat center;
  background-size: 100%;
}

.right-btn {
  float: right;
  display: inline-block;
  width: 24px;
  height: 24px;
  background: url("../../assets/circle.png") no-repeat center;
  background-size: 100%;
}
</style>

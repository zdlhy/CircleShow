<template>
  <div class="wrap">
    <div class="top-img" :style="topImgStyle" @click="changeBg"></div>
    <div class="name-info">
      <p class="nickname">{{nickname}}</p>
      <img @click="goMyPage" class="avatar" :src="myAvatar" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: "alisa",
      myAvatar: require("assets/avatar.png"),
      topImgStyle: {
        "background-image": `url(${require("assets/default-bg.jpg")})`,
        color: "#aaa"
      }
    };
  },
  methods: {
    goMyPage() {},
    changeBg() {}
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
}
.top-img {
  // height: 639px;
  height: 318px;
  width: 100%;
  background-size: cover;
  background-position: center center;
}
.name-info {
  position: absolute;
  bottom: 0px;
  transform: translateY(25%);
  right: 10px;
  display: flex;
  align-items: center;
  .nickname {
    color: #fff;
    margin-right: 15px;
    font-size: 24px;
  }
  .avatar {
    display: inline-block;
    background: #5e5e5e;
    width: 132px;
    height: 132px;
    border-radius: 50%;
  }
}
</style>
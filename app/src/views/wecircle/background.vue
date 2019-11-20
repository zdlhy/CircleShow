<template>
  <div class="wrap">
    <div class="top-img" :style="topImgStyle" @click="changeBg"></div>
    <div class="name-info">
      <p class="nickname">{{nickname}}</p>
      <img @click="goMyPage" class="avatar" :src="myAvatar" />
    </div>
    <div style="display:none;" id="uploaderBg">
      <input
        ref="uploaderBg"
        id="uploaderInput"
        class="weui-uploader__input"
        type="file"
        accept="image/*"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: "alisa",
      myAvatar: require("assets/avatar.png")
    };
  },
  mounted() {
    var _this = this;
    //这里的id需要和dom上一致
    weui.uploader("#uploaderBg", {
      url: "/user/uploadimg",
      auto: true,
      type: "file",
      fileVal: "image",
      compress: {
        width: 1300,
        height: 1300,
        quality: 0.8
      },
      onBeforeQueued: function(files) {
        // `this` 是轮询到的文件, `files` 是所有文件

        if (
          ["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(
            this.type
          ) < 0
        ) {
          weui.alert("请上传图片");
          return false; // 阻止文件添加
        }
        if (this.size > 10 * 1024 * 1024) {
          weui.alert("请上传不超过10M的图片");
          return false;
        }
        if (files.length > 1) {
          // 防止一下子选择过多文件
          weui.alert("最多只能上传1张图片，请重新选择");
          return false;
        }

        // return true; // 阻止默认行为，不插入预览图的框架
      },
      onBeforeSend: function(data, headers) {
        $.extend(data, { id: _this.$store.state.user._id });
        // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
        // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部
        headers["wec-access-token"] = service.token;
        // return false; // 阻止文件上传
      },
      onSuccess: function(ret) {
        // console.log(this, ret)
        // self.$emit('uploaded',ret)
        // return true; // 阻止默认行为，不使用默认的成功态

        _this.submitBg(ret);
      }
    });
  },
  computed: {
    topImgStyle() {
      //背景图片首先从store里面获取，获取不到就采用默认的背景图片
      let url =
        this.$store.state.user.bgurl || require("assets/default-bg.jpg");
      let obj = {
        backgroundImage: "url(" + url + ")"
      };
      return obj;
    }
  },
  methods: {
    goMyPage() {
      //判断是否登录
      if (!this.$store.state.user._id) {
        this.$router.push({
          path: "login",
          name: "login"
        });
        return;
      }
      //打开我的页面
      this.$router.push({
        path: "mypage",
        name: "mypage",
        params: {}
      });
    },
    changeBg() {
      //调用weui的actionSheet方法
      weui.actionSheet(
        [
          {
            label: "更换图片",
            onClick: () => {
              this.$refs.uploaderBg.click();
            }
          }
        ],
        [
          {
            label: "取消"
          }
        ]
      );
    },
    async submitBg(obj) {
      let resp = await service.post("users/update", {
        userId: this.$store.state.currentUser._id,
        bgurl: obj.data.url
      });

      if (resp.code === 0) {
        //修改成功立刻更新store里的当前user数据
        this.$store.dispatch("setUser", {
          ...this.$store.state.currentUser,
          bgurl: obj.data.url
        });
        weui.toast("修改成功", 3000);
      }
    }
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
    background: #fff;
    width: 102px;
    height: 102px;
    border-radius: 50%;
  }
}
</style>
<template>
  <div class="container">
    <h1>手机号登录</h1>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__hd">
          <label class="weui-label">手机号</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="tel" ref="phone" v-model="phone" placeholder="请输入手机号" />
        </div>
        <div class="weui-cell__ft">
          <button class="weui-vcode-btn" v-show="timeCode == 60" @click="getCode">获取验证码</button>
          <div class="time-code weui-vcode-btn" v-show="timeCode != 60">{{timeCode}}s</div>
        </div>
      </div>
      <div class="weui-cell" :class="{'weui-cell_warn':hasCodeFlag&&!code}">
        <div class="weui-cell__hd">
          <label class="weui-label">验证码</label>
        </div>
        <div class="weui-cell__bd">
          <input
            class="weui-input"
            type="number"
            v-model="code"
            pattern="[0-9]*"
            placeholder="请输入验证码"
          />
        </div>
        <div class="weui-cell__ft error-icon">
          <i class="weui-icon-warn"></i>
        </div>
      </div>
    </div>
    <a href="javascript:;" class="weui-btn weui-btn_block weui-btn_primary" @click="login">确定</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeCode: 60,
      interval: null,
      phone: "17718453469",
      code: "3022",
      hasCodeFlag: false
    };
  },
  beforeDestroy() {
    this.clearInter();
  },
  methods: {
    getCode() {
      if (!this.checkPhone()) {
        return;
      }
      this.axios
        .post("/users/phoneCode", {
          phone: this.phone
        })
        .then(res => {
          this.code = res.data.code;
        });
      this.setInter();
    },
    login() {
      if (!this.checkPhone()) {
        return;
      }
      if (!this.checkCode()) {
        return;
      }
      this.axios
        .post("/users/signIn", {
          name: this.phone,
          code: this.code
        })
        .then(res => {
          this.$store.dispatch('setUser',res.data);
          this.$router.push("/");
        });
    },
    checkPhone() {
      if (!/^\d{11}$/.test(this.phone)) {
        weui.topTips("请输入正确手机号");
        return false;
      } else {
        return true;
      }
    },
    checkCode() {
      if (!/^\d{4}$/.test(this.code)) {
        weui.topTips("请输入正确验证码");
        return false;
      } else {
        return true;
      }
    },
    setInter() {
      this.timeCode--;
      this.interval = setInterval(() => {
        this.timeCode--;
        if (this.timeCode == 0) {
          this.timeCode = 60;
          this.clearInter();
        }
      }, 1000);
    },
    clearInter() {
      clearInterval(this.interval);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin-top: 150px;
}
h1 {
  font-weight: 400;
}
.weui-cells_form {
  margin: 20px 0px 30px;
}
.weui-vcode-btn {
  color: #07c160;
}
.time-code,
.time-code:active {
  cursor: initial;
  color: #07c160;
}
.weui-vcode-btn::before {
  display: none;
}
.error-icon {
  display: none;
}
.weui-cell_warn .error-icon {
  display: block;
}
</style>

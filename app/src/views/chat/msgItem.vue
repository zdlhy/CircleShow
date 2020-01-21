<template>
  <div class="msg-item" :class="{'self':msg.is_self}">
    <dl>
      <dt>
        <img class="avatar" :src="msg.avatar" alt />
      </dt>
      <dd>
        <span>{{msg.nickname}}</span>
        <div>
          <p>{{msg.content}}</p>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['data'],
  data () {
    return {}
  },
  computed: {
    ...mapState(['user']),
    msg () {
      var _obj = {
        is_self: this.user._id === this.data.fromUser._id,
        content: this.data.content,
        avatar: this.user._id === this.data.fromUser._id ? this.user.avatar : this.data.fromUser.avatar,
        nickname: this.user._id === this.data.fromUser._id ? this.user.nickname : this.data.fromUser.nickname
      }
      return _obj
    }
  },
  mounted () {
    // console.log(this.data)
  }
}
</script>

<style lang="scss" scoped>
.msg-item {
  padding: 5px 15px;
  margin: 10px 0;
}
.self {
  direction: rtl;
  dt {
    float: right;
    margin-right: 0px;
  }
  dd {
    margin: 0 68px 0 0;
    p {
      direction: ltr;
      background: #94eb68;
      &::after {
        right: initial;
        left: 100%;
        border-right-color: transparent;
        border-left: 10px solid #94eb68;
      }
    }
  }
}
dt {
  width: 50px;
  height: 50px;
  border-radius: 6px;
  overflow: hidden;
  margin-right: 10px;
  float: left;
}
dd {
  margin-left: 68px;
  div {
      margin-top: 3px;
      max-width: 80%;
      position: relative;
      color: #333;
    p {
      display: inline-block;
      border-radius: 6px;
      background: #fff;
      padding: 10px;
      &:after {
        display: block;
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
        top: 8px;
        right: 100%;
        border: 5px solid transparent;
        border-right: 10px solid #fff;
      }
    }
  }
}
.avatar {
  display: block;
  width: 100%;
}
</style>

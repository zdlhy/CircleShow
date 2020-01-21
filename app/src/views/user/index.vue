<template>
  <div class="wrap">
    <headBack title="个人信息" @goBack="prevPage"></headBack>
    <div class="weui-cells" style="margin-top:0px;">
      <div class="weui-cell" :class="{'weui-cell_access':isEdit}" href="javascript:;">
        <div class="weui-cell__bd">
          <p>头像</p>
        </div>
        <div class="weui-cell__ft">
          <img class="user-img" :src="user.avatar" alt />
        </div>
      </div>
      <div class="weui-cell" :class="{'weui-cell_access':isEdit}" href="javascript:;" @click="changeName">
        <div class="weui-cell__bd">
          <p>名字</p>
        </div>
        <div class="weui-cell__ft">{{user.nickname}}</div>
      </div>
      <div class="weui-cell" :class="{'weui-cell_access':isEdit}" href="javascript:;" @click="selectSex">
        <div class="weui-cell__bd">
          <p>性别</p>
        </div>
        <div class="weui-cell__ft">{{user.gender == '1'?'男':'女'}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>电话号码</p>
        </div>
        <div class="weui-cell__ft">{{user.phoneNum}}</div>
      </div>
    </div>
    <div class="weui-cells">
      <a class="weui-cell weui-cell_access" href="javascript:;" @click="goChat">
        <div class="weui-cell__bd">
          <p style="text-align:center;">私信</p>
        </div>
        <div class="weui-cell__ft"></div>
      </a>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import headBack from 'components/head'
export default {
  components: {
    headBack
  },
  data () {
    return {
      user: this.$route.params.user
    }
  },
  created () {
    if (!this.user) {
      this.user = {}
      this.$router.push('/')
    }
  },
  computed: {
    // ...mapState(['user']),
    // avatar () {
    //   var url = this.$store.state.user.avatar
    //   return url
    // }
    isEdit () {
      return this.user._id === this.$store.state.user._id
    }
  },
  methods: {
    prevPage () {
      this.$router.push('/')
    },
    // 选择性别
    selectSex () {
      if (!this.isEdit) {
        return
      }
      let _this = this
      weui.actionSheet(
        [
          {
            label: '男',
            onClick: function () {
              _this.changeSex('1')
            }
          },
          {
            label: '女',
            onClick: function () {
              _this.changeSex('0')
            }
          }
        ],
        [
          {
            label: '取消'
          }
        ]
      )
    },
    changeSex (sex) {
      this.axios
        .post('/users/changeMsg', {
          gender: sex
        })
        .then(res => {
          this.$store.commit('changeUser', { gender: sex })
        })
    },
    changeName () {
      if (!this.isEdit) {
        return
      }
      // this.$router.push({ path: '/myName', query: { name: this.user.nickname } })//都可以
      this.$router.push({
        name: 'my-name',
        params: {
          user: this.user
        }
      })
    },
    goChat () {
      this.$router.push({
        path: '/chat',
        name: 'chatRoom',
        params: {
          user: this.user
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  background: #ededed;
  height: 100%;
}
.user-img {
  width: 50px;
  height: 50px;
  background: #999;
  border-radius: 6px;
}
</style>

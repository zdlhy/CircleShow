<template>
  <div class="wrap">
    <formHead :btn="btn_opt" @btn1="back" @btn2="saveName"></formHead>
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <input
          class="weui-input"
          type="text"
          placeholder="请输入名称"
          v-model="name"
          maxlength="15"
        />
      </div>
    </div>
  </div>
</template>
<script>
import formHead from 'components/headForm'
export default {
  components: {
    formHead
  },
  data () {
    return {
      user: this.$route.params.user,
      name: this.$route.params.user.nickname,
      btn_opt: {
        btn1: {
          name: '取消',
          disabled: false
        },
        btn2: {
          name: '保存',
          disabled: true
        }
      }
    }
  },
  created () {
    if (!this.user) {
      this.user = {}
      this.$router.push('/')
    }
  },
  methods: {
    back () {
      this.$router.push({
        name: 'user',
        params: {
          user: this.user
        }
      })
    },
    saveName () {
      this.axios
        .post('/users/changeMsg', {
          nickname: this.name
        })
        .then(res => {
          weui.toast('更新成功', {
            duration: 750,
            className: 'custom-classname'
          })
          this.$router.push('/user')
          this.$store.commit('changeUser', { nickname: this.user.nickname })
        })
    }
  },
  watch: {
    name (val) {
      if (val === '') {
        this.$set(this.btn_opt.btn2, 'disabled', true)
      } else {
        this.$set(this.btn_opt.btn2, 'disabled', false)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.weui-cell {
  margin-top: 10px;
  border-bottom: 1px solid #eaeaea;
}
</style>

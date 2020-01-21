<template>
  <div class="chat-wrap">
    <comHead :title="toUser.nickname" @goBack="goBack" class="head"></comHead>
    <div class="msg-wrap">
      <template v-for="item in msgList">
        <msgItem :data="item" :key="item._id"></msgItem>
      </template>
    </div>
    <div class="bottomClass">
      <inputBar
        ref="inputBar"
        @publish="publish"
        @uploaded="uploaded"
        @showBottom="showBottom"
        @hideBottom="hideBottom"
        @hideBottomOnPanel="hideBottomOnPanel"
      />
    </div>
  </div>
</template>

<script>
import comHead from 'components/head'
import inputBar from './inputBar'
import msgItem from './msgItem'

export default {
  components: {
    comHead,
    inputBar,
    msgItem
  },
  data () {
    return {
      bottomClass: {},
      bottomStyle: '',
      toUser: this.$route.params.user,
      chatId: '',
      page: 1,
      pageSize: 10,
      msgList: []
    }
  },
  methods: {
    goBack () {
      this.$router.push('/')
    },
    publish (msg) {
      this.axios
        .post('/chat/sendMsg', {
          content: msg,
          toUser: this.toUser,
          id: this.chatId
        })
        .then(res => {
          this.msgList.push({
            toUser: this.toUser,
            fromUser: this.$store.state.user,
            content: msg
          })
        })
    },
    uploaded () {},
    showBottom () {},
    hideBottom () {},
    hideBottomOnPanel () {}
  },
  mounted () {
    this.axios
      .get('/chat/getMsg', {
        params: {
          page: this.page,
          pageSize: this.pageSize,
          toUser: this.toUser._id
        }
      })
      .then(res => {
        this.chatId = res.data.chatId
        this.$socket.emit('login', { _id: this.chatId })
        this.msgList.push(...res.data.list)
      })
  },
  sockets: {
    recieveMsg (obj) {
      console.log(obj)
      this.msgList.push({
        toUser: obj.toUser,
        fromUser: obj.fromUser,
        content: obj.content
      })
    }
  },
  created () {
    if (!this.toUser) {
      this.toUser = {}
      this.$router.push('/')
    }
  },
  beforeDestroy () {
    this.$socket.emit('loginout', { _id: this.chatId })
  }
}
</script>

<style scoped lang="scss">
.chat-wrap {
  height: 100%;
  background: #ededed;
}
.head {
  border-bottom: 1px solid #ccc;
}
.bottomClass {
  width: 100%;
  position: absolute;
  background: #f6f6f6;
  left: 0px;
  bottom: 0px;
}
.msg-wrap {
  position: absolute;
  top: 65px;
  bottom: 52px;
  overflow: auto;
  width: 100%;
}
</style>

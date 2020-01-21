<template>
    <div class="wrap">
        <Head title="我的私信"></Head>
    </div>
</template>

<script>
import Head from 'components/head'
export default {
  components: {
    Head
  },
  data () {
    return {
      page: 1,
      pageSize: 10,
      list: []
    }
  },
  mounted () {
    this.axios
      .get('/chat/getChatList', { params: {
        page: this.page,
        pageSize: this.pageSize
      } })
      .then(res => {
          this.list.push(...res.data)
      })
  }
}
</script>

<style lang="scss" scoped>

</style>

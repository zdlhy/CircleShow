<template>
  <scroll
    class="wrap"
    @loadCallback="loadCallback"
    :isend="isend"
    :readyToLoad="readyToLoad"
    @scroll="scroll"
  >
    <template v-for="item in list">
      <item :data="item" :key="item._id"></item>
    </template>
  </scroll>
</template>

<script>
import item from './item'
import scroll from './scroll'

export default {
  components: {
    item,
    scroll
  },
  data () {
    return {
      isend: false,
      readyToLoad: false,
      page: 1,
      pageSize: 10,
      list: [
      ]
    }
  },
  created () {
    this.loadCallback()
  },
  methods: {
    loadCallback () {
      this.axios
        .get('/post/getList', {
          params: {
            page: this.page,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          this.list.push(...res.data.list)
          if (this.page * this.pageSize >= res.data.count) {
            this.readyToLoad = true
            this.isend = true
          } else {
            this.readyToLoad = true
            this.page++
          }
        })
    },
    scroll (scrollTop) {
      this.$bus.$emit('showHeader', scrollTop)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 20px 0 0px;
}
</style>

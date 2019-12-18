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
        // {
        //   id: "1",
        //   name: "暖宝宝",
        //   content:
        //     "英雄机长刘传健的事迹，在国际航空界也引起了轰动。“5·14川航航班备降成都事件”后，欧洲空客公司调整了飞行手册，按照他的操作设计为规范的流程。近日，央视再次专访刘传健，他说，“其实平凡就是关键时候能解决问题的那个人!”转赞!",
        //   time: "2019-11-05 16:54:00",
        //   pho: [
        //     "http://img0.imgtn.bdimg.com/it/u=147999313,3281920301&fm=26&gp=0.jpg"
        //   ],
        //   like: [
        //     "张三",
        //     "李四",
        //     "王五",
        //     "马六",
        //     "钱琦",
        //     "王八",
        //     "啦啦啦",
        //     "alisa"
        //   ],
        //   msg: [
        //     {
        //       name: "🍂随风",
        //       to: "诺宝宝",
        //       content: "今年过节不收礼啊不收礼，收礼只收脑白金啊脑白金"
        //     }
        //   ]
        // }
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

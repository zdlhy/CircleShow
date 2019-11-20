<template>
  <scroll
    class="wrap"
    @loadCallback="loadCallback"
    :isend="isend"
    :readyToLoad="readyToLoad"
    @scroll="scroll"
  >
    <template v-for="item in list">
      <item :data="item" :key="item.id"></item>
    </template>
  </scroll>
</template>

<script>
import item from "./item";
import scroll from "./scroll";

export default {
  components: {
    item,
    scroll
  },
  data() {
    return {
      isend: false,
      readyToLoad: false,
      page: 1,
      pageSize: 10,
      list: [
        {
          id: "1",
          name: "暖宝宝",
          content:
            "英雄机长刘传健的事迹，在国际航空界也引起了轰动。“5·14川航航班备降成都事件”后，欧洲空客公司调整了飞行手册，按照他的操作设计为规范的流程。近日，央视再次专访刘传健，他说，“其实平凡就是关键时候能解决问题的那个人!”转赞!",
          time: "2019-11-05 16:54:00",
          pho: [
            "http://img0.imgtn.bdimg.com/it/u=147999313,3281920301&fm=26&gp=0.jpg"
          ],
          like: [
            "张三",
            "李四",
            "王五",
            "马六",
            "钱琦",
            "王八",
            "啦啦啦",
            "alisa"
          ],
          msg: [
            {
              name: "🍂随风",
              to: "诺宝宝",
              content: "今年过节不收礼啊不收礼，收礼只收脑白金啊脑白金"
            }
          ]
        },
        {
          id: "2",
          name: "夜雨随风",
          content:
            "男子500米第二次比赛决赛在武大靖、匈牙利选手刘少林、韩国选手金东旭和哈萨克斯坦选手阿知加里耶夫之间展开。武大靖曾在上赛季本站比赛中以破世界纪录的成绩夺冠，当日他在比赛中延续王者霸气，从一道出发后将领先优势保持到终点，最终以39秒702夺冠，为中国队摘得本站世界杯的首枚金牌。",
          time: "2019-11-05 12:30:00",
          pho: [
            "http://img5.imgtn.bdimg.com/it/u=4253870054,841340875&fm=26&gp=0.jpg",
            "http://img1.imgtn.bdimg.com/it/u=2498530398,3497901317&fm=26&gp=0.jpg"
          ],
          like: ["敌敌畏", "梅海岭"]
        },
        {
          id: "3",
          name: "测试名测试名称称",
          content: "这里的山路十八弯，这里的河流九连环。这里的花儿真好看。",
          time: "2019-11-05 12:00:00",
          pho: [
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3209370120,2008812818&fm=26&gp=0.jpg",
            "http://img3.imgtn.bdimg.com/it/u=4031544047,3820934426&fm=26&gp=0.jpg",
            "http://img0.imgtn.bdimg.com/it/u=452966427,3842240659&fm=26&gp=0.jpg"
          ],
          msg: [
            {
              name: "🍂随风",
              to: "诺宝宝",
              content: "你瞅啥"
            },
            {
              name: "🍂随风",
              to: "诺宝宝",
              content: "瞅你咋地"
            }
          ]
        },
        {
          id: "4",
          name: "刘小宝",
          content: "在上不是南北",
          time: "2019-11-05 11:00:00",
          pho: [
            "http://img2.imgtn.bdimg.com/it/u=2570833344,3491786880&fm=26&gp=0.jpg",
            "http://img4.imgtn.bdimg.com/it/u=3509636437,88086291&fm=26&gp=0.jpg",
            "http://img0.imgtn.bdimg.com/it/u=112693113,3147345699&fm=26&gp=0.jpg",
            "http://img2.imgtn.bdimg.com/it/u=3272242740,1472002620&fm=26&gp=0.jpg"
          ]
        },
        {
          id: "5",
          name: "tom",
          content: `锄禾日当午</br>
                    汗滴禾下土</br>
                    谁知盘中餐</br>
                    粒粒皆辛苦`,
          time: "2019-11-05 9:00:00",
          pho: [
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572926128548&di=2487efef57f2ee1d8e922b205e5fd911&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201402%2F13%2F20140213170837_dKAQC.jpeg",
            "http://img4.imgtn.bdimg.com/it/u=2080943264,3360793080&fm=26&gp=0.jpg",
            "http://img3.imgtn.bdimg.com/it/u=1422148202,729353521&fm=26&gp=0.jpg",
            "http://img1.imgtn.bdimg.com/it/u=4264020660,2290610603&fm=26&gp=0.jpg",
            "http://img3.imgtn.bdimg.com/it/u=207258845,1675555492&fm=11&gp=0.jpg"
          ]
        },
        {
          id: "6",
          name: "李二狗",
          content: "ceshi",
          time: "2019-11-04 20:00:00",
          pho: [
            "http://img0.imgtn.bdimg.com/it/u=3861853080,1834299280&fm=26&gp=0.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572944988187&di=f3f55bf64412c716e11e09765807e742&imgtype=0&src=http%3A%2F%2Fpic44.nipic.com%2F20140723%2F18505720_094503373000_2.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572945014093&di=7c47b51734123eb82094b8479679cadf&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20120323%2FImg338614056.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572945036345&di=f853b8a8af2e77e8f74976fde3768eb6&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201312%2F04%2F20131204184148_hhXUT.jpeg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572945052222&di=aaa40021ade32430d8a2a15931e8187f&imgtype=0&src=http%3A%2F%2Fpic15.nipic.com%2F20110809%2F2852987_102440194840_2.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572945052222&di=0157bbe02004223cffef7ed48b0ebc4d&imgtype=0&src=http%3A%2F%2Fpic31.nipic.com%2F20130629%2F13140082_200149691195_2.jpg"
          ]
        },
        {
          id: "7",
          name: "傻狗蛋子",
          content: "ceshi",
          time: "2019-11-04 13:00:00",
          pho: []
        },
        {
          id: "8",
          name: "旺小财",
          content: "ceshi",
          time: "2019-11-02 12:00:00",
          pho: []
        },
        {
          id: "9",
          name: "贾不假",
          content: "ceshi",
          time: "2019-10-10 11:00:00",
          pho: []
        },
        {
          id: "10",
          name: "李大嘴",
          content: "ceshi",
          time: "2019-10-05 13:00:00",
          pho: []
        },
        {
          id: "11",
          name: "吕晓才",
          content: "ceshi",
          time: "2018-11-06 11:00:00",
          pho: []
        },
        {
          id: "12",
          name: "白沾糖",
          content: "ceshi",
          time: "2017-11-01 13:00:00",
          pho: []
        }
      ]
    };
  },
  methods: {
    loadCallback() {
      this.axios
        .get("/postsend/getList", {
          page: this.page,
          pageSize: this.pageSize
        })
        .then(res => {
          this.list.push(...res.data);
        });
    },
    scroll() {}
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  padding: 20px 0;
}
</style>

<template>
  <dl class="item">
    <dt>
      <img src="../../assets/avatar.png" alt />
    </dt>
    <dd>
      <h4 class="name">{{data.name}}</h4>
      <p class="content nowrap" v-html="data.content"></p>
      <div class="pho-grids" :class="data.pho.length > 1?'':'sign'">
        <a
          href="javascript:;"
          class="pho-grid"
          v-for="(item,index) in data.pho"
          :key="index"
          @click="previewFn(item,index)"
        >
          <img :src="item" alt />
        </a>
      </div>
      <div class="msg">
        <span class="time">{{date.time + date.type}}{{date.time?'前':''}}</span>
        <span class="weui-icon-btn weui-icon-btn_more operation">·&nbsp;·</span>
      </div>
      <div class="talk" v-show="data.like&&data.like.length != 0||data.msg&&data.msg.length!=0">
        <p class="like" v-show="data.like&&data.like.length != 0">
          <i class="like-icon"></i>
          <span
            v-for="(item,index) in data.like"
            :key="index"
            style="white-space:nowrap;"
          >{{item}}{{index+1 === data.like.length?'':','}}</span>
        </p>
        <ul v-show="data.msg&&data.msg.length != 0">
          <li v-for="(item,index) in data.msg" :key="index">
            <span>{{item.name}}:</span>
            <p>{{item.content}}</p>
          </li>
        </ul>
      </div>
    </dd>
  </dl>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {};
  },
  methods: {
    previewFn(item, index) {
    //   var gallery = weui.gallery(item, {
    //     className: "custom-classname",
    //     onDelete: function() {
    //       if (confirm("确定删除该图片？")) {
    //         console.log("删除");
    //       }
    //       gallery.hide(function() {
    //         console.log("`gallery` has been hidden");
    //       });
    //     }
    //   });
      
    }
  },
  computed: {
    date() {
      let _type = {};
      let date_l = parseInt(
        (new Date() - new Date(this.data.time)) / (1000 * 60)
      ); //分
      if (date_l < 10) {
        _type = {
          time: "",
          type: "刚刚"
        };
      } else if (10 <= date_l && date_l < 60) {
        _type = {
          time: date_l,
          type: "分"
        };
      } else if (60 <= date_l && date_l < 24 * 60) {
        _type = {
          time: parseInt(date_l / 60),
          type: "小时"
        };
      } else if (24 * 60 <= date_l && date_l < 30 * 24 * 60) {
        _type = {
          time: parseInt(date_l / (60 * 24)),
          type: "天"
        };
      } else if (30 * 24 * 60 <= date_l && date_l < 365 * 24 * 60) {
        _type = {
          time: parseInt(date_l / (60 * 24 * 30)),
          type: "月"
        };
      } else if (365 * 24 * 60 <= date_l) {
        _type = {
          time: parseInt(date_l / (60 * 24 * 365)),
          type: "年"
        };
      }
      return _type;
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  width: 100%;
  overflow: hidden;
  display: flex;
  padding: 20px 15px 20px;
  border-bottom: 1px solid #ccc;
}
dt {
  display: inline-block;
  width: 40px;
  height: 40px;
  background: #ccc;
  border-radius: 5px;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
dd {
  width: calc(100% - 40px);
  //   margin-left: 50px;
  padding-left: 10px;
  float: right;
  .name {
    color: #808dad;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .content {
    color: #050505;
    &.nowrap {
      overflow: hidden;
      //   text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
  .pho-grids {
    display: flex;
    flex-wrap: wrap;
    margin-top: 15px;
    &.sign {
      .pho-grid {
        display: block;
        width: 200px;
        img {
          width: 100%;
        }
      }
    }
    .pho-grid {
      display: flex;
      margin: 0 5px 5px 0;
      width: 100px;
      height: 100px;
      overflow: hidden;
      img {
        display: block;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  .msg {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    .time {
      color: #b2b2b2;
    }
    .operation {
      cursor: pointer;
      // display: inline-block;
      // height: 24px;
      // line-height: 24px;
      // width: 40px;
      // text-align: center;
      // border-radius: 3px;
      // font-size: 24px;
      // font-weight: bold;
      // cursor: pointer;
      // background: #f7f7f7;
      // color: #576b95;
    }
  }
  .talk {
    background: #f3f3f3;
    margin-top: 15px;
    position: relative;
    &::before {
      position: absolute;
      content: "";
      display: block;
      width: 0px;
      height: 0px;
      border: 15px solid transparent;
      border-bottom: 15px solid #f3f3f3;
      bottom: 100%;
      left: 8px;
      transform: translateY(1px);
    }
    $p: 5px 10px;
    .like {
      padding: $p;
      color: #5c6e97;
      .like-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url("../../assets/sq-like.png") no-repeat center bottom;
        background-size: 100%;
        vertical-align: text-top;
        margin-right: 4px;
      }
    }
    ul {
      li {
        list-style: none;
        border-top: 1px solid #e9e9e8;
        padding: $p;
        span {
          color: #596d97;
        }
        p {
          display: inline;
          color: #333;
        }
      }
    }
  }
}
</style>
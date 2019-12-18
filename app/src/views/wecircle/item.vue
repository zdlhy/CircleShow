<template>
  <dl class="item">
    <dt>
      <img src="../../assets/avatar.png" alt />
    </dt>
    <dd>
      <h4 class="name">{{data.user.nickname}}</h4>
      <!-- 留言信息 -->
      <p class="content nowrap" v-html="data.content"></p>
      <!-- 图片部分 -->
      <div class="pho-grids" :class="data.pictureList.length > 1?'':'sign'">
        <a
          href="javascript:;"
          class="pho-grid"
          v-for="(item,index) in data.pictureList"
          :key="index"
          @click="previewFn(item,index)"
        >
          <img :src="item" alt />
        </a>
      </div>
      <!-- 时间及操作部分 -->
      <div class="msg">
        <span class="time">{{date.time + date.type}}{{date.time?'前':''}}</span>
        <div class="opera-box" @click="showPanel($event)">
          <transition name="slide">
            <div class="box-panel" v-show="showFlag">
              <div class="like-box">
                <div class="like-icon"></div>
                <div class="like-text" @click="addLike" v-show="!data.isLike">赞</div>
                <div class="like-text" @click="removeLike" v-show="data.isLike">取消</div>
              </div>
              <div class="divider"></div>
              <div class="comment-box" @click="addComment($event)">
                <div class="comment-icon"></div>
                <div class="comment-text">评论</div>
              </div>
            </div>
          </transition>
        </div>
        <span
          class="weui-icon-btn weui-icon-btn_more operation"
          @click="showFlag=!showFlag"
        >·&nbsp;·</span>
      </div>
      <!-- 交互部分 -->
      <div class="talk" v-show="data.like&&data.like.length != 0||data.msg&&data.msg.length!=0">
        <!-- 点赞部分开始 -->
        <p class="like" v-show="data.like&&data.like.length != 0">
          <i class="like-icon"></i>
          <span
            v-for="(item,index) in data.like"
            :key="index"
            style="white-space:nowrap;"
          >{{item}}{{index+1 === data.like.length?'':','}}</span>
        </p>
        <!-- 点赞部分结束 -->
        <!-- 留言部分开始 -->
        <ul v-show="data.msg&&data.msg.length != 0">
          <li v-for="(item,index) in data.msg" :key="index">
            <span>{{item.name}}:</span>
            <p>{{item.content}}</p>
          </li>
        </ul>
        <!-- 留言部分结束 -->
      </div>
    </dd>
  </dl>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      showFlag: false,
      isLike: false
    };
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
    },
    addLike() {},
    removeLike() {}
  },
  computed: {
    date() {
      let _type = {};
      let date_l = parseInt(
        (new Date() - new Date(this.data.create)) / (1000 * 60)
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
        height: auto;
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
        min-width: 100%;
        min-height: 100%;
      }
    }
  }
  .msg {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    position: relative;
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
.box-panel.slide-enter-active {
  transition: transform 300ms;
}
.box-panel.slide-leave-active {
  transition: transform 300ms;
}
.box-panel.slide-enter {
  transform: translate3d(180px, 0, 0);
}
.box-panel.slide-enter-to {
  transform: translate3d(0, 0, 0);
}
.box-panel.slide-leave {
  transform: translate3d(0, 0, 0);
}
.box-panel.slide-leave-to {
  transform: translate3d(180px, 0, 0);
}
.opera-box {
  width: 180px;
  height: 40px;
  position: absolute;
  right: 42px;
  top: -10px;
  overflow: hidden;
  border-radius: 4px;
}
.box-panel {
  width: 180px;
  height: 40px;
  background-color: rgb(79, 80, 82);
  border-radius: 4px;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  overflow: hidden;
}
.like-icon {
  width: 17px;
  height: 17px;
  background-image: url("../../assets/heart.png");
  background-size: cover;
  background-position: center center;
}
.comment-icon {
  width: 17px;
  height: 17px;
  background-image: url("../../assets/comment.png");
  background-size: cover;
  background-position: center center;
}
.comment-text,
.like-text {
  color: #fff;
  font-size: 13px;
  margin-left: 3px;
  min-width: 12px;
}
.comment-text {
  white-space: nowrap;
}
.like-box,
.comment-box {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.divider {
  width: 1px;
  height: 20px;
  background-color: #3b3c3e;
  align-self: center;
}
</style>

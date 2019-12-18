<template>
  <div>
    <div class="flex">
      <a href="javascript:;" @click="toIndex">取消</a>
      <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary" @click="publish">发表</a>
    </div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea
            class="weui-textarea"
            placeholder="此刻的想法"
            rows="3"
            v-model="textContent"
            @input="computedCount"
          ></textarea>
          <div class="weui-textarea-counter">
            <span>{{count}}</span>/200
          </div>
        </div>
      </div>
      <div class="weui-cell" id="uploader">
        <div class="weui-cell__bd">
          <div class="weui-uploader__bd">
            <ul class="weui-uploader__files" id="uploaderFiles" @click="bigPho"></ul>
            <div class="weui-uploader__input-box">
              <input
                id="uploaderInput"
                class="weui-uploader__input"
                type="file"
                accept="image/*"
                multiple
              />
            </div>
          </div>
          <div class="weui-uploader__hd">
            <div class="weui-uploader__info">{{uploadCount}}/5</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadCount: 0,
      uploadFields: [],
      textContent: "",
      count: 0,
      pictureList: []
    };
  },
  mounted() {
    var _this = this;
    weui.uploader("#uploader", {
      url: "/publish/upFile",
      auto: false,
      type: "file",
      fileVal: "picture",
      compress: {
        width: 1600,
        height: 1600,
        quality: 0.8
      },
      onBeforeQueued: function(files) {
        // `this` 是轮询到的文件, `files` 是所有文件
        if (
          ["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(
            this.type
          ) < 0
        ) {
          weui.alert("请上传图片");
          return false; // 阻止文件添加
        }
        if (this.size > 10 * 1024 * 1024) {
          weui.alert("请上传不超过10M的图片");
          return false;
        }
        if (files.length > 5) {
          // 防止一下子选择过多文件
          weui.alert("最多只能上传5张图片，请重新选择");
          return false;
        }
        if (this.uploadCount + 1 > 5) {
          weui.alert("最多只能上传5张图片");
          return false;
        }

        ++_this.uploadCount;

        // return true; // 阻止默认行为，不插入预览图的框架
      },
      onQueued: function() {
        // console.log(this);
        _this.uploadFields.push(this);
        // console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
        // console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64

        // this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
        // this.stop(); // 中断上传

        // return true; // 阻止默认行为，不显示预览图的图像
      },
      onBeforeSend: function(data, headers) {
        // data.name = 'pho';
        headers.author = window.sessionStorage.getItem("token") || "";
        // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
        // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部

        // return false; // 阻止文件上传
      },
      onProgress: function(procent) {
        // console.log(this, procent);
        // return true; // 阻止默认行为，不使用默认的进度显示
      },
      onSuccess: function(ret) {
        if (ret.code === "1") {
          _this.pictureList.push(ret.data.url);
        }
        if (_this.pictureList.length === _this.uploadFields.length) {
          _this.submitText();
        }
        // console.log(this, ret);
        // return true; // 阻止默认行为，不使用默认的成功态
      },
      onError: function(err) {
        // console.log(this, err);
        // return true; // 阻止默认行为，不使用默认的失败态
      }
    });
  },
  methods: {
    toIndex() {
      this.$router.push("/");
    },
    publish() {
      for (let i = 0; i < this.uploadFields.length; i++) {
        this.uploadFields[i].upload();
      }
      if (this.uploadFields.length == 0) {
        this.submitText();
      }
    },
    submitText() {
      this.axios
        .post("/publish/postText", {
          text: this.textContent,
          picture: this.pictureList
        })
        .then(res => {
          weui.toast("发布成功", {
            duration: 750,
            className: "custom-classname",
            callback: () => {
              this.$router.push("/");
            }
          });
        });
    },
    bigPho(ev) {
      var _this = this;
      var node;
      if (ev.target.className == "weui-icon-warn") {
        node = ev.target.parentElement.parentElement;
      } else {
        node = ev.target;
      }
      var pho_id = node.getAttribute("data-id");
      var gallery = weui.gallery(node.style.backgroundImage.split('"')[1], {
        className: "custom-classname",
        onDelete: function() {
          weui.confirm("确定删除该图片？", function() {
            gallery.hide();
            --_this.uploadCount;
            _this.uploadFields.forEach(function(item, index) {
              if (item.id == pho_id) {
                _this.uploadFields.splice(index, 1);
              }
            });
            node.remove();
          });
        }
      });
    },
    computedCount() {
      this.count = this.textContent.length;
    }
  }
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 0;
  a:first-child {
    color: #333;
  }
  .weui-btn {
    margin: 0;
  }
}
.weui-cells:after,
.weui-cells:before,
.weui-cell:before {
  display: none;
}
</style>

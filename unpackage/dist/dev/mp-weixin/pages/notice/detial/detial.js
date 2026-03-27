"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      noticeData: {
        id: 1,
        title: "忧戚壁纸小程序更新公告",
        author: "忧戚",
        createTime: Date.now(),
        viewCount: 9999,
        isTop: true,
        content: `
			<div>
				<h3>更新内容</h3>
				<p>1. 新增壁纸分类功能，方便用户快速找到喜欢的壁纸</p>
				<p>2. 优化图片加载速度，提升用户体验</p>
				<p>3. 修复已知bug，提高应用稳定性</p>
				<p>4. 增加收藏功能，用户可以收藏喜欢的壁纸</p>
				
				<h3>使用说明</h3>
				<p>1. 在首页浏览推荐壁纸</p>
				<p>2. 在分类页查看不同类型的壁纸</p>
				<p>3. 点击壁纸进入预览页，可保存到本地</p>
				<p>4. 在个人中心查看收藏的壁纸</p>
				
				<h3>感谢支持</h3>
				<p>感谢大家对忧戚壁纸的支持与厚爱，我们会持续更新更多优质壁纸，为您带来更好的使用体验！</p>
			</div>
		`
      },
      isLiked: false
    };
  },
  methods: {
    // 分享功能
    handleShare() {
      common_vendor.index.share({
        title: this.noticeData.title,
        path: `/pages/notice/detial/detial?id=${this.noticeData.id}`,
        success: () => {
          common_vendor.index.showToast({ title: "分享成功", icon: "success" });
        },
        fail: (err) => {
          common_vendor.index.__f__("log", "at pages/notice/detial/detial.vue:104", "分享失败:", err);
        }
      });
    },
    // 点赞功能
    handleLike() {
      this.isLiked = !this.isLiked;
      common_vendor.index.showToast({
        title: this.isLiked ? "点赞成功" : "取消点赞",
        icon: "success"
      });
    }
  },
  // 微信小程序分享给好友
  onShareAppMessage() {
    return {
      title: this.noticeData.title,
      path: `/pages/notice/detial/detial?id=${this.noticeData.id}`,
      success: () => {
        common_vendor.index.showToast({ title: "分享成功", icon: "success" });
      }
    };
  },
  // 微信小程序分享到朋友圈
  onShareTimeline() {
    return {
      title: this.noticeData.title,
      path: `/pages/notice/detial/detial?id=${this.noticeData.id}`,
      success: () => {
        common_vendor.index.showToast({ title: "分享到朋友圈成功", icon: "success" });
      }
    };
  },
  mounted() {
  }
};
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  (_easycom_uni_tag2 + _easycom_uni_icons2 + _easycom_uni_dateformat2)();
}
const _easycom_uni_tag = () => "../../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_icons + _easycom_uni_dateformat)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.noticeData.isTop
  }, $data.noticeData.isTop ? {
    b: common_vendor.p({
      text: "置顶",
      inverted: true,
      type: "error"
    })
  } : {}, {
    c: common_vendor.t($data.noticeData.title || "公告标题"),
    d: common_vendor.p({
      type: "person",
      size: "20"
    }),
    e: common_vendor.t($data.noticeData.author || "忧戚"),
    f: common_vendor.p({
      type: "time",
      size: "20"
    }),
    g: common_vendor.p({
      date: $data.noticeData.createTime || Date.now(),
      format: "yyyy/MM/dd hh:mm:ss"
    }),
    h: common_vendor.p({
      type: "eye",
      size: "20"
    }),
    i: common_vendor.t($data.noticeData.viewCount || 0),
    j: $data.noticeData.content || "公告内容加载中...",
    k: common_vendor.p({
      type: "paperplane",
      size: "24"
    }),
    l: common_vendor.o((...args) => $options.handleShare && $options.handleShare(...args), "a7"),
    m: common_vendor.p({
      type: $data.isLiked ? "heart-filled" : "heart",
      color: $data.isLiked ? "#ff4d4f" : "",
      size: "24"
    }),
    n: common_vendor.t($data.isLiked ? "已点赞" : "点赞"),
    o: common_vendor.o((...args) => $options.handleLike && $options.handleLike(...args), "58")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c7c628a3"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/notice/detial/detial.js.map

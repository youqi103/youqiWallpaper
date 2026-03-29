"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_apis = require("../../api/apis.js");
require("../../utils/system.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const downloadCount = common_vendor.ref(0);
    const scoreCount = common_vendor.ref(0);
    const goToDownload = () => {
      common_vendor.index.navigateTo({
        url: "/pages/userDownload/userDownload"
      });
    };
    const goToScore = () => {
      common_vendor.index.navigateTo({
        url: "/pages/userScore/userScore"
      });
    };
    const getUserStats = async () => {
      try {
        const cachedDownloadCount = common_vendor.index.getStorageSync("userDownloadCount");
        const cachedScoreCount = common_vendor.index.getStorageSync("userScoreCount");
        if (cachedDownloadCount)
          downloadCount.value = cachedDownloadCount;
        if (cachedScoreCount)
          scoreCount.value = cachedScoreCount;
        const [downloadRes, scoreRes] = await Promise.all([
          api_apis.apiGetUserDownloadList({ pageNum: 1, pageSize: 100 }),
          api_apis.apiGetUserScoreList({ pageNum: 1, pageSize: 100 })
        ]);
        downloadCount.value = downloadRes.data.length;
        scoreCount.value = scoreRes.data.length;
        common_vendor.index.setStorageSync("userDownloadCount", downloadCount.value);
        common_vendor.index.setStorageSync("userScoreCount", scoreCount.value);
      } catch (e) {
        common_vendor.index.__f__("log", "at pages/user/user.vue:209", "获取用户统计数据失败", e);
      }
    };
    common_vendor.onShow(() => {
      getUserStats();
    });
    const subscribePopup = common_vendor.ref(null);
    const subscribeTypes = common_vendor.ref([
      { id: 1, name: "热门推荐", icon: "fire", subscribed: false },
      { id: 2, name: "最新更新", icon: "refresh", subscribed: false },
      { id: 3, name: "分类通知", icon: "list", subscribed: false }
    ]);
    const openSubscribePopup = () => {
      subscribePopup.value.open();
    };
    const closeSubscribePopup = () => {
      subscribePopup.value.close();
    };
    const onSubscribeChange = (item) => {
      item.subscribed = !item.subscribed;
    };
    const confirmSubscribe = () => {
      const subscribedItems = subscribeTypes.value.filter(
        (item) => item.subscribed
      );
      if (subscribedItems.length === 0) {
        common_vendor.index.showToast({
          title: "请至少选择一项订阅",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showToast({
        title: "订阅成功",
        icon: "success"
      });
      closeSubscribePopup();
    };
    const faqPopup = common_vendor.ref(null);
    const faqList = common_vendor.ref([
      {
        question: "如何下载壁纸？",
        answer: '在壁纸预览页面，点击底部的"下载"按钮即可将壁纸保存到手机相册。首次下载需要授权相册访问权限。',
        expanded: false
      },
      {
        question: "壁纸评分有什么作用？",
        answer: "您的评分将帮助其他用户了解壁纸质量，同时也会影响壁纸的推荐排序。高分壁纸会优先展示给更多用户。",
        expanded: false
      },
      {
        question: "壁纸可以商用吗？",
        answer: "本平台壁纸仅供个人学习交流使用，不可用于商业用途。如需商用请联系客服获取授权。",
        expanded: false
      },
      {
        question: "如何举报侵权壁纸？",
        answer: "在壁纸详情页复制壁纸ID，发送至邮箱 513894357@qq.com 进行举报，我们会在3个工作日内处理。",
        expanded: false
      }
    ]);
    const openFaqPopup = () => {
      faqPopup.value.open();
    };
    const closeFaqPopup = () => {
      faqPopup.value.close();
    };
    const toggleFaq = (index) => {
      faqList.value[index].expanded = !faqList.value[index].expanded;
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.p({
          type: "download-filled",
          size: "20"
        }),
        c: common_vendor.t(downloadCount.value),
        d: common_vendor.p({
          type: "right",
          size: "16",
          color: "#aaa"
        }),
        e: common_vendor.o(goToDownload, "ad"),
        f: common_vendor.p({
          type: "star-filled",
          size: "20"
        }),
        g: common_vendor.t(scoreCount.value),
        h: common_vendor.p({
          type: "right",
          size: "16",
          color: "#aaa"
        }),
        i: common_vendor.o(goToScore, "0d"),
        j: common_vendor.p({
          type: "chatboxes-filled",
          size: "20"
        }),
        k: common_vendor.p({
          type: "right",
          size: "16",
          color: "#aaa"
        }),
        l: common_vendor.p({
          type: "notification-filled",
          size: "20"
        }),
        m: common_vendor.p({
          type: "right",
          size: "16",
          color: "#aaa"
        }),
        n: common_vendor.o(openSubscribePopup, "3f"),
        o: common_vendor.p({
          type: "flag-filled",
          size: "20"
        }),
        p: common_vendor.p({
          type: "right",
          size: "16",
          color: "#aaa"
        }),
        q: common_vendor.o(openFaqPopup, "e4"),
        r: common_vendor.p({
          type: "closeempty",
          size: "26"
        }),
        s: common_vendor.o(closeSubscribePopup, "f0"),
        t: common_vendor.f(subscribeTypes.value, (item, k0, i0) => {
          return {
            a: "0f7520f0-12-" + i0 + ",0f7520f0-10",
            b: common_vendor.p({
              type: item.icon,
              size: "22",
              color: "#28b389"
            }),
            c: common_vendor.t(item.name),
            d: item.subscribed,
            e: common_vendor.o(($event) => onSubscribeChange(item), item.id),
            f: item.id
          };
        }),
        v: common_vendor.o(confirmSubscribe, "a2"),
        w: common_vendor.sr(subscribePopup, "0f7520f0-10", {
          "k": "subscribePopup"
        }),
        x: common_vendor.p({
          type: "center"
        }),
        y: common_vendor.p({
          type: "closeempty",
          size: "26"
        }),
        z: common_vendor.o(closeFaqPopup, "52"),
        A: common_vendor.f(faqList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.question),
            b: "0f7520f0-15-" + i0 + ",0f7520f0-13",
            c: common_vendor.p({
              type: item.expanded ? "up" : "down",
              size: "16",
              color: "#999"
            }),
            d: common_vendor.o(($event) => toggleFaq(index), index),
            e: item.expanded
          }, item.expanded ? {
            f: common_vendor.t(item.answer)
          } : {}, {
            g: index
          });
        }),
        B: common_vendor.sr(faqPopup, "0f7520f0-13", {
          "k": "faqPopup"
        }),
        C: common_vendor.p({
          type: "bottom"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/user.js.map

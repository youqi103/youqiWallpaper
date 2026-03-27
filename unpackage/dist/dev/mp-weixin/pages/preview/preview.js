"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const maskState = common_vendor.ref(true);
    const userScore = common_vendor.ref(0);
    const isSubmitting = common_vendor.ref(false);
    const classList = common_vendor.ref([]);
    const currentId = common_vendor.ref(null);
    const storageClassList = common_vendor.index.getStorageSync("storageClassList") || [];
    const currentIndex = common_vendor.ref(0);
    common_vendor.onLoad((e) => {
      currentId.value = e.id;
      if (classList.value.length === 0) {
        common_vendor.index.showToast({
          title: "图片数据加载失败，请重试",
          icon: "none"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
        return;
      }
      const foundIndex = classList.value.findIndex(
        (item) => item._id == currentId.value
      );
      if (foundIndex === -1) {
        common_vendor.index.showToast({
          title: "未找到该图片",
          icon: "none"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
        return;
      }
      currentIndex.value = foundIndex;
    });
    const swiperChange = (e) => {
      currentIndex.value = e.detail.current;
    };
    classList.value = storageClassList.map((item) => {
      return {
        ...item,
        picurl: item.smallPicurl.replace("_small.webp", ".jpg")
      };
    });
    const changeMaskState = () => {
      maskState.value = !maskState.value;
    };
    const infopopup = common_vendor.ref(null);
    const openInfoPopup = () => {
      infopopup.value.open();
    };
    const closeInfoPopup = () => {
      infopopup.value.close();
    };
    const scorePopup = common_vendor.ref(null);
    const openScorePopup = () => {
      var _a;
      userScore.value = ((_a = currentInfo.value) == null ? void 0 : _a.score) || 0;
      scorePopup.value.open();
    };
    const closeScorePopup = () => {
      scorePopup.value.close();
    };
    const submitScore = async () => {
      var _a, _b;
      if (!userScore.value || userScore.value <= 0) {
        common_vendor.index.showToast({
          title: "请选择评分",
          icon: "none"
        });
        return;
      }
      if (isSubmitting.value)
        return;
      isSubmitting.value = true;
      common_vendor.index.showLoading({
        title: "提交中...",
        mask: true
      });
      try {
        const res = await api_apis.apiSetupScore({
          classid: (_a = currentInfo.value) == null ? void 0 : _a.classid,
          wallId: (_b = currentInfo.value) == null ? void 0 : _b._id,
          userScore: String(userScore.value)
        });
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "评分成功",
          icon: "success"
        });
        if (currentInfo.value) {
          currentInfo.value.score = userScore.value;
        }
        closeScorePopup();
      } catch (error) {
        common_vendor.index.hideLoading();
      } finally {
        isSubmitting.value = false;
      }
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const currentInfo = common_vendor.computed(() => {
      return classList.value[currentIndex.value];
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      return common_vendor.e({
        a: common_vendor.f(classList.value, (item, k0, i0) => {
          return {
            a: item.picurl,
            b: common_vendor.o(changeMaskState, item._id),
            c: item._id
          };
        }),
        b: currentIndex.value,
        c: common_vendor.o(swiperChange, "f6"),
        d: maskState.value
      }, maskState.value ? {
        e: common_vendor.p({
          type: "back",
          size: "20",
          color: "#fff"
        }),
        f: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        g: common_vendor.o(goBack, "73"),
        h: common_vendor.t(currentIndex.value + 1),
        i: common_vendor.t(classList.value.length),
        j: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "hh:mm"
        }),
        k: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "MM月dd日"
        }),
        l: common_vendor.p({
          type: "info-filled",
          size: "23"
        }),
        m: common_vendor.o(openInfoPopup, "30"),
        n: common_vendor.p({
          type: "star",
          size: "23"
        }),
        o: common_vendor.t(((_a = currentInfo.value) == null ? void 0 : _a.score) || 0),
        p: common_vendor.o(openScorePopup, "14"),
        q: common_vendor.p({
          type: "download",
          size: "23"
        })
      } : {}, {
        r: common_vendor.p({
          type: "closeempty",
          size: "30"
        }),
        s: common_vendor.o(closeInfoPopup, "1b"),
        t: common_vendor.t((_b = currentInfo.value) == null ? void 0 : _b._id),
        v: common_vendor.t(((_c = currentInfo.value) == null ? void 0 : _c.classname) || "未分类"),
        w: common_vendor.t((_d = currentInfo.value) == null ? void 0 : _d.nickname),
        x: common_vendor.o(_ctx.onChange, "ce"),
        y: common_vendor.p({
          value: (_e = currentInfo.value) == null ? void 0 : _e.score
        }),
        z: common_vendor.t(((_f = currentInfo.value) == null ? void 0 : _f.score) || 0),
        A: common_vendor.t((_g = currentInfo.value) == null ? void 0 : _g.description),
        B: common_vendor.f((_h = currentInfo.value) == null ? void 0 : _h.tabs, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: item
          };
        }),
        C: common_vendor.sr(infopopup, "2dad6c07-6", {
          "k": "infopopup"
        }),
        D: common_vendor.p({
          type: "bottom"
        }),
        E: common_vendor.p({
          type: "closeempty",
          size: "30"
        }),
        F: common_vendor.o(closeScorePopup, "ba"),
        G: common_vendor.o(($event) => userScore.value = $event, "00"),
        H: common_vendor.p({
          allowHalf: true,
          modelValue: userScore.value
        }),
        I: common_vendor.t(userScore.value),
        J: common_vendor.t(isSubmitting.value ? "提交中..." : "确认评分"),
        K: !userScore.value || isSubmitting.value,
        L: common_vendor.o(submitScore, "82"),
        M: common_vendor.sr(scorePopup, "2dad6c07-9", {
          "k": "scorePopup"
        }),
        N: common_vendor.p({
          ["is-mask-click"]: false
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/preview/preview.js.map

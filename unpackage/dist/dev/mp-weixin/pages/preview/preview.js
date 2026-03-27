"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
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
    const classList = common_vendor.ref([]);
    const currentId = common_vendor.ref(null);
    const storageClassList = common_vendor.index.getStorageSync("storageClassList") || [];
    const currentIndex = common_vendor.ref(0);
    common_vendor.onLoad((e) => {
      currentId.value = e.id;
      currentIndex.value = classList.value.findIndex((item) => item._id == currentId.value);
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
      scorePopup.value.open();
    };
    const closeScorePopup = () => {
      scorePopup.value.close();
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(classList.value, (item, k0, i0) => {
          return {
            a: item.picurl,
            b: common_vendor.o(changeMaskState, item._id),
            c: item._id
          };
        }),
        b: currentIndex.value,
        c: common_vendor.o(swiperChange, "d5"),
        d: maskState.value
      }, maskState.value ? {
        e: common_vendor.p({
          type: "back",
          size: "20",
          color: "#fff"
        }),
        f: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        g: common_vendor.o(goBack, "86"),
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
        m: common_vendor.o(openInfoPopup, "2f"),
        n: common_vendor.p({
          type: "star",
          size: "23"
        }),
        o: common_vendor.o(openScorePopup, "13"),
        p: common_vendor.p({
          type: "download",
          size: "23"
        })
      } : {}, {
        q: common_vendor.p({
          type: "closeempty",
          size: "30"
        }),
        r: common_vendor.o(closeInfoPopup, "3c"),
        s: common_vendor.o(_ctx.onChange, "2b"),
        t: common_vendor.p({
          value: "5"
        }),
        v: common_vendor.f(3, (item, k0, i0) => {
          return {};
        }),
        w: common_vendor.sr(infopopup, "2dad6c07-6", {
          "k": "infopopup"
        }),
        x: common_vendor.p({
          type: "bottom"
        }),
        y: common_vendor.p({
          type: "closeempty",
          size: "30"
        }),
        z: common_vendor.o(closeScorePopup, "c1"),
        A: common_vendor.o(($event) => userScore.value = $event, "51"),
        B: common_vendor.p({
          allowHalf: true,
          modelValue: userScore.value
        }),
        C: common_vendor.t(userScore.value),
        D: !userScore.value,
        E: common_vendor.sr(scorePopup, "2dad6c07-9", {
          "k": "scorePopup"
        }),
        F: common_vendor.p({
          ["is-mask-click"]: false
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/preview/preview.js.map

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
    const storageClassList = common_vendor.index.getStorageSync("storageClassList") || [];
    classList.value = storageClassList.map((item) => {
      return {
        ...item,
        picurl: item.smallPicurl.replace("_small.webp", ".jpg")
      };
    });
    common_vendor.index.__f__("log", "at pages/preview/preview.vue:142", classList.value);
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
        b: maskState.value
      }, maskState.value ? {
        c: common_vendor.p({
          type: "back",
          size: "20",
          color: "#fff"
        }),
        d: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        e: common_vendor.o(goBack),
        f: common_vendor.t(classList.value.length),
        g: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "hh:mm"
        }),
        h: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "MM月dd日"
        }),
        i: common_vendor.p({
          type: "info-filled",
          size: "23"
        }),
        j: common_vendor.o(openInfoPopup),
        k: common_vendor.p({
          type: "star",
          size: "23"
        }),
        l: common_vendor.o(openScorePopup),
        m: common_vendor.p({
          type: "download",
          size: "23"
        })
      } : {}, {
        n: common_vendor.p({
          type: "closeempty",
          size: "30"
        }),
        o: common_vendor.o(closeInfoPopup),
        p: common_vendor.o(_ctx.onChange),
        q: common_vendor.p({
          value: "5"
        }),
        r: common_vendor.f(3, (item, k0, i0) => {
          return {};
        }),
        s: common_vendor.sr(infopopup, "2dad6c07-6", {
          "k": "infopopup"
        }),
        t: common_vendor.p({
          type: "bottom"
        }),
        v: common_vendor.p({
          type: "closeempty",
          size: "30"
        }),
        w: common_vendor.o(closeScorePopup),
        x: common_vendor.o(($event) => userScore.value = $event),
        y: common_vendor.p({
          allowHalf: true,
          modelValue: userScore.value
        }),
        z: common_vendor.t(userScore.value),
        A: !userScore.value,
        B: common_vendor.sr(scorePopup, "2dad6c07-9", {
          "k": "scorePopup"
        }),
        C: common_vendor.p({
          ["is-mask-click"]: false
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/preview/preview.js.map

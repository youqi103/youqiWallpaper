"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
const utils_storage = require("../../utils/storage.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
const _sfc_main = {
  __name: "classList",
  setup(__props) {
    const classlist = common_vendor.ref([]);
    const isEmpty = common_vendor.ref(false);
    const queryParams = {
      pageNum: 1,
      pageSize: 12
    };
    common_vendor.onPullDownRefresh(() => {
      classlist.value = [];
      isEmpty.value = false;
      queryParams.pageNum = 1;
      getClassList();
      common_vendor.index.stopPullDownRefresh();
    });
    common_vendor.onLoad((e) => {
      let { id = null, name = null } = e;
      queryParams.classid = id;
      common_vendor.index.setNavigationBarTitle({
        title: name
      });
      getClassList();
    });
    common_vendor.onReachBottom(() => {
      if (isEmpty.value)
        return;
      queryParams.pageNum++;
      getClassList();
    });
    const getClassList = async () => {
      let res = await api_apis.apiGetClassList(queryParams);
      classlist.value = [...classlist.value, ...res.data];
      await utils_storage.storage.set("storageClassList", classlist.value);
      if (res.data.length < queryParams.pageSize) {
        isEmpty.value = true;
      }
    };
    common_vendor.onUnload(async () => {
      await utils_storage.storage.remove("storageClassList");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isEmpty.value && !classlist.value.length
      }, isEmpty.value && !classlist.value.length ? {
        b: common_vendor.p({
          status: "loading"
        })
      } : {}, {
        c: common_vendor.f(classlist.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: "/pages/preview/preview?id=" + item._id,
            c: item._id
          };
        }),
        d: !isEmpty.value || classlist.value.length
      }, !isEmpty.value || classlist.value.length ? {
        e: common_vendor.p({
          status: isEmpty.value ? "no-more" : "loading"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-104357ab"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/classList/classList.js.map

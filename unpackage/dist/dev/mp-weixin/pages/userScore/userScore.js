"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_storage = require("../../utils/storage.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uv_empty2 = common_vendor.resolveComponent("uv-empty");
  (_easycom_uni_load_more2 + _easycom_uv_empty2)();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uv_empty = () => "../../uni_modules/uv-empty/components/uv-empty/uv-empty.js";
if (!Math) {
  (_easycom_uni_load_more + _easycom_uv_empty)();
}
const _sfc_main = {
  __name: "userScore",
  setup(__props) {
    const dataList = common_vendor.ref([]);
    const isEmpty = common_vendor.ref(false);
    const isLoading = common_vendor.ref(true);
    const queryParams = {
      pageNum: 1,
      pageSize: 12
    };
    common_vendor.onPullDownRefresh(() => {
      dataList.value = [];
      isEmpty.value = false;
      isLoading.value = true;
      queryParams.pageNum = 1;
      getDataList();
      common_vendor.index.stopPullDownRefresh();
    });
    common_vendor.onLoad(() => {
      common_vendor.index.setNavigationBarTitle({
        title: "我的评分"
      });
      getDataList();
    });
    common_vendor.onReachBottom(() => {
      if (isEmpty.value || isLoading.value)
        return;
      queryParams.pageNum++;
      getDataList();
    });
    const getDataList = async () => {
      isLoading.value = true;
      try {
        let res = await api_apis.apiGetUserScoreList(queryParams);
        dataList.value = [...dataList.value, ...res.data];
        if (res.data.length < queryParams.pageSize) {
          isEmpty.value = true;
        }
      } catch (e) {
        isEmpty.value = true;
      } finally {
        isLoading.value = false;
      }
    };
    const goPreview = async (id) => {
      await utils_storage.storage.set("storageClassList", dataList.value);
      common_vendor.index.navigateTo({
        url: "/pages/preview/preview?id=" + id
      });
    };
    common_vendor.onUnload(async () => {
      await utils_storage.storage.remove("storageClassList");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isLoading.value && !dataList.value.length
      }, isLoading.value && !dataList.value.length ? {
        b: common_vendor.p({
          status: "loading"
        })
      } : {}, {
        c: !isLoading.value && isEmpty.value && !dataList.value.length
      }, !isLoading.value && isEmpty.value && !dataList.value.length ? {
        d: common_vendor.p({
          mode: "list",
          text: "暂无评分记录"
        })
      } : {}, {
        e: dataList.value.length
      }, dataList.value.length ? {
        f: common_vendor.f(dataList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.smallPicurl,
            b: item.userScore
          }, item.userScore ? {
            c: common_vendor.t(item.userScore)
          } : {}, {
            d: item._id,
            e: common_vendor.o(($event) => goPreview(item._id), item._id)
          });
        })
      } : {}, {
        g: dataList.value.length && !isEmpty.value
      }, dataList.value.length && !isEmpty.value ? {
        h: common_vendor.p({
          status: "loading"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-96a2827f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/userScore/userScore.js.map

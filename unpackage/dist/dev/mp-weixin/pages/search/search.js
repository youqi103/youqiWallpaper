"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uv_empty2 = common_vendor.resolveComponent("uv-empty");
  (_easycom_uni_search_bar2 + _easycom_uni_icons2 + _easycom_uv_empty2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uv_empty = () => "../../uni_modules/uv-empty/components/uv-empty/uv-empty.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_icons + _easycom_uv_empty)();
}
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const keyword = common_vendor.ref("");
    const historyList = common_vendor.ref([]);
    const hotList = common_vendor.ref(["美女", "帅哥", "卡通", "萌宠"]);
    const searchResults = common_vendor.ref([]);
    const hasSearched = common_vendor.ref(false);
    const isLoading = common_vendor.ref(false);
    const noMore = common_vendor.ref(false);
    const pageNum = common_vendor.ref(1);
    const pageSize = common_vendor.ref(9);
    const getHistory = () => {
      const history = common_vendor.index.getStorageSync("searchHistory");
      if (history) {
        historyList.value = JSON.parse(history);
      }
    };
    const saveHistory = (kw) => {
      let list = [...historyList.value];
      const index = list.indexOf(kw);
      if (index > -1) {
        list.splice(index, 1);
      }
      list.unshift(kw);
      if (list.length > 10) {
        list = list.slice(0, 10);
      }
      historyList.value = list;
      common_vendor.index.setStorageSync("searchHistory", JSON.stringify(list));
    };
    const clearHistory = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要清空搜索历史吗？",
        success: (res) => {
          if (res.confirm) {
            historyList.value = [];
            common_vendor.index.removeStorageSync("searchHistory");
          }
        }
      });
    };
    const resetSearch = () => {
      keyword.value = "";
      searchResults.value = [];
      hasSearched.value = false;
      pageNum.value = 1;
      isLoading.value = false;
      noMore.value = false;
    };
    const clickHistory = (kw) => {
      keyword.value = kw;
      handleSearch();
    };
    const clickHot = (kw) => {
      keyword.value = kw;
      handleSearch();
    };
    const handleSearch = async () => {
      if (!keyword.value.trim()) {
        common_vendor.index.showToast({
          title: "请输入搜索关键词",
          icon: "none"
        });
        return;
      }
      searchResults.value = [];
      pageNum.value = 1;
      noMore.value = false;
      hasSearched.value = true;
      saveHistory(keyword.value.trim());
      await doSearch();
    };
    const doSearch = async () => {
      if (isLoading.value || noMore.value)
        return;
      isLoading.value = true;
      try {
        const res = await api_apis.apiSearchWall({
          keyword: keyword.value.trim(),
          pageNum: pageNum.value,
          pageSize: pageSize.value
        });
        const list = res.data.map((item) => {
          return {
            ...item,
            smallPicurl: item.smallPicurl.replace("_small.webp", ".jpg")
          };
        });
        if (pageNum.value === 1) {
          searchResults.value = list;
        } else {
          searchResults.value = [...searchResults.value, ...list];
        }
        if (list.length < pageSize.value) {
          noMore.value = true;
        } else {
          pageNum.value++;
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/search/search.vue:234", "搜索失败", e);
      } finally {
        isLoading.value = false;
      }
    };
    const goPreview = (id) => {
      common_vendor.index.setStorageSync("storageClassList", searchResults.value);
      common_vendor.index.navigateTo({
        url: "/pages/preview/preview?id=" + id
      });
    };
    common_vendor.onMounted(() => {
      getHistory();
    });
    common_vendor.onReachBottom(() => {
      if (hasSearched.value && !noMore.value && !isLoading.value) {
        doSearch();
      }
    });
    common_vendor.onUnload(() => {
      common_vendor.index.removeStorageSync("storageClassList");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleSearch, "57"),
        b: common_vendor.o(resetSearch, "ee"),
        c: common_vendor.o(($event) => keyword.value = $event, "3c"),
        d: common_vendor.p({
          radius: "5",
          placeholder: "请搜索你想要的内容",
          clearButton: "always",
          cancelButton: "always",
          modelValue: keyword.value
        }),
        e: !hasSearched.value
      }, !hasSearched.value ? common_vendor.e({
        f: common_vendor.o(clearHistory, "af"),
        g: common_vendor.p({
          type: "trash",
          size: "20"
        }),
        h: historyList.value.length > 0
      }, historyList.value.length > 0 ? {
        i: common_vendor.f(historyList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.o(($event) => clickHistory(item), index)
          };
        })
      } : {}) : {}, {
        j: !hasSearched.value
      }, !hasSearched.value ? {
        k: common_vendor.f(hotList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.o(($event) => clickHot(item), index)
          };
        })
      } : {}, {
        l: !searchResults.value.length
      }, !searchResults.value.length ? {
        m: common_vendor.p({
          mode: "search",
          icon: "https://cdn.uviewui.com/uview/empty/search.png"
        })
      } : {}, {
        n: hasSearched.value
      }, hasSearched.value ? common_vendor.e({
        o: searchResults.value.length > 0
      }, searchResults.value.length > 0 ? {
        p: common_vendor.f(searchResults.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: item._id,
            c: common_vendor.o(($event) => goPreview(item._id), item._id)
          };
        })
      } : {}) : {}, {
        q: hasSearched.value && searchResults.value.length > 0
      }, hasSearched.value && searchResults.value.length > 0 ? common_vendor.e({
        r: isLoading.value
      }, isLoading.value ? {} : noMore.value ? {} : {}, {
        s: noMore.value
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/search/search.js.map

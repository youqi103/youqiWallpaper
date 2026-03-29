"use strict";
const common_vendor = require("../common/vendor.js");
const storage = {
  // 异步存
  set(key, data) {
    return new Promise((resolve, reject) => {
      common_vendor.index.setStorage({
        key,
        data,
        success: resolve,
        fail: reject
        // 这里修复了！不能加 ()
      });
    });
  },
  // 异步取
  get(key) {
    return new Promise((resolve, reject) => {
      common_vendor.index.getStorage({
        key,
        success: (res) => resolve(res.data),
        fail: reject
      });
    });
  },
  // 删除
  remove(key) {
    return new Promise((resolve, reject) => {
      common_vendor.index.removeStorage({
        key,
        success: resolve,
        fail: reject
      });
    });
  },
  // 清空
  clear() {
    return new Promise((resolve, reject) => {
      common_vendor.index.clearStorage({
        success: resolve,
        fail: reject
      });
    });
  },
  // 同步版本
  setSync(key, data) {
    try {
      common_vendor.index.setStorageSync(key, data);
      return true;
    } catch (e) {
      common_vendor.index.__f__("error", "at utils/storage.js:49", "setSync error:", e);
      return false;
    }
  },
  getSync(key) {
    try {
      return common_vendor.index.getStorageSync(key);
    } catch (e) {
      common_vendor.index.__f__("error", "at utils/storage.js:57", "getSync error:", e);
      return null;
    }
  },
  removeSync(key) {
    try {
      common_vendor.index.removeStorageSync(key);
      return true;
    } catch (e) {
      return false;
    }
  }
};
exports.storage = storage;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/storage.js.map

"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_storage_config = require("./config.js");
class SyncStorage {
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
    this.initialized = false;
  }
  init() {
    if (this.initialized)
      return;
    utils_storage_config.StorageConfig.syncKeys.forEach((key) => {
      try {
        const value = common_vendor.index.getStorageSync(key);
        if (value !== null && value !== void 0 && value !== "") {
          this.cache.set(key, value);
        }
      } catch (e) {
        common_vendor.index.__f__("warn", "at utils/storage/syncStorage.js:24", `[SyncStorage] 初始化缓存失败: ${key}`, e);
      }
    });
    this.initialized = true;
  }
  set(key, value) {
    try {
      common_vendor.index.setStorageSync(key, value);
      this.cache.set(key, value);
      return { success: true, error: null };
    } catch (e) {
      common_vendor.index.__f__("error", "at utils/storage/syncStorage.js:36", `[SyncStorage] 写入失败: ${key}`, e);
      return { success: false, error: e };
    }
  }
  get(key, defaultValue = null) {
    try {
      if (this.cache.has(key)) {
        return this.cache.get(key);
      }
      const value = common_vendor.index.getStorageSync(key);
      if (value !== null && value !== void 0 && value !== "") {
        this.cache.set(key, value);
        return value;
      }
      return defaultValue;
    } catch (e) {
      common_vendor.index.__f__("error", "at utils/storage/syncStorage.js:53", `[SyncStorage] 读取失败: ${key}`, e);
      return defaultValue;
    }
  }
  remove(key) {
    try {
      common_vendor.index.removeStorageSync(key);
      this.cache.delete(key);
      return { success: true, error: null };
    } catch (e) {
      common_vendor.index.__f__("error", "at utils/storage/syncStorage.js:64", `[SyncStorage] 删除失败: ${key}`, e);
      return { success: false, error: e };
    }
  }
  has(key) {
    return this.cache.has(key) || common_vendor.index.getStorageSync(key) !== null;
  }
  clear() {
    try {
      utils_storage_config.StorageConfig.syncKeys.forEach((key) => {
        common_vendor.index.removeStorageSync(key);
        this.cache.delete(key);
      });
      return { success: true, error: null };
    } catch (e) {
      common_vendor.index.__f__("error", "at utils/storage/syncStorage.js:81", "[SyncStorage] 清空失败", e);
      return { success: false, error: e };
    }
  }
  getUserPreferences() {
    return this.get(utils_storage_config.StorageKeys.USER_PREFERENCES, {
      theme: "light",
      autoPlay: true,
      downloadQuality: "high"
    });
  }
  setUserPreferences(prefs) {
    const current = this.getUserPreferences();
    const merged = { ...current, ...prefs };
    return this.set(utils_storage_config.StorageKeys.USER_PREFERENCES, merged);
  }
  getSearchHistory() {
    const history = this.get(utils_storage_config.StorageKeys.SEARCH_HISTORY, "[]");
    try {
      return JSON.parse(history);
    } catch {
      return [];
    }
  }
  addSearchHistory(keyword) {
    if (!keyword || !keyword.trim())
      return;
    let history = this.getSearchHistory();
    history = history.filter((item) => item !== keyword);
    history.unshift(keyword);
    if (history.length > 10) {
      history = history.slice(0, 10);
    }
    return this.set(utils_storage_config.StorageKeys.SEARCH_HISTORY, JSON.stringify(history));
  }
  clearSearchHistory() {
    return this.set(utils_storage_config.StorageKeys.SEARCH_HISTORY, "[]");
  }
  getUIState() {
    return this.get(utils_storage_config.StorageKeys.UI_STATE, {
      lastTab: "index",
      scrollPosition: {},
      expandedSections: {}
    });
  }
  setUIState(state) {
    const current = this.getUIState();
    return this.set(utils_storage_config.StorageKeys.UI_STATE, { ...current, ...state });
  }
  getSession() {
    return this.get(utils_storage_config.StorageKeys.USER_SESSION, {
      isLoggedIn: false,
      lastLoginTime: null,
      userId: null
    });
  }
  setSession(session) {
    const current = this.getSession();
    return this.set(utils_storage_config.StorageKeys.USER_SESSION, { ...current, ...session });
  }
  updateLastVisitTime() {
    return this.set(utils_storage_config.StorageKeys.LAST_VISIT_TIME, Date.now());
  }
  getLastVisitTime() {
    return this.get(utils_storage_config.StorageKeys.LAST_VISIT_TIME, null);
  }
  getStorageInfo() {
    try {
      const info = common_vendor.index.getStorageInfoSync();
      return {
        keys: info.keys,
        currentSize: info.currentSize,
        limitSize: info.limitSize,
        usagePercent: (info.currentSize / info.limitSize * 100).toFixed(2)
      };
    } catch (e) {
      return null;
    }
  }
}
const syncStorage = new SyncStorage();
syncStorage.init();
exports.syncStorage = syncStorage;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/utils/storage/syncStorage.js.map

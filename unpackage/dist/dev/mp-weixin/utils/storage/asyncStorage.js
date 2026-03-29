"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_storage_config = require("./config.js");
class AsyncStorage {
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
    this.writeQueue = [];
    this.isProcessing = false;
    this.pendingWrites = /* @__PURE__ */ new Map();
    this.initialized = false;
  }
  async init() {
    if (this.initialized)
      return;
    const loadPromises = utils_storage_config.StorageConfig.asyncKeys.map(async (key) => {
      try {
        const value = await this._getRaw(key);
        if (value !== null) {
          this.cache.set(key, { value, timestamp: Date.now() });
        }
      } catch (e) {
        common_vendor.index.__f__("warn", "at utils/storage/asyncStorage.js:27", `[AsyncStorage] 初始化缓存失败: ${key}`, e);
      }
    });
    await Promise.all(loadPromises);
    this.initialized = true;
  }
  _getRaw(key) {
    return new Promise((resolve, reject) => {
      common_vendor.index.getStorage({
        key,
        success: (res) => resolve(res.data),
        fail: () => resolve(null)
      });
    });
  }
  _setRaw(key, data) {
    return new Promise((resolve, reject) => {
      common_vendor.index.setStorage({
        key,
        data,
        success: resolve,
        fail: reject
      });
    });
  }
  _removeRaw(key) {
    return new Promise((resolve, reject) => {
      common_vendor.index.removeStorage({
        key,
        success: resolve,
        fail: reject
      });
    });
  }
  async set(key, value, options = {}) {
    const { ttl = null, immediate = false } = options;
    const cacheEntry = {
      value,
      timestamp: Date.now(),
      ttl
    };
    this.cache.set(key, cacheEntry);
    if (immediate) {
      try {
        await this._setRaw(key, value);
        return { success: true, error: null };
      } catch (e) {
        common_vendor.index.__f__("error", "at utils/storage/asyncStorage.js:79", `[AsyncStorage] 立即写入失败: ${key}`, e);
        return { success: false, error: e };
      }
    }
    this.pendingWrites.set(key, value);
    this._scheduleWrite();
    return { success: true, error: null, queued: true };
  }
  async get(key, defaultValue = null) {
    const cached = this.cache.get(key);
    if (cached) {
      if (cached.ttl && Date.now() - cached.timestamp > cached.ttl) {
        this.cache.delete(key);
      } else {
        return cached.value;
      }
    }
    try {
      const value = await this._getRaw(key);
      if (value !== null) {
        this.cache.set(key, { value, timestamp: Date.now() });
        return value;
      }
      return defaultValue;
    } catch (e) {
      common_vendor.index.__f__("error", "at utils/storage/asyncStorage.js:108", `[AsyncStorage] 读取失败: ${key}`, e);
      return defaultValue;
    }
  }
  async remove(key) {
    this.cache.delete(key);
    this.pendingWrites.delete(key);
    try {
      await this._removeRaw(key);
      return { success: true, error: null };
    } catch (e) {
      common_vendor.index.__f__("error", "at utils/storage/asyncStorage.js:120", `[AsyncStorage] 删除失败: ${key}`, e);
      return { success: false, error: e };
    }
  }
  async clear() {
    this.cache.clear();
    this.pendingWrites.clear();
    const clearPromises = utils_storage_config.StorageConfig.asyncKeys.map((key) => this._removeRaw(key));
    await Promise.allSettled(clearPromises);
    return { success: true };
  }
  _scheduleWrite() {
    if (this.isProcessing)
      return;
    setTimeout(() => this._processQueue(), 50);
  }
  async _processQueue() {
    if (this.isProcessing || this.pendingWrites.size === 0)
      return;
    this.isProcessing = true;
    const writes = Array.from(this.pendingWrites.entries());
    this.pendingWrites.clear();
    const promises = writes.map(
      ([key, value]) => this._setRaw(key, value).catch((e) => {
        common_vendor.index.__f__("error", "at utils/storage/asyncStorage.js:147", `[AsyncStorage] 队列写入失败: ${key}`, e);
      })
    );
    await Promise.allSettled(promises);
    this.isProcessing = false;
    if (this.pendingWrites.size > 0) {
      this._scheduleWrite();
    }
  }
  async setWithExpiry(key, value, ttl) {
    return this.set(key, value, { ttl });
  }
  async getWithExpiry(key, defaultValue = null) {
    const cached = this.cache.get(key);
    if (!cached) {
      const value = await this._getRaw(key);
      if (value === null)
        return defaultValue;
      return value;
    }
    if (cached.ttl && Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return defaultValue;
    }
    return cached.value;
  }
  async getWallpaperList() {
    const cached = this.cache.get(utils_storage_config.StorageKeys.STORAGE_CLASS_LIST);
    if (cached) {
      const ttl = utils_storage_config.StorageConfig.cacheExpiry.storageClassList;
      if (Date.now() - cached.timestamp < ttl) {
        return cached.value;
      }
    }
    return this.get(utils_storage_config.StorageKeys.STORAGE_CLASS_LIST, []);
  }
  async setWallpaperList(list) {
    return this.set(utils_storage_config.StorageKeys.STORAGE_CLASS_LIST, list);
  }
  async appendWallpaperList(items) {
    const current = await this.getWallpaperList();
    const newList = [...current, ...items];
    return this.set(utils_storage_config.StorageKeys.STORAGE_CLASS_LIST, newList);
  }
  async clearWallpaperList() {
    return this.remove(utils_storage_config.StorageKeys.STORAGE_CLASS_LIST);
  }
  async getBannerCache() {
    return this.getWithExpiry(utils_storage_config.StorageKeys.BANNER_CACHE, null);
  }
  async setBannerCache(data) {
    const ttl = utils_storage_config.StorageConfig.cacheExpiry.bannerCache;
    return this.set(utils_storage_config.StorageKeys.BANNER_CACHE, data, { ttl });
  }
  async getClassifyCache() {
    return this.getWithExpiry(utils_storage_config.StorageKeys.CLASSIFY_CACHE, null);
  }
  async setClassifyCache(data) {
    const ttl = utils_storage_config.StorageConfig.cacheExpiry.classifyCache;
    return this.set(utils_storage_config.StorageKeys.CLASSIFY_CACHE, data, { ttl });
  }
  async getUserStats() {
    return {
      downloadCount: await this.get(utils_storage_config.StorageKeys.USER_DOWNLOAD_COUNT, 0),
      scoreCount: await this.get(utils_storage_config.StorageKeys.USER_SCORE_COUNT, 0)
    };
  }
  async incrementDownloadCount() {
    const current = await this.get(utils_storage_config.StorageKeys.USER_DOWNLOAD_COUNT, 0);
    return this.set(utils_storage_config.StorageKeys.USER_DOWNLOAD_COUNT, current + 1);
  }
  async incrementScoreCount() {
    const current = await this.get(utils_storage_config.StorageKeys.USER_SCORE_COUNT, 0);
    return this.set(utils_storage_config.StorageKeys.USER_SCORE_COUNT, current + 1);
  }
  async setUserStats(stats) {
    const promises = [];
    if (stats.downloadCount !== void 0) {
      promises.push(this.set(utils_storage_config.StorageKeys.USER_DOWNLOAD_COUNT, stats.downloadCount));
    }
    if (stats.scoreCount !== void 0) {
      promises.push(this.set(utils_storage_config.StorageKeys.USER_SCORE_COUNT, stats.scoreCount));
    }
    await Promise.all(promises);
  }
  async flush() {
    if (this.pendingWrites.size > 0) {
      await this._processQueue();
    }
  }
  getCacheStats() {
    return {
      cacheSize: this.cache.size,
      pendingWrites: this.pendingWrites.size,
      isProcessing: this.isProcessing
    };
  }
}
const asyncStorage = new AsyncStorage();
exports.asyncStorage = asyncStorage;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/utils/storage/asyncStorage.js.map

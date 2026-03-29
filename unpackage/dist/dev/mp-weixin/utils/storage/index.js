"use strict";
const utils_storage_syncStorage = require("./syncStorage.js");
const utils_storage_asyncStorage = require("./asyncStorage.js");
const utils_storage_config = require("./config.js");
class UnifiedStorage {
  constructor() {
    this.sync = utils_storage_syncStorage.syncStorage;
    this.async = utils_storage_asyncStorage.asyncStorage;
  }
  isSyncKey(key) {
    return utils_storage_config.StorageConfig.syncKeys.includes(key);
  }
  isAsyncKey(key) {
    return utils_storage_config.StorageConfig.asyncKeys.includes(key);
  }
  set(key, value, options = {}) {
    if (this.isSyncKey(key)) {
      return Promise.resolve(this.sync.set(key, value));
    }
    return this.async.set(key, value, options);
  }
  setSync(key, value) {
    return this.sync.set(key, value);
  }
  async setAsync(key, value, options = {}) {
    return this.async.set(key, value, options);
  }
  get(key, defaultValue = null) {
    if (this.isSyncKey(key)) {
      return this.sync.get(key, defaultValue);
    }
    return this.async.get(key, defaultValue);
  }
  getSync(key, defaultValue = null) {
    return this.sync.get(key, defaultValue);
  }
  async getAsync(key, defaultValue = null) {
    return this.async.get(key, defaultValue);
  }
  remove(key) {
    if (this.isSyncKey(key)) {
      return Promise.resolve(this.sync.remove(key));
    }
    return this.async.remove(key);
  }
  removeSync(key) {
    return this.sync.remove(key);
  }
  async removeAsync(key) {
    return this.async.remove(key);
  }
  has(key) {
    if (this.isSyncKey(key)) {
      return this.sync.has(key);
    }
    return this.async.cache.has(key);
  }
  async clearAll() {
    this.sync.clear();
    await this.async.clear();
    return { success: true };
  }
  async clearSyncData() {
    return this.sync.clear();
  }
  async clearAsyncData() {
    return this.async.clear();
  }
  getSearchHistory() {
    return this.sync.getSearchHistory();
  }
  addSearchHistory(keyword) {
    return this.sync.addSearchHistory(keyword);
  }
  clearSearchHistory() {
    return this.sync.clearSearchHistory();
  }
  getUserPreferences() {
    return this.sync.getUserPreferences();
  }
  setUserPreferences(prefs) {
    return this.sync.setUserPreferences(prefs);
  }
  getUIState() {
    return this.sync.getUIState();
  }
  setUIState(state) {
    return this.sync.setUIState(state);
  }
  async getWallpaperList() {
    return this.async.getWallpaperList();
  }
  async setWallpaperList(list) {
    return this.async.setWallpaperList(list);
  }
  async appendWallpaperList(items) {
    return this.async.appendWallpaperList(items);
  }
  async clearWallpaperList() {
    return this.async.clearWallpaperList();
  }
  async getBannerCache() {
    return this.async.getBannerCache();
  }
  async setBannerCache(data) {
    return this.async.setBannerCache(data);
  }
  async getClassifyCache() {
    return this.async.getClassifyCache();
  }
  async setClassifyCache(data) {
    return this.async.setClassifyCache(data);
  }
  async getUserStats() {
    return this.async.getUserStats();
  }
  async incrementDownloadCount() {
    return this.async.incrementDownloadCount();
  }
  async incrementScoreCount() {
    return this.async.incrementScoreCount();
  }
  async setUserStats(stats) {
    return this.async.setUserStats(stats);
  }
  updateLastVisitTime() {
    return this.sync.updateLastVisitTime();
  }
  getLastVisitTime() {
    return this.sync.getLastVisitTime();
  }
  getStorageInfo() {
    return this.sync.getStorageInfo();
  }
  async flush() {
    return this.async.flush();
  }
  getCacheStats() {
    return {
      sync: {
        cacheSize: this.sync.cache.size
      },
      async: this.async.getCacheStats()
    };
  }
}
const storage = new UnifiedStorage();
exports.storage = storage;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/utils/storage/index.js.map

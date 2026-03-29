"use strict";
const StorageConfig = {
  syncKeys: [
    "userPreferences",
    "searchHistory",
    "uiState",
    "userSession",
    "lastVisitTime",
    "themeMode",
    "notificationSettings"
  ],
  asyncKeys: [
    "storageClassList",
    "bannerCache",
    "classifyCache",
    "userDownloadCount",
    "userScoreCount",
    "wallpaperCache",
    "preloadImages"
  ],
  cacheExpiry: {
    bannerCache: 30 * 60 * 1e3,
    classifyCache: 60 * 60 * 1e3,
    wallpaperCache: 24 * 60 * 60 * 1e3,
    storageClassList: 10 * 60 * 1e3
  },
  maxStorageSize: 10 * 1024 * 1024,
  version: "1.0.0"
};
const StorageKeys = {
  USER_PREFERENCES: "userPreferences",
  SEARCH_HISTORY: "searchHistory",
  UI_STATE: "uiState",
  USER_SESSION: "userSession",
  LAST_VISIT_TIME: "lastVisitTime",
  THEME_MODE: "themeMode",
  NOTIFICATION_SETTINGS: "notificationSettings",
  STORAGE_CLASS_LIST: "storageClassList",
  BANNER_CACHE: "bannerCache",
  CLASSIFY_CACHE: "classifyCache",
  USER_DOWNLOAD_COUNT: "userDownloadCount",
  USER_SCORE_COUNT: "userScoreCount",
  WALLPAPER_CACHE: "wallpaperCache",
  PRELOAD_IMAGES: "preloadImages"
};
exports.StorageConfig = StorageConfig;
exports.StorageKeys = StorageKeys;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/utils/storage/config.js.map

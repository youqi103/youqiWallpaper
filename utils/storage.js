const storage = {
  // 异步存
  set(key, data) {
    return new Promise((resolve, reject) => {
      uni.setStorage({
        key,
        data,
        success: resolve,
        fail: reject, // 这里修复了！不能加 ()
      });
    });
  },
  // 异步取
  get(key) {
    return new Promise((resolve, reject) => {
      uni.getStorage({
        key,
        success: (res) => resolve(res.data),
        fail: reject,
      });
    });
  },
  // 删除
  remove(key) {
    return new Promise((resolve, reject) => {
      uni.removeStorage({
        key,
        success: resolve,
        fail: reject,
      });
    });
  },
  // 清空
  clear() {
    return new Promise((resolve, reject) => {
      uni.clearStorage({
        success: resolve,
        fail: reject,
      });
    });
  },

  // 同步版本
  setSync(key, data) {
    try {
      uni.setStorageSync(key, data);
      return true;
    } catch (e) {
      console.error("setSync error:", e);
      return false;
    }
  },
  getSync(key) {
    try {
      return uni.getStorageSync(key);
    } catch (e) {
      console.error("getSync error:", e);
      return null;
    }
  },
  removeSync(key) {
    try {
      uni.removeStorageSync(key);
      return true;
    } catch (e) {
      return false;
    }
  },
};

export default storage;

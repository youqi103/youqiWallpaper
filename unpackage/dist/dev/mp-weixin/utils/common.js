"use strict";
function formatTimeDifference(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  if (diff < 6e4) {
    return "1分钟";
  } else if (diff < 36e5) {
    return `${Math.floor(diff / 6e4)}分钟`;
  } else if (diff < 864e5) {
    return `${Math.floor(diff / 36e5)}小时`;
  } else if (diff < 2592e6) {
    return `${Math.floor(diff / 864e5)}天`;
  } else if (diff < 7776e6) {
    return `${Math.floor(diff / 2592e6)}月`;
  } else {
    return "三月前";
  }
}
exports.formatTimeDifference = formatTimeDifference;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/common.js.map

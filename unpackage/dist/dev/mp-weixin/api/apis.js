"use strict";
const utils_request = require("../utils/request.js");
function apiGetBanner() {
  return utils_request.request({ url: "/homeBanner" });
}
function apiGetRedomPage() {
  return utils_request.request({ url: "/randomWall" });
}
function apiGetNotice(data = {}) {
  return utils_request.request({
    url: "/wallNewsList",
    data
  });
}
function apiGetClassify(data = {}) {
  return utils_request.request({
    url: "/classify",
    data
  });
}
function apiGetClassList(data = {}) {
  return utils_request.request({
    url: "/wallList",
    data
  });
}
function apiSearchWall(data = {}) {
  return utils_request.request({
    url: "/searchWall",
    data
  });
}
function apiSetupScore(data = {}) {
  return utils_request.request({
    url: "/setupScore",
    data
  });
}
exports.apiGetBanner = apiGetBanner;
exports.apiGetClassList = apiGetClassList;
exports.apiGetClassify = apiGetClassify;
exports.apiGetNotice = apiGetNotice;
exports.apiGetRedomPage = apiGetRedomPage;
exports.apiSearchWall = apiSearchWall;
exports.apiSetupScore = apiSetupScore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/apis.js.map

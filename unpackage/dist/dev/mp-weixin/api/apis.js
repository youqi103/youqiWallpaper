"use strict";
const utils_request = require("../utils/request.js");
function apiGetBanner() {
  return utils_request.request({ url: "/homeBanner" });
}
function apiGetRedomPage() {
  return utils_request.request({ url: "/randomWall" });
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
function apiDownloadWall(data = {}) {
  return utils_request.request({
    url: "/downloadWall",
    data
  });
}
function apiGetUserDownloadList(data = {}) {
  return utils_request.request({
    url: "/userWallList",
    data: { ...data, type: "download" }
  });
}
function apiGetUserScoreList(data = {}) {
  return utils_request.request({
    url: "/userWallList",
    data: { ...data, type: "score" }
  });
}
exports.apiDownloadWall = apiDownloadWall;
exports.apiGetBanner = apiGetBanner;
exports.apiGetClassList = apiGetClassList;
exports.apiGetClassify = apiGetClassify;
exports.apiGetRedomPage = apiGetRedomPage;
exports.apiGetUserDownloadList = apiGetUserDownloadList;
exports.apiGetUserScoreList = apiGetUserScoreList;
exports.apiSearchWall = apiSearchWall;
exports.apiSetupScore = apiSetupScore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/apis.js.map

import { request } from "@/utils/request.js";

export function apiGetBanner() {
  return request({ url: "/homeBanner" });
}
export function apiGetRedomPage() {
  return request({ url: "/randomWall" });
}
export function apiGetNotice(data = {}) {
  return request({
    url: "/wallNewsList",
    data,
  });
}
export function apiGetClassify(data = {}) {
  return request({
    url: "/classify",
    data,
  });
}

export function apiGetClassList(data = {}) {
  return request({
    url: "/wallList",
    data,
  });
}

export function apiSearchWall(data = {}) {
  return request({
    url: "/searchWall",
    data,
  });
}

// 提交壁纸评分
export function apiSetupScore(data = {}) {
  return request({
    url: "/setupScore",
    data,
  });
}

// 记录壁纸下载
export function apiDownloadWall(data = {}) {
  return request({
    url: "/downloadWall",
    data,
  });
}

// 获取用户下载列表
export function apiGetUserDownloadList(data = {}) {
  return request({
    url: "/userWallList",
    data: { ...data, type: "download" },
  });
}

// 获取用户评分列表
export function apiGetUserScoreList(data = {}) {
  return request({
    url: "/userWallList",
    data: { ...data, type: "score" },
  });
}

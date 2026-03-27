<template>
  <view class="layout">
    <view class="navbar">
      <view class="statusBar" :style="{ height: getStatusBarHeight() + 'px' }">
      </view>
      <view class="titleBar" :style="{ height: getTitleBarHeight() + 'px' }">
        <view class="title">
          {{ title }}
        </view>
        <view class="search" @click="goSearch">
          <uni-icons type="search" size="18" class="icon"></uni-icons>
          <text class="text">搜索</text>
        </view>
      </view>
    </view>
    <view class="fill" :style="{ height: getNavBarHeight() + 'px' }"> </view>
  </view>
</template>
<script setup>
import { ref, defineProps } from "vue";
import {
  getStatusBarHeight,
  getTitleBarHeight,
  getNavBarHeight,
} from "@/utils/system.js";
defineProps({
  title: {
    type: String,
    default: "标题",
  },
});

// 跳转到搜索页
const goSearch = () => {
  uni.navigateTo({
    url: "/pages/search/search",
  });
};
</script>

<style lang="scss" scoped>
.layout {
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    background:
      linear-gradient(to bottom, transparent, white 400rpx),
      linear-gradient(to right, #aeeeee 20%, #ffebee);
    .statusBar {
    }
    .titleBar {
      display: flex;
      align-items: center;
      padding: 0 30rpx;

      .title {
        font-size: 44rpx;
        font-weight: 700;
        color: #000;
      }
      .search {
        width: 220rpx;
        height: 50rpx;
        border-radius: 60rpx;
        background: rgba(255, 255, 255, 0.4);
        border: 1px solid #fff;
        margin-left: 30rpx;
        color: $text-font-color-3;
        font-size: 28rpx;
        display: flex;
        align-items: center;
        .text {
          padding-left: 10rpx;
        }
        .icon {
          margin-left: 10rpx;
        }
      }
    }
  }
}
</style>

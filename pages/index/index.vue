<template>
  <view class="home_Layout pageBg">
    <custom-nav-bar title="推荐"></custom-nav-bar>
    <view class="banner">
      <swiper
        indicator-dots
        indicator-color="rgb(255,255,255,0.5)"
        indicator-active-color="#fff"
        autoplay
      >
        <swiper-item v-for="item in bannerList" :key="item._id">
          <image :src="item.picurl" mode="aspectFill"></image>
        </swiper-item>
      </swiper>
    </view>

    <view class="notice">
      <view class="left">
        <uni-icons type="sound-filled" size="20"></uni-icons>
        <text class="text">公告</text>
      </view>
      <view class="center">
        <swiper vertical autoplay interval="1500" duration="300" circular>
          <swiper-item v-for="item in notice" :key="item._id">
            <navigator url="/pages/notice/detial/detial">
              {{ item.title }}
            </navigator>
          </swiper-item>
        </swiper>
      </view>
      <view class="right">
        <uni-icons type="forward" size="16"></uni-icons>
      </view>
    </view>

    <view class="select">
      <common-title>
        <template #name> 每日推荐 </template>
        <template #custom>
          <view class="date">
            <uni-icons type="calendar" size="20"></uni-icons>
            <view class="text">
              <uni-dateformat :date="Date.now()" format="dd号"></uni-dateformat>
            </view>
          </view>
        </template>
      </common-title>
      <view class="content">
        <scroll-view scroll-x>
          <view
            class="box"
            v-for="item in redomPage"
            @click="goPreview(item._id)"
            :key="item._id"
          >
            <image :src="item.smallPicurl" mode="aspectFill"></image>
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="theme">
      <common-title>
        <template #name> 专题精选 </template>
        <template #custom>
          <navigator url="" class="more">More+</navigator>
        </template>
      </common-title>
      <view class="content">
        <theme-item
          v-for="item in classify"
          :item="item"
          :key="item._id"
        ></theme-item>
        <theme-item :isMore="true"></theme-item>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import {
  apiGetBanner,
  apiGetRedomPage,
  // apiGetNotice,
  apiGetClassify,
} from "@/api/apis.js";

const bannerList = ref([]);
const redomPage = ref([]);
const notice = ref([
  {
    _id: '1',
    title: '欢迎使用忧戚的壁纸，海量高清壁纸等你发现'
  },
  {
    _id: '2',
    title: '每日推荐壁纸更新，为你的设备带来新鲜体验'
  },
  {
    _id: '3',
    title: '专题精选栏目上线，分类浏览更方便'
  }
]);
const classify = ref([]);

const getBanner = async () => {
  let res = await apiGetBanner();
  bannerList.value = res.data;
};
const getRedomPage = async () => {
  let res = await apiGetRedomPage();
  redomPage.value = res.data;
  uni.setStorageSync("storageClassList", res.data);
};

// const getNotice = async () => {
//   let res = await apiGetNotice({ select: true });  
//   notice.value = res.data;
// };

const getClassify = async () => {
  let res = await apiGetClassify({ select: true });
  classify.value = res.data;
};

const goPreview = (_id) => {
  // 跳转前确保存储的是每日推荐数据
  uni.setStorageSync("storageClassList", redomPage.value);
  uni.navigateTo({
    url: "/pages/preview/preview?id=" + _id,
  });
};
getBanner();
getRedomPage();
// getNotice();
getClassify();
</script>

<style lang="scss" scoped>
.home_Layout {
  .banner {
    width: 750rpx;
    padding: 30rpx 0;
    swiper {
      width: 100%;
      height: 340rpx;
      &-item {
        width: 100%;
        height: 100%;
        padding: 0 30rpx;
        image {
          width: 100%;
          height: 100%;
          border-radius: 20rpx;
        }
      }
    }
  }
  .notice {
    width: 690rpx;
    height: 80rpx;
    line-height: 80rpx;
    margin: 0 auto;
    display: flex;
    border-radius: 40rpx;
    background-color: $text-background-color;
    .left {
      display: flex;
      width: 140rpx;
      align-items: center;
      justify-content: center;
      :deep() {
        .uni-icons {
          color: $brand-theme-color !important;
        }
      }
      .text {
        color: $brand-theme-color;
        font-weight: 700;
        font-size: 28rpx;
      }
    }
    .right {
      width: 70rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      :deep() {
        .uni-icons {
          color: $brand-theme-color !important;
        }
      }
    }
    .center {
      flex: 1;
      swiper {
        height: 100%;
        swiper-item {
          height: 100%;
          font-color: #666;
          font-size: 30rpx;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .select {
    padding-top: 50rpx;
    .date {
      display: flex;
      justify-content: center;
      align-items: center;
      color: $brand-theme-color;
      .text {
        margin-left: 5rpx;
        font-size: 26rpx;
      }
      :deep() {
        .uni-icons {
          color: $brand-theme-color !important;
        }
      }
    }
    .content {
      width: 720rpx;
      margin-left: 30rpx;
      margin-top: 30rpx;
      scroll-view {
        white-space: nowrap;
        .box {
          display: inline-block;
          width: 200rpx;
          height: 430rpx;
          margin-right: 30rpx;

          image {
            width: 100%;
            height: 100%;
            border-radius: 10rpx;
          }
        }
        .box:last-child {
          margin-right: 30rpx;
        }
      }
    }
  }
  .theme {
    padding: 50rpx 0;
    .content {
      margin-top: 30rpx;
      padding: 0 30rpx;
      display: grid;
      gap: 15rpx;
      grid-template-columns: repeat(3, 1fr);
    }
    .more {
      font-size: 27rpx;
      color: #999;
    }
  }
}
</style>

<template>
  <view class="classList">
    <view class="loadingLayout" v-if="isLoading && !dataList.length">
      <uni-load-more status="loading"></uni-load-more>
    </view>
    <view class="emptyLayout" v-if="!isLoading && isEmpty && !dataList.length">
      <uv-empty mode="list" text="暂无下载记录"></uv-empty>
    </view>
    <view class="content" v-if="dataList.length">
      <view
        class="item"
        v-for="item in dataList"
        :key="item._id"
        @click="goPreview(item._id)"
      >
        <image :src="item.smallPicurl" mode="aspectFill"></image>
      </view>
    </view>
    <view class="loadingLayout" v-if="dataList.length && !isEmpty">
      <uni-load-more status="loading"></uni-load-more>
    </view>
    <view class="safe-area-inset-bottom"> </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import {
  onLoad,
  onReachBottom,
  onPullDownRefresh,
  onUnload,
} from "@dcloudio/uni-app";
import { apiGetUserDownloadList } from "@/api/apis.js";

const dataList = ref([]);
const isEmpty = ref(false);
const isLoading = ref(true);
const queryParams = {
  pageNum: 1,
  pageSize: 12,
};

onPullDownRefresh(() => {
  dataList.value = [];
  isEmpty.value = false;
  isLoading.value = true;
  queryParams.pageNum = 1;
  getDataList();
  uni.stopPullDownRefresh();
});

onLoad(() => {
  uni.setNavigationBarTitle({
    title: "我的下载",
  });
  getDataList();
});

onReachBottom(() => {
  if (isEmpty.value || isLoading.value) return;
  queryParams.pageNum++;
  getDataList();
});

const getDataList = async () => {
  isLoading.value = true;
  try {
    let res = await apiGetUserDownloadList(queryParams);
    dataList.value = [...dataList.value, ...res.data];
    if (res.data.length < queryParams.pageSize) {
      isEmpty.value = true;
    }
  } catch (e) {
    isEmpty.value = true;
  } finally {
    isLoading.value = false;
  }
};

// 跳转到预览页
const goPreview = (id) => {
  // 存储当前列表到 storageClassList，供预览页读取
  uni.setStorageSync("storageClassList", dataList.value);
  uni.navigateTo({
    url: "/pages/preview/preview?id=" + id,
  });
};

// 页面卸载时清除存储
onUnload(() => {
  uni.removeStorageSync("storageClassList");
});
</script>

<style lang="scss" scoped>
.classList {
  padding: 5rpx 5rpx;
  .emptyLayout {
    padding: 100rpx 0;
  }
  .content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rpx;
    .item {
      height: 450rpx;
      image {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}
</style>

<template>
  <view class="searchLayout">
    <!-- 搜索内容区域 -->
    <view class="content">
      <!-- 搜索框 -->
      <view class="search-bar-container">
        <uni-search-bar
          radius="5"
          v-model="keyword"
          placeholder="请搜索你想要的内容"
          clearButton="always"
          cancelButton="always"
          @confirm="handleSearch"
          @cancel="resetSearch"
        />
      </view>

      <!-- 最近搜索 -->
      <view class="section" v-if="!hasSearched">
        <view class="sectionHeader">
          <text class="title">最近搜索</text>
          <uni-icons
            type="trash"
            size="20"
            class="trash"
            @click="clearHistory"
          ></uni-icons>
        </view>
        <view class="tags" v-if="historyList.length > 0">
          <view
            class="tag"
            v-for="(item, index) in historyList"
            :key="index"
            @click="clickHistory(item)"
          >
            {{ item }}
          </view>
        </view>
      </view>

      <!-- 热门搜索 -->
      <view class="section" v-if="!hasSearched">
        <view class="sectionHeader">
          <text class="title">热门搜索</text>
        </view>
        <view class="tags">
          <view
            class="tag hot"
            v-for="(item, index) in hotList"
            :key="index"
            @click="clickHot(item)"
          >
            {{ item }}
          </view>
        </view>
      </view>

      <view class="section" v-if="!searchResults.length">
        <uv-empty
          mode="search"
          icon="https://cdn.uviewui.com/uview/empty/search.png"
        ></uv-empty>
      </view>
      <!-- 搜索结果 -->
      <view class="searchResult" v-if="hasSearched">
        <view class="resultList" v-if="searchResults.length > 0">
          <view
            class="item"
            v-for="item in searchResults"
            :key="item._id"
            @click="goPreview(item._id)"
          >
            <image :src="item.smallPicurl" mode="aspectFill"></image>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部加载提示 -->
    <view class="loadingMore" v-if="hasSearched && searchResults.length > 0">
      <text v-if="isLoading">加载中...</text>
      <text v-else-if="noMore">没有更多了</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onReachBottom, onUnload } from "@dcloudio/uni-app";
import { apiGetClassList, apiSearchWall } from "@/api/apis.js";
// 搜索关键词
const keyword = ref("");
// 搜索历史
const historyList = ref([]);
// 热门搜索
const hotList = ref(["美女", "帅哥", "卡通", "萌宠"]);
// 搜索结果
const searchResults = ref([]);
// 是否已搜索
const hasSearched = ref(false);
// 是否加载中
const isLoading = ref(false);
// 是否没有更多
const noMore = ref(false);
// 分页参数
const pageNum = ref(1);
const pageSize = ref(9);

// 获取搜索历史
const getHistory = () => {
  const history = uni.getStorageSync("searchHistory");
  if (history) {
    historyList.value = JSON.parse(history);
  }
};

// 保存搜索历史
const saveHistory = (kw) => {
  let list = [...historyList.value];
  // 如果已存在，先删除
  const index = list.indexOf(kw);
  if (index > -1) {
    list.splice(index, 1);
  }
  // 添加到最前面
  list.unshift(kw);
  // 最多保留10条
  if (list.length > 10) {
    list = list.slice(0, 10);
  }
  historyList.value = list;
  uni.setStorageSync("searchHistory", JSON.stringify(list));
};

// 清空搜索历史
const clearHistory = () => {
  uni.showModal({
    title: "提示",
    content: "确定要清空搜索历史吗？",
    success: (res) => {
      if (res.confirm) {
        historyList.value = [];
        uni.removeStorageSync("searchHistory");
      }
    },
  });
};

// 重置搜索
const resetSearch = () => {
  // 清空关键词
  keyword.value = "";
  // 重置搜索结果
  searchResults.value = [];
  // 重置已搜索状态
  hasSearched.value = false;
  // 重置分页参数
  pageNum.value = 1;
  // 重置加载状态
  isLoading.value = false;
  // 重置没有更多状态
  noMore.value = false;
};

// 点击历史记录搜索
const clickHistory = (kw) => {
  keyword.value = kw;
  handleSearch();
};

// 点击热门搜索
const clickHot = (kw) => {
  keyword.value = kw;
  handleSearch();
};

// 执行搜索
const handleSearch = async () => {
  if (!keyword.value.trim()) {
    uni.showToast({
      title: "请输入搜索关键词",
      icon: "none",
    });
    return;
  }

  // 重置状态
  searchResults.value = [];
  pageNum.value = 1;
  noMore.value = false;
  hasSearched.value = true;

  // 保存搜索历史
  saveHistory(keyword.value.trim());

  // 执行搜索
  await doSearch();
};

// 执行搜索请求
const doSearch = async () => {
  if (isLoading.value || noMore.value) return;

  isLoading.value = true;

  try {
    const res = await apiSearchWall({
      keyword: keyword.value.trim(),
      pageNum: pageNum.value,
      pageSize: pageSize.value,
    });

    // 处理图片地址，将小图转为大图
    const list = res.data.map((item) => {
      return {
        ...item,
        smallPicurl: item.smallPicurl.replace("_small.webp", ".jpg"),
      };
    });

    if (pageNum.value === 1) {
      searchResults.value = list;
    } else {
      searchResults.value = [...searchResults.value, ...list];
    }

    // 判断是否还有更多
    if (list.length < pageSize.value) {
      noMore.value = true;
    } else {
      pageNum.value++;
    }
  } catch (e) {
    console.error("搜索失败", e);
  } finally {
    isLoading.value = false;
  }
};

// 跳转到预览页
const goPreview = (id) => {
  // 存储搜索结果到 storageClassList，供预览页读取
  uni.setStorageSync("storageClassList", searchResults.value);
  uni.navigateTo({
    url: "/pages/preview/preview?id=" + id,
  });
};

// 页面加载时获取历史记录
onMounted(() => {
  getHistory();
});

// 触底加载更多
onReachBottom(() => {
  if (hasSearched.value && !noMore.value && !isLoading.value) {
    doSearch();
  }
});
onUnload(() => {
  uni.removeStorageSync("storageClassList");
});
</script>

<style lang="scss" scoped>
.searchLayout {
  min-height: 100vh;
  padding: 20rpx;

  .content {
    margin-top: 20rpx;
    // 搜索框容器
    .search-bar-container {
      margin-bottom: 30rpx;
    }

    .section {
      margin-bottom: 40rpx;
      padding: 0 20rpx;
      .sectionHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20rpx;

        .title {
          font-size: 32rpx;
          font-weight: 700;
          color: #333;
        }

        .trash {
          color: #999;
        }
      }

      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 20rpx;

        .tag {
          padding: 12rpx 30rpx;
          background: #f5f5f5;
          border-radius: 30rpx;
          font-size: 26rpx;
          color: #666;
          transition: all 0.3s ease;

          &:hover {
            background: #e8e8e8;
          }

          &.hot {
            color: #333;
            font-weight: 500;
          }
        }
      }
    }

    .searchResult {
      .resultList {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15rpx;

        .item {
          aspect-ratio: 9/16;
          border-radius: 10rpx;
          overflow: hidden;
          box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;

          &:hover {
            transform: translateY(-4rpx);
          }

          image {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  .loadingMore {
    text-align: center;
    padding: 30rpx;
    color: #999;
    font-size: 26rpx;
  }
}
</style>

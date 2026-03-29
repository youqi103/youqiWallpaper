<template>
  <view class="preview">
    <swiper
      ref="swiperRef"
      circular
      :current="currentIndex"
      @change="swiperChange"
      v-if="isReady"
    >
      <swiper-item v-for="item in classList" :key="item._id">
        <image
          :src="item.picurl"
          mode="aspectFill"
          @click="changeMaskState"
        ></image>
      </swiper-item>
    </swiper>
    <view class="mask" v-if="maskState">
      <view
        class="goBack"
        :style="{ top: getStatusBarHeight() + 'px' }"
        @click="goBack"
      >
        <uni-icons type="back" size="20" color="#fff"></uni-icons>
      </view>
      <view class="count">
        {{ currentIndex + 1 }} / {{ classList.length }}
      </view>
      <view class="time">
        <uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
      </view>
      <view class="date">
        <uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
      </view>
      <view class="footer">
        <view class="box" @click="openInfoPopup">
          <uni-icons type="info-filled" size="23"></uni-icons>
          <view class="text"> 信息 </view>
        </view>
        <view class="box" @click="openScorePopup">
          <uni-icons type="star" size="23"></uni-icons>
          <view class="text"> {{ currentInfo?.score || 0 }}分 </view>
        </view>
        <view class="box" @click="downloadImage">
          <uni-icons type="download" size="23"></uni-icons>
          <view class="text"> 下载 </view>
        </view>
      </view>
    </view>
    <uni-popup ref="infopopup" type="bottom">
      <view class="infopopup">
        <view class="popHeader">
          <view class=""> </view>
          <view class="title"> 壁纸信息 </view>
          <view class="close" @click="closeInfoPopup">
            <uni-icons type="closeempty" size="30"></uni-icons>
          </view>
        </view>
        <scroll-view scroll-y="true">
          <view class="content">
            <view class="row">
              <view class="label">壁纸ID : </view>
              <text selectable class="value"> {{ currentInfo?._id }}</text>
            </view>
            <view class="row">
              <view class="label">分类 : </view>
              <text selectable class="value class">
                {{ currentInfo?.classname || "未分类" }}</text
              >
            </view>
            <view class="row">
              <view class="label">发布者 : </view>
              <text selectable class="value"> {{ currentInfo?.nickname }}</text>
            </view>
            <view class="row">
              <view class="label">评分 : </view>
              <view class="rate-box value">
                <uni-rate :value="currentInfo?.score" @change="onChange" />
                <text selectable class="score"
                  >{{ currentInfo?.score || 0 }}分</text
                >
              </view>
            </view>
            <view class="row">
              <view class="label">摘要 : </view>
              <text selectable class="value">
                {{ currentInfo?.description }}</text
              >
            </view>
            <view class="row">
              <view class="label">标签 : </view>
              <view> </view>
              <view class="tabs value">
                <text
                  selectable
                  class="tab"
                  v-for="item in currentInfo?.tabs"
                  :key="item"
                  >{{ item }}</text
                >
              </view>
            </view>
            <view class="copyright">
              声明：本图片来用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱513894357@qq.com，管理将删除侵权壁纸，维护您的权益。
            </view>
          </view>
        </scroll-view>
      </view>
    </uni-popup>
    <uni-popup ref="scorePopup" :is-mask-click="false">
      <view class="scorePopup">
        <view class="popHeader">
          <view class=""> </view>
          <view class="title"> 壁纸评分 </view>
          <view class="close" @click="closeScorePopup">
            <uni-icons type="closeempty" size="30"></uni-icons>
          </view>
        </view>

        <view class="content">
          <uni-rate v-model="userScore" allowHalf />
          <text class="text">{{ userScore }}</text>
        </view>
        <view class="footer">
          <button
            size="mini"
            plain
            :disabled="!userScore || isSubmitting"
            @click="submitScore"
          >
            {{ isSubmitting ? "提交中..." : "确认评分" }}
          </button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getStatusBarHeight } from "@/utils/system.js";
import storage from "@/utils/storage.js";
import { onLoad } from "@dcloudio/uni-app";
import { apiSetupScore, apiDownloadWall } from "@/api/apis.js";
const maskState = ref(true);
const userScore = ref(0);
const isSubmitting = ref(false);
const classList = ref([]);
const currentId = ref(null);
const currentIndex = ref(0);
const isReady = ref(false);

onLoad(async (e) => {
  // 每次进入页面时重新读取存储，确保获取最新的图片列表
  const storageClassList = (await storage.get("storageClassList")) || [];

  // 转换图片URL格式
  classList.value = storageClassList.map((item) => {
    let processedItem = {
      ...item,
      picurl: item.smallPicurl.replace("_small.webp", ".jpg"),
    };
    if (item.tabs && item.tabs.length > 0) {
      processedItem.classname = item.tabs[0] || "未分类";
      processedItem.tabs = item.tabs.slice(1);
    }

    return processedItem;
  });

  currentId.value = e.id;
  const foundIndex = classList.value.findIndex((item) => item._id == e.id);

  if (foundIndex !== -1) {
    currentIndex.value = foundIndex;
  } else {
    // 找不到对应图片时，显示错误提示并返回
    uni.showToast({
      title: "图片不存在或数据已过期",
      icon: "none",
    });
    setTimeout(() => {
      uni.navigateBack();
    }, 1500);
    return;
  }

  // 延迟显示 swiper，确保索引已正确设置
  setTimeout(() => {
    isReady.value = true;
  }, 50);
});

onMounted(() => {
  if (classList.value.length === 0) {
    uni.showToast({
      title: "图片数据加载失败，请重试",
      icon: "none",
    });
    setTimeout(() => {
      uni.navigateBack();
    }, 1500);
  }
});

// 改变图片序号
const swiperChange = (e) => {
  currentIndex.value = e.detail.current;
};
//改变遮罩层状态
const changeMaskState = () => {
  maskState.value = !maskState.value;
};
const infopopup = ref(null);
// 打开信息弹窗
const openInfoPopup = () => {
  infopopup.value.open();
};
// 关闭信息弹窗
const closeInfoPopup = () => {
  infopopup.value.close();
};
// 评分弹窗
const scorePopup = ref(null);
const openScorePopup = () => {
  // 设置默认评分为当前图片的评分
  userScore.value = currentInfo.value?.score || 0;
  scorePopup.value.open();
};
const closeScorePopup = () => {
  scorePopup.value.close();
};

// 下载图片
const downloadImage = async () => {
  // 检查是否有当前图片信息
  if (!currentInfo.value) {
    uni.showToast({
      title: "图片信息不存在",
      icon: "none",
    });
    return;
  }

  // 显示加载提示
  uni.showLoading({
    title: "下载中...",
    mask: true,
  });

  try {
    // 1. 下载图片到本地临时路径
    const downloadRes = await uni.downloadFile({
      url: currentInfo.value.picurl,
    });

    if (downloadRes.statusCode !== 200) {
      throw new Error("下载失败");
    }

    // 2. 保存图片到相册
    await uni.saveImageToPhotosAlbum({
      filePath: downloadRes.tempFilePath,
    });

    // 3. 记录下载到服务器
    try {
      await apiDownloadWall({
        classid: currentInfo.value?.classid,
        wallId: currentInfo.value?._id,
      });
      // 更新本地缓存的下载计数
      const cachedCount = uni.getStorageSync("userDownloadCount") || 0;
      await storage.set("userDownloadCount", cachedCount + 1);
    } catch (e) {
      console.log("记录下载失败", e);
    }

    uni.hideLoading();
    uni.showToast({
      title: "保存成功",
      icon: "success",
    });
  } catch (error) {
    uni.hideLoading();

    // 判断是否是权限问题
    if (error.errMsg && error.errMsg.includes("auth deny")) {
      uni.showModal({
        title: "提示",
        content: "需要您授权保存图片到相册",
        confirmText: "去授权",
        success: (res) => {
          if (res.confirm) {
            uni.openSetting();
          }
        },
      });
    } else {
      uni.showToast({
        title: "下载失败，请重试",
        icon: "none",
      });
    }
  }
};

// 提交评分
const submitScore = async () => {
  // 验证评分
  if (!userScore.value || userScore.value <= 0) {
    uni.showToast({
      title: "请选择评分",
      icon: "none",
    });
    return;
  }

  // 防止重复提交
  if (isSubmitting.value) return;
  isSubmitting.value = true;

  // 显示加载提示
  uni.showLoading({
    title: "提交中...",
    mask: true,
  });

  try {
    const res = await apiSetupScore({
      classid: currentInfo.value?.classid,
      wallId: currentInfo.value?._id,
      userScore: String(userScore.value),
    });

    uni.hideLoading();

    // 提交成功
    uni.showToast({
      title: "评分成功",
      icon: "success",
    });

    // 更新本地评分显示
    if (currentInfo.value) {
      currentInfo.value.score = userScore.value;
    }

    // 更新本地缓存的评分计数
    const cachedCount = uni.getStorageSync("userScoreCount") || 0;
    await storage.set("userScoreCount", cachedCount + 1);

    // 关闭弹窗
    closeScorePopup();
  } catch (error) {
    uni.hideLoading();
  } finally {
    isSubmitting.value = false;
  }
};
const goBack = () => {
  uni.navigateBack();
};

// 获取当前显示的壁纸信息
const currentInfo = computed(() => {
  return classList.value[currentIndex.value];
});
</script>

<style lang="scss" scoped>
.preview {
  width: 100%;
  height: 100vh;
  position: relative;
  swiper {
    width: 100%;
    height: 100%;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .mask {
    & > view {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      width: fit-content;
    }
    .goBack {
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.3);
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 0;
      left: 30rpx;
      width: 60rpx;
      height: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      backdrop-filter: blur(10rpx);
      margin-left: 0;
    }
    .count {
      top: 10vh;
      color: #fff;
      font-size: 28rpx;
      border-radius: 40rpx;
      padding: 8rpx 28rpx;
      background-color: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10rpx);
    }
    .time {
      color: #fff;
      top: calc(10vh + 80rpx);
      font-size: 140rpx;
      font-weight: 100;
      line-height: 1em;
      text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
    }
    .date {
      color: #fff;
      font-size: 34rpx;
      top: calc(10vh + 230rpx);
      text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
    }
    .footer {
      border-radius: 120rpx;
      background-color: rgba(255, 255, 255, 0.8);
      width: 65vw;
      height: 120rpx;
      bottom: 10vh;
      backdrop-filter: blur(20rpx);
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
      .box {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 0 16rpx;
        .text {
          font-size: 24rpx;
          color: $text-font-color-2;
        }
      }
    }
  }

  .infopopup {
    padding: 30rpx;
    border-radius: 30rpx 30rpx 0 0;
    overflow: hidden;
    width: 100%;
    background-color: #fff;

    scroll-view {
      max-height: 60vh;
      .content {
        .row {
          display: flex;
          padding: 16rpx 0;
          font-size: 32rpx;
          line-height: 1.7em;
          align-items: center;
          .label {
            color: $text-font-color-4;
            width: 140rpx;
            text-align: right;
            font-size: 30rpx;
          }
          .value {
            padding-left: 20rpx;
            flex: 1;
            width: 0;
          }
          .class {
            color: $brand-theme-color;
          }
          .rate-box {
            display: flex;
            align-items: center;
            .score {
              font-size: 26rpx;
              color: $text-font-color-4;
              padding-left: 20rpx;
            }
          }
          .tabs {
            display: flex;
            flex-wrap: wrap;
            .tab {
              border: 1px solid $brand-theme-color;
              color: $brand-theme-color;
              font-size: 22rpx;
              padding: 10rpx 30rpx;
              border-radius: 40rpx;
              line-height: 1em;
              margin: 0 10rpx 10rpx 0;
            }
          }
        }
        .copyright {
          font-size: 28rpx;
          padding: 20rpx;
          background-color: #f6f6f6;
          color: #666;
          border-radius: 10rpx;
          margin: 20rpx 0;
          line-height: 1.5em;
        }
      }
    }
  }

  .popHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .close {
      padding: 10rpx;
    }
  }

  .scorePopup {
    background-color: #fff;
    padding: 30rpx;
    width: 70vw;
    border-radius: 30rpx;
    .content {
      display: flex;
      justify-content: center;
      text-align: center;
      padding: 30rpx;
      .text {
        color: #ffca3e;
        padding-left: 10rpx;
        width: 80rpx;
        line-height: 1em;
        text-align: right;
      }
    }
    .footer {
      padding: 10rpx 0;
      display: flex;
      justify-content: center;
      text-align: center;
    }
  }
}
</style>

<template>
  <view class="userLayout pageBg">
    <view class="status_bar"></view>
    <view class="userInfor">
      <view class="avatar">
        <image
          src="/common/images/20200404225248-OIP.jpg"
          mode="aspectFill"
        ></image>
      </view>
      <view class="Ip"> 192.168.1.1 </view>
      <view class="address"> 湖南省 </view>
    </view>
    <view class="section">
      <view class="list">
        <view class="row" @click="goToDownload">
          <view class="left">
            <uni-icons type="download-filled" size="20"></uni-icons>

            <view class="text"> 我的下载 </view>
          </view>
          <view class="right">
            <view class="text"> {{ downloadCount }} </view>
            <uni-icons type="right" size="16" color="#aaa"></uni-icons>
          </view>
        </view>
        <view class="row" @click="goToScore">
          <view class="left">
            <uni-icons type="star-filled" size="20"></uni-icons>

            <view class="text"> 我的评分 </view>
          </view>
          <view class="right">
            <view class="text"> {{ scoreCount }} </view>
            <uni-icons type="right" size="16" color="#aaa"></uni-icons>
          </view>
        </view>
        <view class="row">
          <view class="left">
            <uni-icons type="chatboxes-filled" size="20"></uni-icons>

            <view class="text"> 联系客服 </view>
            <!-- #ifdef WEB -->
            <button @click="CallPhone">拨打电话</button>
            <!-- #endif -->
            <!-- #ifndef WEB -->
            <button open-type="contact">联系客服</button>
            <!-- #endif -->
          </view>
          <view class="right">
            <uni-icons type="right" size="16" color="#aaa"></uni-icons>
          </view>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="list">
        <view class="row" @click="openSubscribePopup">
          <view class="left">
            <uni-icons type="notification-filled" size="20"></uni-icons>

            <view class="text"> 订阅更新 </view>
          </view>
          <view class="right">
            <uni-icons type="right" size="16" color="#aaa"></uni-icons>
          </view>
        </view>

        <view class="row" @click="openFaqPopup">
          <view class="left">
            <uni-icons type="flag-filled" size="20"></uni-icons>

            <view class="text"> 常见问题 </view>
          </view>
          <view class="right">
            <uni-icons type="right" size="16" color="#aaa"></uni-icons>
          </view>
        </view>
      </view>
    </view>

    <!-- 订阅更新弹窗 -->
    <uni-popup ref="subscribePopup" type="center">
      <view class="subscribePopup">
        <view class="popHeader">
          <view class=""></view>
          <view class="title">订阅更新</view>
          <view class="close" @click="closeSubscribePopup">
            <uni-icons type="closeempty" size="26"></uni-icons>
          </view>
        </view>
        <view class="content">
          <view class="tip">开启订阅后，您将第一时间收到新壁纸推送通知</view>
          <view class="subscribe-list">
            <view
              class="subscribe-item"
              v-for="item in subscribeTypes"
              :key="item.id"
            >
              <view class="left">
                <uni-icons
                  :type="item.icon"
                  size="22"
                  color="#28b389"
                ></uni-icons>
                <text class="name">{{ item.name }}</text>
              </view>
              <switch
                :checked="item.subscribed"
                @change="onSubscribeChange(item)"
                color="#28b389"
              />
            </view>
          </view>
        </view>
        <view class="footer">
          <button class="btn-primary" @click="confirmSubscribe">
            确认订阅
          </button>
        </view>
      </view>
    </uni-popup>

    <!-- 常见问题弹窗 -->
    <uni-popup ref="faqPopup" type="bottom">
      <view class="faqPopup">
        <view class="popHeader">
          <view class=""></view>
          <view class="title">常见问题</view>
          <view class="close" @click="closeFaqPopup">
            <uni-icons type="closeempty" size="26"></uni-icons>
          </view>
        </view>
        <scroll-view scroll-y class="faq-list">
          <view class="faq-item" v-for="(item, index) in faqList" :key="index">
            <view class="question" @click="toggleFaq(index)">
              <view class="q-icon">Q</view>
              <text class="q-text">{{ item.question }}</text>
              <uni-icons
                :type="item.expanded ? 'up' : 'down'"
                size="16"
                color="#999"
              ></uni-icons>
            </view>
            <view class="answer" v-if="item.expanded">
              <view class="a-icon">A</view>
              <text class="a-text">{{ item.answer }}</text>
            </view>
          </view>
        </scroll-view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { apiGetUserDownloadList, apiGetUserScoreList } from "@/api/apis.js";
import storage from "@/utils/storage.js";
const downloadCount = ref(0);
const scoreCount = ref(0);

function CallPhone() {
  console.log("拨打电话");
  uni.makePhoneCall({
    phoneNumber: "18565436106",
  });
}

// 跳转到我的下载页面
const goToDownload = () => {
  uni.navigateTo({
    url: "/pages/userDownload/userDownload",
  });
};

// 跳转到我的评分页面
const goToScore = () => {
  uni.navigateTo({
    url: "/pages/userScore/userScore",
  });
};

// 获取用户统计数据
const getUserStats = async () => {
  try {
    // 先显示本地缓存的数量（快速响应）
    const cachedDownloadCount = uni.getStorageSync("userDownloadCount");
    const cachedScoreCount = uni.getStorageSync("userScoreCount");
    if (cachedDownloadCount) downloadCount.value = cachedDownloadCount;
    if (cachedScoreCount) scoreCount.value = cachedScoreCount;

    // 请求API获取最新数据
    const [downloadRes, scoreRes] = await Promise.all([
      apiGetUserDownloadList({ pageNum: 1, pageSize: 100 }),
      apiGetUserScoreList({ pageNum: 1, pageSize: 100 }),
    ]);

    // 更新计数
    downloadCount.value = downloadRes.data.length;
    scoreCount.value = scoreRes.data.length;

    // 缓存到本地存储
    await storage.set("userDownloadCount", downloadCount.value);
    await storage.set("userScoreCount", scoreCount.value);
  } catch (e) {
    console.log("获取用户统计数据失败", e);
  }
};

// 页面显示时刷新数据
onShow(() => {
  getUserStats();
});

// 订阅更新相关
const subscribePopup = ref(null);
const subscribeTypes = ref([
  { id: 1, name: "热门推荐", icon: "fire", subscribed: false },
  { id: 2, name: "最新更新", icon: "refresh", subscribed: false },
  { id: 3, name: "分类通知", icon: "list", subscribed: false },
]);

const openSubscribePopup = () => {
  subscribePopup.value.open();
};

const closeSubscribePopup = () => {
  subscribePopup.value.close();
};

const onSubscribeChange = (item) => {
  item.subscribed = !item.subscribed;
};

const confirmSubscribe = () => {
  const subscribedItems = subscribeTypes.value.filter(
    (item) => item.subscribed,
  );
  if (subscribedItems.length === 0) {
    uni.showToast({
      title: "请至少选择一项订阅",
      icon: "none",
    });
    return;
  }
  uni.showToast({
    title: "订阅成功",
    icon: "success",
  });
  closeSubscribePopup();
};

// 常见问题相关
const faqPopup = ref(null);
const faqList = ref([
  {
    question: "如何下载壁纸？",
    answer:
      '在壁纸预览页面，点击底部的"下载"按钮即可将壁纸保存到手机相册。首次下载需要授权相册访问权限。',
    expanded: false,
  },
  {
    question: "壁纸评分有什么作用？",
    answer:
      "您的评分将帮助其他用户了解壁纸质量，同时也会影响壁纸的推荐排序。高分壁纸会优先展示给更多用户。",
    expanded: false,
  },
  {
    question: "壁纸可以商用吗？",
    answer:
      "本平台壁纸仅供个人学习交流使用，不可用于商业用途。如需商用请联系客服获取授权。",
    expanded: false,
  },
  {
    question: "如何举报侵权壁纸？",
    answer:
      "在壁纸详情页复制壁纸ID，发送至邮箱 513894357@qq.com 进行举报，我们会在3个工作日内处理。",
    expanded: false,
  },
]);

const openFaqPopup = () => {
  faqPopup.value.open();
};

const closeFaqPopup = () => {
  faqPopup.value.close();
};

const toggleFaq = (index) => {
  faqList.value[index].expanded = !faqList.value[index].expanded;
};
</script>

<style lang="scss" scoped>
.userLayout {
  height: 90vh;
  .status_bar {
    height: var(--status-bar-height);
    width: 100%;
  }
  .userInfor {
    padding: 50rpx 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar {
      width: 160rpx;
      height: 160rpx;
      border-radius: 50%;
      overflow: hidden;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .Ip {
      font-size: 44rpx;
      color: #333;
      padding: 20rpx 0 5rpx;
    }
    .address {
      font-size: 28rpx;
      color: #888;
    }
  }
  .section {
    width: 690rpx;
    margin: 50rpx auto;
    border: 1pxS solid #eee;
    border-radius: 10rpx;
    box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);
    .list {
      .row {
        display: flex;
        background-color: #fff;
        justify-content: space-between;
        padding: 0 30rpx;
        height: 100rpx;
        border-bottom: 1px solid #eee;
        position: relative;
        &:last-child {
          border-bottom: none;
        }
        .left {
          display: flex;
          align-items: center;
          justify-content: center;
          .text {
            color: #333;
            font-size: 25rpx;
          }
          :deep() {
            .uni-icons {
              color: $brand-theme-color !important;
            }
          }
        }
        .right {
          display: flex;
          align-items: center;
          .text {
            font-size: 28rpx;
            color: #aaa;
            margin-right: 10rpx;
          }
        }
        button {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100rpx;
          opacity: 0;
        }
      }
    }
  }
}

// 弹窗通用头部
.popHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20rpx;
  .title {
    font-size: 34rpx;
    font-weight: 600;
    color: #333;
  }
  .close {
    padding: 10rpx;
  }
}

// 订阅更新弹窗样式
.subscribePopup {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  width: 600rpx;
  .content {
    .tip {
      font-size: 26rpx;
      color: #888;
      margin-bottom: 30rpx;
      text-align: center;
    }
    .subscribe-list {
      .subscribe-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24rpx 0;
        border-bottom: 1px solid #f0f0f0;
        &:last-child {
          border-bottom: none;
        }
        .left {
          display: flex;
          align-items: center;
          .name {
            margin-left: 16rpx;
            font-size: 30rpx;
            color: #333;
          }
        }
      }
    }
  }
  .footer {
    margin-top: 30rpx;
    .btn-primary {
      background-color: $brand-theme-color;
      color: #fff;
      border: none;
      border-radius: 40rpx;
      font-size: 30rpx;
    }
  }
}

// 常见问题弹窗样式
.faqPopup {
  background-color: #fff;
  border-radius: 30rpx 30rpx 0 0;
  padding: 30rpx;
  max-height: 70vh;
  .faq-list {
    max-height: 55vh;
    .faq-item {
      border-bottom: 1px solid #f0f0f0;
      &:last-child {
        border-bottom: none;
      }
      .question {
        display: flex;
        align-items: center;
        padding: 24rpx 0;
        .q-icon {
          width: 44rpx;
          height: 44rpx;
          background-color: $brand-theme-color;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24rpx;
          font-weight: 600;
          margin-right: 16rpx;
        }
        .q-text {
          flex: 1;
          font-size: 30rpx;
          color: #333;
          font-weight: 500;
        }
      }
      .answer {
        display: flex;
        padding: 0 0 24rpx 60rpx;
        .a-icon {
          width: 44rpx;
          height: 44rpx;
          background-color: #f5f5f5;
          color: #666;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24rpx;
          font-weight: 600;
          margin-right: 16rpx;
          flex-shrink: 0;
        }
        .a-text {
          font-size: 28rpx;
          color: #666;
          line-height: 1.6;
        }
      }
    }
  }
}
</style>

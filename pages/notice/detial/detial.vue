<template>
  <view class="noticeLayout">
    <!-- 标题区域 -->
    <view class="title">
      <view v-if="noticeData.isTop" class="tag">
        <uni-tag text="置顶" :inverted="true" type="error"></uni-tag>
      </view>
      <view class="font">{{ noticeData.title || "公告标题" }}</view>
    </view>

    <!-- 信息区域 -->
    <view class="info">
      <view class="item">
        <uni-icons type="person" size="20"></uni-icons>
        <span>{{ noticeData.author || "忧戚" }}</span>
      </view>
      <view class="item">
        <uni-icons type="time" size="20"></uni-icons>
        <uni-dateformat
          :date="noticeData.createTime || Date.now()"
          format="yyyy/MM/dd hh:mm:ss"
        ></uni-dateformat>
      </view>
      <view class="item">
        <uni-icons type="eye" size="20"></uni-icons>
        <span>{{ noticeData.viewCount || 0 }} 阅读</span>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="content">
      <view
        class="content-inner"
        v-html="noticeData.content || '公告内容加载中...'"
      >
      </view>
    </view>

    <!-- 底部操作区域 -->
    <view class="action-bar">
      <view class="action-item" @click="handleShare">
        <uni-icons type="paperplane" size="24"></uni-icons>
        <text>分享</text>
      </view>
      <view class="action-item" @click="handleLike">
        <uni-icons
          :type="isLiked ? 'heart-filled' : 'heart'"
          :color="isLiked ? '#ff4d4f' : ''"
          size="24"
        ></uni-icons>
        <text>{{ isLiked ? "已点赞" : "点赞" }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  data() {
    return {
      noticeData: {
        id: 1,
        title: "忧戚壁纸小程序更新公告",
        author: "忧戚",
        createTime: Date.now(),
        viewCount: 9999,
        isTop: true,
        content: `
			<div>
				<h3>更新内容</h3>
				<p>1. 新增壁纸分类功能，方便用户快速找到喜欢的壁纸</p>
				<p>2. 优化图片加载速度，提升用户体验</p>
				<p>3. 修复已知bug，提高应用稳定性</p>
				<p>4. 增加收藏功能，用户可以收藏喜欢的壁纸</p>
				
				<h3>使用说明</h3>
				<p>1. 在首页浏览推荐壁纸</p>
				<p>2. 在分类页查看不同类型的壁纸</p>
				<p>3. 点击壁纸进入预览页，可保存到本地</p>
				<p>4. 在个人中心查看收藏的壁纸</p>
				
				<h3>感谢支持</h3>
				<p>感谢大家对忧戚壁纸的支持与厚爱，我们会持续更新更多优质壁纸，为您带来更好的使用体验！</p>
			</div>
		`,
      },
      isLiked: false,
    };
  },
  methods: {
    // 分享功能
    handleShare() {
      // 尝试使用 uni.share 接口（适用于 App、H5 等平台）
      uni.share({
        title: this.noticeData.title,
        path: `/pages/notice/detial/detial?id=${this.noticeData.id}`,
        success: () => {
          uni.showToast({ title: "分享成功", icon: "success" });
        },
        fail: (err) => {
          // 如果 uni.share 失败，可能是在微信小程序中
          console.log("分享失败:", err);
          // 微信小程序会自动调用 onShareAppMessage
        },
      });
    },
    // 点赞功能
    handleLike() {
      this.isLiked = !this.isLiked;
      uni.showToast({
        title: this.isLiked ? "点赞成功" : "取消点赞",
        icon: "success",
      });
    },
  },
  // 微信小程序分享给好友
  onShareAppMessage() {
    return {
      title: this.noticeData.title,
      path: `/pages/notice/detial/detial?id=${this.noticeData.id}`,
      success: () => {
        uni.showToast({ title: "分享成功", icon: "success" });
      },
    };
  },
  // 微信小程序分享到朋友圈
  onShareTimeline() {
    return {
      title: this.noticeData.title,
      path: `/pages/notice/detial/detial?id=${this.noticeData.id}`,
      success: () => {
        uni.showToast({ title: "分享到朋友圈成功", icon: "success" });
      },
    };
  },
  mounted() {
    // 实际项目中这里应该调用API获取公告详情
    // apiGetNoticeDetail({ id: getCurrentPages()[0].options.id })
    //   .then(res => {
    //     this.noticeData = res.data;
    //   });
  },
};
</script>

<style scoped lang="scss">
.noticeLayout {
  padding: 30rpx;
  background-color: #fff;
  min-height: 100vh;

  // 标题区域
  .title {
    display: flex;
    padding-bottom: 20rpx;
    align-items: center;
    line-height: 1.3em;
    border-bottom: 1rpx solid #f0f0f0;
    padding-bottom: 20rpx;
    margin-bottom: 20rpx;

    .tag {
      margin-right: 15rpx;
    }

    .font {
      flex: 1;
      font-size: 36rpx;
      font-weight: 700;
      color: #333;
      word-break: break-word;
    }
  }

  // 信息区域
  .info {
    display: flex;
    align-items: center;
    padding: 15rpx 0;
    margin-bottom: 20rpx;
    flex-wrap: wrap;

    .item {
      display: flex;
      align-items: center;
      font-size: 24rpx;
      color: #8f8f8f;
      margin-right: 30rpx;
      margin-bottom: 10rpx;

      uni-icons {
        margin-right: 5rpx;
      }
    }
  }

  // 内容区域
  .content {
    padding: 20rpx 0;
    margin-bottom: 40rpx;

    .content-inner {
      font-size: 28rpx;
      line-height: 1.6em;
      color: #333;
      word-break: break-word;

      h3 {
        font-size: 32rpx;
        font-weight: 600;
        margin: 20rpx 0 15rpx 0;
        color: #222;
      }

      p {
        margin-bottom: 15rpx;
      }
    }
  }

  // 底部操作栏
  .action-bar {
    display: flex;
    justify-content: center;
    padding: 20rpx 0;
    border-top: 1rpx solid #f0f0f0;
    margin-top: 30rpx;

    .action-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 40rpx;
      padding: 10rpx;
      cursor: pointer;

      text {
        font-size: 22rpx;
        color: #666;
        margin-top: 5rpx;
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>

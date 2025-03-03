<template>
	<view class="noticeLayout">
		<view class="title">
				<view class="tag">
					<uni-tag text="置顶" :inverted="true" type="error"></uni-tag>
				</view>
				<view class="font">
					这个区域填写标题
				</view>
		</view>
		<view class="info">
			<view class="item">
				忧戚
			</view>
			<view class="item">
				<uni-dateformat :date="Date.now()" format='yyyy/MM/dd hh:mm:ss'></uni-dateformat>
			</view>
		</view>s
		<view class="content">
			内容区域
			<view class="item">
				阅读数量9999
			</view>
		</view>
	</view>
</template>

<script setup>
	
</script>

<style scoped lang="scss">
.noticeLayout{
	padding:30rpx;
	.title{
		display:flex;
		padding-bottom: 10rpx;
		align-items: center;
		line-height: 1em;
		
		.font{
			padding-left: 30rpx;
			font-size: 40rpx;
			font-weight: 700;
			
		}
		
	}
	.item{
		font-size: 25rpx;
		color:#8f8f8f;
		padding-right: 30rpx;
	}
	
	.info{
		display: flex;
		padding-top: 10rpx;
		align-items: center;
		
	}
	.content{
		padding-bottom: 10rpx;
		
	}
	
	
}
</style>

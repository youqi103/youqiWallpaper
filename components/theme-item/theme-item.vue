<template>
	<view class="themItem">
	<navigator :url="'/pages/classList/classList?id='+item._id+'&name='+item.name" class="box" v-if="!isMore">
		<image :src="item.picurl" mode="aspectFill" class="pic"></image>
		<view class="mask">
			{{item.name }}
		</view>
		<view class="tab">
			{{formatTimeDifference(item.updateTime)}}前更新
		</view>
	</navigator>
	
	<navigator url="/pages/classify/classify" open-type="reLaunch" class="box more" v-if="isMore">
		
		<image src="/common/images/classify2.jpg" mode="aspectFill" class="pic"></image>
		<view class="mask">
			<uni-icons type="more-filled" size="32" color="#fff"></uni-icons>
            <view class="text">
            	更多
            </view>
		</view>
		
	</navigator>
	</view>
</template>

<script setup>
import {formatTimeDifference} from '@/utils/common.js'
	 defineProps({
		isMore:{
			type:Boolean,
			default:false
		},
		item:{
			type:Object,
			default(){
				return{
				name:'默认图片',
				picurl:'/common/images/classify1.jpg',
				updateTime:Date.now()-1000*60*60*5,
				}
				
			}
		}
	})
</script>

<style lang="scss" scoped>
.themItem{
	.box{
		height: 340rpx;
		border-radius: 10rpx;
		overflow: hidden;
		position: relative;
		.pic{
			width: 100%;
			height: 100%;
		}
		.mask{
			width:100%;
			height:70rpx;
			position:absolute;
			bottom:0;
			left:0;
			background-color: rgb(255,182,193,0.2);
			color:#fff;
			backdrop-filter: blur(20rpx);
			display:flex;
			align-items: center;
			justify-content: center;
			font-size: 30rpx;
			font-weight: 600;
		}
		.tab{
			position:absolute;
			top:0;
			left:0;
			padding:6rpx 14rpx;
			color:#fff;
			background-color: rgba(250,129,90,0.7);
			backdrop-filter: blur(20rpx);
			font-size:22rpx;
			border-radius: 0 0 20rpx 0;
			transform: scale(0.8);
			transform-origin: left top;
		}
	}
	.box.more{
		.mask{
			width: 100%;
			height:100%;
			flex-direction: column;
			.text{
				
			}
		}
	}
}
</style>
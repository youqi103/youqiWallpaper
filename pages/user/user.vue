<template>
	<view class="userLayout pageBg">
		<view class="userInfor">
			<view class="avatar">
				<image src="/common/images/20200404225248-OIP.jpg" mode="aspectFill"></image>
			</view>
			<view class="Ip">
				192.168.1.1
			</view>
			<view class="address">
				湖南省
			</view>
		</view>
		<view class="section ">
			<view class="list">
				<view class="row">
					
						<view class="left">
							<uni-icons type="download-filled" size="20" ></uni-icons>
						
							<view class="text">
								我的下载
							</view>
						</view>
						<view class="right">
							<view class="text">
								0
							</view>
							<uni-icons type="right" size="16" color="#aaa"></uni-icons>
					    </view>					
				</view>
				<view class="row">
					
						<view class="left">
							<uni-icons type="star-filled" size="20" ></uni-icons>
						
							<view class="text">
								我的评分
							</view>
						</view>
						<view class="right">
							<view class="text">
								0
							</view>
							<uni-icons type="right" size="16" color="#aaa"></uni-icons>
					    </view>					
				</view>
			<view class="row">
				
					<view class="left">
						<uni-icons type="chatboxes-filled" size="20"></uni-icons>
					
						<view class="text">
							联系客服
						</view>
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
				<view class="row">
					
						<view class="left">
							<uni-icons type="notification-filled" size="20" ></uni-icons>
						
							<view class="text">
								订阅更新
							</view>
						</view>
						<view class="right">
							
							<uni-icons type="right" size="16" color="#aaa"></uni-icons>
					
					</view>
				</view>
				
				<view class="row">
					
						<view class="left">
							<uni-icons type="flag-filled" size="20" ></uni-icons>
						
							<view class="text">
								常见问题
							</view>
						</view>
						<view class="right">
							
							<uni-icons type="right" size="16" color="#aaa"></uni-icons>
					
					</view>
				</view>
			</view>
		
		</view>
	</view>
</template>

<script setup>
	
 function CallPhone(){
	 console.log('拨打电话');
	 uni.makePhoneCall({
	 	phoneNumber: '18565436106'
	 })
 }

</script>

<style lang="scss" scoped>
 .userLayout{
	 height: 90vh;
	 .userInfor{
		 padding: 50rpx 0;
		 display: flex;
		 flex-direction: column;
		 align-items: center;
		 .avatar{
			 width: 160rpx;
			 height:160rpx;
			 border-radius: 50%;
			 overflow: hidden;
			 image{
				 width: 100%;
				 height: 100%;
			 }
		 }
		 .Ip{
			font-size: 44rpx;
			color: #333;
			padding:20rpx 0 5rpx;
		 }
		 .address{
			 font-size: 28rpx;
			 color:#888;
			 }
	 }
	 .section{
		 width:690rpx;
		 margin: 50rpx auto;
		 border: 1pxS solid #eee;
		 border-radius: 10rpx;
		 box-shadow: 0 0 30rpx rgba(0,0,0,0.05);
		 .list{
		    .row{
				display: flex;
				background-color: #fff;
				justify-content: space-between;
				padding:0 30rpx;
				height: 100rpx;
				border-bottom: 1px solid #eee;
				position: relative;
				&:last-child{
					border-bottom: none;
				}
				.left{
					display: flex;
					align-items: center;
					justify-content: center;
					.text{
						color: #333;
						font-size:25rpx;
					}
					:deep(){
						.uni-icons{
						color:$brand-theme-color !important;
					}
					}
				}
				.right{
					display: flex;
					align-items: center;
					.text{
						font-size: 28rpx;
						color: #aaa;
						margin-right: 10rpx;
					}
				}
				button{
					position: absolute;
					top:0;
					left:0;
					width: 100%;
					height: 100rpx ;
					opacity: 0;
				}
			}
		 }
	 }
 }
</style>

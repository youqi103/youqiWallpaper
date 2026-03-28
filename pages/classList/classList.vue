<template>
	<view class="classList">
		<view class="loadingLayout" v-if="isEmpty&&!classlist.length">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<view class="content">
			<navigator :url="'/pages/preview/preview?id='+item._id" class="item" v-for="item in classlist" :key="item._id">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
		<view class="loadingLayout" v-if="!isEmpty||classlist.length">
			<uni-load-more :status="isEmpty?'no-more':'loading'"></uni-load-more>
		</view>
		<view class="safe-area-inset-bottom">
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import {onLoad,onReachBottom,onPullDownRefresh,onUnload} from '@dcloudio/uni-app';
import {apiGetClassList}from '@/api/apis.js'
const classlist=ref([]);
const isEmpty=ref(false);
const queryParams={
	pageNum:1,
	pageSize:12
};
// 下拉刷新
onPullDownRefresh(()=>{
	classlist.value=[];
	isEmpty.value=false;
	queryParams.pageNum=1;
	getClassList();
	uni.stopPullDownRefresh();
})
// 获取页面传参
onLoad((e)=>{
	let {id=null,name=null}=e;
	queryParams.classid=id;
	uni.setNavigationBarTitle({
		title:name
	})
	getClassList();
})
// 触底加载
onReachBottom(()=>{
	if(isEmpty.value)return;
	queryParams.pageNum++;
	getClassList();
})
// 获取分类列表数据
const getClassList =async ()=>{
	let res = await apiGetClassList(queryParams);
		classlist.value=[...classlist.value,...res.data];
		uni.setStorageSync("storageClassList",classlist.value);
		if(res.data.length<queryParams.pageSize){isEmpty.value=true;}
		console.log(res.data);
}
onUnload(() => {
  uni.removeStorageSync("storageClassList");
});
</script>

<style lang="scss" scoped>
 .classList{
	 padding:5rpx 5rpx;
	 .content{
		 display:grid;
		 grid-template-columns: repeat(3,1fr);
		 gap:5rpx;
		 .item{
			 height: 450rpx;
			 image{
				 width: 100%;
				 height: 100%;
				 display: block;
			 }
		 }
	 }
 }
</style>

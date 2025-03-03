<template>
	<view class="classLayout pageBg">
		<custom-nav-bar title="分类"></custom-nav-bar>
		<view class="classify">
			<theme-item v-for="item in classify" :item="item" :key="item._id"></theme-item>
		</view>
		
	</view>
</template>

<script setup>
import {apiGetClassify} from '@/api/apis.js';
import {ref} from 'vue';
const classify = ref([]);

const getClassify =async ()=>{
	let res = await apiGetClassify({pageSize:15});
		classify.value =res.data;
		console.log(classify.value);
}
getClassify();
</script>

<style lang="scss" scoped>
 .classify{
	 padding:30rpx 50rpx;
	 display: grid;
	 gap:15rpx;
	 grid-template-columns: repeat(3,1fr);
 }
</style>

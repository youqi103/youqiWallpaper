let SYSTEM_INFO = uni.getSystemInfoSync();
//状态栏高度
export const getStatusBarHeight= ()=>SYSTEM_INFO.statusBarHeight||40;

//标题栏高度 = 胶囊高度 + (胶囊顶部 - 状态栏高度) × 2
export const getTitleBarHeight= ()=>{
	if(uni.getMenuButtonBoundingClientRect){
		let {top,height}= uni.getMenuButtonBoundingClientRect();
        return height+(top-getStatusBarHeight())*2;
	}
	else{
		return 44;
	}
}
//导航栏高度 = 状态栏高度 + 标题栏高度
export const getNavBarHeight= ()=> getStatusBarHeight()+getTitleBarHeight();


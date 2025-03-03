let SYSTEM_INFO=uni.getSystemInfoSync();
export const getStatusBarHeight= ()=>SYSTEM_INFO.statusBarHeight||40;

export const getTitleBarHeight= ()=>{
	if(uni.getMenuButtonBoundingClientRect){
		let {top,height}= uni.getMenuButtonBoundingClientRect();
        return height+(top-getStatusBarHeight())*2;
	}
	else{
		return 44;
	}
}
export const getNavBarHeight= ()=> getStatusBarHeight()+getTitleBarHeight();


# 忧戚的壁纸 · youqiWallpaper
一款基于 **UniApp + Vue3** 开发的微信小程序，提供高清壁纸浏览、分类筛选与收藏功能，界面简洁、加载流畅。

---

## ✨ 功能特性
- 🖼 高清壁纸瀑布流展示，支持图片懒加载优化
- 🔍 多风格分类筛选，快速定位心仪壁纸
- ❤ 用户收藏功能，个人中心统一管理
- 📱 专为微信小程序适配，体验流畅
- 📢 内置公告系统，及时获取更新与活动通知
- ⚡ 接口统一封装，首屏加载与切换体验更优

---

## 🛠 技术栈
- 框架：UniApp + Vue3
- 构建：Vite
- 样式：SCSS 预处理器
- UI：uni-ui 组件库
- 网络：自定义 request 封装
- 规范：ESLint 代码校验

---

## 🚀 快速开始
### 1. 环境准备
- Node.js ≥ 14.0.0
- 开发工具：HBuilderX
- 调试工具：微信开发者工具

### 2. 项目启动
```bash
# 克隆项目
git clone https://github.com/youqi103/youqiWallpaper.git
cd youqiWallpaper

# 安装依赖
npm install
```

1. 使用 HBuilderX 打开项目
2. 运行 → 运行到小程序模拟器 → 微信开发者工具
3. 在微信开发者工具中正常预览、调试

---

## 📁 项目结构
```
youqiWallpaper/
├── api/            # 接口请求封装
├── common/         # 公共样式、图片、工具方法
├── components/     # 全局通用组件
├── pages/          # 主页面
│   ├── index/      # 首页
│   ├── classify/   # 分类页
│   ├── classList/  # 分类壁纸列表
│   ├── preview/    # 壁纸预览页
│   ├── notice/     # 公告页
│   └── user/       # 个人中心 & 收藏
├── static/         # 静态资源
├── uni_modules/    # uni-ui 组件
├── App.vue
├── main.js
├── manifest.json   # 小程序配置
└── pages.json      # 路由配置
```

---

## 📌 主要 API
| 接口 | 说明 |
| --- | --- |
| /homeBanner | 首页轮播图 |
| /randomWall | 随机推荐壁纸 |
| /classify | 获取全部分类 |
| /wallList | 分类下壁纸列表 |
| /wallNewsList | 公告列表 |

---

## ⚠️ 使用说明
- 需在 `manifest.json` 中配置自己的微信小程序 AppID
- 接口地址需根据实际后端地址自行修改
- 图片资源较多，建议配合图片 CDN 与懒加载使用
- 发布前务必在微信开发者工具进行代码校验与预览

---

## 📄 License
MIT License

---

## 🤝 贡献
欢迎提交 Issue、优化建议与 PR，一起让项目更好～
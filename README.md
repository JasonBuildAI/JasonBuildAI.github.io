# Jason Cat · Personal Site

线上地址：**https://jasonbuildai.github.io/**

以 GitHub 个人主页为基础的独立个人网站：更完整地展开 AI Agent Runtime、Sandbox Security 与跨平台工程方向，并集中展示代表贡献、个人项目和最近的公开活动。

页面是纯静态 HTML / CSS / JavaScript，托管于 GitHub Pages，不依赖 CDN、前端框架或网络字体。采用本地字体栈、响应式布局、深色 / 浅色主题，并支持键盘操作与「减少动态效果」系统偏好。

## 内容结构

| 区块 | 内容 |
| --- | --- |
| Hero | 个人定位、当前工作重点与 GitHub 数据快照 |
| Focus | Agent Runtime、Sandbox Security、Cross-platform 三个方向 |
| Selected work | 9 个代表贡献，可按方向即时筛选 |
| Projects | GoldMind 重点展示，以及 LikeCodex、agents-md-playbook |
| Activity | 近 12 个月贡献节奏与最近合并的公开 PR |
| About | 工作方式、开源组织与联系方式 |

数据快照截至 **2026-10-27**；贡献统计包含私密贡献。

## 文件结构

| 路径 | 说明 |
| --- | --- |
| `index.html` | 主页内容、SEO / Open Graph 元数据 |
| `404.html` | 独立 404 页面 |
| `assets/css/base.css` | 设计令牌、基础样式、导航与公共组件 |
| `assets/css/sections.css` | 各内容区块的独立样式 |
| `assets/css/responsive.css` | 平板、手机、触屏与打印适配 |
| `assets/js/app.js` | 主题、移动导航、滚动状态、筛选、复制等独立交互 |
| `assets/img/` | 头像、项目截图、站点图标与社交分享图 |

## 本地预览

在仓库根目录启动任意静态文件服务器：

```powershell
python -m http.server 8765
```

然后打开 `http://127.0.0.1:8765/`。不要直接双击 `index.html`，部分浏览器会限制本地脚本与剪贴板能力。

## 修改内容

- 文案与链接：直接编辑 `index.html`。
- 配色与主题：修改 `assets/css/base.css` 顶部的 CSS 变量。
- 布局与组件：修改 `assets/css/sections.css`。
- 响应式断点：修改 `assets/css/responsive.css`。
- GitHub 数据与近期记录：手动更新对应数字、链接和时间标签，并同步更新页面中的快照日期。

## 部署

GitHub Pages 当前设置为 **Deploy from a branch → main / (root)**。推送到 `main` 后会自动重新发布；`.nojekyll` 已保留，静态资源无需额外构建。

## 交互约定

主题、移动菜单、滚动进度与导航高亮、贡献筛选、联系信息复制都由 `assets/js/app.js` 中的独立模块处理。修改其中一项时，不需要改动其他模块的逻辑。

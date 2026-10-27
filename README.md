# Jason Cat · Personal Site

线上地址：**https://jasonbuildai.github.io/**

一份克制的技术工作者个人主页。内容以 GitHub 个人主页为基础展开，重点呈现 AI Agent 运行时、执行安全与跨平台工程方向的开源工作，同时保留个人项目、学习空间与业余生活。

页面是纯静态 HTML / CSS / JavaScript，直接托管于 GitHub Pages，不依赖 CDN、前端框架或网络字体。交互只包含移动导航、当前区块提示、微信号复制和年份更新，各部分彼此独立。

## 内容结构

| 区块 | 内容 |
| --- | --- |
| 个人介绍 | 身份、所在地、关注方向、常用语言与明确联系邀请 |
| 开源贡献 | OpenStoryline、OpenAgent 系列、loopx、openclaw、OpenSandbox；使用原生 `<details>` 展开 |
| 实战项目 | GoldMind、LikeCodex、agents-md-playbook |
| 学习空间 | Agent Runtime、Sandbox Security、Cross-platform Engineering 三个持续研究主题 |
| 业余生活 | 足球、行走、聊天与持续学习 |

开源贡献只展示 GitHub 已合并的 Pull Request。当前快照为 **7 个仓库、112 条已合并 PR，数据截至 2026-10-28**。较小的项目线展示全部记录；loopx 展示 12 条代表记录，并提供完整 GitHub 检索入口。

## 文件结构

| 路径 | 说明 |
| --- | --- |
| `index.html` | 主页内容、SEO / Open Graph 元数据 |
| `404.html` | 独立 404 页面 |
| `assets/css/profile.css` | 设计变量、基础排版、布局与组件 |
| `assets/css/responsive.css` | 平板、手机、减少动态效果与打印样式 |
| `assets/js/profile.js` | 移动导航、区块导航、微信号复制与年份 |
| `assets/img/` | 头像、项目截图、站点图标与分享图 |

## 本地预览

在仓库根目录启动静态文件服务器：

```powershell
python -m http.server 8765
```

打开 `http://127.0.0.1:8765/`。不要直接双击 `index.html`，部分浏览器会限制本地脚本与剪贴板能力。

## 更新内容

- 个人文案、项目与 PR 记录：编辑 `index.html`。
- 颜色、字体与布局：编辑 `assets/css/profile.css` 顶部的设计变量和对应组件。
- 响应式断点：编辑 `assets/css/responsive.css`。
- 社交分享图：替换 `assets/img/og-card-2026.png`，保持 1200 × 630 尺寸。

更新 PR 列表前，先用 GitHub CLI 核对记录确实已经合并：

```powershell
gh search prs --author=JasonBuildAI --merged --repo=OWNER/REPO --limit=1000 --json number,title,url,closedAt
```

不要把未合并、草稿或已关闭但未合并的 PR 放进页面。

## 部署

GitHub Pages 当前设置为 **Deploy from a branch → main / (root)**。推送到 `main` 后会自动重新发布；`.nojekyll` 已保留，静态资源无需额外构建。

## 交互约定

移动导航、区块高亮、复制按钮和年份是四个独立模块，均在 `assets/js/profile.js` 中处理。开源项目展开使用浏览器原生 `<details>`，不依赖 JavaScript。

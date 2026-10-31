# Jason Cat · Personal Site

线上地址：**https://jasonbuildai.github.io/**

一份克制的技术工作者个人主页。首页是一屏式个人介绍，包含 GitHub 最新头像、正式个人简介与可一键复制的联系方式；其他页面呈现 AI Agent 运行时、执行安全与跨平台工程方向的开源工作、正在构思的个人项目，以及长期更新的 Cairn Notes 学习笔记。

站点是**多页面结构**：顶部导航点击后进入独立页面，不再是单页锚点滚动。页面是纯静态 HTML / CSS / JavaScript，直接托管于 GitHub Pages，不依赖 CDN、前端框架或网络字体。

## 页面结构

| 页面 | 文件 | 内容 |
| --- | --- | --- |
| 介绍 | `index.html` | 一屏式个人档案：最新头像、正式介绍、两个邮箱、QQ 号与微信号，以及其余页面导航 |
| 开源贡献 | `open-source.html` | 首屏展示 LoopX、OpenSandbox、openclaw、OpenAgent、OpenStoryline 的代表性 PR，下方列出参与过的全部仓库 |
| 实战项目 | `projects.html` | 暂留白；记录 RAG、Agent Harness 与数字人的方向草稿，不把构想包装成已发布项目 |
| 学习空间 | `learning.html` | Cairn Notes 个人学习笔记项目简介、两套教材入口与长期更新说明 |

开源贡献只展示 GitHub 已合并的 Pull Request。页首先展示长期投入项目、角色、工作概述、代表性 PR 与完整记录入口，方便访问者直接了解实际贡献；页面下方再按项目影响力列出参与过的全部仓库，不展示 PR 数量或仓库数量统计。

## 文件结构

| 路径 | 说明 |
| --- | --- |
| `index.html` | 首页：一屏式个人介绍、四项可复制联系方式、SEO / Open Graph 元数据 |
| `open-source.html` | 开源贡献页 |
| `projects.html` | 实战项目页 |
| `learning.html` | 学习空间页 |
| `404.html` | 独立 404 页面 |
| `assets/css/profile.css` | 设计变量、基础排版、布局与组件 |
| `assets/css/responsive.css` | 平板、手机、减少动态效果与打印样式 |
| `assets/css/home.css` | 首页单屏布局与各尺寸下的紧凑排版 |
| `assets/css/open-source.css` | 开源贡献页的首屏贡献列表、代表 PR 与仓库索引样式 |
| `assets/css/projects.css` | 实战项目页的方向草稿、留白状态与项目标准 |
| `assets/css/learning.css` | 学习空间页的简洁项目简介、两套教材与响应式样式 |
| `assets/js/profile.js` | 移动导航、联系方式复制与年份 |
| `assets/img/` | 头像、站点图标与社交分享图 |

## 本地预览

在仓库根目录启动静态文件服务器：

```powershell
python -m http.server 8765
```

打开 `http://127.0.0.1:8765/`。不要直接双击 `index.html`，部分浏览器会限制本地脚本与剪贴板能力。

## 更新内容

- 首页介绍与联系方式：编辑 `index.html` 与 `assets/css/home.css`。
- 开源贡献：编辑 `open-source.html` 与 `assets/css/open-source.css`。
- 实战项目：编辑 `projects.html` 与 `assets/css/projects.css`。项目页目前刻意保持留白，只有作品成熟后再补入真实项目，不展示演示性占位项目。
- 学习空间：编辑 `learning.html` 与 `assets/css/learning.css`。Cairn Notes 线上站点为 <https://jasonbuildai.github.io/cairn-notes/>，仓库为 <https://github.com/JasonBuildAI/cairn-notes>。
- 颜色、字体与布局：编辑 `assets/css/profile.css` 顶部的设计变量和对应组件。
- 响应式断点：编辑 `assets/css/responsive.css`。
- 头像与社交分享图：替换 `assets/img/avatar-20261030.png` 和 `assets/img/og-card-20261030.png`，分享图保持 1200 × 630 尺寸。

新增页面时，除了新建 HTML，还要同步三处：页面顶部的 `.site-nav`、页面底部的 `.footer-links`、以及每个页面自己的 `<title>` / `description` / `canonical`。导航当前项用 `aria-current="page"` 标记。

更新 PR 列表前，先用 GitHub CLI 核对记录确实已经合并：

```powershell
gh search prs --author=JasonBuildAI --merged --repo=OWNER/REPO --limit=1000 --json number,title,url,closedAt
```

不要把未合并、草稿或已关闭但未合并的 PR 放进页面。

## 部署

GitHub Pages 当前设置为 **Deploy from a branch → main / (root)**。推送到 `main` 后会自动重新发布；`.nojekyll` 已保留，静态资源无需额外构建。

## 交互约定

移动导航、联系方式复制和年份是三个独立模块，均在 `assets/js/profile.js` 中处理。首页四个联系方式复制按钮通过 `data-copy-label` 提供对应的无障碍状态提示。导航是真实页面链接，不做滚动监听；开源贡献页使用静态贡献列表与仓库索引，不依赖 JavaScript。

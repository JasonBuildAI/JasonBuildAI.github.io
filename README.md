# Jason Cat · Personal Site

线上地址：**https://jasonbuildai.github.io/**

一份克制的技术工作者个人主页，提供中英文双语版本。首页是一屏式个人介绍，包含 GitHub 最新头像、正式个人简介与可一键复制的联系方式；其他页面呈现 AI Agent 运行时、执行安全与跨平台工程方向的开源工作、正在独立开发的 Hearth OS 个人 Agent OS，以及长期更新的 Cairn Notes 学习笔记。

站点是**多页面结构**：顶部导航点击后进入独立页面，不再是单页锚点滚动。右上角的 `中 / EN` 切换器会在对应的中文页和英文页之间跳转；英文版使用独立的 `/en/` 静态页面，不依赖运行时翻译。页面是纯静态 HTML / CSS / JavaScript，直接托管于 GitHub Pages，不依赖 CDN、前端框架或网络字体。

## 页面结构

| 页面 | 中文文件 | 英文文件 | 内容 |
| --- | --- | --- | --- |
| 介绍 | `index.html` | `en/index.html` | 一屏式个人档案：最新头像、正式介绍、两个邮箱、QQ 号与微信号，以及其余页面导航 |
| 开源贡献 | `open-source.html` | `en/open-source.html` | 首屏展示 LoopX、OpenSandbox、openclaw、OpenAgent、OpenStoryline 的代表性 PR，下方列出参与过的全部仓库 |
| Hearth OS | `projects.html` | `en/projects.html` | 正在独立开发的个人 Agent OS：问题背景、七个系统平面、设计取舍、任务流、路线图与当前状态 |
| 学习空间 | `learning.html` | `en/learning.html` | Cairn Notes 学习笔记项目：7 套笔记、112 篇正文、推荐阅读路径、四套生产级源码课与工程基础 |

开源贡献只展示 GitHub 已合并的 Pull Request。页首先展示长期投入项目、角色、工作概述、代表性 PR 与完整记录入口，方便访问者直接了解实际贡献；页面下方再按项目影响力列出参与过的全部仓库，不展示 PR 数量或仓库数量统计。

## 文件结构

| 路径 | 说明 |
| --- | --- |
| `index.html` | 首页：一屏式个人介绍、四项可复制联系方式、SEO / Open Graph 元数据 |
| `open-source.html` | 开源贡献页 |
| `projects.html` | Hearth OS 项目介绍页 |
| `learning.html` | 学习空间页 |
| `en/index.html` | 英文首页，完整英文元数据与共享图说明 |
| `en/open-source.html` | 英文开源贡献页，PR 与仓库链接同中文版保持一致 |
| `en/projects.html` | 英文 Hearth OS 项目介绍页 |
| `en/learning.html` | 英文学习空间页 |
| `404.html` | 独立 404 页面 |
| `assets/css/profile.css` | 设计变量、基础排版、布局与组件 |
| `assets/css/responsive.css` | 平板、手机、减少动态效果与打印样式 |
| `assets/css/home.css` | 首页单屏布局与各尺寸下的紧凑排版 |
| `assets/css/open-source.css` | 开源贡献页的首屏贡献列表、代表 PR 与仓库索引样式 |
| `assets/css/projects.css` | Hearth OS 项目页的编辑式排版、架构平面、路线图与响应式样式 |
| `assets/css/learning.css` | 学习空间页的阅读路径、7 套笔记、源码课与工程基础样式 |
| `assets/js/profile.js` | 移动导航、联系方式复制与年份 |
| `assets/img/` | 头像、站点图标与社交分享图 |

## 本地预览

在仓库根目录启动静态文件服务器：

```powershell
python -m http.server 8765
```

打开 `http://127.0.0.1:8765/`。不要直接双击 `index.html`，部分浏览器会限制本地脚本与剪贴板能力。

## 更新内容

- 首页介绍与联系方式：同时编辑 `index.html`、`en/index.html` 与 `assets/css/home.css`。
- 开源贡献：同时编辑 `open-source.html`、`en/open-source.html` 与 `assets/css/open-source.css`。两版的 PR 标题应一一对应，外链保持一致。
- Hearth OS：同时编辑 `projects.html`、`en/projects.html` 与 `assets/css/projects.css`。Hearth 是 Jason 的个人独立项目，不是公司或团队产品；页面应明确区分“规格与路线图已完成”和“运行时代码尚未开始”。仓库为 <https://github.com/hearthproject/hearth-os>，文档站为 <https://hearthproject.github.io/hearth-os/>。
- 学习空间：同时编辑 `learning.html`、`en/learning.html` 与 `assets/css/learning.css`。Cairn Notes 线上站点为 <https://jasonbuildai.github.io/cairn-notes/>，仓库为 <https://github.com/JasonBuildAI/cairn-notes>。当前结构为 7 套笔记、112 篇正文：Pi 13 篇、OpenSandbox 14 篇、DeerFlow 16 篇、LoopX 16 篇、OpenClaw 16 篇、Hermes 16 篇、工程基础 21 篇。
- 颜色、字体与布局：编辑 `assets/css/profile.css` 顶部的设计变量和对应组件。
- 响应式断点：编辑 `assets/css/responsive.css`。
- 头像与社交分享图：中文页使用 `assets/img/og-card-20261030.png`，英文页使用 `assets/img/og-card-en-20261031.png`；替换时保持 1200 × 630 尺寸，并同步更新对应页面的 `og:image` / `twitter:image`。

新增页面时，除了新建中英文 HTML，还要同步五处：页面顶部的 `.site-nav`、右上角的 `.language-switch`、页面底部的 `.footer-links`、每个页面自己的 `<title>` / `description` / `canonical`，以及双向的 `hreflang` 链接。导航当前项和当前语言项都用 `aria-current="page"` 标记。

## 双语约定

- 中文页面位于仓库根目录，英文页面位于 `en/`，四个页面文件一一对应。
- 右上角切换器使用真实链接，不依赖 Cookie 或浏览器语言；英文页面可以直接分享。
- 英文页面正文、按钮、图片替代文本、无障碍标签、SEO / Open Graph 元数据均为英文。
- 中文与英文页面都声明了 `hreflang="zh-CN"`、`hreflang="en"` 和 `hreflang="x-default"`，并各自使用正确的 `canonical`。
- 英文首页文案更长，`assets/css/home.css` 会放宽英文首页的固定视口高度，避免小屏裁切；中文首页仍保持原有单屏布局。

更新 PR 列表前，先用 GitHub CLI 核对记录确实已经合并：

```powershell
gh search prs --author=JasonBuildAI --merged --repo=OWNER/REPO --limit=1000 --json number,title,url,closedAt
```

不要把未合并、草稿或已关闭但未合并的 PR 放进页面。

## 部署

GitHub Pages 当前设置为 **Deploy from a branch → main / (root)**。推送到 `main` 后会自动重新发布；`.nojekyll` 已保留，静态资源无需额外构建。

## 交互约定

移动导航、联系方式复制和年份是三个独立模块，均在 `assets/js/profile.js` 中处理。脚本会根据页面的 `<html lang>` 自动使用中文或英文的导航状态与复制反馈。首页四个联系方式复制按钮通过 `data-copy-label` 提供对应的无障碍状态提示。导航是真实页面链接，不做滚动监听；开源贡献页使用静态贡献列表与仓库索引，不依赖 JavaScript。

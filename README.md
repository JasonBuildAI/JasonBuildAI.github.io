# 黄江南 · 个人简历网站

线上地址：**https://jasonbuildai.github.io**

Go 后端 / AI Agent 方向的个人简历站，托管于 GitHub Pages（0 成本、免备案、自动 HTTPS）。
页面为纯静态 HTML/CSS/JS，**不依赖任何 CDN 或网络字体**，国内访问速度快。

## 目录结构

| 路径 | 说明 |
| --- | --- |
| `index.html` | 网站首页（由 `tools/build.mjs` 依据内容母版生成） |
| `404.html` | 404 页面 |
| `data/resume.json` | **内容母版**：网站与投递版 PDF 共用的唯一数据源 |
| `tools/build.mjs` | 生成器：`data/resume.json` → `index.html`（无第三方依赖） |
| `assets/css/style.css` | 全部样式（含深色模式与打印样式） |
| `assets/js/app.js` | 导航高亮、复制邮箱等小交互 |
| `assets/img/` | 头像、Apache / 小红书徽标、站点图标 |
| `assets/resume/` | 可公开下载的 PDF 简历（彩色版 / 黑白打印版） |
| `sources/latex/` | LaTeX 简历源码（公开版，已移除手机号） |
| `.github/workflows/` | 预留：后续用于自动生成"按 JD 定制"的投递版 PDF |

## 修改内容

**方式一：直接改网页文字（最快，无需任何工具）**

1. 在 GitHub 上打开 `index.html`，点右上角铅笔图标；
2. 搜索要改的文字，直接修改；
3. 底部 Commit changes —— 约 1 分钟后网站更新。

**方式二：改内容母版（推荐，保持数据一致）**

1. 编辑 `data/resume.json`（内容都在里面，支持 `**加粗**`、`` `代码` `` 标记）；
2. 本地运行 `node tools/build.mjs` 重新生成 `index.html`；
3. 提交两者。

> 若只是改文字，两种方式选一种即可；不要让 `index.html` 与 `data/resume.json` 长期不一致，否则后续生成"投递版 PDF"时内容会偏旧。

## 生成 / 更新 PDF 简历

PDF 由 `sources/latex/resume.tex` 用 Tectonic 编译：

```powershell
# 在 sources/latex 目录下
$env:TECTONIC_EXE = "C:\Users\Jason\OneDrive\Desktop\resume\x\.tools\tectonic\tectonic.exe"
$env:TECTONIC_CACHE_DIR = "C:\Users\Jason\OneDrive\Desktop\resume\x\.tools\tectonic-cache"
.\build.ps1    # 产出 resume-color.pdf / resume-bw.pdf
```

把产物覆盖 `assets/resume/resume.pdf`（彩色）与 `assets/resume/resume-bw.pdf`（黑白）后提交即可。

## 隐私说明

- 网页与仓库内的 PDF **不包含手机号**；投递用简历保留完整联系方式。
- 仓库为公开仓库，请勿把手机号、住址等敏感信息写进 `data/resume.json` 或 `index.html`。
- 需要私密字段时，放在本地 `data/private.json`（已在 `.gitignore` 中忽略）。

## 部署

GitHub Pages：`Settings → Pages → Source: Deploy from a branch → main / (root)`。
每次向 `main` 推送（或网页端提交）都会自动重新发布。

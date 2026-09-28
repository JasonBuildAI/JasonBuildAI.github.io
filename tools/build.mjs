#!/usr/bin/env node
/**
 * 从 data/resume.json 生成 index.html
 * 用法：node tools/build.mjs
 * 说明：内容以 data/resume.json 为母版，HTML 是生成产物。
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(join(root, 'data', 'resume.json'), 'utf8'));

const esc = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const md = (text = '') =>
  esc(text)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');

const iconExt = '<svg class="icon-ext" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7h-2V6.41l-8.29 8.3-1.42-1.42 8.3-8.29H14V3z"/><path d="M5 5h6v2H7v10h10v-4h2v6H5V5z"/></svg>';

const badge = (item) =>
  item.badge
    ? `<img class="badge" src="${esc(item.badge.src)}" alt="${esc(item.badge.alt || '')}" height="20" loading="lazy">`
    : '';

const org = (item) => {
  const name = esc(item.org);
  return item.orgUrl
    ? `<a href="${esc(item.orgUrl)}" target="_blank" rel="noopener">${name}${iconExt}</a>`
    : name;
};

const bullets = (item) =>
  item.bullets && item.bullets.length
    ? `<ul class="bullets">\n          ${item.bullets.map((b) => `<li>${md(b)}</li>`).join('\n          ')}\n        </ul>`
    : '';

const tags = (item) =>
  item.tags && item.tags.length
    ? `<ul class="tags">${item.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`
    : '';

const links = (item) =>
  item.links && item.links.length
    ? `<p class="entry-links">${item.links
        .map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}${iconExt}</a>`)
        .join('')}</p>`
    : '';

const modules = (item) =>
  item.modules && item.modules.length
    ? `<div class="modules">
          ${item.modules
            .map(
              (m) => `<div class="module-card">
            <div class="module-head">
              <span class="module-name">${esc(m.name)}</span>
              <span class="module-role">${esc(m.role)}</span>
            </div>
            <p class="module-desc">${md(m.desc)}</p>
            ${m.url ? `<a class="module-link" href="${esc(m.url)}" target="_blank" rel="noopener">查看仓库${iconExt}</a>` : ''}
          </div>`
            )
            .join('\n          ')}
        </div>`
    : '';

const entry = (item) => `      <article class="entry">
        <header class="entry-head">
          <div class="entry-org">
            ${badge(item)}
            <h3>${org(item)}</h3>
            ${item.role ? `<span class="role">${esc(item.role)}</span>` : ''}
          </div>
          ${item.period ? `<span class="period">${esc(item.period)}</span>` : ''}
        </header>
        ${item.meta ? `<p class="entry-meta">${md(item.meta)}</p>` : ''}
        ${item.background ? `<p class="entry-bg">${md(item.background)}</p>` : ''}
        ${bullets(item)}
        ${tags(item)}
        ${links(item)}
        ${modules(item)}
      </article>`;

const sectionBody = (section) => {
  if (section.kind === 'skills') {
    return `      <div class="skills-grid">
${section.groups
  .map(
    (g) => `        <div class="skill-card">
          <h3>${esc(g.name)}</h3>
          <ul>${g.items.map((i) => `<li>${md(i)}</li>`).join('')}</ul>
        </div>`
  )
  .join('\n')}
      </div>`;
  }
  return section.items.map(entry).join('\n');
};

const sections = data.sections
  .map(
    (section) => `    <section class="section" id="${esc(section.id)}">
      <div class="section-head"><h2>${esc(section.title)}</h2></div>
${sectionBody(section)}
    </section>`
  )
  .join('\n\n');

const nav = data.nav.map((n) => `<a href="#${esc(n.id)}">${esc(n.label)}</a>`).join('\n          ');

const stats = data.basics.highlights
  .map((h) => `<li><b>${esc(h.value)}</b><span>${esc(h.label)}</span></li>`)
  .join('\n          ');

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: data.basics.name,
  jobTitle: data.basics.headline,
  url: data.meta.site,
  email: `mailto:${data.basics.email}`,
  sameAs: [data.basics.github],
  alumniOf: { '@type': 'CollegeOrUniversity', name: '南京邮电大学' },
});

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(data.basics.name)} · ${esc(data.basics.headline)}</title>
<meta name="description" content="${esc(data.basics.name)}的个人简历网站：${esc(data.basics.headline)}，${esc(data.basics.subline)}。Apache Casbin 创始团队 OpenAgent 项目官方 Member，聚焦 Multi-Agent 编排、RAG 检索与后端性能优化。">
<meta name="author" content="${esc(data.basics.name)}">
<meta name="theme-color" content="#1F4E79">
<meta property="og:type" content="profile">
<meta property="og:title" content="${esc(data.basics.name)} · ${esc(data.basics.headline)}">
<meta property="og:description" content="${esc(data.basics.summary)}">
<meta property="og:url" content="${esc(data.meta.site)}">
<meta property="og:image" content="${esc(data.meta.site)}/${esc(data.basics.avatar)}">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="assets/img/avatar.png">
<link rel="stylesheet" href="assets/css/style.css">
<link rel="canonical" href="${esc(data.meta.site)}/">
<script type="application/ld+json">${jsonLd}</script>
</head>
<body>
<a class="skip-link" href="#overview">跳到主要内容</a>

<header class="topbar">
  <div class="topbar-inner">
    <a class="brand" href="#overview"><span class="brand-mark">黄</span><span>${esc(data.basics.name)}</span></a>
    <nav class="nav" aria-label="页面导航">
          ${nav}
    </nav>
    <a class="top-cta" href="${esc(data.basics.resumePdf)}" download>下载 PDF</a>
  </div>
</header>

<main>
    <section class="hero" id="overview">
      <div class="hero-main">
        <div class="hero-id">
          <img class="avatar" src="${esc(data.basics.avatar)}" width="112" height="112" alt="${esc(data.basics.name)}的头像">
          <div>
            <h1>${esc(data.basics.name)}</h1>
            <p class="headline">${esc(data.basics.headline)}</p>
            <p class="subline">${esc(data.basics.subline)}</p>
            <p class="target">${esc(data.basics.target)}</p>
          </div>
        </div>
        <p class="summary">${md(data.basics.summary)}</p>
        <ul class="stats">
          ${stats}
        </ul>
        <div class="cta">
          <a class="btn btn-primary" href="${esc(data.basics.resumePdf)}" download>下载 PDF 简历</a>
          <a class="btn" href="mailto:${esc(data.basics.email)}">邮件联系</a>
          <a class="btn" href="${esc(data.basics.github)}" target="_blank" rel="noopener">GitHub${iconExt}</a>
        </div>
      </div>
      <aside class="hero-side card">
        <h2 class="card-title">联系方式</h2>
        <ul class="contact-list">
          <li><span class="label">邮箱</span><span class="copy-row"><a href="mailto:${esc(data.basics.email)}">${esc(data.basics.email)}</a><button class="copy-btn" type="button" data-copy="${esc(data.basics.email)}">复制</button></span></li>
          <li><span class="label">GitHub</span><a href="${esc(data.basics.github)}" target="_blank" rel="noopener">@${esc(data.basics.githubHandle)}</a></li>
          <li><span class="label">简历</span><span><a href="${esc(data.basics.resumePdf)}" download>彩色版</a> / <a href="${esc(data.basics.resumePdfBw)}" download>黑白版</a></span></li>
          <li><span class="label">更新</span><span>${esc(data.meta.lastUpdated)}</span></li>
        </ul>
        <p class="card-note">网页版不公开手机号；投递用简历会附完整联系方式。</p>
      </aside>
    </section>

    <section class="section" id="about">
      <div class="section-head"><h2>关于我</h2></div>
      <div class="about-text">
        <p>我目前关注的方向是 <strong>后端工程与 AI Agent 系统</strong>：在开源社区里做真实的产品级工程（Windows GUI 自动化、Agent 评测框架、会话与媒体链路），在个人项目里打磨 Multi-Agent 编排、RAG 检索质量与端到端性能。<strong>喜欢用量化指标验证每一次优化</strong>，也习惯把过程写成可复现的技术文章。</p>
        <p>目前是南京邮电大学 2027 届本科生（微电子科学与工程），正在寻找 <strong>后端开发 / Agent 开发</strong> 方向的实习与校招机会。更多代码与项目可以查看 ${md(`[GitHub @${data.basics.githubHandle}](${data.basics.github})`)}。</p>
      </div>
    </section>

${sections}

    <section class="section" id="contact">
      <div class="section-head"><h2>联系与下载</h2></div>
      <div class="contact-grid">
        <a class="contact-card" href="mailto:${esc(data.basics.email)}">
          <span class="contact-label">邮箱</span>
          <span class="contact-value">${esc(data.basics.email)}</span>
        </a>
        <a class="contact-card" href="${esc(data.basics.github)}" target="_blank" rel="noopener">
          <span class="contact-label">GitHub</span>
          <span class="contact-value">@${esc(data.basics.githubHandle)}</span>
        </a>
        <a class="contact-card" href="${esc(data.basics.resumePdf)}" download>
          <span class="contact-label">简历 PDF</span>
          <span class="contact-value">彩色版下载</span>
        </a>
        <a class="contact-card" href="${esc(data.basics.resumePdfBw)}" download>
          <span class="contact-label">简历 PDF</span>
          <span class="contact-value">黑白打印版下载</span>
        </a>
      </div>
    </section>
</main>

<footer class="footer">
  <div class="footer-inner">
    <p>© <span id="year">2026</span> ${esc(data.basics.name)} · 本站托管于 GitHub Pages · 内容更新于 ${esc(data.meta.lastUpdated)}</p>
    <p class="footer-links">
      <a href="${esc(data.basics.github)}" target="_blank" rel="noopener">GitHub</a>
      <a href="mailto:${esc(data.basics.email)}">邮箱</a>
      <a href="${esc(data.meta.site)}" target="_self">jasonbuildai.github.io</a>
    </p>
  </div>
</footer>

<script src="assets/js/app.js" defer></script>
</body>
</html>
`;

writeFileSync(join(root, 'index.html'), html, 'utf8');
console.log('index.html 已生成：' + html.length + ' 字符');

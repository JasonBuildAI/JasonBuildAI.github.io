# logos/ · 共享徽标

简历里的**公司 / 学校徽标**统一放在这里，所有 `resumeN/` 共用（用 `../logos/` 引用），
不要在 `resumeN/` 里重复放图片。

## 文件命名规则

每个单位一对：

```
<slug>-color.png   # 彩色版用
<slug>-gray.png    # 黑白版用（灰度）
```

当前已生成：

| slug | 对应 | 徽标字母 | 主色 |
|---|---|---|---|
| `njupt` | 南京邮电大学 | N | 蓝 `#0B4F9E` |
| `didi` | 滴滴 | D | 橙 `#FF7F41` |
| `casdoor` | Apache Casdoor | C | 红 `#D22128` |
| `xiaohongshu` | 小红书（FireRedTeam 项目） | 官方 logo | 红 `#FF2442` |
| `goldmind` | GoldMind | G | 金 `#A67C00` |
| `apache` | Apache Casbin（Apache 官方羽毛） | 羽毛 | 红 `#D22128` |

## 重新生成

```powershell
python .\logos\make_badges.py
```

Apache 徽标来自官方羽毛（`real-brand/apache.svg`，simple-icons），用 Edge 无头模式
光栅化后套进同一套圆角底板：

```powershell
python .\logos\make_apache_badge.py
```

> 若 `_apache_feather.png` 丢失，先用 Edge 重新渲染 `logos/_apache_feather.html`：
> `msedge --headless=new --default-background-color=00000000 --window-size=512,512 --screenshot=_apache_feather.png file:///.../logos/_apache_feather.html`

小红书徽标同理（`real-brand/xiaohongshu.svg`，官方 logo 字标）：

```powershell
python .\logos\make_xhs_badge.py
```

> 若 `_xhs_mark.png` 丢失，用 Edge 重新渲染 `logos/_xhs_mark.html`（参数同上）。

改字母 / 颜色：编辑 `make_badges.py` 里的 `BADGES` 字典，再跑一次。

## 换成真实品牌 logo（可选）

`real-brand/` 里放了两个从 [simple-icons](https://simpleicons.org) 下载的真实品牌 SVG
（Apache、小红书），供你按需替换。

要用真实 logo：
1. 把 SVG 转成 PNG（或直接用现成 PNG），命名成 `<slug>-color.png` / `<slug>-gray.png`。
2. 灰度版建议用同一张图做去饱和，保证黑白版观感一致。
3. 覆盖本目录下的同名文件即可，`resume.tex` 不用改。

> 注意：公司商标的使用需自行确认合规性；用于个人简历一般属于合理使用，但商用场景请谨慎。

## 为什么默认用"字母徽标"而不是直接抓品牌图

- 尺寸 / 圆角 / 字号**完全统一**，一页简历上看起来是"设计过的"，而不是东拼西凑。
- 不依赖第三方图床，**离线可复现**。
- 不会因为品牌 logo 版本更新而失效。

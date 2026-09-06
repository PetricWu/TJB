# 微信公众平台验证页 - 需求拆解文档

## 产品概述

- **产品类型**: 网页访问拦截/安全验证提示页
- **场景类型**: <scene_type>prototype-app</scene_type>
- **目标用户**: 访问微信公众号文章时触发环境异常验证的普通用户
- **核心价值**: 在检测到访问环境异常时，以极简、克制的提示引导用户完成安全验证，保障平台安全的同时降低用户抵触情绪
- **界面语言**: 中文
- **主题偏好**: 浅色
- **导航模式**: 无导航

---

## 页面结构总览

> **说明**：此表为页面生成的唯一数据源，包含所有页面（一级+二级）

**页面文件**: `VerifyPage.tsx`

| 区域 | 说明 |
|-----|------|
| 提示图标区 | 蓝色空心圆形信息图标（i），居中展示，作为页面唯一的视觉点缀 |
| 主标题区 | 显示"环境异常"标题，字号较大，字重中等 |
| 说明文本区 | 显示"当前环境异常，完成验证后即可继续访问。"辅助说明文字 |
| 操作按钮区 | 绿色实心圆角矩形按钮，文字"去验证"，点击触发腾讯验证码流程 |

---

## 页面布局建议

- **布局模式**: 单栏垂直居中布局 —— 页面内容极简（图标+标题+说明+按钮），无需分栏，居中聚焦用户注意力
- **视觉重心**: 按钮 —— 页面唯一交互入口，通过高饱和绿色在纯白背景中形成视觉锚点
- **结果承载区**: 无（本页为纯触发页，验证流程由腾讯验证码 SDK 接管，不在本页展示结果）

---

## 导航配置

无导航（单页提示页，无需导航）

---

## 数据来源声明

| 数据/操作 | 来源类型 | 实现要求 | mock 兜底 |
|---|---|---|---|
| 验证码触发 | real-api | 加载腾讯验证码 SDK（`https://captcha.gtimg.com/TCaptcha.js`），点击"去验证"按钮时调用 `TencentCaptcha` 实例的 `show()` 方法 | 无（验证码为真实安全流程，不可 mock） |
| 验证成功回调 | real-api | 验证成功后，SDK 回调返回 ticket 等凭证，页面需跳转至 `target_url`（从 `window.cgiData` 获取） | 无 |
| 页面配置数据 | real-api | 从 `window.cgiData` 读取 `register_code`、`target_url`、`cap_appid`、`cap_sid`、`poc_sid`、`timeout_ms`、`poc_token` 等配置 | 无（页面由微信服务端渲染注入数据） |

---

## 功能列表

- **页面/区块**: 验证提示页
  - **页面目标**: 告知用户当前访问环境异常，引导完成安全验证后继续访问目标文章
  - **功能点**:
    - **展示环境异常提示**: 居中显示蓝色信息图标、"环境异常"标题及说明文字，视觉风格极简克制，降低用户抵触情绪
    - **触发腾讯验证码**: 点击绿色"去验证"按钮，调用腾讯验证码 SDK（`TencentCaptcha`），弹出滑块/点选验证码弹窗
    - **验证成功跳转**: 验证码通过后，获取回调中的 ticket 等凭证，跳转至 `target_url`（目标微信公众号文章）
    - **验证超时/失败处理**: 若验证超时（`timeout_ms` 配置）或用户关闭验证码弹窗，页面保持当前状态，用户可重新点击"去验证"

-------

<scene_type>prototype-app</scene_type>

# UI 设计指南

## 1. 设计推导依据

- **参考意图**: Exact Reference —— 参考材料为微信公众平台"环境异常"验证提示页与"参数错误"错误页的成品截图和完整 HTML 源码，视觉真相从参考图中直接抽取：纯白背景、亮蓝信息图标、鲜绿操作按钮、深灰文字层级、完全居中单栏布局。
- **核心情绪 / 应用类型**: 安全验证类中断提示页 —— 克制中立、清晰直白，以告知引导为核心，降低用户抵触情绪。
- **独特记忆点**: 亮蓝空心圆形信息图标 + 鲜绿圆角实心按钮，在纯白留白中形成唯一的色彩锚点，传递"系统提示"与"正向通行"的双重语义。

## 2. Art Direction

- **方向名**: WeUI 极简系统提示
- **Design Style**: Flat Design 极简扁平风 —— 参考图无阴影、无渐变、无纹理，完全依靠元素位置和色彩区分层级，适合系统提示类轻量落地页。
- **DNA 参数**: 圆角 subtle（按钮约 8px 圆角）/ 阴影 none / 间距 spacious（元素间宽松垂直留白）/ 字体方向 无衬线系统默认 / 装饰手法 无装饰，纯色填充。
- **应用类型**: Tool —— 单页居中提示布局，无导航、无侧栏。

## 3. Color System

**色彩关系**: 纯白基底 + 亮蓝信息图标点缀 + 鲜绿主操作按钮 + 深灰/中灰文字层级。
**配色设计理由**: primary 使用微信品牌绿承担唯一 CTA 按钮，传递"正向操作、通行许可"语义；accent 使用亮蓝仅用于信息提示图标，传递"中性提示"信号；bg 纯白最大化留白聚焦核心内容；text 深灰近黑保证可读性同时避免纯黑生硬感。
**主色推导**: 参考图按钮色 #00c052（鲜绿），图标色 #18b8ff（亮蓝），文字 #222222 / #444444，背景纯白 #ffffff。primary 取按钮绿，accent 取图标蓝。
**使用比例**: 60% 中性（bg/card/border/textMuted）/ 30% 辅助（accent 图标）/ 10% primary（CTA 按钮）。

| 角色 | CSS 变量 | Tailwind Class | HSL 值 | 设计说明 |
|---|---|---|---|---|
| bg | `--background` | `bg-background` | hsl(0 0% 100%) | 纯白页面背景，最大化留白 |
| card | `--card` | `bg-card` | hsl(0 0% 100%) | 卡片/弹层与背景同色，无额外层次 |
| text | `--foreground` | `text-foreground` | hsl(0 0% 13%) | 主标题深灰近黑，高对比可读 |
| textMuted | `--muted-foreground` | `text-muted-foreground` | hsl(0 0% 29%) | 辅助说明文字中灰，层级柔和 |
| primary | `--primary` | `bg-primary` / `text-primary` | hsl(150 100% 38%) | 鲜绿 CTA 按钮，正向操作语义 |
| primaryForeground | `--primary-foreground` | `text-primary-foreground` | hsl(0 0% 100%) | 按钮上白色文字 |
| accent | `--accent` | `bg-accent` | hsl(198 100% 55%) | 亮蓝信息图标，中性提示信号 |
| accentForeground | `--accent-foreground` | `text-accent-foreground` | hsl(0 0% 100%) | 图标内白色 i 标识 |
| border | `--border` | `border-border` | hsl(0 0% 88%) | 输入框/卡片边界，极轻分隔 |

**语义色提示**:
- 错误/警示：bg `hsl(0 79% 63%)` / border `hsl(0 79% 58%)` / text `hsl(0 0% 100%)`，红色圆形实心图标 + 白色感叹号，用于"参数错误"等错误空状态页。饱和度与 primary 对齐（~79% vs primary 100%），色温为暖红，与冷绿 primary 形成明确语义对立。
- 成功：bg `hsl(150 60% 45%)` / border `hsl(150 55% 40%)` / text `hsl(0 0% 100%)`，饱和度略低于 primary，保持同色系温和感。

## 4. 字体与节奏

- **font-display**: Noto Sans SC —— 中文系统提示页首选，清晰可读，无衬线气质匹配极简扁平风。
- **font-body**: Noto Sans SC —— 与 display 统一，保持全页字体一致性。
- **字号**: H2 标题 text-2xl（约 24px，字重 500）；正文说明 text-lg（约 18px，字重 400）；按钮文字 text-lg（字重 600）。
- **圆角**: subtle —— 按钮 rounded-lg（约 8px），柔和适中，无尖锐感。

## 5. 全局布局契约

- **Reference Layout Use**: Exact Reference —— 完全居中的单栏垂直布局，所有元素沿页面水平中线对齐，图标→标题→说明→按钮从上到下依次排列，四周大面积均等留白。
- **Page / Section Order**: 单页提示：信息图标区 → 主标题区 → 说明正文区 → 操作按钮区。
- **Standard Content Zone**: `max-w-md`（约 448px）+ `mx-auto`，内容区收窄聚焦提示信息。
- **Shell / Frame Alignment**: 无 chrome，内容容器独立居中，与视口边缘保持均等留白。
- **Padding & Rhythm**: 页面 `min-h-screen flex items-center justify-center`；内容区内部元素间距 `gap-6`（图标与标题）、`gap-3`（标题与说明）、`gap-8`（说明与按钮）。
- **Full-bleed Zones**: 无全宽区域，所有内容约束在 max-w-md 内。
- **Local Narrowing**: 无需额外收窄，max-w-md 已满足提示页信息密度。
- **Overflow Strategy**: 无横向溢出场景。
- **Flexibility Boundary**: 允许移动端调整 padding 和 max-w 为 `max-w-[90vw]`；全局 max-w、圆角、主色、阴影语言保持一致。

## 6. 视觉与动效

- **装饰**: 无装饰，纯色扁平。
- **阴影/边界**: 无阴影；按钮无描边，仅靠纯色填充突出可点击属性。
- **动效**: 克制 —— 按钮 hover 时亮度提升 8%（`brightness-105`），active 时亮度降低 5%（`brightness-95`）；图标无动效。

## 7. 组件原则

- 按钮：Default 纯色填充 / Hover 亮度提升 / Active 亮度降低 / Focus-visible 添加 2px primary 色 outline / Disabled 降低不透明度至 50%。
- 信息图标：空心圆形描边 2px，内部 i 标识，无填充，无 hover 效果。
- 错误图标：实心圆形红色背景，白色感叹号，无 hover 效果。
- 加载与空状态延续纯白背景 + 居中布局 + 对应语义色图标。

## 8. Image Direction

- **Image Role**: 无强制图片需求，优先通过排版、色彩和局部图形（信息图标/错误图标）建立视觉记忆点。
- **Image Art Direction**: 无
- **Image Prompt Keywords**: 无
- **Image Avoidance**: 无

## 9. Anti-patterns

- **Split personality**: 信息提示页与错误页切换时改变布局方式或圆角语言；两页共享同一居中单栏布局和 subtle 圆角系统。
- **Phantom tokens**: 编造 shadcn/ui 不存在的 CSS 变量；只使用已定义 9 角色 token。
- **Default SaaS drift**: 回到默认蓝按钮或通用渐变背景；用微信品牌绿 + 亮蓝图标保持产品语义锚点。
- **Invisible interaction**: 按钮 hover/active 做了，focus-visible 丢了；每个可交互元素都要有键盘可见状态。
- **Mono-hue tyranny**: 把 primary 绿色同时用于按钮、图标、边框、链接；图标用 accent 亮蓝，文字用 text/textMuted，primary 只给 CTA 按钮。
- **Status color drift**: 错误红色饱和度远高于 primary 绿色，导致页面色彩失衡；错误色饱和度与 primary 对齐在 ±15% 范围内。
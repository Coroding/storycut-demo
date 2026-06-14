# StoryCut PRD Prototype

StoryCut 是一个“一键粗剪助手”的 PRD + UI 原型项目，面向轻量内容创作者，展示从“导入素材 -> 分析素材 -> 输入目标 -> 确认故事线 -> 预览粗剪 -> 导出”的完整产品流程。

当前阶段仅用于产品经理作品集展示，不包含真实 AI 剪辑能力，不上传真实视频，不生成真实 mp4。所有素材标签、故事线、时间线和导出结果均为模拟数据。

## 如何本地打开

方式一：直接双击打开 `index.html`。

方式二：使用 VS Code Live Server 打开当前目录。

方式三：使用任意静态服务器：

```bash
python -m http.server 8080
```

然后访问：

```text
http://localhost:8080
```

## 如何部署到 Vercel

1. 确保项目根目录包含以下文件：
   - `index.html`
   - `style.css`
   - `app.js`
   - `README.md`
   - `vercel.json`
2. 将该目录上传到 GitHub。
3. 在 Vercel 中点击 `Add New Project`。
4. 选择 `Import Git Repository`。
5. Framework Preset 选择 `Other` 或保持默认静态项目设置。
6. 点击 `Deploy`。

本项目不依赖 React、Vue、Next.js 或构建命令，可作为静态站点直接部署。

## 如何修改

- 修改页面文案：主要在 `app.js` 的各个 `render...()` 函数中修改；基础页面结构在 `index.html`。
- 修改颜色：在 `style.css` 顶部的 CSS 变量中调整，例如 `--primary`、`--bg`、`--text`。
- 修改素材模拟数据：在 `app.js` 顶部的 `materials` 数组中修改名称、时长、类型、标签和默认使用状态。
- 修改故事线模拟数据：在 `app.js` 顶部的 `story` 数组中修改段落、素材、推荐文案和预计时长。

## 文件说明

- `index.html`：静态页面入口，包含顶部导航、进度条容器、页面容器、弹窗容器和脚本引用。
- `style.css`：蓝白 SaaS 风格视觉样式、卡片、按钮、进度条、时间线、弹窗和移动端适配。
- `app.js`：七步页面状态、模拟数据、loading、素材切换、文案修改、素材替换和导出模拟。
- `vercel.json`：Vercel 静态部署配置，开启 clean URLs。
- `README.md`：项目介绍、打开方式、部署方式和修改说明。

## 作品集展示建议

建议将该原型与 PRD 文档、竞品分析和项目总结一起展示：

- 用 PRD 说明问题洞察、用户场景、MVP 范围和验收标准。
- 用该原型展示完整流程和页面设计能力。
- 用项目总结说明为什么先确认故事线，而不是直接生成不可控成片。
- 面试时可以重点演示“素材分析可解释”“故事线可修改”“粗剪可继续编辑”三个设计点。

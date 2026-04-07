# Feng.dev - 个人技术与投资站点

一个基于 Astro 和 Tailwind CSS 构建的赛博朋克风格个人网站，展示技术内容、项目、投资理念等。

## 技术栈

- **前端框架**: Astro 4.0+
- **样式框架**: Tailwind CSS 3.0+
- **构建工具**: Vite
- **部署**: GitHub Actions + 腾讯云服务器
- **语言**: TypeScript
- **内容管理**: Markdown

## 项目结构

```
├── src/
│   ├── components/      # 组件
│   ├── content/         # Markdown 内容
│   │   ├── coding/      # 编程文章
│   │   ├── investment/  # 投资文章
│   │   ├── projects/    # 项目数据
│   │   └── resources/   # 资源数据
│   ├── data/            # 常量数据
│   ├── layouts/         # 布局组件
│   ├── pages/           # 页面
│   └── styles/          # 样式文件
├── public/              # 静态资源
├── .github/             # GitHub Actions 工作流
├── astro.config.mjs     # Astro 配置
├── tailwind.config.mjs  # Tailwind 配置
└── package.json         # 项目配置
```

## 功能特性

- **赛博朋克风格**: 像素艺术、霓虹光效、故障艺术
- **响应式设计**: 适配移动端、平板、桌面端
- **性能优化**: 静态生成、代码分割、资源优化
- **内容管理**: Markdown 驱动的内容系统
- **自动化部署**: GitHub Actions 持续部署

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发服务器

```bash
npm run dev
```

访问 http://localhost:4321

### 构建生产版本

```bash
npm run build
```

构建产物会生成在 `dist/` 目录

## 部署

项目使用 GitHub Actions 自动部署到腾讯云服务器。

### 部署配置

在 GitHub 仓库的 Settings → Secrets and variables → Actions 中添加以下 secrets：

- `SERVER_SSH_KEY` - 服务器的 SSH 私钥
- `SERVER_HOST` - 腾讯云服务器的 IP 地址
- `SERVER_USER` - 服务器的用户名

### 手动部署

```bash
# 构建项目
npm run build

# 部署到服务器
# 使用 rsync 或其他工具将 dist/ 目录部署到服务器
```

## 内容管理

### 添加新文章

1. 在 `src/content/coding/` 目录创建 Markdown 文件
2. 添加 YAML 前置元数据：
   ```yaml
   ---
   title: 文章标题
   date: 2024-04-07
   description: 文章描述
   tags:
     - 标签1
     - 标签2
   ---
   ```
3. 编写文章内容

### 数据管理

- 常量数据存储在 `src/data/` 目录
- 项目、资源等数据存储在 `src/content/` 目录的 JSON 文件中

## 样式定制

- 全局样式：`src/styles/global.css`
- Tailwind 配置：`tailwind.config.mjs`
- 自定义组件样式：在组件中使用 Tailwind 类

## 性能优化

- **静态生成**: Astro 默认静态生成所有页面
- **代码分割**: 按需加载组件和页面
- **图片优化**: 支持响应式图片和懒加载
- **资源压缩**: 自动压缩 CSS、JavaScript 和 HTML

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 联系方式

- **网站**: https://q-jf.cn
- **GitHub**: https://github.com/qiaojianfeng/wiki

---

** Feng.dev - 代码构建世界，数据洞察未来 **

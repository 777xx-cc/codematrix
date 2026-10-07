# CodeMatrix 部署指南

CodeMatrix 是一个**纯前端**网站：所有代码（含 Python）都在访问者的浏览器里运行，不需要任何后端服务。
因此它可以部署到任何静态托管平台，成本为零。

## 一、打包

```bash
npm install
npm run build
```

产物在 `dist/` 目录，把这堆静态文件放到任何 Web 服务器即可访问。
路由使用 HashRouter（`/#/learn` 形式），任何静态托管都**无需**额外配置重写规则。

## 二、四种部署方式（任选其一）

### 方式 1：GitHub Pages（免费，推荐）

1. 在 GitHub 新建一个仓库（Public），把本目录推送上去：

   ```bash
   git init
   git add .
   git commit -m "CodeMatrix 编程学习平台"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
   git push -u origin main
   ```

2. 仓库已内置 `.github/workflows/deploy.yml`，推送后 GitHub Actions 会自动构建。
3. 打开仓库 **Settings → Pages → Source** 选择 **GitHub Actions**。
4. 几分钟后访问 `https://<你的用户名>.github.io/<仓库名>/`。

### 方式 2：Vercel（免费，国内访问较稳）

1. 注册 [vercel.com](https://vercel.com)，选择 **Add New → Project**，导入 GitHub 仓库。
2. 已内置 `vercel.json`（构建命令、输出目录都已配好），直接点 Deploy。
3. 也可以在本地装 CLI 一键部署：`npm i -g vercel && vercel --prod`。

### 方式 3：Netlify（免费）

1. 注册 [netlify.com](https://netlify.com)，**Add new site → Import an existing project** 导入仓库。
2. 已内置 `netlify.toml`，直接 Deploy。
3. 或者最简单：本地 `npm run build` 后，把 `dist` 文件夹**拖进** Netlify 首页的拖拽区即可上线。

### 方式 4：自己的服务器 / Docker

已内置 `Dockerfile` 和 `nginx.conf`（含 SPA 兜底、wasm 缓存策略）：

```bash
docker build -t codematrix .
docker run -d -p 80:80 codematrix
```

或者直接 `npm run build` 后把 `dist/` 交给任意 nginx / Apache / OSS / COS 静态托管。

## 三、部署后验证清单

- [ ] 首页正常打开，五个语言卡片可点击
- [ ] 教程页任意章节打开，右侧出现黄色"名词解释 · 批注"栏
- [ ] 代码演练场选 **Python**，运行 `print("hello")` —— 首次运行会加载约 14MB 的本地 Pyodide（几秒），之后离线也能跑
- [ ] 演练场选 Java / C / C++ 运行模板代码，控制台有输出
- [ ] 刷新非首页路由（如 `/#/practice`）页面不 404

## 四、说明

- **无需后端**：Python 运行时（Pyodide）已随站点一起发布在 `pyodide/` 目录，断网也能执行 Python。
- **无需数据库**：题库、教程均为内置静态内容。
- **自定义域名**：GitHub Pages / Vercel / Netlify 都支持在控制台绑定自己的域名并自动签发 HTTPS 证书。

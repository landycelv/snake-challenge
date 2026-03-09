# 🐍 Snake Challenge - 本地部署方案

基于 `projects/snake-challenge` 项目的完整本地部署指南。

---

## 📋 目录

1. [环境要求](#1-环境要求)
2. [完整安装步骤](#2-完整安装步骤)
3. [本地运行命令](#3-本地运行命令)
4. [构建和打包步骤](#4-构建和打包步骤)
5. [常见问题排查](#5-常见问题排查)
6. [验证清单](#6-验证清单)

---

## 1. 环境要求

### 1.1 Node.js 版本

- **最低版本**: Node.js >= 18.0.0
- **推荐版本**: Node.js >= 20.0.0
- **当前项目测试版本**: Node.js v22.22.0 ✅

### 1.2 npm 版本

- **最低版本**: npm >= 9.0.0
- **推荐版本**: npm >= 10.0.0

### 1.3 系统要求

| 操作系统 | 支持状态 |
|---------|---------|
| Windows 10/11 | ✅ 支持 |
| macOS 10.15+ | ✅ 支持 |
| Linux (Ubuntu/CentOS) | ✅ 支持 |

### 1.4 磁盘空间

- 源码：~100 KB
- node_modules：~50 MB
- 构建输出：~200 KB
- **建议预留空间**: 100 MB

### 1.5 检查环境

```bash
# 检查 Node.js 版本
node -v

# 检查 npm 版本
npm -v

# 如果版本过低，请升级
# Windows/macOS: 从 https://nodejs.org 下载最新版
# Linux: 
#   Ubuntu/Debian: curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs
#   CentOS: curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash - && sudo yum install -y nodejs
```

---

## 2. 完整安装步骤

### 2.1 克隆项目（如未获取）

```bash
# 从 Gitee 克隆
git clone https://gitee.com/landycelv/snake-challenge.git
cd snake-challenge

# 或从 GitHub 克隆
git clone https://github.com/landycelv/snake-challenge.git
cd snake-challenge
```

### 2.2 安装依赖

```bash
# 使用 npm 安装
npm install

# 或使用国内镜像加速（推荐中国大陆用户）
npm config set registry https://registry.npmmirror.com
npm install
```

### 2.3 验证依赖安装

```bash
# 检查 node_modules 是否存在
ls -la node_modules | head -20

# 检查关键依赖
ls node_modules | grep -E "^(vite|typescript|terser)$"
```

**预期输出**：
```
terser
typescript
vite
```

### 2.4 项目结构确认

安装完成后，项目结构应如下：

```
snake-challenge/
├── node_modules/          # 依赖目录（安装后生成）
├── src/
│   ├── main.ts           # 应用入口
│   ├── style.css         # 全局样式
│   └── game/
│       ├── types.ts      # 类型定义
│       ├── Snake.ts      # 蛇类
│       ├── Food.ts       # 食物类
│       └── SnakeGame.ts  # 游戏主逻辑
├── public/               # 静态资源
├── index.html            # 游戏入口
├── package.json          # 项目配置
├── package-lock.json     # 依赖锁定文件
├── tsconfig.json         # TypeScript 配置
├── vite.config.ts        # Vite 配置
└── dist/                 # 构建输出（构建后生成）
```

---

## 3. 本地运行命令

### 3.1 开发模式

```bash
# 启动开发服务器
npm run dev
```

**输出示例**：
```
  VITE v7.3.1  ready in 200 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**访问地址**：http://localhost:3000

### 3.2 开发模式选项

```bash
# 指定端口
npm run dev -- --port 8080

# 允许外部访问
npm run dev -- --host

# 同时指定端口和允许外部访问
npm run dev -- --host --port 8080
```

### 3.3 预览生产构建

```bash
# 先构建，再预览
npm run build
npm run preview
```

**预览服务器输出**：
```
  VITE v7.3.1  ready in 50 ms

  ➜  Local:   http://localhost:4173/
  ➜  Network: use --host to expose
```

### 3.4 命令速查表

| 命令 | 说明 | 输出目录 |
|------|------|---------|
| `npm run dev` | 启动开发服务器 | - |
| `npm run build` | 生产环境构建 | `dist/` |
| `npm run preview` | 预览生产构建 | - |

---

## 4. 构建和打包步骤

### 4.1 生产环境构建

```bash
# 执行构建
npm run build
```

**构建过程**：
1. TypeScript 类型检查 (`tsc`)
2. Vite 打包优化
3. Terser 代码压缩
4. 资源文件 Hash 生成
5. 输出到 `dist/` 目录

**构建输出示例**：
```
vite v7.3.1 building for production...
✓ 5 modules transformed.
dist/index.html                  0.73 kB │ gzip:  0.42 kB
dist/assets/index.Cj8kN2mL.js   15.42 kB │ gzip:  5.83 kB
dist/assets/index.Dx9kL3pM.css   3.21 kB │ gzip:  1.12 kB
✓ built in 1.2s
```

### 4.2 构建产物说明

```
dist/
├── index.html                    # 入口 HTML
└── assets/
    ├── index.[hash].js          # 压缩后的 JavaScript
    ├── index.[hash].css         # 压缩后的 CSS
    └── vite.[hash].svg          # 图标文件
```

### 4.3 构建配置详解

基于 `vite.config.ts` 的优化配置：

| 配置项 | 值 | 说明 |
|--------|-----|------|
| `base` | `'./'` | 相对路径，适配 Gitee/GitHub Pages |
| `minify` | `'terser'` | 使用 Terser 压缩 |
| `drop_console` | `true` | 移除 console.log |
| `drop_debugger` | `true` | 移除 debugger |
| `sourcemap` | `false` | 不生成 source map（生产环境） |
| `cssCodeSplit` | `true` | CSS 代码分割 |

### 4.4 自定义构建

```bash
# 生成 source map（用于调试）
# 修改 vite.config.ts: sourcemap: true
npm run build

# 分析构建产物大小
npm install -g vite-bundle-visualizer
npx vite-bundle-visualizer
```

### 4.5 部署构建产物

构建后的 `dist/` 目录可直接部署到：

- **静态托管服务**: Vercel, Netlify, Cloudflare Pages
- **GitHub Pages**: 推送 `dist/` 内容到 `gh-pages` 分支
- **Gitee Pages**: 推送 `dist/` 内容到 `master` 分支并开启 Pages
- **Nginx/Apache**: 复制 `dist/` 内容到 Web 服务器目录

```bash
# 示例：部署到 Nginx
sudo cp -r dist/* /usr/share/nginx/html/
sudo systemctl restart nginx
```

---

## 5. 常见问题排查

### 5.1 依赖安装失败

**问题**: `npm install` 卡住或报错

**解决方案**:
```bash
# 1. 清除 npm 缓存
npm cache clean --force

# 2. 使用国内镜像
npm config set registry https://registry.npmmirror.com

# 3. 删除 node_modules 和 lock 文件
rm -rf node_modules package-lock.json

# 4. 重新安装
npm install
```

### 5.2 Node.js 版本不兼容

**问题**: `ERR_UNSUPPORTED_NODE_VERSION` 或语法错误

**解决方案**:
```bash
# 检查当前版本
node -v

# 如果版本 < 18，请升级
# 使用 nvm (推荐)
nvm install 20
nvm use 20

# 或直接下载最新版
# https://nodejs.org
```

### 5.3 开发服务器无法启动

**问题**: 端口被占用

**解决方案**:
```bash
# 方案 1: 使用其他端口
npm run dev -- --port 8080

# 方案 2: 查找并关闭占用端口的进程
# Linux/macOS:
lsof -i :3000
kill -9 <PID>

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### 5.4 TypeScript 编译错误

**问题**: `npm run build` 时报类型错误

**解决方案**:
```bash
# 方案 1: 修复类型错误（推荐）
# 查看具体错误信息并修复代码

# 方案 2: 跳过类型检查（临时方案）
# 修改 vite.config.ts，在 build 配置中添加：
build: {
  rollupOptions: {
    plugins: [{
      name: 'no-typescript-check',
      buildStart() {
        console.log('Skipping TypeScript check')
      }
    }]
  }
}

# 或修改 tsconfig.json:
# "noEmit": false
# "skipLibCheck": true
```

### 5.5 构建产物无法运行

**问题**: 打开 `dist/index.html` 白屏或报错

**解决方案**:
```bash
# 方案 1: 使用预览服务器（推荐）
npm run preview

# 方案 2: 检查 base 配置
# vite.config.ts 中 base 应为 './'
# 确保使用相对路径

# 方案 3: 通过 HTTP 服务器访问
npm install -g serve
serve dist

# 或使用 Python
cd dist
python -m http.server 8000
```

### 5.6 游戏无法加载

**问题**: 页面加载后游戏不显示

**排查步骤**:
```bash
# 1. 打开浏览器开发者工具 (F12)
# 2. 查看 Console 是否有错误
# 3. 查看 Network 是否有资源加载失败

# 常见问题:
# - Canvas 元素未找到 → 检查 index.html 中的 #game-canvas
# - 资源路径错误 → 检查 vite.config.ts 的 base 配置
# - JavaScript 错误 → 查看 Console 具体错误信息
```

### 5.7 热更新不工作

**问题**: 修改代码后页面不自动刷新

**解决方案**:
```bash
# 1. 重启开发服务器
# Ctrl+C 停止，然后 npm run dev

# 2. 检查浏览器是否禁用缓存
# F12 → Network → 勾选 "Disable cache"

# 3. 清除浏览器缓存
# Ctrl+Shift+Delete → 清除缓存
```

---

## 6. 验证清单

### 6.1 环境验证

- [ ] Node.js 版本 >= 18.0.0
- [ ] npm 版本 >= 9.0.0
- [ ] 磁盘空间 >= 100 MB

### 6.2 安装验证

- [ ] `node_modules` 目录存在
- [ ] `package-lock.json` 已生成
- [ ] 关键依赖已安装：`vite`, `typescript`, `terser`

**验证命令**:
```bash
node -v                    # 应 >= v18.0.0
npm -v                     # 应 >= 9.0.0
ls node_modules | grep vite      # 应有输出
ls node_modules | grep typescript # 应有输出
ls node_modules | grep terser     # 应有输出
```

### 6.3 开发环境验证

- [ ] `npm run dev` 成功启动
- [ ] 开发服务器监听在 http://localhost:3000
- [ ] 浏览器访问无错误
- [ ] 游戏界面正常显示
- [ ] 蛇可以正常移动
- [ ] 食物可以正常生成
- [ ] 得分系统正常工作

**验证步骤**:
```bash
# 1. 启动开发服务器
npm run dev

# 2. 访问 http://localhost:3000

# 3. 打开浏览器 Console (F12)
# 应无红色错误

# 4. 测试游戏功能
# - 点击"开始游戏"
# - 使用方向键控制蛇移动
# - 吃到食物后得分增加
# - 撞墙或撞自己游戏结束
```

### 6.4 生产构建验证

- [ ] `npm run build` 成功完成
- [ ] `dist/` 目录已生成
- [ ] `dist/index.html` 存在
- [ ] `dist/assets/` 目录存在
- [ ] JS/CSS 文件已压缩

**验证命令**:
```bash
# 1. 执行构建
npm run build

# 2. 检查输出
ls -la dist/
ls -la dist/assets/

# 3. 预览构建产物
npm run preview

# 4. 访问 http://localhost:4173 验证功能
```

### 6.5 功能验证清单

| 功能 | 测试步骤 | 预期结果 |
|------|---------|---------|
| 游戏启动 | 点击"开始游戏"按钮 | 游戏开始，蛇出现 |
| 方向控制 | 按 ↑↓←→ 或 WASD | 蛇按对应方向移动 |
| 吃食物 | 控制蛇吃到食物 | 蛇变长，得分增加 |
| 撞墙检测 | 控制蛇撞墙 | 游戏结束，显示结束界面 |
| 自撞检测 | 控制蛇撞自己 | 游戏结束，显示结束界面 |
| 暂停功能 | 按空格或点击暂停 | 游戏暂停，再次按继续 |
| 重置功能 | 点击重置按钮 | 游戏重置到初始状态 |
| 最高分记录 | 多次游戏 | 最高分保存在本地 |

### 6.6 性能验证

- [ ] 页面加载时间 < 2 秒
- [ ] 游戏帧率稳定在 60 FPS
- [ ] 无明显卡顿
- [ ] 内存占用合理 (< 100 MB)

**验证方法**:
```bash
# 1. 打开浏览器开发者工具 (F12)
# 2. 切换到 Performance 标签
# 3. 录制游戏过程
# 4. 检查 FPS 和内存使用
```

---

## 📞 技术支持

如遇到以上未列出的问题，请：

1. 查看项目 README.md
2. 检查 GitHub/Gitee Issues
3. 提供以下信息寻求帮助：
   - Node.js 版本
   - npm 版本
   - 操作系统
   - 完整错误信息
   - 复现步骤

---

## 📄 相关文档

- [Gitee 部署指南](./GITEE_DEPLOY_GUIDE.md)
- [GitHub 部署指南](./GITHUB_MIRROR_SETUP.md)
- [测试检查清单](./DEPLOY_TEST_CHECKLIST.md)

---

**最后更新**: 2026-03-09  
**项目版本**: v1.0.0  
**文档版本**: v1.0

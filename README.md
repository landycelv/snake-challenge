# 🐍 Snake Challenge | 贪吃蛇大作战

经典贪吃蛇游戏的现代化实现，使用 TypeScript + Vite + HTML5 Canvas 构建。

## 🎮 在线演示

- **Gitee Pages**: [https://your-username.gitee.io/snake-challenge](https://your-username.gitee.io/snake-challenge)
- **GitHub Pages**: [https://your-username.github.io/snake-challenge](https://your-username.github.io/snake-challenge)

## ✨ 特性

- 🎯 经典贪吃蛇玩法
- 🎨 现代化 UI 设计
- 📱 响应式布局
- 🏆 本地最高分记录
- ⚡ 性能优化（代码压缩、缓存策略）
- 🔄 自动 CI/CD 部署

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000

### 生产构建

```bash
npm run build
```

构建输出在 `dist/` 目录

### 预览生产构建

```bash
npm run preview
```

## 🎮 游戏操作

| 按键 | 功能 |
|------|------|
| ↑ / W | 向上移动 |
| ↓ / S | 向下移动 |
| ← / A | 向左移动 |
| → / D | 向右移动 |
| 空格 | 暂停/继续 |

## 📁 项目结构

```
snake-challenge/
├── index.html              # 游戏入口
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
├── vite.config.ts          # Vite 配置
├── src/
│   ├── main.ts             # 应用入口
│   ├── style.css           # 全局样式
│   └── game/
│       ├── types.ts        # 类型定义
│       ├── Snake.ts        # 蛇类
│       ├── Food.ts         # 食物类
│       └── SnakeGame.ts    # 游戏主逻辑
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD 配置
└── .gitee/
    └── deploy.yml          # Gitee 部署配置
```

## 🛠️ 技术栈

- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 下一代前端构建工具
- **HTML5 Canvas** - 游戏渲染
- **GitHub Actions** - 自动化部署

## 📊 性能优化

- ✅ Terser 代码压缩
- ✅ 资源文件 Hash 缓存
- ✅ CSS 代码分割
- ✅ Console 移除（生产环境）
- ✅ 懒加载优化

## 📝 开发日志

- **v1.0.0** - 初始版本发布
  - 基础贪吃蛇游戏逻辑
  - 现代化 UI 设计
  - CI/CD 自动部署

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**Made with ❤️ by Anchor DevOps**

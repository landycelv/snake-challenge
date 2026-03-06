# 🔗 Gitee Webhook 配置指南

## 📋 架构说明

```
Gitee (主仓库)
  ↓ (Webhook 触发 push 事件)
GitHub Actions
  ↓ (自动构建 + 部署)
GitHub Pages
```

**变更**:
- ✅ Gitee Pages 服务已关闭
- ✅ 使用 Webhook 触发 GitHub Actions
- ✅ 部署目标：GitHub Pages
- ✅ Gitee 仅作为代码仓库（不再提供 Pages 服务）

---

## ⚙️ Gitee Webhook 配置

### 步骤 1: 在 Gitee 仓库配置 Webhook

1. 访问：https://gitee.com/landycelv/snake-challenge/hooks
2. 点击 **"添加 Webhook"**

### 步骤 2: 填写 Webhook 信息

| 配置项 | 值 |
|--------|-----|
| **URL** | `https://api.github.com/repos/landycelv/snake-challenge/dispatches` |
| **密码** | (留空，或使用 Gitee Token) |
| **触发事件** | ✅ Push 事件 |
| **内容类型** | `application/json` |

### 步骤 3: 测试 Webhook

1. 点击 **"测试"** 按钮
2. 查看 GitHub Actions 是否触发
3. 确认 workflow 运行成功

---

## 🔐 GitHub 配置

### Secrets 配置

已在 GitHub 仓库配置：
- ✅ `GITEE_TOKEN`: `3cbc0be4a4f409a161224c929d3d004c`

### Workflow 配置

文件：`.github/workflows/deploy.yml`

**触发条件**:
- Gitee Webhook (`repository_dispatch`)
- GitHub 原生推送 (`push`)
- Pull Request (`pull_request`)

**部署目标**:
- GitHub Pages (`gh-pages` 分支)

---

## 🚀 部署流程

### 方式 1: Gitee 推送触发

```bash
# 在本地推送到 Gitee
cd /root/.openclaw/workspace-anchor/projects/snake-challenge
git add .
git commit -m "feat: 新功能"
git push origin main
```

**结果**:
1. Gitee Webhook 触发
2. GitHub Actions 自动运行
3. 部署到 GitHub Pages

### 方式 2: GitHub 推送触发

```bash
# 推送到 GitHub
git push github main
```

**结果**:
1. GitHub Actions 自动运行
2. 部署到 GitHub Pages
3. 同步代码到 Gitee

---

## 📱 访问地址

**GitHub Pages**:
```
https://landycelv.github.io/snake-challenge/
```

**Gitee 仓库** (仅代码):
```
https://gitee.com/landycelv/snake-challenge
```

**GitHub 仓库**:
```
https://github.com/landycelv/snake-challenge
```

---

## ✅ 验证清单

- [ ] Gitee Webhook 已配置
- [ ] GitHub Secrets 已配置
- [ ] Workflow 文件已更新
- [ ] gh-pages 分支已清理（由 Actions 自动管理）
- [ ] 测试推送触发部署
- [ ] GitHub Pages 可正常访问

---

## ⚠️ 注意事项

1. **Gitee 不再提供 Pages 服务**
   - 仅作为代码仓库使用
   - 不需要配置 gh-pages 分支

2. **GitHub Pages 自动管理**
   - GitHub Actions 会自动创建/更新 gh-pages 分支
   - 无需手动操作

3. **Webhook 安全性**
   - 建议配置 Webhook 密码
   - 使用 Gitee Token 进行认证

---

## 🔍 故障排查

### Q1: Webhook 不触发

**检查**:
1. Gitee Webhook URL 是否正确
2. GitHub 仓库是否启用 Actions
3. 查看 Gitee Webhook 日志

### Q2: GitHub Actions 失败

**检查**:
1. GitHub Secrets 是否配置
2. workflow 语法是否正确
3. 查看 Actions 日志

### Q3: GitHub Pages 404

**解决**:
1. 等待 1-2 分钟（Pages 构建需要时间）
2. 检查 gh-pages 分支是否存在
3. 确认 `index.html` 在根目录

---

**最后更新**: 2026-03-06  
**状态**: ⏳ 等待 Webhook 配置验证

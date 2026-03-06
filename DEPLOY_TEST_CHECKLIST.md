# 🚀 Gitee 自动部署 - 测试清单

## ✅ 已完成配置

### 1. GitHub Actions Workflow
- ✅ 文件：`.github/workflows/deploy.yml`
- ✅ 已配置 Gitee Token 认证
- ✅ 支持自动部署到 Gitee Pages

### 2. Gitee Token
- ✅ Token: `3cbc0be4a4f409a161224c929d3d004c`
- ✅ 用户名：`landycelv`
- ✅ 仓库：`snake-challenge`

### 3. 代码推送
- ✅ 最新提交：`974cf6b` "feat: 配置 Gitee Token 自动部署"
- ✅ 已推送到 Gitee main 分支

---

## ⚠️ 待完成：GitHub Secrets 配置

**重要**: 需要在**GitHub 仓库**中配置 Secrets，GitHub Actions 才能使用 Gitee Token

### 配置步骤

1. 打开 GitHub 仓库（如果有镜像到 GitHub）
   ```
   https://github.com/你的用户名/snake-challenge
   ```

2. 进入：**Settings** → **Secrets and variables** → **Actions** → **New repository secret**

3. 添加以下 Secret：

| Name | Value |
|------|-------|
| `GITEE_TOKEN` | `3cbc0be4a4f409a161224c929d3d004c` |

---

## 🧪 测试部署流程

### 方式一：推送代码触发（推荐）

```bash
cd /root/.openclaw/workspace-anchor/projects/snake-challenge

# 创建测试提交
echo "# 测试部署" >> README.md
git add README.md
git commit -m "test: trigger auto deploy"
git push origin main

# 推送到 Gitee 后，GitHub Actions 会自动触发
```

### 方式二：Gitee Webhook 触发（如已配置）

1. Gitee 仓库 → 管理 → Webhook
2. 添加 Webhook 指向 GitHub Actions
3. 推送代码时自动触发

### 方式三：手动部署（当前可用）

由于 GitHub Secrets 还未配置，可以先手动部署测试：

```bash
cd /root/.openclaw/workspace-anchor/projects/snake-challenge

# 1. 构建项目
npm run build

# 2. 手动推送到 gh-pages 分支
git checkout gh-pages
git pull origin gh-pages 2>/dev/null || git checkout --orphan gh-pages

# 3. 复制构建产物
rm -rf *
cp -r ../dist/* .

# 4. 提交并推送
git add .
git commit -m "chore: manual deploy to gitee pages"
git push origin gh-pages

# 5. 切换回 main 分支
git checkout main
```

---

## 📱 访问地址

部署成功后访问：

```
https://landycelv.gitee.io/snake-challenge/
```

---

## 🔍 验证步骤

### 1. 检查 Gitee 仓库

访问：https://gitee.com/landycelv/snake-challenge

- ✅ 确认最新提交已同步
- ✅ 确认 `gh-pages` 分支存在

### 2. 检查 Gitee Pages 服务

1. Gitee 仓库 → 管理 → Gitee Pages
2. 确认已启用
3. 分支选择：`gh-pages`
4. 保存后等待 1-2 分钟

### 3. 访问页面

打开浏览器访问：`https://landycelv.gitee.io/snake-challenge/`

应该能看到贪吃蛇游戏界面

---

## ⚠️ 常见问题

### Q1: gh-pages 分支不存在

**解决方案**:
```bash
# 手动创建 gh-pages 分支
git checkout --orphan gh-pages
git reset --hard
echo "# Gitee Pages" > index.html
git add .
git commit -m "init: gh-pages branch"
git push origin gh-pages
```

### Q2: Pages 服务未启用

**解决方案**:
1. Gitee 仓库 → 管理 → Gitee Pages
2. 点击"立即开通"
3. 选择分支：`gh-pages`
4. 保存

### Q3: 页面 404

**解决方案**:
- 等待 1-2 分钟（Gitee Pages 构建需要时间）
- 确认 `index.html` 在 gh-pages 分支根目录
- 清除浏览器缓存

---

## 📞 下一步

1. **立即**: 在 GitHub 配置 `GITEE_TOKEN` Secret
2. **测试**: 推送代码触发自动部署
3. **验证**: 访问 Gitee Pages 确认部署成功

**配置完成后通知 Helm 进行最终验证！**

---

**最后更新**: 2026-03-06 09:06  
**状态**: ⏳ 等待 GitHub Secrets 配置完成

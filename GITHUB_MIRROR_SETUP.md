# 🔗 GitHub 镜像配置说明

## 📋 当前状态

### 已配置远程仓库
```
origin    git@gitee.com:landycelv/snake-challenge.git
atomgit   git@atomgit.com:stwwlo/snake-challenge.git
```

### 待配置
```
github    https://github.com/{YOUR_USERNAME}/snake-challenge.git
```

---

## ⚙️ 配置步骤

### 步骤 1: 提供 GitHub 用户名

**请告诉我你的 GitHub 用户名**，格式如：
- `your-username`
- 或完整仓库 URL: `https://github.com/your-username/snake-challenge`

### 步骤 2: 添加 GitHub 远程仓库

```bash
cd /root/.openclaw/workspace-anchor/projects/snake-challenge

# 添加 GitHub 远程（替换 {YOUR_USERNAME} 为你的用户名）
git remote add github https://github.com/{YOUR_USERNAME}/snake-challenge.git

# 验证配置
git remote -v
```

### 步骤 3: 推送到 GitHub

```bash
# 推送 main 分支
git push github main

# 推送所有分支和标签
git push github --all
git push github --tags
```

---

## 🔐 GitHub Secrets 配置

推送完成后，在 GitHub 仓库配置：

1. 打开：`https://github.com/{YOUR_USERNAME}/snake-challenge`
2. 进入：**Settings** → **Secrets and variables** → **Actions** → **New repository secret**
3. 添加：

| Name | Value |
|------|-------|
| `GITEE_TOKEN` | `3cbc0be4a4f409a161224c929d3d004c` |

---

## ✅ 验证清单

- [ ] GitHub 远程仓库已添加
- [ ] 代码已推送到 GitHub
- [ ] GitHub Secrets 已配置
- [ ] GitHub Actions 可正常触发
- [ ] Gitee Webhook 配置正确

---

**等待用户提供 GitHub 用户名后继续配置！**

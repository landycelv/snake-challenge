# ⚙️ GitHub Secrets 配置指南

## 🔑 需要配置的 Secrets

请在 GitHub 仓库中配置以下 Secrets：

### 仓库地址
```
https://github.com/你的 GitHub 用户名/snake-challenge
```

### 配置步骤

1. 打开 GitHub 仓库
2. 进入 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**
4. 依次添加以下 3 个 Secrets：

---

### 1. GITEE_TOKEN

| 字段 | 值 |
|------|-----|
| **Name** | `GITEE_TOKEN` |
| **Value** | `3cbc0be4a4f409a161224c929d3d004c` |
| **说明** | Gitee 个人访问令牌，用于推送代码到 Gitee |

---

### 2. GITEE_USERNAME

| 字段 | 值 |
|------|-----|
| **Name** | `GITEE_USERNAME` |
| **Value** | `landycelv` |
| **说明** | Gitee 用户名 |

---

### 3. GITEE_REPO

| 字段 | 值 |
|------|-----|
| **Name** | `GITEE_REPO` |
| **Value** | `snake-challenge` |
| **说明** | Gitee 仓库名 |

---

## 🚀 配置完成后测试

### 方式一：推送代码触发

```bash
cd /root/.openclaw/workspace-anchor/projects/snake-challenge
git add .
git commit -m "ci: test gitee deploy"
git push origin main
```

### 方式二：手动触发 Workflow

1. GitHub 仓库 → **Actions** 标签
2. 选择 **Build and Deploy to Gitee Pages** workflow
3. 点击 **Run workflow** → **Run workflow**

### 查看部署状态

1. Actions 页面查看最新运行
2. 确认 `Sync to Gitee` 步骤显示 ✅
3. 访问 Gitee Pages: `https://landycelv.gitee.io/snake-challenge/`

---

## ⚠️ 安全提示

- ✅ Token 已存储在 GitHub Secrets 中，不会出现在代码仓库
- ⚠️ 不要在聊天/代码中直接暴露 Token
- 🔄 建议定期更新 Token（90 天）

---

**配置完成后通知 Helm 进行部署测试！**

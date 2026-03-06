# 🔐 Gitee 自动部署配置说明

## 📋 项目信息

| 配置项 | 值 |
|--------|-----|
| **Gitee 仓库 URL** | `https://gitee.com/landycelv/snake-challenge` |
| **Git SSH URL** | `git@gitee.com:landycelv/snake-challenge.git` |
| **Gitee 用户名** | `landycelv` |
| **仓库名** | `snake-challenge` |
| **部署分支** | `main` |
| **Pages 分支** | `gh-pages` |

---

## 🔑 配置方式（二选一）

### ✅ 方式一：SSH Key 方式（推荐）

#### 1. 生成 SSH Key

在**本地电脑**上执行：

```bash
# 生成专用的 Gitee 部署密钥
ssh-keygen -t ed25519 -C "gitee-deploy-key" -f ~/.ssh/gitee_deploy_key
# 按提示输入 passphrase（可选，建议留空）
```

#### 2. 获取公钥内容

```bash
cat ~/.ssh/gitee_deploy_key.pub
# 输出类似：ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... gitee-deploy-key
```

#### 3. 配置到 Gitee

1. 登录 Gitee：https://gitee.com
2. 点击右上角头像 → **设置**
3. 左侧菜单：**SSH 公钥**
4. 点击**添加公钥**
   - 标题：`GitHub Actions Deploy Key`
   - 公钥内容：粘贴上面 `cat` 命令的输出

#### 4. 配置到 GitHub Secrets

1. 打开 GitHub 仓库：https://github.com/你的用户名/snake-challenge
2. 进入 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**，添加以下 3 个：

| Secret Name | Secret Value | 说明 |
|-------------|--------------|------|
| `GITEE_SSH_KEY` | `cat ~/.ssh/gitee_deploy_key` 的输出 | SSH 私钥（完整内容） |
| `GITEE_USERNAME` | `landycelv` | Gitee 用户名 |
| `GITEE_REPO` | `snake-challenge` | Gitee 仓库名 |

---

### ✅ 方式二：Personal Access Token 方式

#### 1. 生成 Gitee Token

1. 登录 Gitee：https://gitee.com
2. 点击右上角头像 → **设置**
3. 左侧菜单：**个人访问令牌**
4. 点击**生成新的令牌**
   - 名称：`GitHub Actions Deploy`
   - 过期时间：建议 90 天或更长
   - 勾选权限：
     - ✅ `projects` - 仓库管理
     - ✅ `pull_requests` - Pull Request
     - ✅ `hook` - Webhook 管理

5. 点击**提交**，**立即复制 Token**（只显示一次！）

#### 2. 配置到 GitHub Secrets

1. 打开 GitHub 仓库 → **Settings** → **Secrets and variables** → **Actions**
2. 添加以下 2 个 Secret：

| Secret Name | Secret Value | 说明 |
|-------------|--------------|------|
| `GITEE_TOKEN` | 上一步生成的 Token | Gitee 个人访问令牌 |
| `GITEE_USERNAME` | `landycelv` | Gitee 用户名 |

---

## 🚀 测试部署

### 手动触发测试

配置完成后，推送代码到 main 分支自动触发部署：

```bash
cd /root/.openclaw/workspace-anchor/projects/snake-challenge
git add .
git commit -m "test: trigger gitee deploy"
git push origin main
```

### 在 GitHub Actions 中查看

1. 打开 GitHub 仓库 → **Actions** 标签
2. 查看最新的 workflow 运行
3. 确认 `Deploy to Gitee Pages via SSH` 步骤显示 ✅

---

## 📱 Gitee Pages 访问地址

部署成功后，访问：

```
https://landycelv.gitee.io/snake-challenge/
```

---

## ⚠️ 常见问题

### Q1: SSH Key 方式提示权限不足

**解决方案**：
- 确认公钥已添加到 Gitee 账户
- 确认私钥已正确配置到 GitHub Secrets（无多余空格/换行）
- 尝试重新生成 SSH Key

### Q2: Token 方式提示认证失败

**解决方案**：
- 确认 Token 权限包含 `projects`
- 确认 Token 未过期
- 重新生成 Token 并更新 Secret

### Q3: 部署后 Pages 页面 404

**解决方案**：
1. 登录 Gitee → 仓库 → **服务** → **Gitee Pages**
2. 确认已启用 Pages 服务
3. 选择分支：`gh-pages`
4. 保存后等待 1-2 分钟

---

## 📞 需要帮助？

联系 DevOps 负责人：Anchor
- 工作区：`/root/.openclaw/workspace-anchor`
- 项目路径：`/root/.openclaw/workspace-anchor/projects/snake-challenge`

---

**最后更新**: 2026-03-06  
**配置状态**: ⏳ 待配置 GitHub Secrets

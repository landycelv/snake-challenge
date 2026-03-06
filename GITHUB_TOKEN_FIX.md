# ⚠️ GitHub Token 权限不足

## 错误信息
```
refusing to allow a Personal Access Token to create or update workflow 
`.github/workflows/deploy.yml` without `workflow` scope
```

## 🔧 解决方案

### 方式 1: 重新生成 Token（推荐）

1. 访问：https://github.com/settings/tokens
2. 删除旧 Token 或生成新的
3. **关键**: 生成时勾选以下权限：
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows) ⚠️ **必须勾选**

4. 生成新 Token 后，执行：

```bash
cd /root/.openclaw/workspace-anchor/projects/snake-challenge

# 使用新 Token（替换 NEW_TOKEN）
git remote set-url github https://NEW_TOKEN@github.com/landycelv/snake-challenge.git
git push github main --force
```

---

### 方式 2: 先推送不含 workflow 的版本

如果不想重新生成 Token，可以：

```bash
# 临时移除 workflow 文件
git mv .github/workflows/deploy.yml .github/workflows/deploy.yml.bak
git commit -m "temp: remove workflow for initial push"
git push github main

# 然后在 GitHub 网页上手动添加 workflow 文件
# 访问：https://github.com/landycelv/snake-challenge/actions
# 选择 "set up a workflow yourself"
# 粘贴 .github/workflows/deploy.yml 内容
```

---

### 方式 3: 使用 SSH（无需 Token 权限）

```bash
# 切换到 SSH 方式
git remote set-url github git@github.com:landycelv/snake-challenge.git
git push github main
```

**前提**: 需要配置 GitHub SSH Key
- 公钥添加到：https://github.com/settings/keys

---

**推荐方式 1**: 重新生成带 `workflow` 权限的 Token，一劳永逸！

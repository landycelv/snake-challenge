#!/bin/bash

# GitHub 镜像推送脚本
# 使用方法：./push-to-github.sh

set -e

REPO_DIR="/root/.openclaw/workspace-anchor/projects/snake-challenge"
GITHUB_URL="https://github.com/landycelv/snake-challenge.git"

cd $REPO_DIR

echo "🔗 配置 GitHub 远程仓库..."
git remote add github $GITHUB_URL 2>/dev/null || echo "✓ GitHub remote 已存在"

echo "📦 准备推送到 GitHub..."
echo ""
echo "⚠️  需要 GitHub 认证，请选择以下方式之一："
echo ""
echo "方式 1: 使用 Personal Access Token (推荐)"
echo "  git remote set-url github https://YOUR_TOKEN@github.com/landycelv/snake-challenge.git"
echo "  git push github main"
echo ""
echo "方式 2: 使用 SSH"
echo "  git remote set-url github git@github.com:landycelv/snake-challenge.git"
echo "  git push github main"
echo ""
echo "方式 3: 手动在浏览器上传文件"
echo "  1. 访问 https://github.com/landycelv/snake-challenge"
echo "  2. 点击 'uploading an existing file'"
echo "  3. 上传项目文件"
echo ""

# 检查是否有 GitHub Token
if [ -n "$GITHUB_TOKEN" ]; then
    echo "✓ 检测到 GITHUB_TOKEN 环境变量，使用 Token 推送..."
    git remote set-url github https://${GITHUB_TOKEN}@github.com/landycelv/snake-challenge.git
    git push github main
    echo "✅ 推送成功！"
else
    echo "⚠️  未检测到 GITHUB_TOKEN，请手动执行推送命令"
fi

echo ""
echo "📋 推送完成后，在 GitHub 配置 Secrets："
echo "  1. 访问 https://github.com/landycelv/snake-challenge/settings/secrets/actions"
echo "  2. 添加 Repository secret: GITEE_TOKEN = 3cbc0be4a4f409a161224c929d3d004c"

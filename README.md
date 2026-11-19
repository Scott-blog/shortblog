# 短评集 — Hugo + PaperMod

个人短评文章站，静态生成，托管在 Cloudflare Pages。

## 本地写作流程

```bash
# 新建一篇短评（自动生成日期模板）
hugo new posts/my-review.md

# 本地预览（浏览器打开 http://localhost:1313）
hugo server -D

# 发布：把 draft: true 改成 false，然后
git add . && git commit -m "new post" && git push
# push 后 Cloudflare Pages 会自动构建上线
```

## Cloudflare Pages 部署步骤

1. 把本目录推到一个 GitHub 公开仓库（不要提交 `public/`，已在 .gitignore 里）。
2. Cloudflare 控制台 → Workers & Pages → Create → Pages → Connect to Git。
3. 构建设置（Hugo 会被自动识别）：
   - Framework preset: **Hugo**
   - Build command: `hugo --minify`
   - Build output directory: `public`
   - 环境变量 `HUGO_VERSION` = `0.170.1`（与本地一致，避免构建结果差异）
4. 部署完成后会得到一个 `xxx.pages.dev` 地址，回来改 `hugo.toml` 里的 `baseURL` 再 push 一次。
5. 想绑自己的域名：Pages 项目 → Custom domains 里添加，DNS 解析按提示指向 Cloudflare 即可，HTTPS 自动。

## 目录说明

- `content/posts/` — 所有短评，一篇一个 Markdown 文件
- `content/about.md` — 关于页
- `hugo.toml` — 站点配置（标题、菜单、主题参数都在这）
- `themes/PaperMod/` — 主题，不要手改这里面的文件

# blog-site (Astro v5 + MDX)

## Dev server
```bash
cd /c/blog-site && npx astro dev --port 4321 &
```
ポートが使用中の場合は4322, 4323...と自動移行する。

## MDX制約
- `{#id}` 構文禁止（JSX式としてパースされエラー）
- article-tocのhrefは日本語見出しそのまま（rehype-slug準拠）

## OGP画像
- og:imageは絶対URLが必須（BaseLayout.astroで`new URL(ogImage, Astro.site).href`に変換済み）
- X(Twitter)カードの画像は投稿後数分〜数十分遅延して表示されるのが正常

## git
- `git add -A`は使わず対象ファイルを個別にstageする
- commit直前にfrontmatterの`pubDate`を当日に設定・`draft: false`に変更

# blog-site (Astro v5 + MDX)

感染症専門医 Tasunaro の個人ブログ。**記事執筆は `/article` スキルが正本**
（`~/.claude/skills/article/SKILL.md`・このリポジトリを19箇所で直接参照する）。
本ファイルはリポジトリ固有の制約だけを書く。KARADAクリニックの記事は別物で `/karada`。

## Dev server
```bash
cd /c/blog-site && npx astro dev --port 4321 &
```
ポートが使用中の場合は4322, 4323...と自動移行する。
※ `package.json` の scripts は `dev` / `build` / `preview`（`npm run dev` でも同じ）。

## OGP生成スクリプト（scripts/）
`scripts/build-ogp.mjs`（1枚）・`scripts/build-all-ogps.mjs`（一括）＋ `templates/` `fonts/`。
別経路として、ルート直下の `generate-og.py` が **ローカル環境変数の `GEMINI_API_KEY` を読む**
（Vercel にはシークレットを置いていない）。詳細は `scripts/README.md`。

## MDX制約
- `{#id}` 構文禁止（JSX式としてパースされエラー）
- **目次（`class="article-toc"`）の href は手書きなので、見出しをそのままコピーするとリンクが切れる**
  - 見出しIDは Astro 組み込みの **github-slugger** が自動生成する（🔴 `rehype-slug` は依存にも
    `astro.config.mjs` にも**存在しない**＝旧記載は誤り。2026-08-05 に実測で訂正）
  - 変換規則（ビルド済み `dist/` で実測）: **日本語はそのまま残る／記号（`—` `「」` `：` 等）は削除／
    半角スペースはハイフンになる**
  - 実例: `## のどの淋菌という盲点 — 無症候が「耐性の時間」をつくる`
    → `id="のどの淋菌という盲点--無症候が耐性の時間をつくる"`（スペース2つ分で `--`）
  - 迷ったら**推測せずビルド後の実物を見る**: `grep -oE '<h2 id="[^"]*"' dist/blog/<slug>/index.html`

## OGP画像
- og:imageは絶対URLが必須（BaseLayout.astroで`new URL(ogImage, Astro.site).href`に変換済み）
- X(Twitter)カードの画像は投稿後数分〜数十分遅延して表示されるのが正常

## draft挙動
- `draft: true` → 本番Vercelでビルドされない（URL=404）。ローカルdev serverのみ表示可
- `draft: false` にしてpushした瞬間に公開される

## sourcesフォルダ命名規則
- `C:\blog-site\sources\{NN}-{slug}\`（例: `05-mpox-vaccine-japan`）
- NNはゼロ埋め2桁の記事番号

## 参考文献
- medRxiv DOI（10.64898プレフィックス）はdoi.orgでv1サフィックスなしでリンクを作る
- DOIがある論文に直接URLを重複して追加しない

## git
- `git add -A`は使わず対象ファイルを個別にstageする
- commit直前にfrontmatterの`pubDate`を当日に設定・`draft: false`に変更

## Knowledge Wiki 連携（必須参照）

本ブログは感染症専門医 Tasunaro の個人ブログで、記事執筆時は **必ず** `C:\Users\unwoy\knowledge-wiki` を事前参照する。

### 記事執筆時のWiki参照フロー

**記事テーマ決定 → リサーチ開始前**:
1. `knowledge-wiki/index.md` を読み、関連する既存Wikiページがあるか確認
2. `knowledge-wiki/wiki/hot.md` で直近の注目トピックを把握
3. 関連Wikiページ（例: `disease_pertussis.md`, `concept_amr.md`）を読んで既知の知見を統合
4. Wikiに情報が不足している場合は新規リサーチ → Wiki にも還元する前提で進める

### 記事執筆後のWiki還元

**記事公開後**:
1. `knowledge-wiki/wiki/` の関連ページを更新
   - 新知見の追記
   - ブログ記事slug を `sources:` や `ブログ記事` セクションに記録
2. 必要なら新規Wikiページ作成（例: 記事で扱った新しい概念）
3. `knowledge-wiki/log.md` に `[YYYY-MM-DD] blog→wiki | 記事slug | 更新内容` を追記

### Wikiに含めるべき情報
- 査読済み論文の要点（DOI付き）
- 公式ガイドライン要約
- 疫学データ・統計
- 治療/予防の選択肢とエビデンス
- 記事間で共通参照する概念

### Wikiに含めないもの
- 特定患者情報・個人名
- 未公開の研究アイデア
- `knowledge-wiki/CLAUDE.md` の「含めないもの」セクション参照

### 参照時のショートカット
```bash
# Wiki内の特定カテゴリを検索
ls C:/Users/unwoy/knowledge-wiki/wiki/ | grep disease_
cat C:/Users/unwoy/knowledge-wiki/index.md
```

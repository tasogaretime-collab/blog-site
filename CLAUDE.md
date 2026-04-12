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

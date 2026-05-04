# OGP Generator (scripts/)

新記事の OGP 画像を frontmatter から自動生成するスクリプト群。
4つのテンプレートから選べる decisive typographic OGP。
既存記事は `ogpTemplate` を書かない限り**一切触らない**安全設計。

## クイックスタート（新記事に OGP をつけたい時）

### 1. 記事の frontmatter に OGP 設定を追加

`src/content/blog/<slug>.mdx` の frontmatter に追記:

```yaml
---
title: "記事の完全なタイトル——長いサブタイトルも含む"
description: "..."
pubDate: 2026-04-16
# 新規: OGP 生成設定
ogpTemplate: "corporate-light"           # 必須。7種から選択
ogpTitle: "記事の短縮タイトル"            # 任意。OGP専用の短いタイトル
heroStat:                                 # 任意。記事の key data
  label: "11年後も有効率 {value} を維持"
  value: "82%"
  percent: 82
  categoryLabel: "VACCINE · 2026"         # 任意（diagonal/magazine専用）
  source: "ZOE-LTFU · eClinicalMedicine 2025"  # 任意（diagonal/magazine専用）
ogImage: "/images/blog/<slug>/og-<slug>.png"
---
```

**ogpTemplate の選び方（記事のトーン別）**:

| トーン | おすすめ template |
|---|---|
| 一般的なワクチン・感染症解説 | `corporate-light` |
| アウトブレイク・AMR・緊急 | `corporate-dark` |
| ガイドライン・政策解説 | `corporate-editorial` or `magazine-editorial` |
| 統計・疫学・効果データ（数字が主役） | `hero-stat-dominant` |
| 深掘り特集・フィーチャー | `magazine-editorial` or `diagonal-asymmetric` |
| 印象的な単一メッセージ | `diagonal-asymmetric` |
| 写真を使いたい雰囲気記事 | `photo-overlay`（抽象のみ） |

### 2. 生成スクリプト実行

```bash
# 指定slugだけ生成
node scripts/build-all-ogps.mjs --slug herpes-zoster-vaccine-comparison

# ogpTemplate が設定された全記事を生成
node scripts/build-all-ogps.mjs

# 何が生成されるか確認だけ（ファイル作成なし）
node scripts/build-all-ogps.mjs --dry-run
```

出力先: `public/images/blog/<slug>/og-<slug>.png`

### 3. コミット

```bash
git add public/images/blog/<slug>/og-<slug>.png src/content/blog/<slug>.mdx
git commit -m "add OGP for <slug>"
```

## 安全性

**既存記事は一切触りません**。`ogpTemplate` フィールドが frontmatter に無い記事は**自動的にスキップ**されます。これは誤実行で既存OGPを上書きしないための設計です。

どうしても全記事を処理したい場合のみ `--force` フラグを使用（現状は使用推奨しない）:

```bash
node scripts/build-all-ogps.mjs --force
```

## 7つのテンプレート

### `corporate-light` — デフォルト（一般的な感染症・ワクチン解説）
- 純白背景 + 上下ブランドバー（ネイビー + ターコイズ）
- 中央大サンセリフタイトル（Noto Sans JP Black, auto-fit 48〜108px）
- heroStat でサブタイトル + progress bar を追加可能

### `corporate-dark` — dark variant（アウトブレイク・AMR・緊急）
- ダークネイビー背景 + 明るいターコイズのグロー
- 白タイトル、ターコイズアクセント

### `corporate-editorial` — editorial variant（一般的なガイドライン解説）
- 純白背景 + 上下の細い navy 構造線
- **Noto Serif JP Black（明朝）** タイトル
- 新聞・学術誌風の編集デザイン

### `hero-stat-dominant` — 数値強調（疫学・効果データ・統計系）
- heroStat の数値が画面の主役（380px の巨大数字）
- タイトルは数値の下に小さく配置
- 数字が記事の核心である時に使用
- The Economist 誌のカバー風

### `magazine-editorial` — 雑誌特集風（深掘り解説・政策レポート）
- 上下の太い罫線が特集ページを枠取り
- 上端に小さなカテゴリラベル（「2026.04 GUIDELINE」等）
- 中央大タイトル + サブタイトル
- 下端にソース caption
- Financial Times や科学誌のカバー風

### `diagonal-asymmetric` — 対角線テンション（特集・フィーチャー記事）
- 左下に巨大タイトル + 右上に抽象円グラフィック
- 対角線の視線誘導
- 上端にカテゴリラベル（running head style）
- サブタイトル + 出典を左下に集約
- Picture Journey 風のエディトリアル

### `photo-overlay` — 写真 variant（非人物抽象写真のみ）
- Gemini 生成の抽象背景（`scripts/templates/bg-photo-overlay.png`）
- 下1/3にダークネイビー overlay box + 白タイトル
- **倫理制約**: 人物・診療写真・医療機器・注射針・バイアルは不可。抽象・テクスチャ・紙質のみ

## heroStat の3フィールド

`heroStat` は記事の key data を視覚化するオプショナルな仕組み。記事によって必要性を判断:

| フィールド | 必須 | 例 | 省略時 |
|---|---|---|---|
| `label` | `heroStat` 使うなら必須 | `"11年後も有効率 {value} を維持"` | heroStat 全体無効 |
| `value` | 同上 | `"82%"` | 同上 |
| `percent` | optional | `82` | **progress bar が描画されない**、サブ文字のみ |

`label` 内の `{value}` が `value` に置換され、その部分だけターコイズ色になります。

数字ベースでないキー情報（例: `"33年ぶり復活"`）の場合、`percent` を省略すれば progress bar 抜きでサブ文字だけ描画されます。

## Auto-fit タイトルサイズ

タイトルは自動的に画面幅に収まる最大サイズ（108px→48px）を選択します。tejastice/note-thumbnail-maker 方式の簡易ヒューリスティック:
- CJK 文字 ≈ 0.95em 幅
- ASCII 大文字 ≈ 0.65em 幅
- 数字 ≈ 0.55em 幅
- 2px刻みで縮小、画面幅に収まった時点で確定

長すぎるタイトル（30字以上など）は `ogpTitle` で短縮版を明示してください。

## ファイル構成

```
scripts/
  build-ogp.mjs            # コア生成ロジック（テンプレ定義、SVG構築、Resvg呼び出し）
  build-all-ogps.mjs       # frontmatter を読んで全記事を処理するバッチ
  README.md                # このファイル
  fonts/                   # 静的 TTF（Noto Sans JP Black/Bold/Medium + Serif JP Black/Medium）
  templates/
    bg-photo-overlay.png   # photo-overlay テンプレ用の背景画像
```

## 依存パッケージ

blog-site の package.json に追加済:
- `@resvg/resvg-js` — SVG → PNG レンダラ
- `sharp` — photo-overlay の画像合成
- `gray-matter` — frontmatter パーサ

## 既知の制約

- **sharp は arm64 Windows で ICU 問題**があるので `@napi-rs/canvas` は未採用。Resvg 経由の SVG レンダリングで回避
- **可変フォント (VF) は Satori/Resvg と相性が悪い**ので、OTF→TTF 変換済みの静的 TTF を使用（`fontTools` + `cu2qu` で変換済み）
- **photo-overlay** は現状 `bg-photo-overlay.png` 1枚だけ用意。記事ごとに異なる背景を使いたい場合は別途 Gemini で生成して `scripts/templates/` に配置

## 今回のセッションで学んだこと（参考）

1. **Gemini AI画像生成はOGPに不向き**。タイポグラフィと厳密なレイアウトは HTML/CSS or SVG → PNG パイプラインが業界標準
2. **`--ref-image` はGeminiで丸写しを誘発する**。参照画像は Claude が見て言語化してプロンプトに反映するのが正解
3. **Tasunaroブログの voice は明朝書籍装幀ではなく、サンセリフ企業ブローシャ寄り** (shiraki-ch2-01, hamashima-showcase-01)
4. **装飾英語は禁止**。"ELEVEN-YEAR EFFICACY DATA" のような filler は意味を持たない
5. **auto-fit font size** は tejastice/note-thumbnail-maker の知見。タイトル長に関わらず画面に収まる
6. **heroStat は編集デザインの "hero element" 概念**。記事の "一番押し出したい数字/短句" を1つ選んで視覚化する

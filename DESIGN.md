---
version: alpha
name: Tasunaro Blog
description: 感染症専門医 Tasunaro の個人医療ブログ。清潔感・医療の信頼感・読みやすさを3本柱とする、知的で洗練されたミニマル・タイポグラフィ主体のデザイン言語。

colors:
  primary: "#00B2CA"
  secondary: "#7DC83E"
  primary-dark: "#0090A6"
  primary-light: "#E6F8FB"
  secondary-light: "#F0F9E6"
  cta-accent: "#00D4F0"
  text-primary: "#2c2c2c"
  text-body: "#444444"
  text-secondary: "#6b7280"
  text-deep: "#1A1A2E"
  text-editorial: "#1A2332"
  surface: "#fafbfc"
  surface-soft: "#f4fafb"
  surface-light: "#f0f9fb"
  surface-card-light: "#F7F9FC"
  surface-card-editorial: "#F0F4F8"
  border: "#e5e7eb"
  border-light: "#f0f1f3"
  background: "#FFFFFF"
  background-dark: "#0D1B2A"
  surface-card-dark: "#1E3A5F"

typography:
  h1:
    fontFamily: "Noto Serif JP"
    fontWeight: 700
    fontSize: 2.25rem
    lineHeight: 1.4
  h2:
    fontFamily: "Noto Serif JP"
    fontWeight: 700
    fontSize: 1.5rem
    lineHeight: 1.5
    note: linear-gradient(135deg, primary, secondary) テキストグラデーション適用
  h3:
    fontFamily: "Hiragino Kaku Gothic ProN, sans-serif"
    fontWeight: 700
    fontSize: 1.25rem
    color: "#4b5563"
  body:
    fontFamily: "Hiragino Kaku Gothic ProN, Hiragino Sans, Meiryo, Yu Gothic, sans-serif"
    fontWeight: 400
    fontSize: 1rem
    lineHeight: 1.7
  body-prose:
    fontFamily: "Hiragino Kaku Gothic ProN, sans-serif"
    fontWeight: 400
    color: "#444444"
    lineHeight: 1.7
  label-caps:
    fontFamily: "Noto Sans JP"
    fontWeight: 700
    fontSize: 0.875rem
    letterSpacing: "0.08em"
  caption:
    fontFamily: "Hiragino Kaku Gothic ProN, sans-serif"
    fontWeight: 400
    fontSize: 0.875rem
    color: "#6b7280"

rounded:
  sm: 6px
  md: 12px
  lg: 16px
  full: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 80px

components:
  button-primary:
    backgroundColor: primary
    textColor: background
    hoverBackgroundColor: primary-dark
    padding: "12px 24px"
    rounded: md
    fontWeight: 700
  button-secondary:
    backgroundColor: background
    textColor: primary
    borderColor: primary
    borderWidth: 2px
    hoverBackgroundColor: primary
    hoverTextColor: background
    rounded: md
    fontWeight: 700
  tag-badge:
    backgroundColor: primary-light
    textColor: primary
    fontSize: 0.75rem
    fontWeight: 500
    padding: "2px 10px"
    rounded: full
  card:
    backgroundColor: background
    rounded: lg
    shadow: "0 1px 3px rgba(0, 0, 0, 0.06)"
  summary-box:
    backgroundColor: surface-soft
    borderTop: "4px solid linear-gradient(primary, secondary)"
    rounded: md
    padding: lg
  stat-card:
    backgroundColor: surface
    border: "1px solid border"
    rounded: md
    textAlign: center
    padding: lg

sub-brands:
  ogp-blog-light:
    description: 一般的なワクチン・感染症解説向け。白背景ミニマル
    colors:
      background: "#FFFFFF"
      text: "#1A1A2E"
      card: "#F7F9FC"
      accent-1: "#00B2CA"
      accent-2: "#7DC83E"
    voice: 白背景・大きな余白・タイポグラフィ主体。ターコイズとグリーンはアクセント要素のみに限定

  ogp-blog-dark:
    description: アウトブレイク速報・緊急情報・AMR関連。ダーク背景グロー
    colors:
      background: "#0D1B2A"
      text: "#FFFFFF"
      card: "#1E3A5F"
      accent: "#00D4F0"
    voice: ダークネイビー背景に発光するターコイズアクセント。緊迫感・重要性・インパクト表現

  ogp-blog-editorial:
    description: ガイドライン解説・統計データ・学術系テーマ。セリフ体＋構造線
    colors:
      background: "#FFFFFF"
      text: "#1A2332"
      card: "#F0F4F8"
      structure-line: "#1A2332"
      accent: "#00B2CA"
    voice: ダークネイビーの太い構造線・ボーダー・タイポグラフィを組み合わせた編集デザイン。新聞・学術誌の格式

  x-video-editorial:
    description: X告知動画 editorial 10s/15s
    inherits: ogp-blog-editorial
    colors:
      title-text: "#1A2332"
      eyebrow: "#00B2CA"
      point-number: "#7DC83E"
      cta-accent: "#00D4F0"
    voice: editorial を動画向けに拡張。POINT番号にグリーン、CTAにブライトターコイズ

  leaflet-clean-white:
    description: A4リーフレット通常版（患者配布・院内掲示）
    colors:
      primary: "#00B2CA"
      accent: "#7DC83E"
      background: "#FFFFFF"
      text: "#2c2c2c"

  leaflet-dark-medical:
    description: A4リーフレット重厚版（医療機関向け・感染対策）
    colors:
      primary: "#1A2332"
      accent: "#00B2CA"
      background: "#FFFFFF"

  slide-academic:
    description: 学会発表・研修資料用の独立カラースキーム
    colors:
      primary: "#B42EAD"
    note: マゼンタグラデ系。本ブランドから切り離された sub-brand

fonts-bundled:
  - path: scripts/fonts/NotoSansJP-Black.ttf
    role: OGP/図解 極太見出し
  - path: scripts/fonts/NotoSansJP-Bold.ttf
    role: OGP/図解 太見出し
  - path: scripts/fonts/NotoSansJP-Medium.ttf
    role: OGP/図解 サブ見出し
  - path: scripts/fonts/NotoSerifJP-Black.ttf
    role: editorial 見出し用セリフ
  - path: scripts/fonts/NotoSerifJP-Medium.ttf
    role: editorial 本文用セリフ
---

## Overview

Tasunaro Blog は感染症専門医の個人ブログ。**清潔感・信頼感・読みやすさ**の3本柱を守ることで、過剰な演出に頼らない医療情報の権威性を獲得する。このファイルはブランドシステムの現在地を記述した "置き手紙" であり、**既存のスキル・スクリプトはまだこのファイルを参照していない**。将来の `frontend-design` / `ui-ux-pro-max` スキル呼び出し時のソース・オブ・トゥルースとして機能する。

## Brand Philosophy

### 清潔感の3本柱

1. **医療の信頼感** — 彩度を抑えた `#00B2CA`（ターコイズ）を主色に据え、蛍光色や派手なグラデを避ける。写真・リアルな人物画像は使わない
2. **読みやすさ** — 行間1.7〜2.0、字間0.05〜0.08em、OGPは1行20〜30文字。日本語タイポグラフィを最優先
3. **派手な演出回避** — Prezi寄せ（v3.3 cosmos）は "節目コンテンツ" 専用に温存。通常の X動画は v3.2 editorial の清潔感路線を堅持

### 禁止表現

- スライド・OGP内に「Tasunaro」「たすなろ」「感染症専門医」「たすなろブログ」「#タグ」「保存して」「フォローして」を **絶対に書かない**
- ターコイズ・グリーンで **背景を塗らない**（light バリアントの場合）
- 写真・リアルな人物画像を使わない
- 情報を詰め込まない（OGPは特にシンプルに）

## Colors — 色選定の根拠

### なぜ `#00B2CA`（ターコイズ）か

- KARADA内科クリニックとのブランド連携（同一 PRIMARY）
- 医療系でよくある "青" よりも彩度を抑えて、清潔感と知的トーンを両立
- 彩度の高い蛍光青や濃紺ネイビーを避けることで、"権威を振りかざさない医療情報" のブランドボイスを作る

### なぜ `#7DC83E`（グリーン）をアクセントに限定するか

- 主色のターコイズと補色的に働き、グラデーション（`linear-gradient(135deg, primary, secondary)`）で見出し・サマリーボックス・stat-card に視覚的リズムを与える
- 単独で大面積を塗ると "自然食品・サラダ系" に寄りすぎて医療トーンから外れる → **アクセント面積5%以下** が暗黙ルール

### 暗色系の運用

- `#1A2332`（editorial text） は leaflet-gen dark-medical・x-video editorial・ogp-blog-editorial で使用する構造線色
- `#0D1B2A`（background-dark） は ogp-blog-dark（アウトブレイク速報）専用
- どちらも **通常記事のメイン UI には使わない** — ダーク変種はテーマ別 sub-brand として切り離す

### WCAG コントラスト目安（手動チェック）

| 組み合わせ | 比 | 判定 |
|-----------|---|------|
| `text-primary #2c2c2c` on `background #FFFFFF` | 12.6:1 | AAA |
| `primary #00B2CA` on `background #FFFFFF` | 2.7:1 | Large text only |
| `background #FFFFFF` on `primary #00B2CA` | 2.7:1 | **Button text は font-weight 700 で使用** |
| `text-deep #1A1A2E` on `surface-card-light #F7F9FC` | 14.5:1 | AAA |
| `cta-accent #00D4F0` on `background-dark #0D1B2A` | 10.1:1 | AAA |

`#00B2CA` は細字では WCAG AA に届かないため、**ボタン・badge・リンクでは必ず font-weight 700 以上** で運用する。

## Typography

### なぜ見出しに Noto Serif JP を使うか

- 記事本文はゴシック（Hiragino Kaku Gothic ProN）で軽快に読ませる
- 見出しだけセリフ体を挿入することで **新聞・学術誌的なジャーナリスティックな重み** を付与
- `.prose h2` のターコイズ→グリーン テキストグラデーション（`-webkit-background-clip: text`）は Tasunaro ブログの視覚的署名

### 本文は OS フォールバック優先

- 読者端末での表示安定性を優先し、Web font を本文にロードしない
- `Hiragino Kaku Gothic ProN` → `Hiragino Sans` → `Meiryo` → `Yu Gothic` の順
- Noto Sans JP は **OGP/図解/動画でのみ** ローカル TTF（`scripts/fonts/`）から使用

### 禁則処理・日本語組版

- 句読点・括弧の行頭禁止を遵守
- OGP タイトルは全角6文字以内を推奨（超えたら 100px → 80px に縮小）
- em 強調は 1項目につき1箇所に限定

## Components — 既存パターン参照先

このブランドシステムの実装は以下に分散している：

- **Astro 本体**
  - `tailwind.config.mjs` — `karada.blue` `karada.green` などのトークン定義
  - `src/styles/global.css` — CSS 変数・`.prose` 系スタイル・`.article-summary-box` `.stat-card` `.article-toc` 等
  - `src/layouts/ArticleLayout.astro` — Noto Serif JP の Google Fonts ロード

- **OGP / 画像生成**
  - `scripts/build-ogp.mjs` — 7テンプレート（corporate-light / corporate-dark / corporate-editorial / photo-overlay / hero-stat-dominant / magazine-editorial / diagonal-asymmetric）
  - `generate-og.py` — Gemini API プロンプト内で色指定
  - `scripts/fonts/` — Noto Sans JP / Noto Serif JP のローカル TTF

- **Claude スキル側の姉妹ファイル**
  - `C:\Users\unwoy\.claude\skills\ogp-gen\DESIGN-blog.md` — OGP 3バリアント定義
  - `C:\Users\unwoy\.claude\skills\ogp-gen\DESIGN-karada.md` — KARADA クリニック版
  - `C:\Users\unwoy\.claude\skills\x-video\DESIGN.md` — X動画 editorial 拡張
  - `C:\Users\unwoy\.claude\skills\slide-gen\DESIGN-*.md` — スライド4バリアント
  - `C:\Users\unwoy\.claude\skills\leaflet-gen\` — A4 YAML パレット

**現段階では本 DESIGN.md と上記姉妹ファイルは "非同期"** — 姉妹ファイルは独自に運用され、本ファイルはそれらを集約した上位 "置き手紙" として置く。同期を取るかは段階B への昇格時に判断する。

## Claude Design Sync（2026-06-20〜）

本デザインシステムは Claude Design（claude.ai/design）と同期済み。`DesignSync` ツールで双方向同期できる。

- projectId: `1fb36fa0-6682-455e-ad60-b71bfbca446b`（name: "Tasunaro Blog"）
- ローカル storybook bundle: `design-system/`（各 `.html` の1行目に `<!-- @dsCard group="..." -->`）
- 更新フロー: 本 DESIGN.md（正本）→ 該当 HTMLカード → DesignSync 再同期（1コンポーネントずつ）

## Slide Layouts（v1・2026-06-20）

スライド/プレゼンの再利用レイアウト。`design-system/slides/` に格納（group="Slide Layouts"）。
「Tasunaroブランドで “04の比較レイアウト” で作って」のように指定して再現する。

| # | レイアウト | 用途 | 声 |
|---|-----------|------|----|
| 01 | Title (editorial) | 表紙・章の見出し | editorial（セリフ＋構造線） |
| 02 | Statement (light) | 主張1文を大きく | light |
| 03 | Section Divider (dark) | 章扉・話題転換 | dark（速報） |
| 04 | Comparison (2 cards) | 2項目の対比 | light |
| 05 | Three-up (steps/points) | 3点・3ステップ | light |
| 06 | Summary (box) | まとめ | light |

スライド共通則: アスペクト比 16:9、見出しは Noto Serif JP、グリーンはアクセント面積5%以下、light変種は背景を塗らない、スライド内に「Tasunaro」「感染症専門医」等の禁止語を書かない。

## Usage

### 現在のモード（段階A：置き手紙）

- **既存スキルはこのファイルを参照していない** — OGP・X動画・Leaflet の生成は従来どおり姉妹 `DESIGN-*.md` を参照して動作する
- **このファイルは Claude Code / Claude Agent が読み込むソース** — `frontend-design` / `ui-ux-pro-max` / `skill-creator` などで「Tasunaro ブランドに従って」と指示したときに一貫した UI を返す下敷きになる
- **`npx @google/design.md lint` は現時点では実行しない** — alpha 版依存を回避。WCAG チェックは Chrome Lighthouse / axe DevTools で代替

### 色変更時のプロトコル

1. このファイルの `colors:` セクションを先に更新する
2. 影響する姉妹ファイル（`DESIGN-*.md` 7ファイル・`tailwind.config.mjs`・`global.css`・`build-ogp.mjs`・`generate-og.py`）を grep で洗い出す
3. 各ファイルを手動で書き換える（現段階では自動同期なし）

**現実的には** PRIMARY `#00B2CA` は既に全スキルで統一されており、色変更の動機がない限り触らない。

## Non-goals（このファイルではやらないこと）

- 既存 `DESIGN-*.md` 姉妹ファイル 7ファイルの書き換え
- `tailwind.config.mjs` / `global.css` への `var(--design-md-*)` 導入
- `build-ogp.mjs` / `generate-og.py` のハードコード色撤去
- `npx @google/design.md lint` の CI 組み込み
- KARADA クリニック用の独立 DESIGN.md 作成（将来の別タスク）

## Promotion Path（段階B/C への昇格条件）

以下を **全て** 満たした場合に、このファイルを唯一のソース・オブ・トゥルースに昇格し、姉妹ファイルを段階的に本ファイルへ参照させる改修を検討する：

1. 記事 25 本に到達
2. AdSense 審査を通過
3. Google Labs `design.md` 仕様が alpha → beta に昇格
4. 既存スキルの色変更が実際に発生し、複数ファイル同時修正が苦痛になったとき

それまでは本ファイルは "置き手紙" のまま保持する。

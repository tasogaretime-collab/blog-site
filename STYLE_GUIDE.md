# Tasunaro ブログ スタイルガイド

> 最終更新: 2026-05-05（Personality / Collaboration 分離ラベル導入）
>
> このガイドは Tasunaro ブログ（感染症専門医個人ブログ・Astro v5+MDX）の記事を **記事間で一貫性のある書き方** で書くためのチェックリストである。`/article` skill の Phase 2/3/4 で必ず参照する。
>
> 関連: `CLAUDE.md`（技術制約・運用フロー）、`memory/MEMORY.md`（執筆feedbackメモ）

---

## 🎨 分類凡例（2026-05-05 導入）

各セクションには次のラベルが付く。**Phase 4 レビュー採否判定で機械的フィルタとして使う**。

| ラベル | 意味 | レビュー指摘の扱い |
|-------|------|------------------|
| **[Collaboration]** | 執筆プロトコル・構造・機械ルール（働き方） | 指摘は通常通り3分類採否判定（✅/⚠️/❌） |
| **[Personality]** | 文体・温度・読者へのトーン（話し方） | **指摘は❌不同意デフォルト**（採用には強い理由必要） |

**根拠**: `feedback_review_loop_homogenization_risk.md`（GPT-5指摘・LLMレビューループは医師の経験知・温度を削り「安全そうだが印象に残らない文章」を量産する）への構造的対応。境界判断の運用ルールは §9 参照。

---

## §0 前提 [Collaboration]

- このガイドは **後発の22記事スキャンで判明した暗黙ルール** を明文化したもの。新規ルールではなく、Tasunaro が既に多くの記事でやっている書き方の「正本」。
- 既存記事の遡及修正は **A級（即時）／B級（次回見直し時）／C級（記録のみ）** の3段階で運用する（後述 §7 参照）。
- 例外を認める判断は読者の混乱を避けるため。「ルールに合わせるためにわかりにくくなる」なら例外側を選ぶ。

---

## §1 用語表記（4分類）[Collaboration]

> 機械的grep可能ルール。Phase 4 reviewer 指摘は通常通り採否判定。
> 例外: §1D 一般読者向け平易語のペルソナ判断のみ [Personality] 寄り。

専門用語・略語の初出展開は次の4分類に従う。

### 1A. 高認知度の国際組織・概念
- **対象**: CDC, WHO, HIV, AIDS, COVID-19, mRNA, RNA, DNA, PCR
- **ルール**: 初出から略称そのまま使用してよい。展開不要。
- **例**: 「米国CDCの2024年勧告では…」（×「米国疾病予防管理センター（CDC）」は冗長）

### 1B. 国内専門組織・制度
- **対象**: JIHS, NESID, IASR, IDWR, NIID（旧称）, CFA（こども家庭庁）, PMDA, JCS, JAID
- **ルール**: 初出は **正式名（略称）** で展開。以降は略称のみ。
- **正本表記**:
  - JIHS → 「国立健康危機管理研究機構（JIHS）」
  - NESID → 「感染症発生動向調査（NESID）」
  - IASR → 「病原微生物検出情報（IASR）」
  - IDWR → 「感染症発生動向調査週報（IDWR）」
  - JCS → 「日本循環器学会（JCS）」
  - PMDA → 「医薬品医療機器総合機構（PMDA）」
- **旧称併記**: 「国立感染症研究所（現JIHS）」のように、過去文献を引く時のみ旧称併記。新規記述では旧称を避ける。

### 1C. 専門用語・略語（医学・微生物）
- **対象**: PrEP, PEP, doxy-PEP, STI, GBS, MRSA, MSSA, ESBL, AmpC, CV-A6, EV-A71, CTRX, CEZ, BPG, MIC, MRBP, GH, MMR, PCV20, RSV, LC16, Bandavirus, IE, AMR
- **ルール**: 初出は **日本語訳または平易な説明（略称）** で展開。以降は略称のみ。
- **正本表記の例**:
  - PrEP → 「曝露前予防（PrEP）」
  - PEP → 「曝露後予防（PEP）」
  - STI → 「性感染症（STI）」
  - GBS → 「ギランバレー症候群（GBS）」（中黒なしを正本・タイトル/タグ含めて統一。中黒ありは表記揺れだが医学界で許容範囲）
  - CTRX → 「セフトリアキソン（CTRX）」（**日本語名→略称**の順で固定）
  - CEZ → 「セファゾリン（CEZ）」
  - MRSA → 「メチシリン耐性黄色ブドウ球菌（MRSA）」
  - MSSA → 「メチシリン感性黄色ブドウ球菌（MSSA）」
  - ESBL → 「基質特異性拡張型β-ラクタマーゼ（ESBL）」
  - AmpC → 「AmpC β-ラクタマーゼ（AmpC）」
  - CV-A6 → 「コクサッキーウイルスA6型（CV-A6）」
  - EV-A71 → 「エンテロウイルスA71型（EV-A71）」
  - IE → 「感染性心内膜炎（IE）」
  - AMR → 「薬剤耐性（AMR）」
  - RSV → 「RSウイルス（RSV）」（カタカナ表記が定着しているのでこのまま）

### 1D. 一般読者向け平易語
- **対象**: 「のどの奥」「ぐったりしている」「水疱」「咽頭」など
- **ルール**: ペルソナが一般読者（patient/family）の記事では、医療用語の前に平易語を置くか、または平易語のみで通す。
- **例**:
  - 患者向け: 「口の中の水疱（ぶつぶつ）」
  - 医療者向け: 「口腔内に水疱を認めます」

### 1E. 例外: 凡例セクションパターン（専門医向け記事）

専門医向けで多数の薬剤略語を扱う記事（例: `infective-endocarditis-jcs-2026`）では、冒頭 SummaryBox の最後に **「略語凡例セクション」** を置き、初出展開をそこに集約してよい。
- 例: 「抗菌薬：CEZ（セファゾリン）、CTRX（セフトリアキソン）、ABPC（アンピシリン）…」
- この場合、凡例セクション以降の本文では略称のまま使用可。
- 凡例セクションは SummaryBox の最後の項目に置くのが標準（読者が「この記事のポイント」を読み終わる流れで凡例も目に入る）。
- 凡例内の順序は **略称（日本語）** で許容（一覧として辞書順に読みやすい）。本文初出は §1C 通り **日本語（略称）** が原則。

### 1G. 例外: H3見出しは略称ファースト許容

H3見出しに略語を使う場合は **「略称（日本語）」** 順を許容（見出しとしての可読性優先）:
- 例: `### MRSA（メチシリン耐性黄色ブドウ球菌）`（OK・見出し）
- 例: 本文中で「MRSA（メチシリン耐性黄色ブドウ球菌）の…」（NG・本文初出は1C順）

### 1F. 例外: frontmatter の faq 内

frontmatter `faq:` セクションは構造化データとして本文とは独立して扱われるが、**本文側で既に初出展開が済んでいる略語** は FAQ 内で略称のまま使用してよい（FAQ の各回答は短さを優先）。

### §1 チェックリスト（執筆時）

- [ ] 初出の略語をすべて grep で確認した（記事内で2回目以降に展開していないか）
- [ ] 4分類のどれに該当するか判断した
- [ ] 凡例セクションパターン（1E）を採用するか、本文初出展開（1C）でいくか決めた
- [ ] 上の正本表記表に未掲載の略語が出てきたら、本ガイドに追記してから使用する

---

## §2 リンク戦略（frontmatter relatedSlugs + 自動表示のみ）[Collaboration]

> ⚠️ 2026-06-08 改訂: **本文中ハイパーリンク全面禁止**（SKILL.md 冒頭の絶対ルール参照）。リード・段落・FAQ・callout・action-list・summary-box・締めのすべてで `[テキスト](URL)` 形式を置かない。内部リンクは **frontmatter `relatedSlugs` ＋ ArticleLayout の自動「同シリーズ記事」末尾表示のみ**で確保する。以下の「文中リンク本数・位置・pillar戻りリンク必須・Crosslink 本文リンク」の指示は本改訂で無効。

100本規模を見据え、シリーズ分類（Pillar / クラスター）で記事を構造化する。回遊は本文リンクではなく、frontmatter と ArticleLayout の自動表示で担保する。

### Layer 1: Pillar Page（テーマの総論記事・10-20本に1本）

各シリーズの「玄関ページ」。広く浅く全体像を語り、各論記事への双方向リンクのハブになる。frontmatter の `isPillar: true` を立てる。

- **役割**: 「○○ まとめ」「○○ とは」のビッグワード獲得、E-E-A-T のシグナル形成
- **ハブ機能**: 各論記事との相互参照は frontmatter `relatedSlugs`＋自動末尾表示で担う（本文リンクは置かない）
- **既存実例**: `antibiotic-resistance-amr`（AMR pillar）、`post-travel-fever-triage-48h-2026`（travel pillar）

### Layer 2: クラスター記事（同シリーズの各論記事）

- **役割**: ロングテールキーワードの獲得、特定トピックの深堀り
- **frontmatter**: `series: amr | vaccine-adult | vaccine-rsv | sti | travel | outbreak-news | pediatric | other`
- **内部リンク**: 本文リンクは置かない。同シリーズへの回遊は ArticleLayout の自動末尾表示（下記 §2B）で供給される
- **自動連携**: ArticleLayout が末尾に「同じシリーズの記事」セクションを自動表示（pillar優先・最大5本）。執筆者の作業は不要

### Layer 3: Crosslink（シリーズを跨ぐ関連リンク）

- **役割**: シリーズ境界を越えた強い文脈的必然性のある関連
- **方法**: 本文リンクは置かない。frontmatter `relatedSlugs` に対象slugを追加して関連付ける（強い必然性がある時のみ）
- **例**: post-travel-fever（travel）⇄ meningococcal-vaccine（vaccine-adult）：留学前ワクチンと帰国後発熱の文脈を relatedSlugs で相互参照
- **避けるべき**: 「関連記事:」のリスト羅列、リンクのためのリンク、本文への手動リンク

### 2A. 前/次ナビ（自動）

`ArticleLayout.astro` が pubDate 順で全記事に自動配置。執筆者の作業は不要。

### 2B. 同シリーズ記事リスト（自動・全記事統一）

`ArticleLayout.astro` が `series` 属性に基づいて FAQ の後ろに自動表示。pillar優先・最新記事優先で最大5本。位置は全記事（pillar / クラスター）で統一。執筆者の作業は不要。

- **クラスター記事**: 同シリーズ内の他記事のみ自動表示
- **pillar記事**: 同シリーズ全件 + `relatedSlugs` で指定した他シリーズ記事を自動表示・導入文も「シリーズの総論編です…」に切り替わる
- **`relatedSlugs` 使用例**: AMR pillar の `frontmatter` に `relatedSlugs: [doxy-pep-syphilis-japan-2026, infective-endocarditis-jcs-2026]` を設定すると、AMR文脈で読むべき他シリーズ記事も自動表示される

**手書きの「○○シリーズで読む」セクションは記事内に書かない**: 自動表示と重複するため。位置・スタイルが揃わなくなる。

### 2C. 逆リンク（旧記事 → 新記事）

新記事公開時、関連の深い旧記事（特に pillar）の frontmatter `relatedSlugs` に新記事slugを追加する。**本文には書かない。**

- pillar記事には新記事slugを **必ず** `relatedSlugs` に追加（pillarがハブとして機能するため）
- 同シリーズ記事は自動末尾カードで供給されるため追記不要。**別シリーズの pillar 等、自動カード対象外の記事のみ** relatedSlugs に追加
- **本文を編集していないので旧記事の `updatedDate` は変えない**（relatedSlugs 追加のみ＝鮮度詐欺回避）

### §2 チェックリスト

- [ ] 記事の `series` を frontmatter で指定したか（必須）
- [ ] pillar記事ならば `isPillar: true` を立てたか
- [ ] 本文リンクが 0件か（`grep -c '](/blog' {slug}.mdx` → 0）
- [ ] シリーズ跨ぎの関連は frontmatter `relatedSlugs` で設計したか（強い必然性がある時のみ）
- [ ] 新記事公開時、対象 pillar 等の frontmatter `relatedSlugs` に新slugを追加したか（本文リンクは書かない）
- [ ] 末尾に手動で「関連記事」リストを書いていないか（自動表示と重複するため不要）

---

## §3 視覚要素 [Collaboration]

> コンポーネント仕様・発動条件は機械ルール。指摘は通常通り採否判定。

Tasunaro ブログの視覚要素は MDX 直書きの `div`/`nav` クラスで実装されている（コンポーネント化されていない）。

### 3A. SummaryBox（`<div class="not-prose article-summary-box">`）
- **冒頭** に必ず1つ。見出しは「**この記事のポイント**」で固定。
  - 4項目を超える場合は3項目に絞り、本文へ詳細を逃がす。
- **締め** にもう1つ置くと視覚的フィニッシュが強くなる（直近5本で採用、初期記事は未採用＝B級補修対象）。締めの見出しは内容に応じて変える（例:「家族で共有しておきたいこと」「本記事のまとめ」「今日からできること」）。

### 3B. StatGrid（`<div class="not-prose article-stat-grid">`）
- **発動条件**: 数値2〜4個でその記事の核心を表現できる時のみ。
- 数値カードは2〜4個。`stat-number` / `stat-label` / `stat-note`（出典） の3要素で1セット。
- 発動しない記事もあって良い（例: 概念解説中心の記事）。

### 3C. 目次 nav（`<nav class="not-prose article-toc">`）
- 全記事に必須。`toc-badge` で番号化（①②③ではなく `<span class="toc-badge">1</span>` 形式）。
- H2が3つ以下の場合は省略してよい（記事22本中、目次なしは0本＝省略事例なし）。

### 3D. ActionList（`<div class="not-prose article-action-list">`）
- **発動条件**: 「やること／受診の目安／チェックリスト」など読者が手を動かす項目があるとき。
- 各アクションは `<div class="action-item">` 内に `<div class="action-number">①</div>`+`<div class="action-body">説明</div>` の組で。
- 番号バッジは①②③④（漢数字記号）を使う。Markdownリストの `1. 2. 3.` よりも視覚的に強い。
- 直近5本（HFMD・SFTS・post-travel-fever等）でこの形式が定着。初期記事は未採用＝B級。

### 3E. Callout（`<div class="not-prose article-callout article-callout-{type}">`）
- type: `warning`（注意喚起）/`info`（補足）/`important`（重要事項）/`success`（推奨）。
- 1記事あたり多くて3個。多用すると逆に重要度がぼやける。

### 3F. FAQ
- **frontmatter の `faq:` セクション**: 全記事必須（構造化データとしてSEOに効く）。3〜5問が目安。
- **本文末尾の H2「よくあるご質問」**: 任意。frontmatter と内容を揃えるのが理想だが、必須ではない。

### §3 チェックリスト

- [ ] 冒頭 SummaryBox（4項目以内）
- [ ] StatGrid は核心数値があれば2〜4個
- [ ] 目次 nav に toc-badge 付きで全H2を列挙
- [ ] 行動を促す内容があれば ActionList で①②③化
- [ ] 締めの段落の前後に SummaryBox で余韻を作る
- [ ] frontmatter の faq に3〜5問

---

## §4 トーン（Tasunaro ブランド）[Personality] 🎨

> **このセクションは Tasunaro 個人ブログの「文体・温度・読者へのトーン」を規定する。**
> Phase 4 reviewer / Codex の指摘で「ここは断定的すぎる」「もっと優しい表現に」「専門用語を平易化」のような **文体侵食指摘は ❌不同意デフォルト**。
> 採用するには「読者の誤解リスク」「医学的不正確」「捏造禁止違反」「煽り表現禁止違反」のいずれかを満たす必要がある。
> 詳細: §9 レビュー採否ルール。

### 4A. 救急煽り表現の禁止（再掲）[Personality / Hard Rule]
- NGワード: 「すぐに病院へ」「救急車を呼ぶ」「119番」「直ちに受診」
- OK: 「早めに医療機関を受診してください」「医療機関に相談してください」
- 例外: 真に救急対応が必要な症状（意識障害・けいれん・呼吸困難等）を列挙する具体的状況下のみ。

### 4B. 「外来でお伝えしています」表現の捏造禁止（再掲）[Personality / Hard Rule]
- 自分（執筆者＝Claude）が作った造語・キャッチコピーを「外来でお伝えしています」「私はこう説明しています」のような実在医師の口調で書かない。
- ユーザー（沖中先生・佐藤先生）の実際の発言として確認できないものは断定しない。

### 4C. 数値表現の精度 [Personality + Collaboration（境界）]
- **報告例ベースの数字** は「〜とされています（報告例ベース）」と限定詞をつける。母集団全体に外挿しない。
- **海外データを国内に適用** する場合は「米国データでは〜」「日本では年間〜」と境界を明示。
- **不確実性が高いデータ** は「示唆されています」「可能性があります」を使う。「〜です」と言い切らない。

### 4D. 表現パレット（任意）[Personality]
- `knowledge-wiki/wiki/expression_palette.md` の「教養のある日本語」を1記事1〜2箇所、4週間クールダウンで使う。
- 模範例: 「派手ではない準備が普段の時間を守る」（SFTS）、「個人と集団で異なる二重の時間軸」（HFMD）、「免疫の空白期間」（abrysvo）。

---

## §5 参考文献 [Collaboration]

### 5A. フォーマット
- H2「参考文献」は記事末尾の `---` 区切り後に配置。
- 番号付きリスト（1. 2. 3. ...）。著者・タイトル・誌名・年・巻号ページ・DOIリンクの順で固定。
- 学会名・組織名は §1B の正本表記を使う。
- DOI のある論文は `[doi:10.XXXX/...](https://doi.org/...)` のリンク形式で。doi.org URL以外（PMC, journal site）は **重複して付けない**（CLAUDE.md準拠）。
- 雑誌名にイタリック（`*`）は使わない。参考文献の各項目間に空行を入れない（tight list）。

### 5B. 出典の検証
- すべての参考文献は **WebFetch で原典確認** してから記載する。タイトル・著者・年・DOIの正確性を担保。
- ChatGPTファクトチェックは構造点検として有効だが、DOIタイポは見落としやすい。最終確認は WebFetch で。

### 5C. 参照日表記
- 公式サイト・PDF系は `（参照日: YYYY-MM-DD）` を末尾に付ける。
- 査読論文は参照日不要（DOI で固定されている）。

---

## §6 Frontmatter 必須項目 [Collaboration]

```yaml
title: "..."
description: "..."（120字程度、検索結果に表示される）
pubDate: YYYY-MM-DD
updatedDate: YYYY-MM-DD（pubDate と同日でよいが、必ず置く）
tags:
  - 主要疾患
  - 薬剤・組織
  - テーマ別
ogImage: "/images/blog/{slug}/og-image.png"
draft: false（公開時）
faq:
  - q: "..."
    a: "..."
```

- `updatedDate` は **必須**。pubDate と同日でよいが、フィールドを省略しない。
- 公開後に内容を更新したら `updatedDate` を更新日に書き換える（pubDate は変更しない）。
- tags は 5〜8個が目安。少なすぎても多すぎても検索性が落ちる。

---

## §7 既存22記事の不整合（2026-05-01時点）[Collaboration]

このセクションは将来的に閉じる（A級が解消されたら削除）。

### A級（即時対応・本セッション内で対応済み）
- [x] `doxy-pep-syphilis-japan-2026.mdx`: `updatedDate` 欠落 → 2026-05-01追加
- [x] `measles-outbreak-2026.mdx`: 「JIHS集計」検出 → 本文行32で既に「国立健康危機管理研究機構（JIHS）」と初出展開済み・以降の略称使用は §1B 準拠で修正不要
- [x] `infective-endocarditis-jcs-2026.mdx`: CTRX/CEZ 展開順 → 凡例セクションパターン（§1E）として許容・修正不要

### B級（一部対応・残りは次回見直し時）

**B-用語: 展開順揺れ（2026-05-01対応済み）**
- [x] `antibiotic-resistance-amr.mdx` 行32: 「MRSA（メチシリン耐性黄色ブドウ球菌）」→「メチシリン耐性黄色ブドウ球菌（MRSA）」に統一
- [x] STYLE_GUIDE §1G 例外追加: H3見出しは「略称（日本語）」順を許容（見出しの可読性優先）
- [x] STYLE_GUIDE §1C 「ギラン・バレー症候群」→「ギランバレー症候群」（中黒なし）に正本変更（dengue/sftsの最新トレンドに合わせる）

**B-リンク: 文中リンク密度低の記事に追加（2026-05-01対応済み）** ⚠️2026-06-08 本文リンク全面禁止により無効化（記録のみ・下記で追加した本文リンクは relatedSlugs へ移行し本文からは撤去する）
- [x] `post-travel-fever-triage-48h-2026.mdx`: dengue-GBS / sfts への文中リンク2本を末尾締めに追加
- [x] `herpes-zoster-vaccine-comparison.mdx`: pneumococcal / rsv-vaccine-adults への高齢者ワクチン群誘導を追加
- [x] `meningococcal-vaccine-japan.mdx`: post-travel-fever-triage への帰国後発熱誘導を追加
- スキップ: `pneumococcal-vaccine-2026.mdx`（既に3本リンクあり・誤検知）／`long-covid-2026.mdx`（直接的な関連記事なし・無理にリンクしない）／`sfts-tick-pets-2026.mdx`（既に dengue-GBS リンクあり）

**B-締め: 締めSummaryBox 未採用記事（19本・次回各記事の見直し時に対応）**

機械的に追加するとトーンが崩れる。各記事の文脈に合った見出し・要点を考える個別作業として、年次見直し時 or 記事内容アップデート時に対応する。

対象19本: abrysvo-rsv-maternal-vaccine, antibiotic-resistance-amr, ampc-producing-enterobacterales, dengue-guillain-barre-syndrome-travelers-2026, doxy-pep-syphilis-japan-2026, esbl-producing-bacteria, herpes-zoster-vaccine-comparison, long-covid-2026, measles-immunity-gap-2026, measles-outbreak-2026, menb-vaccine-gonorrhea, meningococcal-vaccine-japan, mmr-vaccine-japan-2026, nirsevimab-beyfortus-rsv-infant, pertussis-mrbp-2026, pneumococcal-vaccine-2026, post-travel-fever-triage-48h-2026, rsv-vaccine-adults-60plus, uti-antibiotic-selection-outpatient

採用済み3本（参考パターン）: hand-foot-mouth-disease-2026（「家族で共有しておきたいこと」）、infective-endocarditis-jcs-2026、sfts-tick-pets-2026

**締めSummaryBox の見出しテンプレ集**:
- 患者・家族向け記事: 「家族で共有しておきたいこと」「ご家族へお伝えしたいこと」「今日から始められる予防」
- ワクチン記事: 「接種を検討する前に整理しておきたいこと」「主治医と相談したいポイント」
- ニュース速報: 「いま注目しておきたい3点」「次に動向を確認したいタイミング」
- エビデンス解説: 「本記事のまとめ」「現時点での3つの結論」
- 実用ガイド: 「外来でお伝えしている要点」「行動の指針」（捏造に注意・実際にユーザーが患者にお伝えしている内容に限る）

**B-ActionList: 直近5本以外で番号化候補のあるリスト（次回各記事の見直し時に対応）**

「やること／チェックリスト／受診の目安」系のリストを Markdown `-` から `<div class="article-action-list">` に変換する候補。視覚的に強くなるが、各記事の文脈で必須かは判断が必要。

候補記事の例:
- `meningococcal-vaccine-japan.mdx`: 「接種が推奨される人」セクションの4区分（英国留学／ハッジ／髄膜炎ベルト／医学的ハイリスク）
- `pneumococcal-vaccine-2026.mdx`: 「すでにニューモバックスを打ったことがある方」等の場合分け
- `uti-antibiotic-selection-outpatient.mdx`: 治療選択フロー
- `abrysvo-rsv-maternal-vaccine.mdx`: 「接種のスケジュールと費用」セクション

新規記事は `<div class="article-action-list">` ＋ `①②③` で書く（STYLE_GUIDE §3D）が、既存記事は記事ごとの判断で対応する。

### C級（記録のみ・対応不要）
- tags 付け方の好み・H2 見出しの装飾文の有無

---

## §8 /article skill 連携 [Collaboration]

Phase 2（構成）でこのガイドを必ず読む:
- 用語表記の4分類を当てはめながら見出しを設計
- 視覚要素の発動条件を構成段階で決める（StatGrid数値・ActionList有無）

Phase 3（執筆）でこのガイドの §1〜§5 をチェックリストとして消化:
- 初出略語 grep
- 内部リンクは frontmatter relatedSlugs で設計（本文リンクは置かない）
- SummaryBox 冒頭+任意で締め
- DOI WebFetch検証

Phase 4（レビュー）で **敵対ペルソナレビュー（メインコンテキスト内製・`article-reviewer` subagent は2026-05-05に廃止）** と Codex に **本ガイドへの違反** を独立観点として点検させる。**§9 採否ルールに従い、Personality 領域への指摘は ❌不同意デフォルトで処理する**。

---

## §9 レビュー指摘の採否ルール（Personality / Collaboration 分離）[Meta]

> 2026-05-05 導入。Phase 4 reviewer / Codex が出力する指摘を **どちらの領域に属すか** で採否判定する機械的フィルタ。

### 9A. 領域別の採否デフォルト

| 領域 | 採否デフォルト | 採用に必要な条件 |
|------|---------------|----------------|
| **[Collaboration]** §1 §2 §3 §5 §6 §7 §8 | **通常採否判定**（✅同意／⚠️部分同意／❌不同意） | 構造・ルール違反として妥当か |
| **[Personality]** §4 全般 | **❌不同意デフォルト** | 下記4条件のいずれかを満たす場合のみ採用 |

**Personality 指摘を採用してよい4条件**:

1. **読者の誤解リスク** がある（医学的事実が誤って伝わる）
2. **医学的不正確** がある（数値・適応・用法など）
3. **§4B 捏造禁止違反**（実在医師の発言を装っている）
4. **§4A 救急煽り違反**（NGワード使用）

これら4条件を**満たさない**Personality 指摘の例:
- 「ここは断定的すぎる、もっと優しい表現に」
- 「専門用語が硬い、平易化を」
- 「説明的すぎる、もっと簡潔に」
- 「文末が同じパターンで単調」（§4D 表現パレットの範囲は採用してよい）
- 「言い切り表現を避けて『〜と考えられます』に」

→ これらは Tasunaro の文体・温度を侵食する指摘。**採用しない**。

### 9B. なぜこの分離が必要か

`feedback_review_loop_homogenization_risk.md`（GPT-5指摘）:

> Anthropic系LLMは対立や断定を避け論点の角を丸めるため、レビュー反映ほど医師の経験知・温度が削れ「安全そうだが印象に残らない文章」を量産しがち。

レビューループは「正しい指摘」を続々と出すが、**全採用すると Tasunaro の温度が消える**。Collaboration 指摘（構造・ルール）は採用しても文体は守られるが、Personality 指摘は採用するほど均質化する。

### 9C. 境界判断（迷う場合）

迷ったら **Personality 側に倒す（=採用しない）**。「採用しなくて Tasunaro らしさが残る」方が、「採用して安全だが印象に残らない記事になる」よりリスクが小さい。

### 9D. 自律モードでの扱い

自律モードは reviewer 指摘を自動採用するが、**Personality 領域の指摘は自動 ❌不同意** として処理する（自律モード = Personality 侵食のリスク最大）。

採用する場合は「9A の4条件のどれを満たすか」をログに残す。

### 9E. 関連 feedback memory

- `feedback_review_loop_homogenization_risk.md` — 文体均質化リスクの根拠
- `feedback_human_reread_vs_llm_review.md` — LLM再読は補助・代替不可の原則
- `feedback_personality_collaboration_separation.md` — 本セクションの背景と運用

# Tasunaro Blog — Design System (storybook bundle)

`C:\blog-site\DESIGN.md`（ソース・オブ・トゥルース）を、Claude Design（claude.ai/design）
へ同期するためのプレビュー bundle。各 `.html` は1枚目に `<!-- @dsCard group="..." -->`
マーカーを持ち、Claude Design の Design System ペインでカードとして表示される。

## 構成

| パス | グループ | 内容 |
|------|---------|------|
| `colors/palette.html` | Colors | Brand / Text / Surface / Border の全トークン |
| `type/headings.html` | Typography | H1/H2(グラデ)/H3 |
| `type/body.html` | Typography | body / label-caps / caption |
| `components/buttons.html` | Components | primary / secondary（hover付き） |
| `components/badges.html` | Components | タグバッジ |
| `components/cards.html` | Components | article card / summary box / stat card |
| `brand/ogp-voices.html` | Brand | OGP 3バリアント（light / dark / editorial） |
| `slides/01-title.html` 〜 `06-summary.html` | Slide Layouts | 再利用スライド6種（表紙/主張/章扉/比較/3点/まとめ・16:9） |

## 同期の方法（Claude Code ↔ Claude Design）

- **ローカル → Claude Design**: `DesignSync` ツール（`finalize_plan` → `write_files`）。
  動画の `/design sync` に相当。
- **Claude Design → ローカル**: `DesignSync` の `list_files` / `get_file` で読み戻す。

## 更新プロトコル

1. `C:\blog-site\DESIGN.md` を先に更新（色・型・コンポーネントの正本）
2. 影響する `.html` カードを書き換え
3. `DesignSync` で claude.ai/design へ再同期（1コンポーネントずつが推奨）

清潔感・信頼感・読みやすさの3本柱、グリーンはアクセント面積5%以下、
`#00B2CA` は細字で WCAG AA 未達のためボタン/バッジ/リンクは font-weight 700 以上。

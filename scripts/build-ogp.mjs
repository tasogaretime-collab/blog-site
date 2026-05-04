// /ogp — Resvg-based OGP generator with template system and auto-fit.
// Path: C:\blog-site\scripts\build-ogp.mjs
//
// Templates:
//   corporate-light     — white bg + horizontal brand bars + centered sans title
//   corporate-dark      — dark navy bg + glowing turquoise accents
//   corporate-editorial — white bg + thin structural rules + serif title
//   photo-overlay       — Gemini-generated bg photo + semi-transparent overlay box
//   hero-stat-dominant  — key stat rendered HUGE as the main element; title becomes subtitle
//   magazine-editorial  — thick top/bottom rules + small category label + centered sans
//   diagonal-asymmetric — lower-left title + upper-right circle graphic + diagonal tension
//
// Inspired by tejastice/note-thumbnail-maker (static bg + auto-fit title).

import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FONTS_DIR = path.join(__dirname, 'fonts');
const TEMPLATE_ASSETS_DIR = path.join(__dirname, 'templates');
const DEFAULT_OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'blog');

// ---------- text width heuristics ----------
function charEmWidth(code) {
  if (code >= 0x3000 && code < 0xFF00) return 0.95;
  if (code >= 0xFF00 && code <= 0xFFEF) return 0.95;
  if (code >= 0x30 && code <= 0x39) return 0.55;
  if (code === 0x20) return 0.35;
  if (code >= 0x41 && code <= 0x5A) return 0.65;
  return 0.52;
}

function estimateTextWidth(text, fontSize) {
  let em = 0;
  for (const ch of text) em += charEmWidth(ch.codePointAt(0));
  return em * fontSize;
}

function calcAutoFontSize(text, maxWidth, { maxSize, minSize, step }) {
  for (let size = maxSize; size >= minSize; size -= step) {
    if (estimateTextWidth(text, size) <= maxWidth) return size;
  }
  return minSize;
}

function xmlEscape(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
  }[c]));
}

// ---------- templates ----------
const TEMPLATES = {
  'corporate-light': {
    width: 1200, height: 630, layout: 'standard', bg: '#FFFFFF',
    bars: [
      { y: 0, h: 18, color: '#1A2332' },
      { y: 18, h: 26, color: '#00B2CA' },
      { y: 588, h: 42, color: '#00B2CA' },
    ],
    title: {
      font: 'Noto Sans JP', weight: 900, color: '#111111',
      centerY: 310, maxSize: 108, minSize: 48, step: 2,
      marginX: 60, letterSpacing: -1,
    },
    subtitle: {
      font: 'Noto Sans JP', weight: 700, fontSize: 30,
      color: '#1A2332', accentColor: '#00B2CA', centerY: 400,
    },
    bar: {
      y: 450, width: 280, height: 6, radius: 3,
      baseColor: '#E0E6EE', fillColor: '#00B2CA',
    },
  },

  'corporate-dark': {
    width: 1200, height: 630, layout: 'standard', bg: '#0D1B2A',
    bars: [
      { y: 0, h: 18, color: '#FFFFFF' },
      { y: 18, h: 26, color: '#00D4F0' },
      { y: 588, h: 42, color: '#00D4F0' },
    ],
    title: {
      font: 'Noto Sans JP', weight: 900, color: '#FFFFFF',
      centerY: 310, maxSize: 108, minSize: 48, step: 2,
      marginX: 60, letterSpacing: -1,
    },
    subtitle: {
      font: 'Noto Sans JP', weight: 700, fontSize: 30,
      color: '#FFFFFF', accentColor: '#00D4F0', centerY: 400,
    },
    bar: {
      y: 450, width: 280, height: 6, radius: 3,
      baseColor: '#1E3A5F', fillColor: '#00D4F0',
    },
  },

  'corporate-editorial': {
    width: 1200, height: 630, layout: 'standard', bg: '#FFFFFF',
    bars: [
      { y: 88, h: 1.5, color: '#1A2332', x: 80, w: 1040 },
      { y: 542, h: 1.5, color: '#1A2332', x: 80, w: 1040 },
    ],
    title: {
      font: 'Noto Serif JP', weight: 900, color: '#1A2332',
      centerY: 320, maxSize: 102, minSize: 48, step: 2,
      marginX: 100, letterSpacing: -2,
    },
    subtitle: {
      font: 'Noto Sans JP', weight: 500, fontSize: 26,
      color: '#1A2332', accentColor: '#00B2CA', centerY: 410,
    },
    bar: {
      y: 462, width: 220, height: 4, radius: 2,
      baseColor: '#E0E6EE', fillColor: '#00B2CA',
    },
  },

  'photo-overlay': {
    width: 1200, height: 630, layout: 'standard',
    bgImage: path.join(TEMPLATE_ASSETS_DIR, 'bg-photo-overlay.png'),
    overlayBox: {
      x: 0, y: 410, w: 1200, h: 220,
      color: '#0D1B2A', opacity: 0.92,
    },
    title: {
      font: 'Noto Sans JP', weight: 900, color: '#FFFFFF',
      centerY: 498, maxSize: 80, minSize: 44, step: 2,
      marginX: 80, letterSpacing: -1,
    },
    subtitle: {
      font: 'Noto Sans JP', weight: 700, fontSize: 22,
      color: '#FFFFFF', accentColor: '#00D4F0', centerY: 560,
    },
  },

  'hero-stat-dominant': {
    width: 1200, height: 630, layout: 'hero-stat', bg: '#FFFFFF',
    bars: [
      { y: 588, h: 42, color: '#00B2CA' },
    ],
    hero: {
      // Main stat number (e.g., "82") — drawn huge
      font: 'Noto Sans JP', weight: 900, color: '#1A2332',
      unitColor: '#00B2CA',
      centerY: 350, maxSize: 380, minSize: 200, step: 8,
      marginX: 120,
    },
    title: {
      font: 'Noto Sans JP', weight: 700, color: '#1A2332',
      centerY: 460, maxSize: 44, minSize: 24, step: 2,
      marginX: 100, letterSpacing: 0,
    },
    caption: {
      font: 'Noto Sans JP', weight: 500, fontSize: 18,
      color: '#6E7890', centerY: 510,
    },
  },

  'magazine-editorial': {
    width: 1200, height: 630, layout: 'magazine', bg: '#FFFFFF',
    bars: [
      { y: 80, h: 6, color: '#1A2332' },
      { y: 550, h: 6, color: '#1A2332' },
    ],
    label: {
      font: 'Noto Sans JP', weight: 700, fontSize: 14,
      color: '#1A2332', accentColor: '#00B2CA',
      centerY: 120, letterSpacing: 5,
    },
    title: {
      font: 'Noto Sans JP', weight: 900, color: '#111111',
      centerY: 310, maxSize: 100, minSize: 44, step: 2,
      marginX: 120, letterSpacing: -1,
    },
    subtitle: {
      font: 'Noto Sans JP', weight: 500, fontSize: 24,
      color: '#1A2332', accentColor: '#00B2CA', centerY: 400,
    },
    source: {
      font: 'Noto Sans JP', weight: 500, fontSize: 14,
      color: '#6E7890', centerY: 595, letterSpacing: 2,
    },
  },

  'diagonal-asymmetric': {
    width: 1200, height: 630, layout: 'diagonal', bg: '#FFFFFF',
    circle: {
      cx: 970, cy: 220, r: 170,
      stroke: '#1A2332', strokeWidth: 3,
      innerDot: { cx: 920, cy: 170, r: 16, fill: '#00B2CA' },
    },
    category: {
      font: 'Noto Sans JP', weight: 700, fontSize: 14,
      color: '#00B2CA', x: 80, y: 100, letterSpacing: 5,
    },
    title: {
      font: 'Noto Sans JP', weight: 900, color: '#111111',
      left: 80, baselineY: 510, maxSize: 88, minSize: 40, step: 2,
      marginRight: 400, lineHeight: 1.08, letterSpacing: -1,
    },
    accentRule: {
      x: 80, y: 535, w: 56, h: 3, color: '#00B2CA',
    },
    subtitle: {
      font: 'Noto Sans JP', weight: 500, fontSize: 22,
      color: '#1A2332', accentColor: '#00B2CA',
      left: 80, y: 570,
    },
    source: {
      font: 'Noto Sans JP', weight: 500, fontSize: 13,
      color: '#6E7890', left: 80, y: 605, letterSpacing: 1.5,
    },
  },
};

// ---------- layout drawers ----------

function drawStandard(cfg, title, heroStat, W, H, layers) {
  // background
  if (cfg.bg && !cfg.bgImage) {
    layers.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${cfg.bg}"/>`);
  }

  if (cfg.bars) {
    for (const b of cfg.bars) {
      const bx = b.x ?? 0;
      const bw = b.w ?? W;
      layers.push(`<rect x="${bx}" y="${b.y}" width="${bw}" height="${b.h}" fill="${b.color}"/>`);
    }
  }

  if (cfg.overlayBox) {
    const o = cfg.overlayBox;
    layers.push(`<rect x="${o.x}" y="${o.y}" width="${o.w}" height="${o.h}" fill="${o.color}" opacity="${o.opacity}"/>`);
  }

  const titleMaxWidth = W - cfg.title.marginX * 2;
  const titleSize = calcAutoFontSize(title, titleMaxWidth, cfg.title);

  layers.push(`<text x="${W / 2}" y="${cfg.title.centerY}"
    font-family="${cfg.title.font}" font-size="${titleSize}"
    font-weight="${cfg.title.weight}" fill="${cfg.title.color}"
    text-anchor="middle" letter-spacing="${cfg.title.letterSpacing}">${xmlEscape(title)}</text>`);

  if (heroStat && heroStat.label && heroStat.value) {
    const [before, after] = heroStat.label.split('{value}');
    layers.push(`<text x="${W / 2}" y="${cfg.subtitle.centerY}"
      font-family="${cfg.subtitle.font}" font-size="${cfg.subtitle.fontSize}"
      font-weight="${cfg.subtitle.weight}" fill="${cfg.subtitle.color}"
      text-anchor="middle" letter-spacing="1">${xmlEscape(before)}<tspan fill="${cfg.subtitle.accentColor}">${xmlEscape(heroStat.value)}</tspan>${xmlEscape(after)}</text>`);
  }

  if (cfg.bar && heroStat && typeof heroStat.percent === 'number') {
    const b = cfg.bar;
    const pct = Math.max(0, Math.min(1, heroStat.percent / 100));
    const barX = W / 2 - b.width / 2;
    layers.push(`<rect x="${barX}" y="${b.y}" width="${b.width}" height="${b.height}" rx="${b.radius}" ry="${b.radius}" fill="${b.baseColor}"/>`);
    layers.push(`<rect x="${barX}" y="${b.y}" width="${b.width * pct}" height="${b.height}" rx="${b.radius}" ry="${b.radius}" fill="${b.fillColor}"/>`);
  }

  return { titleSize };
}

function drawHeroStat(cfg, title, heroStat, W, H, layers) {
  // background + bottom bar
  layers.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${cfg.bg}"/>`);
  for (const b of (cfg.bars || [])) {
    layers.push(`<rect x="0" y="${b.y}" width="${W}" height="${b.h}" fill="${b.color}"/>`);
  }

  // Split heroStat.value into main number and optional unit (e.g., "82%" -> "82" + "%")
  let mainStr = heroStat?.value || '—';
  let unitStr = '';
  const m = mainStr.match(/^(.+?)(%)$/);
  if (m) {
    mainStr = m[1];
    unitStr = m[2];
  }

  // Auto-fit the hero size based on the combined string
  const combined = mainStr + unitStr;
  const heroMaxWidth = W - cfg.hero.marginX * 2;
  const heroSize = calcAutoFontSize(combined, heroMaxWidth, cfg.hero);

  // Compute widths for layout
  const mainWidth = estimateTextWidth(mainStr, heroSize);
  const unitSize = heroSize * 0.5;
  const unitWidth = estimateTextWidth(unitStr, unitSize);
  const totalWidth = mainWidth + unitWidth;
  const startX = W / 2 - totalWidth / 2;

  // Main number
  layers.push(`<text x="${startX}" y="${cfg.hero.centerY}"
    font-family="${cfg.hero.font}" font-size="${heroSize}"
    font-weight="${cfg.hero.weight}" fill="${cfg.hero.color}">${xmlEscape(mainStr)}</text>`);

  // Unit (smaller, accent color)
  if (unitStr) {
    const unitBaselineY = cfg.hero.centerY - (heroSize * 0.15);
    layers.push(`<text x="${startX + mainWidth}" y="${unitBaselineY}"
      font-family="${cfg.hero.font}" font-size="${unitSize}"
      font-weight="${cfg.hero.weight}" fill="${cfg.hero.unitColor}">${xmlEscape(unitStr)}</text>`);
  }

  // Title (smaller, below the hero)
  const titleMaxWidth = W - cfg.title.marginX * 2;
  const titleSize = calcAutoFontSize(title, titleMaxWidth, cfg.title);
  layers.push(`<text x="${W / 2}" y="${cfg.title.centerY}"
    font-family="${cfg.title.font}" font-size="${titleSize}"
    font-weight="${cfg.title.weight}" fill="${cfg.title.color}"
    text-anchor="middle">${xmlEscape(title)}</text>`);

  // Caption (from heroStat.label if present)
  if (heroStat?.label) {
    const captionText = heroStat.label.replace('{value}', heroStat.value);
    layers.push(`<text x="${W / 2}" y="${cfg.caption.centerY}"
      font-family="${cfg.caption.font}" font-size="${cfg.caption.fontSize}"
      font-weight="${cfg.caption.weight}" fill="${cfg.caption.color}"
      text-anchor="middle">${xmlEscape(captionText)}</text>`);
  }

  return { titleSize };
}

function drawMagazine(cfg, title, heroStat, W, H, layers) {
  layers.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${cfg.bg}"/>`);
  for (const b of (cfg.bars || [])) {
    layers.push(`<rect x="0" y="${b.y}" width="${W}" height="${b.h}" fill="${b.color}"/>`);
  }

  // Small category label between top rule and title
  const labelText = heroStat?.categoryLabel || '特 集';
  layers.push(`<text x="${W / 2}" y="${cfg.label.centerY}"
    font-family="${cfg.label.font}" font-size="${cfg.label.fontSize}"
    font-weight="${cfg.label.weight}" fill="${cfg.label.color}"
    text-anchor="middle" letter-spacing="${cfg.label.letterSpacing}">${xmlEscape(labelText)}</text>`);

  // Main title
  const titleMaxWidth = W - cfg.title.marginX * 2;
  const titleSize = calcAutoFontSize(title, titleMaxWidth, cfg.title);
  layers.push(`<text x="${W / 2}" y="${cfg.title.centerY}"
    font-family="${cfg.title.font}" font-size="${titleSize}"
    font-weight="${cfg.title.weight}" fill="${cfg.title.color}"
    text-anchor="middle" letter-spacing="${cfg.title.letterSpacing}">${xmlEscape(title)}</text>`);

  // Subtitle from heroStat if provided
  if (heroStat && heroStat.label && heroStat.value) {
    const [before, after] = heroStat.label.split('{value}');
    layers.push(`<text x="${W / 2}" y="${cfg.subtitle.centerY}"
      font-family="${cfg.subtitle.font}" font-size="${cfg.subtitle.fontSize}"
      font-weight="${cfg.subtitle.weight}" fill="${cfg.subtitle.color}"
      text-anchor="middle" letter-spacing="1">${xmlEscape(before)}<tspan fill="${cfg.subtitle.accentColor}">${xmlEscape(heroStat.value)}</tspan>${xmlEscape(after)}</text>`);
  }

  // Source caption between bottom rule and canvas edge
  const sourceText = heroStat?.source || '';
  if (sourceText) {
    layers.push(`<text x="${W / 2}" y="${cfg.source.centerY}"
      font-family="${cfg.source.font}" font-size="${cfg.source.fontSize}"
      font-weight="${cfg.source.weight}" fill="${cfg.source.color}"
      text-anchor="middle" letter-spacing="${cfg.source.letterSpacing}">${xmlEscape(sourceText)}</text>`);
  }

  return { titleSize };
}

function drawDiagonal(cfg, title, heroStat, W, H, layers) {
  layers.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${cfg.bg}"/>`);

  // Circle graphic upper-right
  const c = cfg.circle;
  layers.push(`<circle cx="${c.cx}" cy="${c.cy}" r="${c.r}"
    fill="none" stroke="${c.stroke}" stroke-width="${c.strokeWidth}"/>`);
  if (c.innerDot) {
    layers.push(`<circle cx="${c.innerDot.cx}" cy="${c.innerDot.cy}" r="${c.innerDot.r}"
      fill="${c.innerDot.fill}"/>`);
  }

  // Category label (uses heroStat.categoryLabel if present, else falls back to default)
  const category = heroStat?.categoryLabel || 'ARTICLE';
  layers.push(`<text x="${cfg.category.x}" y="${cfg.category.y}"
    font-family="${cfg.category.font}" font-size="${cfg.category.fontSize}"
    font-weight="${cfg.category.weight}" fill="${cfg.category.color}"
    letter-spacing="${cfg.category.letterSpacing}">${xmlEscape(category)}</text>`);

  // Title lower-left — support optional line break via \n in source
  const normalizedTitle = title.replace(/\\n/g, '\n');
  const titleLines = normalizedTitle.split('\n');
  const titleMaxWidth = W - cfg.title.left - cfg.title.marginRight;
  // Compute title size based on the longest line
  const longestLine = titleLines.reduce((a, b) => (estimateTextWidth(a, 100) > estimateTextWidth(b, 100) ? a : b));
  const titleSize = calcAutoFontSize(longestLine, titleMaxWidth, cfg.title);
  const lineAdvance = titleSize * cfg.title.lineHeight;
  const totalHeight = lineAdvance * (titleLines.length - 1);
  const firstBaselineY = cfg.title.baselineY - totalHeight;
  titleLines.forEach((line, i) => {
    layers.push(`<text x="${cfg.title.left}" y="${firstBaselineY + i * lineAdvance}"
      font-family="${cfg.title.font}" font-size="${titleSize}"
      font-weight="${cfg.title.weight}" fill="${cfg.title.color}"
      letter-spacing="${cfg.title.letterSpacing}">${xmlEscape(line)}</text>`);
  });

  // Accent rule under title
  const r = cfg.accentRule;
  layers.push(`<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${r.color}"/>`);

  // Subtitle from heroStat
  if (heroStat && heroStat.label && heroStat.value) {
    const [before, after] = heroStat.label.split('{value}');
    layers.push(`<text x="${cfg.subtitle.left}" y="${cfg.subtitle.y}"
      font-family="${cfg.subtitle.font}" font-size="${cfg.subtitle.fontSize}"
      font-weight="${cfg.subtitle.weight}" fill="${cfg.subtitle.color}">${xmlEscape(before)}<tspan fill="${cfg.subtitle.accentColor}">${xmlEscape(heroStat.value)}</tspan>${xmlEscape(after)}</text>`);
  }

  // Optional source
  if (heroStat?.source) {
    layers.push(`<text x="${cfg.source.left}" y="${cfg.source.y}"
      font-family="${cfg.source.font}" font-size="${cfg.source.fontSize}"
      font-weight="${cfg.source.weight}" fill="${cfg.source.color}"
      letter-spacing="${cfg.source.letterSpacing}">${xmlEscape(heroStat.source)}</text>`);
  }

  return { titleSize };
}

// ---------- SVG build dispatcher ----------
function buildSVG({ template, title, heroStat }) {
  const cfg = TEMPLATES[template];
  if (!cfg) throw new Error(`Unknown template: ${template}`);

  const W = cfg.width;
  const H = cfg.height;
  const layers = [];

  let result;
  switch (cfg.layout) {
    case 'hero-stat':
      result = drawHeroStat(cfg, title, heroStat, W, H, layers);
      break;
    case 'magazine':
      result = drawMagazine(cfg, title, heroStat, W, H, layers);
      break;
    case 'diagonal':
      result = drawDiagonal(cfg, title, heroStat, W, H, layers);
      break;
    case 'standard':
    default:
      result = drawStandard(cfg, title, heroStat, W, H, layers);
      break;
  }

  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  ${layers.join('\n  ')}
</svg>`;

  return { svg, titleSize: result.titleSize };
}

export async function buildOGP({ template = 'corporate-light', title, heroStat, outputPath }) {
  const { svg, titleSize } = buildSVG({ template, title, heroStat });
  const cfg = TEMPLATES[template];

  const resvg = new Resvg(svg, {
    background: 'rgba(0,0,0,0)',
    fitTo: { mode: 'width', value: cfg.width },
    font: {
      fontFiles: [
        path.join(FONTS_DIR, 'NotoSansJP-Black.ttf'),
        path.join(FONTS_DIR, 'NotoSansJP-Bold.ttf'),
        path.join(FONTS_DIR, 'NotoSansJP-Medium.ttf'),
        path.join(FONTS_DIR, 'NotoSerifJP-Black.ttf'),
        path.join(FONTS_DIR, 'NotoSerifJP-Medium.ttf'),
      ],
      loadSystemFonts: false,
      defaultFontFamily: 'Noto Sans JP',
    },
  });

  const overlayPng = resvg.render().asPng();

  if (cfg.bgImage) {
    await sharp(cfg.bgImage)
      .resize(cfg.width, cfg.height, { fit: 'cover' })
      .composite([{ input: overlayPng }])
      .png()
      .toFile(outputPath);
  } else {
    fs.writeFileSync(outputPath, overlayPng);
  }

  return { outputPath, titleSize };
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const val = argv[i + 1];
      if (val !== undefined && !val.startsWith('--')) { out[key] = val; i++; }
      else out[key] = true;
    }
  }
  return out;
}

const isMainScript = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('build-ogp.mjs');
if (isMainScript) {
  const args = parseArgs(process.argv.slice(2));
  const template = args.template || 'corporate-light';

  const result = await buildOGP({
    template,
    title: args.title || '帯状疱疹ワクチンの選び方',
    heroStat: {
      label: args.heroLabel || '11年後も有効率 {value} を維持',
      value: args.heroValue || '82%',
      percent: args.heroPercent ? Number(args.heroPercent) : 82,
      categoryLabel: args.category,
      source: args.source,
    },
    outputPath: args.out || path.join(DEFAULT_OUT_DIR, `test-${template}.png`),
  });

  console.log(`Saved: ${result.outputPath}`);
  console.log(`  template: ${template}`);
  console.log(`  auto-fit title size: ${result.titleSize}px`);
}

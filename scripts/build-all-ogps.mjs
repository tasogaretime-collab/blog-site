// Batch OGP generator: reads all content/blog/*.mdx frontmatter and
// generates OGPs via build-ogp.mjs.
//
// SAFETY: by default this only processes articles that have `ogpTemplate`
// in their frontmatter. Existing articles without `ogpTemplate` are left
// untouched, so running this script can never overwrite a hand-made OGP.
//
// To enable auto-generation for a new article, add these fields to its
// frontmatter:
//
//   ogpTemplate: "shiraki-centered"    # or shiraki-alert / editorial / photo-overlay
//   ogpTitle: "短いOGP用タイトル"       # optional, falls back to title
//   heroStat:                          # optional, key stat subtitle + progress bar
//     label: "11年後も有効率 {value} を維持"
//     value: "82%"
//     percent: 82
//
// Usage:
//   node scripts/build-all-ogps.mjs             # generate OGPs for articles with ogpTemplate set
//   node scripts/build-all-ogps.mjs --slug X    # only slug X (still requires ogpTemplate)
//   node scripts/build-all-ogps.mjs --dry-run   # list what would be done
//   node scripts/build-all-ogps.mjs --force     # process ALL articles (overrides safety, use with care)

import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildOGP } from './build-ogp.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'blog');

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

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  let generated = 0;
  let skipped = 0;
  const failures = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '');
    if (args.slug && args.slug !== slug) continue;

    const fullPath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data: fm } = matter(raw);

    if (fm.draft) {
      console.log(`  skip  ${slug}  (draft)`);
      skipped++;
      continue;
    }

    if (!fm.ogpTemplate && !args.force) {
      console.log(`  skip  ${slug}  (no ogpTemplate in frontmatter; use --force to override)`);
      skipped++;
      continue;
    }

    const template = fm.ogpTemplate || 'shiraki-centered';
    const title = fm.ogpTitle || fm.title?.split(/[—:：｜|]/)[0].trim() || 'Untitled';
    const heroStat = fm.heroStat || null;

    const dir = path.join(OUT_DIR, slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const outputPath = path.join(dir, `og-${slug}.png`);

    if (args['dry-run']) {
      console.log(`  would generate  ${slug}  template=${template}  title="${title}"`);
      continue;
    }

    try {
      const result = await buildOGP({ template, title, heroStat, outputPath });
      console.log(`  ok    ${slug}  ${template}  ${result.titleSize}px  -> ${path.relative(path.join(__dirname, '..'), outputPath)}`);
      generated++;
    } catch (err) {
      console.error(`  FAIL  ${slug}  ${err.message}`);
      failures.push({ slug, error: err.message });
    }
  }

  console.log('');
  console.log(`Summary: ${generated} generated, ${skipped} skipped, ${failures.length} failed`);
  if (failures.length > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

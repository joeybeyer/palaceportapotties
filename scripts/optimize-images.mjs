#!/usr/bin/env node
/**
 * Optimize generated images for web delivery.
 * Converts PNG → WebP, resizes to sensible max dimensions, quality 80.
 *
 * Usage: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';
import { resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const DIRS = [
  join(ROOT, 'public/brand/references'),
  join(ROOT, 'public/images/generated'),
];

// Max dimensions by aspect ratio intent
const MAX_LONG_EDGE = 1920; // heroes, wide shots
const MAX_SHORT_EDGE = 1200; // portraits, 4:5
const QUALITY = 80;

async function optimizeFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (ext !== '.png') return null;

  const outPath = filePath.replace(/\.png$/i, '.webp');
  const name = basename(filePath);

  const meta = await sharp(filePath).metadata();
  const origKB = Math.round(statSync(filePath).size / 1024);

  // Determine max resize — fit within bounds, preserve aspect ratio
  const maxDim = Math.max(meta.width, meta.height) > MAX_LONG_EDGE
    ? MAX_LONG_EDGE
    : undefined;

  let pipeline = sharp(filePath);

  if (maxDim) {
    pipeline = pipeline.resize({
      width: meta.width >= meta.height ? maxDim : undefined,
      height: meta.height > meta.width ? maxDim : undefined,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  await pipeline.webp({ quality: QUALITY }).toFile(outPath);

  const outKB = Math.round(statSync(outPath).size / 1024);
  const savings = Math.round((1 - outKB / origKB) * 100);

  console.log(`${name} → .webp | ${origKB}KB → ${outKB}KB (${savings}% smaller)`);
  return { name, origKB, outKB, savings };
}

async function main() {
  console.log('Optimizing images for web...\n');
  const results = [];

  for (const dir of DIRS) {
    let files;
    try {
      files = readdirSync(dir);
    } catch {
      continue;
    }

    for (const file of files) {
      if (!file.toLowerCase().endsWith('.png')) continue;
      const r = await optimizeFile(join(dir, file));
      if (r) results.push(r);
    }
  }

  if (results.length === 0) {
    console.log('No PNG files found to optimize.');
    return;
  }

  const totalOrig = results.reduce((s, r) => s + r.origKB, 0);
  const totalOut = results.reduce((s, r) => s + r.outKB, 0);
  console.log(`\nTotal: ${totalOrig}KB → ${totalOut}KB (${Math.round((1 - totalOut / totalOrig) * 100)}% reduction)`);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});

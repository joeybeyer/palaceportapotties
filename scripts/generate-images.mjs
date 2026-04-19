#!/usr/bin/env node
/**
 * Palace Porta Potties — Image generation via kie.ai Nano Banana Pro API
 *
 * Usage:
 *   node scripts/generate-images.mjs --phase=1          # Generate reference images
 *   node scripts/generate-images.mjs --phase=2          # Generate full library (after refs are live)
 *   node scripts/generate-images.mjs --phase=1 --force  # Regenerate even if files exist
 */

import { readFileSync, writeFileSync, existsSync, appendFileSync, mkdirSync } from 'fs';
import { resolve, join } from 'path';
import { config } from 'dotenv';

// ── Load env ──
config({ path: resolve(import.meta.dirname, '..', '.env') });

const KIE_KEY = process.env.KIE_KEY;
if (!KIE_KEY) {
  console.error('ERROR: KIE_KEY not found in .env');
  process.exit(1);
}

// ── Parse CLI args ──
const args = process.argv.slice(2);
const phaseFlag = args.find((a) => a.startsWith('--phase='));
const phase = phaseFlag ? phaseFlag.split('=')[1] : null;
const force = args.includes('--force');

if (!phase || !['1', '2', '3', '4'].includes(phase)) {
  console.error('Usage: node scripts/generate-images.mjs --phase=1|2|3|4 [--force]');
  process.exit(1);
}

// ── Load manifest ──
const ROOT = resolve(import.meta.dirname, '..');
const manifest = JSON.parse(readFileSync(join(ROOT, 'scripts', 'image-manifest.json'), 'utf8'));
const entries = manifest[`phase${phase}`];

const LOG_FILE = join(ROOT, 'scripts', 'image-generation-log.txt');

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  appendFileSync(LOG_FILE, line + '\n');
}

// ── API helpers ──
const API_BASE = 'https://api.kie.ai/api/v1/jobs';
const headers = {
  Authorization: `Bearer ${KIE_KEY}`,
  'Content-Type': 'application/json',
};

async function createTask(entry) {
  const body = {
    model: 'nano-banana-pro',
    input: {
      prompt: entry.prompt,
      image_input: entry.image_input || [],
      aspect_ratio: entry.aspect_ratio || '1:1',
      resolution: entry.resolution || '1K',
      output_format: 'png',
    },
  };

  const res = await fetch(`${API_BASE}/createTask`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const json = await res.json();
  if (json.code !== 200) {
    throw new Error(`createTask failed: ${json.msg || JSON.stringify(json)}`);
  }
  return json.data.taskId;
}

async function pollTask(taskId, timeoutMs = 300_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const res = await fetch(`${API_BASE}/recordInfo?taskId=${taskId}`, { headers });
    const json = await res.json();

    if (json.code !== 200) {
      throw new Error(`recordInfo error: ${json.msg || JSON.stringify(json)}`);
    }

    const { state, resultJson, failMsg, progress } = json.data;

    if (state === 'success') {
      const result = JSON.parse(resultJson);
      return result.resultUrls;
    }

    if (state === 'fail') {
      throw new Error(`Task failed: ${failMsg || 'unknown error'}`);
    }

    const elapsed = Math.round((Date.now() - start) / 1000);
    log(`  polling ${taskId} — state=${state} progress=${progress || '?'}% (${elapsed}s)`);

    // Wait 8 seconds between polls
    await new Promise((r) => setTimeout(r, 8000));
  }

  throw new Error(`Task ${taskId} timed out after ${timeoutMs / 1000}s`);
}

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status} ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  writeFileSync(destPath, buffer);
}

// ── Concurrency limiter (max 2) ──
async function runWithConcurrency(tasks, limit) {
  const results = [];
  const executing = new Set();

  for (const task of tasks) {
    const p = task().then((r) => {
      executing.delete(p);
      return r;
    });
    executing.add(p);
    results.push(p);

    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }

  return Promise.allSettled(results);
}

// ── Main ──
async function main() {
  log(`\n${'='.repeat(60)}`);
  log(`Phase ${phase} — ${entries.length} images — force=${force}`);
  log(`${'='.repeat(60)}`);

  const tasks = entries.map((entry) => async () => {
    const outDir = join(ROOT, entry.output_dir);
    mkdirSync(outDir, { recursive: true });
    const destPath = join(outDir, entry.filename);

    // Skip if already exists (unless --force)
    if (!force && existsSync(destPath)) {
      log(`SKIP ${entry.filename} — already exists`);
      return { filename: entry.filename, status: 'skipped' };
    }

    const startTime = Date.now();
    log(`START ${entry.filename} (${entry.aspect_ratio}, ${entry.resolution})`);

    try {
      const taskId = await createTask(entry);
      log(`  taskId: ${taskId}`);

      const urls = await pollTask(taskId);
      if (!urls || urls.length === 0) {
        throw new Error('No result URLs returned');
      }

      await downloadImage(urls[0], destPath);
      const elapsed = Math.round((Date.now() - startTime) / 1000);
      log(`DONE ${entry.filename} — ${elapsed}s`);
      return { filename: entry.filename, status: 'success', elapsed };
    } catch (err) {
      const elapsed = Math.round((Date.now() - startTime) / 1000);
      log(`FAIL ${entry.filename} — ${err.message} (${elapsed}s)`);
      return { filename: entry.filename, status: 'failed', error: err.message };
    }
  });

  const results = await runWithConcurrency(tasks, 2);

  // Summary
  log(`\n${'─'.repeat(40)}`);
  log('SUMMARY');
  let ok = 0, fail = 0, skip = 0;
  for (const r of results) {
    const v = r.value || r.reason;
    if (v.status === 'success') ok++;
    else if (v.status === 'skipped') skip++;
    else fail++;
  }
  log(`  Success: ${ok}  |  Skipped: ${skip}  |  Failed: ${fail}`);
  log(`${'─'.repeat(40)}\n`);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});

#!/usr/bin/env node
/**
 * zen-model-updater.mjs
 * Automatically keeps all agents + AGENTS.md locked to currently available
 * free OpenCode Zen models. Zen rotates free models multiple times per day.
 *
 * Usage:
 *   node utils/zen-model-updater.mjs              # update in place
 *   node utils/zen-model-updater.mjs --dry-run     # preview only
 *   node utils/zen-model-updater.mjs --force       # force rewrite even if no change
 *
 * Recommended: run via cron every 2-4 hours or as a GitHub Action.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const AGENTS_DIR = path.join(ROOT, ".agents", "agents");
const AGENTS_MD = path.join(ROOT, "AGENTS.md");
const CACHE_FILE = path.join(ROOT, "utils", ".zen-models-cache.json");

const ENDPOINTS = [
  "https://opencode.ai/zen/v1/models",
  "https://opencode.ai/inference/v1/models",
  "https://opencode.ai/v1/models",
];

const TIER_STRATEGY = {
  director: ["glm-5.3-flash-free", "deepseek-v4.1-flash-free", "flint-40b-free", "big-pickle"],
  workhorse: ["deepseek-v4.1-flash-free", "glm-5.3-flash-free", "nemotron-3.5-lightning-free", "mimo-v2.6-flash-free", "big-pickle"],
  light: ["beam-free", "jev-1.13-free", "nemotron-3.5-lightning-free", "big-pickle"],
};

async function fetchFreeModels() {
  for (const url of ENDPOINTS) {
    try {
      const res = await fetch(url, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(8000) });
      if (!res.ok) continue;
      const data = await res.json();
      const models = normalizeModels(data);
      if (models.length > 0) {
        console.log(`Fetched ${models.length} free models from ${url}`);
        return models;
      }
    } catch (e) {
      // try next
    }
  }
  // Fallback to last known good cache
  if (fs.existsSync(CACHE_FILE)) {
    const cached = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
    console.warn("Using cached free model list (live fetch failed)");
    return cached.models || [];
  }
  throw new Error("Could not fetch free models from any endpoint and no cache exists");
}

function normalizeModels(data) {
  const list = Array.isArray(data) ? data : data.data || data.models || [];
  return list
    .map((m) => {
      const id = (m.id || m.model || m.name || "").toLowerCase();
      const isFree =
        id.includes("-free") ||
        id.includes("free") ||
        m.cost?.input === 0 ||
        m.pricing?.prompt === 0 ||
        (m.tags && m.tags.includes("free"));
      return isFree ? id.replace(/^opencode\//, "") : null;
    })
    .filter(Boolean)
    .filter((id, i, arr) => arr.indexOf(id) === i);
}

function pickModel(available, preferredList) {
  for (const pref of preferredList) {
    const match = available.find((m) => m.includes(pref.replace("-free", "")) || m === pref);
    if (match) return match.startsWith("opencode/") ? match : `opencode/${match}`;
  }
  // last resort
  const any = available[0];
  return any ? (any.startsWith("opencode/") ? any : `opencode/${any}`) : "opencode/big-pickle";
}

function updateAgentFrontmatter(filePath, modelId, dryRun) {
  let content = fs.readFileSync(filePath, "utf8");
  const original = content;

  // Replace model: line in YAML frontmatter
  content = content.replace(
    /^model:\s*.+$/m,
    `model: ${modelId}`
  );

  if (content !== original) {
    if (!dryRun) fs.writeFileSync(filePath, content);
    return true;
  }
  return false;
}

function updateAgentsMd(directorModel, workhorseModel, lightModel, dryRun) {
  if (!fs.existsSync(AGENTS_MD)) return false;
  let content = fs.readFileSync(AGENTS_MD, "utf8");
  const original = content;

  content = content
    .replace(/opencode-go\/kimi-k2\.6|opencode\/[^\s]+/g, (match) => {
      if (match.includes("director") || match.includes("kimi")) return directorModel;
      return match;
    });

  // Explicit tier table rewrite
  content = content.replace(
    /(\*\*Directors\*\*.*?)(opencode[^\s|]+)/gs,
    `$1${directorModel}`
  );
  content = content.replace(
    /(\*\*Workhorses\*\*.*?)(opencode[^\s|]+)/gs,
    `$1${workhorseModel}`
  );
  content = content.replace(
    /(\*\*Lightweight\*\*.*?)(opencode[^\s|]+)/gs,
    `$1${lightModel}`
  );

  if (content !== original) {
    if (!dryRun) fs.writeFileSync(AGENTS_MD, content);
    return true;
  }
  return false;
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const force = process.argv.includes("--force");

  console.log(dryRun ? "[DRY-RUN] Zen model updater" : "Zen model updater");

  const freeModels = await fetchFreeModels();
  console.log("Available free models:", freeModels.join(", "));

  // Cache
  if (!dryRun) {
    fs.writeFileSync(
      CACHE_FILE,
      JSON.stringify({ updatedAt: new Date().toISOString(), models: freeModels }, null, 2)
    );
  }

  const directorModel = pickModel(freeModels, TIER_STRATEGY.director);
  const workhorseModel = pickModel(freeModels, TIER_STRATEGY.workhorse);
  const lightModel = pickModel(freeModels, TIER_STRATEGY.light);

  console.log(`\nSelected:`);
  console.log(`  Directors  → ${directorModel}`);
  console.log(`  Workhorses → ${workhorseModel}`);
  console.log(`  Light      → ${lightModel}`);

  let changed = 0;

  // Update all agent files
  if (fs.existsSync(AGENTS_DIR)) {
    const files = fs.readdirSync(AGENTS_DIR).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const full = path.join(AGENTS_DIR, file);
      const name = file.toLowerCase();
      let model = workhorseModel;
      if (name.includes("director") || name.includes("producer")) model = directorModel;
      else if (name.includes("community") || name.includes("devops") || name.includes("sound")) model = lightModel;

      if (updateAgentFrontmatter(full, model, dryRun) || force) {
        changed++;
        console.log(`  updated agent: ${file} → ${model}`);
      }
    }
  }

  if (updateAgentsMd(directorModel, workhorseModel, lightModel, dryRun) || force) {
    changed++;
    console.log("  updated AGENTS.md");
  }

  console.log(`\nDone. ${changed} file(s) ${dryRun ? "would be" : ""} updated.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

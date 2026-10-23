# OpenCode Game Studios — Zen Edition

**Free OpenCode Zen models only** · Automatic model updater · Quality improvements for offline Android arcade games

> Fork of [striderZA/OpenCodeGameStudios](https://github.com/striderZA/OpenCodeGameStudios) locked exclusively to free OpenCode Zen models.

---

## Why this fork?

| Problem | Zen Edition solution |
|---------|----------------------|
| Zen free models appear and disappear multiple times a day | Automatic updater keeps every agent on currently free models |
| Agents often claim “done” without visual proof | Mandatory visual + runtime feedback loop |
| No first-class offline Android path | Dedicated `android-arcade` skill (Godot APK + pure WebView) |
| Full framework is heavy for small 2D games | Lightweight arcade-focused workflow |

---

## Quick Start

```bash
# 1. Keep free models current (run often — models rotate)
node utils/zen-model-updater.mjs

# 2. Launch
opencode

# 3. Begin
/start
# or jump straight in
/setup-engine godot 4
/hybrid-prototype
```

---

## Automatic Zen Model Updater

```bash
node utils/zen-model-updater.mjs          # apply latest free models
node utils/zen-model-updater.mjs --dry-run
```

**Recommended cadence:** every 2–4 hours via cron or GitHub Action.

What it does:
- Fetches the live free model list from OpenCode Zen endpoints
- Selects the best available free model for three tiers (Directors / Workhorses / Light)
- Rewrites every agent’s `model:` frontmatter and the mapping in `AGENTS.md`
- Caches the last good list so it still works offline

---

## Key Additions

| Feature | Description |
|---------|-------------|
| `utils/zen-model-updater.mjs` | Automatic free-model keeper |
| `visual-feedback` skill | Mandatory run → screenshot/clip → console → fix loop |
| `android-arcade` skill | Offline APK / WebView packaging helpers |
| Stricter “done” definition | Mechanical checks required before completion |
| Arcade-focused workflow | Lightweight path for small offline 2D games |

---

## Model Policy

**Only free OpenCode Zen models are used.** Paid models are never selected.

Preferred free models (auto-selected by the updater, in priority order):

- **Directors** → `glm-5.3-flash-free` → `deepseek-v4.1-flash-free` → `flint-40b-free` → `big-pickle`
- **Workhorses** → `deepseek-v4.1-flash-free` → `glm-5.3-flash-free` → `nemotron-3.5-lightning-free` → `big-pickle`
- **Light** → `beam-free` → `jev-1.13-free` → `big-pickle`

---

## Recommended Workflow (Offline Arcade)

1. `/hybrid-prototype` or `/concept-brainstorm`
2. `/setup-engine godot 4` (or Canvas / WebView)
3. Implement the core loop
4. Run `/visual-feedback` after every meaningful change
5. `/android-arcade` when ready to package
6. Final `/smoke-check` + visual evidence

---

## Project Structure (Zen additions)

```
/
├── AGENTS.md                          # Zen-locked config + quality rules
├── utils/
│   ├── zen-model-updater.mjs          # ★ Automatic free-model updater
│   └── .zen-models-cache.json         # Last known good free models
├── .agents/
│   ├── skills/
│   │   ├── visual-feedback/           # Mandatory visual proof loop
│   │   └── android-arcade/            # Offline Android packaging
│   └── agents/                        # All model: fields auto-updated
└── ...
```

---

## Credits

- Upstream framework: [striderZA/OpenCodeGameStudios](https://github.com/striderZA/OpenCodeGameStudios)
- Zen Edition: free-model lock, automatic updater, visual feedback, and Android arcade quality path

---

**Active development.** Free models change often — keep the updater running.

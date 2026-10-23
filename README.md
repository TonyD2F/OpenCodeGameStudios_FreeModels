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




## 💡 Motivation

Game development is a multi-disciplinary process — design, writing, architecture,
programming, art, audio, QA, release — that's hard to coordinate with AI assistants
in ad-hoc chat sessions. **OpenCode Game Studios** provides a structured framework
for the full game lifecycle:

- **Pre-workflow exploration** — Rapidly prototype 2-4 ideas with zero commitment
  before choosing a development workflow
- **Design-first pipeline** — Brainstorm → systems map → section-by-section GDDs →
  cross-GDD review, before any code is written
- **Phase gates** — Formal checkpoints between phases with PASS/CONCERNS/FAIL
  verdicts that prevent advancing with gaps
- **Workflow selection** — Choose Hybrid (lightweight discovery then production)
  or Full OCGS (process-heavy from day one), depending on team size and project
  maturity
- **52 coordinated agents** — From creative director to engine specialists, each
  with defined responsibilities, delegation maps, and strict domain boundaries
- **77 slash commands** — Route through the right skill every time, from
  `/concept-brainstorm` to `/launch-checklist`

This project evolved from [CCGS](https://github.com/Donchitos/Claude-Code-Game-Studios)
and runs on [OpenCode](https://opencode.ai) and [Pi](https://github.com/earendil-works/pi-coding-agent).

---

> ⚠️ **Active Development** — This is a living framework. Things will
> break, change, and improve. Report bugs at
> [github.com/striderZA/OpenCodeGameStudios/issues](https://github.com/striderZA/OpenCodeGameStudios/issues).

---

## 📊 Port Status

| Component | CCGS (Claude Code) | OpenCode | Pi | Status |
|-----------|-------------------|----------|-----|--------|
| 🤖 **Agents** | 49 agents (`.claude/agents/`) | 52 agents (`.agents/agents/`) | 52 agents (`.agents/agents/`) | ✅ |
| ⌨️ **Skills** | 72 skills (`.claude/skills/`) | 77 skills (`.agents/skills/`) | 77 skills (`.agents/skills/`) | ✅ +5 |
| ⌨️ **Commands** | — | 77 commands (`.agents/commands/`) | → prompt templates | ✅ New |
| 🔗 **Plugins** | 12 bash hooks (`.claude/hooks/`) | 3 TS plugins (`.opencode/plugins/`) | 7 Pi extensions (`.pi/extensions/`) | ✅ **158 tests** |
| 📏 **Rules** | 11 rule files (`.claude/rules/`) | 11 rule files (`.agents/rules/`) | 11 rule files (`.agents/rules/`) | ✅ |
| ⚙️ **Config** | `CLAUDE.md` + `.claude/settings.json` | `AGENTS.md` + `opencode.json` | `AGENTS.md` + `.pi/settings.json` | ✅ |

---

## 🚀 Quick Start

### OpenCode
```bash
opencode
```
> **Windows users:** `.opencode/{agents,commands,skills,rules}` are git symlinks and require `core.symlinks=true` (+ Developer Mode) to check out correctly — see [Known Issues](#-known-issues) if `/` shows no commands.

Type `/` to browse all 77 skills and 54 commands, or `/start` for onboarding.

### Pi
```bash
pi
```
All OCGS skills, commands, and agents load automatically through Pi extensions.
See [docs/pi-compatibility.md](docs/pi-compatibility.md) for setup details.

### 🎮 Demo Game

See [**OCGS-Pong**](https://github.com/striderZA/OCGS-Pong) — a complete Pong game built entirely with this toolchain. Demonstrates the full workflow from concept through implementation using OCGS agents and skills.

---

## 🧩 Modular Framework

The framework is partitioned into **22 pluggable theme modules**. Only install what you need for your project:

| Module | Description |
|--------|-------------|
| `core` | Framework skeleton — directors, onboarding, `/start`, `/help` (required) |
| `art` | Aseprite MCP, art bible, asset specs, art generation |
| `design` | Game mechanics, systems design, combat, balance, playtesting |
| `architecture` | Technical planning, ADRs, architecture review |
| `stories` | Epics, stories, dev workflow, code review |
| `programming` | Gameplay, AI, engine, network agents + coding rules |
| `ui` | UX design, UI programming, accessibility |
| `audio` | Audio direction, sound design |
| `narrative` | Story, world-building, dialogue |
| `level-design` | Level layout, encounter design |
| `qa` | Testing strategy, bug tracking, profiling, skill testing |
| `release` | Release management, sprints, changelogs, hotfixes |
| `prototyping` | Rapid prototyping, concept exploration |
| `live-ops` | Post-launch content, community management |
| `localization` | i18n, translation pipeline |
| `engine-godot` | Godot 4 specialists (GDScript, C#, shaders, GDExtension) |
| `engine-unity` | Unity specialists (DOTS, shaders, Addressables, UI) + unity-mcp |
| `engine-unreal` | Unreal Engine 5 specialists (GAS, Blueprint, replication, UMG) |
| `engine-sfml3` | SFML 3 specialist (Graphics, Audio, Network, Window, System) |
| `engine-raylib` | Raylib specialist (core, rlgl, raudio, raymath, raygui) |
| `engine-bevy` | Bevy specialist (ECS, 2D/3D rendering, bevy_ui, assets, audio) |
| `data` | Data file conventions and validation |

```bash
# Install modules
node .opencode/modules/install.mjs add core
node .opencode/modules/install.mjs add engine-godot art design qa

# List all available and installed modules
node .opencode/modules/install.mjs list

# See module details
node .opencode/modules/install.mjs info core

# Remove a module (preserves user-modified files)
node .opencode/modules/install.mjs remove art
```

Module sources live in `.agents/modules/<name>/` and are copied into the
framework directories on install. User-modified files are detected during
removal and left in place.

---

## 🔌 Recommended Plugins

These plugins enhance the OpenCode experience and are recommended for
all game development sessions:

| Plugin | Purpose |
|--------|---------|
| [**dynamic-context-purging**](https://github.com/Opencode-DCP/opencode-dynamic-context-pruning)| Dynamic context pruning — automatically manages context window size, indexes content for search, and prevents context overflow during long sessions |
| [**Superpowers**](https://github.com/obra/superpowers) | Enhanced skill library — provides structured workflows for brainstorming, test-driven development, writing plans, code review, and parallel agent dispatch |

**OpenCode:** Add to your `opencode.json`:
```json
{
  "plugin": [
    "./.opencode/plugins/ccgs-hooks.ts",
    "PLUGIN_NAME"
  ]
}
```

**Pi:** OCGS Pi extensions are bundled in `.pi/extensions/` and auto-discovered
on startup. See [docs/pi-extensions.md](docs/pi-extensions.md) for details.

---

## 🗺️ Key Mappings

| CCGS (Claude Code) | OpenCode | Pi |
|--------------------|----------|-----|
| `.claude/skills/*.md` → | `.agents/skills/*.md` | `.agents/skills/*.md` |
| `.claude/agents/*.md` → | `.agents/agents/*.md` | `.agents/agents/*.md` |
| `.claude/hooks/*.sh` → | `.opencode/plugins/ccgs-hooks.ts` | `.pi/extensions/` |
| `.claude/rules/*.md` → | `.agents/rules/*.md` | `.agents/rules/*.md` |
| `CLAUDE.md` → | `AGENTS.md` | `AGENTS.md` |
| `.claude/settings.json` → | `opencode.json` | `.pi/settings.json` |

---

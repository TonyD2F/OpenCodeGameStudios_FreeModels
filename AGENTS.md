# OpenCode Game Studios — Zen Edition

Indie game development managed through coordinated OpenCode agents.  
**This fork is locked to free OpenCode Zen models only.**

> Models rotate frequently. Run `node utils/zen-model-updater.mjs` regularly (or via cron / GitHub Action) to stay current.

## Technology Stack

- **Engine**: [CHOOSE: Godot 4 / Unity / Unreal Engine 5 / SFML 3 / Raylib / Bevy / Canvas-WebView]
- **Language**: [CHOOSE: GDScript / C# / C++ / Blueprint / C / TypeScript]
- **Target**: Offline Android arcade preferred (APK export or pure WebView)
- **Models**: Free OpenCode Zen only (auto-updated)

## Model Policy (Zen-only)

All agents use free Zen models. The updater script selects the best currently available free models into three tiers:

| Tier | Purpose | Preferred free models (auto-selected) |
|------|---------|---------------------------------------|
| **Directors** | Strategic planning, architecture, cross-team | glm-5.3-flash-free → deepseek-v4.1-flash-free → flint-40b-free → big-pickle |
| **Workhorses** | Implementation, design, testing, review | deepseek-v4.1-flash-free → glm-5.3-flash-free → nemotron-3.5-lightning-free → big-pickle |
| **Light** | Simple / always-on agents | beam-free → jev-1.13-free → nemotron-3.5-lightning-free → big-pickle |

Run the updater:

```bash
node utils/zen-model-updater.mjs          # apply
node utils/zen-model-updater.mjs --dry-run
```

## Project Structure

```text
/
├── AGENTS.md                    # This file
├── opencode.json                # OpenCode config
├── utils/
│   ├── zen-model-updater.mjs    # ★ Automatic free-model updater
│   └── .zen-models-cache.json   # Last known free models
├── .agents/                     # Canonical content
│   ├── agents/                  # Agent definitions (model fields auto-updated)
│   ├── skills/                  # Skills (including visual-feedback + android-arcade)
│   ├── commands/
│   ├── rules/
│   └── modules/
├── design/
├── prototypes/
├── production/
└── docs/
```

## Quality Rules (Zen Edition additions)

1. **Visual + runtime feedback is mandatory**  
   Before any story/task is marked complete the agent must produce:
   - Successful build / export
   - Console free of errors
   - At least one screenshot (or short clip) of the running game
   - FPS / delta-time sanity check when applicable

2. **Android offline arcade path preferred**  
   Prefer Godot 4 (export templates) or pure Canvas + WebView.  
   Touch controls, localStorage / offline saves, no network required.

3. **Stricter “done” definition**  
   Mechanical checks before claiming completion. Soft claims are rejected.

4. **Arcade preset**  
   Use `node .opencode/modules/install.mjs add arcade` (or the core + design + programming + qa + engine-godot set) for lightweight 2D offline games.

## Coordination Rules

1. Vertical Delegation: Leadership → department leads → specialists.
2. No unilateral cross-domain changes.
3. File is the memory — update `production/session-state/active.md` after every significant step.
4. User-driven collaboration: Question → Options → Decision → Draft → Approval.

## Getting Started (Zen)

```bash
# 1. Make sure free models are current
node utils/zen-model-updater.mjs

# 2. Start OpenCode
opencode

# 3. Onboard
/start
# or
/setup-engine godot 4
/hybrid-prototype
```

## Available High-Value Commands

| Command | Purpose |
|---------|---------|
| `/start` | Guided onboarding |
| `/setup-engine` | Configure engine (Godot recommended for Android) |
| `/hybrid-prototype` | Fast discovery prototype |
| `/visual-feedback` | Run + screenshot + fix loop |
| `/android-arcade` | Offline APK / WebView packaging helpers |
| `/smoke-check` | Build + console + visual evidence |
| `/gate-check` | Phase gate with strict pass/fail |

## Studio Hierarchy (same as upstream)

Tier 1 — Directors  
Tier 2 — Department Leads  
Tier 3 — Specialists + Engine specialists (Godot preferred for this fork)

---

This is a production-ready Zen-locked fork of [striderZA/OpenCodeGameStudios](https://github.com/striderZA/OpenCodeGameStudios).  
All model assignments are free-only and kept current by the automatic updater.

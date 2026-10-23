# OpenCode Game Studios — Zen Edition

Indie game development managed through coordinated OpenCode agents.  
**This fork is locked to free OpenCode Zen models only.**

> Models rotate frequently. A GitHub Action runs the updater automatically every 3 hours — no manual work required.

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

The updater runs automatically via GitHub Action every 3 hours.  
Local one-shot (only if needed):

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
   (See **Question Discipline** below — do not ask lame or already-answered questions.)

## Question Discipline (critical)

Agents waste the user’s time with lame, generic, or already-answered questions. Follow this order strictly:

### 1. Investigate first
Read the user’s message, prior turns, existing design docs, pillars, and session-state **before** asking anything. Most ambiguity dissolves under a real look.

### 2. Infer what you can
If the user already stated the genre, fantasy, target platform, tone, constraints, or reference games — treat those as settled. Do **not** re-ask them.

### 3. Only ask what is material
Ask a question **only** when the answer would change the deliverable in a meaningful way (scope, architecture, core loop, acceptance criteria, or irreversible design choice).  
If the choice is low-stakes and reversible, make a reasonable assumption, state it clearly (“Assuming X because Y”), and proceed.

### 4. Ask the minimum set
- Prefer 1–3 sharp questions that eliminate whole branches of work.
- Never ask more than 4 questions in one turn.
- Prefer multiple-choice with short trade-offs over open-ended “what do you want?”.
- Never ask template questions that ignore what the user just said.

### 5. Bad vs Good

❌ Bad (lame / already answered / agent should know):
- “What genre is this?” (user already said “arcade shooter”)
- “Should it be fun?” / “What should the combat feel like?” (too vague)
- “Real-time or turn-based?” when the user described continuous movement and shooting
- Re-asking for target platform when they said “offline Android arcade”

✅ Good:
- “You want offline Android arcade. For the core loop I see two strong fits given your description: (A) wave-based survival with escalating modifiers, or (B) short timed runs with meta progression. Which direction?”
- “You didn’t specify fail state. I’ll assume one-hit death + short restart for arcade feel unless you want lives/continues.”
- “Reference feel: more Celeste precision or more Vampire Survivors density?”

### 6. Deep research before writing any plan (mandatory)

Before producing the Game Definition + Plan, the agent **must** deeply research the space. Do not skip this.

**Research requirements:**

1. **Similar / alternative games**
   - Find 3–8 close alternatives (same genre, fantasy, or core loop).
   - For each: how it is built (engine if known, architecture patterns), how it runs (platform, performance notes), core features, abilities, options/settings, progression, fail states.

2. **UI / UX study**
   - What the menus, HUD, controls, feedback, and onboarding look like.
   - Touch / mobile patterns if targeting Android offline arcade.
   - What feels good vs what feels cluttered or slow.

3. **Reviewer & player feedback**
   - What Steam / mobile / Reddit / review sources consistently praise.
   - What they say is missing, broken, annoying, or should be added/changed.
   - Common “I wish it had…” and “this kills the fun…” points.

4. **GitHub & open implementations**
   - Search GitHub for open-source games, prototypes, engines, or systems in the same space.
   - Note useful architecture patterns, data-driven designs, control schemes, and packaging approaches (especially Godot / Canvas / WebView offline).
   - Prefer real code and READMEs over pure marketing pages.

5. **Opportunities & risks**
   - Gaps the existing games leave open.
   - Features that look cool but destroy scope or feel.
   - Technical or design patterns that clearly help (or clearly hurt) an offline Android arcade target.

**Output of research (short, structured):**
- Table or bullets of comparable games + key takeaways
- UI/UX patterns to copy / avoid
- Reviewer consensus (must-have / must-fix)
- Useful GitHub repos or code patterns
- Implications for *our* game (what we should steal, skip, or invert)

Only after this research is done may the agent write the Game Definition + Plan.

### 7. After research + answers → produce a real Game Definition + Plan

Synthesize the user’s answers **and** the research into a concrete deliverable. Get approval on *that*.

**Required output:**

```markdown
## Research Summary (brief)
- Comparables studied: ...
- Key UI/UX takeaways: ...
- Reviewer must-haves / must-fixes: ...
- Useful GitHub / code patterns: ...
- Implications for this game: ...

## Game Definition
- **Working title**: ...
- **One-sentence pitch**: ...
- **Core fantasy / player fantasy**: What the player gets to BE or DO
- **Core loop**: 3–6 bullet steps of the moment-to-moment play
- **Win / lose / progress conditions**: How a run or session ends and what carries forward
- **Primary controls**: Touch / virtual stick / buttons (Android offline arcade assumed unless stated otherwise)
- **Art / audio direction (high level)**: Tone, references, constraints
- **Scope boundary**: What is explicitly OUT for v1
- **Success criteria**: How we know the first playable is “good enough”

## Build Plan
1. Vertical slice / first playable (exact features)
2. Systems order (what gets built next)
3. Prototype checkpoints (what must feel good before expanding)
4. Packaging target (Godot APK / WebView, offline)
```

Rules for this step:
- Base every line on what the user actually said + research findings + sensible inferences. Call out assumptions explicitly.
- Keep the whole thing short (roughly 1–2 screens). No novel-length GDD yet.
- End with: “Does this match what you want? Approve / change X / restart.”
- Only after the user approves the Game Definition + Plan may agents move to design docs, architecture, or code.
- Write the approved version to `design/game-definition.md` (and update `production/session-state/active.md`).

### 8. Full production spec → use AIO Spec Request (automatic)

When the user wants a **full production specification** (or after the Game Definition is approved and they say “expand to full spec” / “write the production spec” / “AIO spec”), **automatically use the `aio-spec-request` skill**.

- Skill path: `.agents/skills/aio-spec-request/SKILL.md`
- Variable catalog: `.agents/skills/aio-spec-request/references/variable-catalog.md`
- Lint helper: `.agents/skills/aio-spec-request/scripts/lint-spec.sh`

**Hard rules enforced by the skill in this fork:**
- Pipeline gate: will not write a full AIO Spec until `design/game-definition.md` is approved
- Reuses the Research Summary already in the Game Definition (only fills gaps)
- Arcade-offline priority mode (core loop → controls → progression → HUD → art → engine/packaging)
- Exact concrete values only (hex, px, ms, fps, tokens — no vague adjectives)
- Length budget ≈ ≤ 500 lines for arcade projects
- Acceptance criteria must be checkable via `/visual-feedback`
- Required Engine & Packaging section (Godot APK / WebView, offline saves, performance budget)

Output the finished spec to `design/specs/<project-slug>-spec.md` and treat it as the single source of truth for plan → tasks → implement.

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

| Command / Skill | Purpose |
|-----------------|---------|
| `/start` | Guided onboarding |
| `/setup-engine` | Configure engine (Godot recommended for Android) |
| `/hybrid-prototype` | Fast discovery prototype |
| `/visual-feedback` | Run + screenshot + fix loop |
| `/android-arcade` | Offline APK / WebView packaging helpers |
| `/smoke-check` | Build + console + visual evidence |
| `/gate-check` | Phase gate with strict pass/fail |
| `aio-spec-request` | Full production specification (research-first, exact values) |

## Studio Hierarchy (same as upstream)

Tier 1 — Directors  
Tier 2 — Department Leads  
Tier 3 — Specialists + Engine specialists (Godot preferred for this fork)

---

This is a production-ready Zen-locked fork of [striderZA/OpenCodeGameStudios](https://github.com/striderZA/OpenCodeGameStudios).  
All model assignments are free-only and kept current by the automatic updater.

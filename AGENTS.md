# AGENTS.md

## Repo Identity
This repository is for a single product only:

F-150 Repair Buddy MVP

Scope is locked to:
- 2010 Ford F-150
- 5.4 Triton
- mobile-first web app
- owner inspection and triage
- bookmarks + result card
- mock mode first
- optional live AI later

Do not expand scope unless explicitly instructed.

## Product Summary
This app is a practical repair companion for a narrow use case.

It helps the owner:
- start a session
- point the rear camera at the truck
- bookmark a sound or visible issue
- capture frames
- receive a simple structured recommendation:
  - DIY safe
  - Inspect only
  - Shop required

This is not a guaranteed diagnostic product.

## Non-Goals
Do not build:
- a generic repair app
- support for all vehicles
- support for all Ford models
- a marketplace
- a mechanic booking system
- a full maintenance CRM
- payments
- auth
- analytics dashboards
- a native mobile app
- an OBD platform in v1

## Stack
Preferred stack:
- Next.js
- App Router
- TypeScript
- Tailwind CSS
- browser media APIs
- local state
- server-side API route for live provider integration

## Engineering Priorities
1. Keep it simple.
2. Keep it typed.
3. Keep it mobile-first.
4. Keep mock mode functional at all times.
5. Keep secrets off the client.
6. Keep product scope narrow.
7. Prefer working code over theoretical architecture.

## Required Screens
The repo must maintain these screens:

1. Home / Vehicle Screen
2. Live Session Screen
3. Result Screen
4. Prototype Notes Screen

Do not add extra product surfaces unless explicitly asked.

## Required Concepts
These concepts must exist in the codebase:

### Session events
Typed session events for:
- frame
- bookmark
- transcript
- ai_response
- status

### Bookmark types
Supported bookmark types:
- sound
- leak
- rust
- connector
- light
- belt_pulley
- other

### Result model
A typed result structure containing:
- likelyIssueArea
- confidence
- severity
- recommendation
- nextSafeStep
- inspectNext
- disclaimer

### Provider abstraction
The app should support:
- MockRepairBuddyProvider
- GeminiRepairBuddyProvider

Mock mode must be the default and must continue working even if live mode is incomplete.

## Media Rules
- Prefer rear camera when possible.
- Use browser APIs.
- Handle permission denial gracefully.
- Keep preview local in the browser.
- Implement frame capture as JPEG snapshots from the video stream.
- Do not pretend the model is doing perfect continuous raw video understanding.
- Bookmarks are a first-class feature.

## UX Rules
The interface must feel:
- practical
- rugged
- clear
- mobile-first
- easy to use one-handed
- high contrast
- uncluttered

Avoid:
- flashy gradients
- marketing-heavy copy
- tiny buttons
- desktop-first layouts
- excessive text
- startup-demo nonsense

## Code Conventions
- Use TypeScript throughout.
- Prefer small components.
- Prefer explicit types over vague objects.
- Keep business logic in `lib/`.
- Keep UI components reusable but not overabstracted.
- Add comments only where they are useful.
- Use straightforward naming.
- Do not add dependencies without clear value.
- Do not create abstractions “for later” unless they are immediately needed.

## State Management
Use simple local state first.
Do not add a global state library unless clearly necessary.

## API and Secrets
- Never expose API keys in the client.
- Put live integration behind server routes or server-side modules.
- Provide `.env.example`.
- Mock mode must work without any secrets.

## Documentation Requirements
The repo must contain:
- `README.md`
- `PLANS.md`
- `AGENTS.md`
- `.env.example`

`README.md` should explain:
- what the product is
- how to run it
- how mock mode works
- where live integration fits
- what the next milestones are

## Commands
Common commands should include:
- install dependencies
- run dev server
- build
- lint if configured

If commands change, update the README.

## File Structure Expectations
Expected areas:
- `app/`
- `components/`
- `lib/`
- `public/`
- `styles/`

Avoid scattering logic randomly across the repo.

## Scope Guardrails
These are hard guardrails.

Do not:
- add support for more vehicles
- add user accounts
- add billing
- add database complexity in v1
- add telemetry clutter
- add admin tools
- add unrelated experiments
- turn this into a generic AI car assistant

If asked to expand, require explicit confirmation in the task itself.

## Preferred Implementation Order
1. Scaffold app
2. Build route structure
3. Build mobile UI shell
4. Add camera/mic permission flow
5. Add rear camera preview
6. Add frame capture
7. Add bookmarks
8. Add mock result logic
9. Add provider abstraction
10. Add live provider skeleton
11. Polish states and docs

## Quality Bar
A task is not done unless:
- the app runs locally
- the key flow works on a phone-sized layout
- camera/mic permission handling is clean
- bookmarks work
- mock mode works
- result generation works
- code is organized enough for future live integration

## Safety and Product Tone
The product must never sound overconfident.
It should be practical and direct.

Preferred tone:
- calm
- clear
- operational
- safety-aware

The app should be able to communicate:
- not enough visibility
- inspect further
- stop here
- shop required

## If You Are an AI Coding Agent
Before making major changes:
1. inspect existing structure
2. preserve product scope
3. keep mock mode working
4. prefer minimal edits
5. summarize what changed

When uncertain, choose the simpler path.
Do not widen scope on your own.

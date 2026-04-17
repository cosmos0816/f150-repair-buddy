# F-150 Repair Buddy MVP

F-150 Repair Buddy is a mobile-first inspection and triage app for one vehicle only:

- 2010 Ford F-150
- 5.4 Triton

The app keeps the rear camera live during a session, lets the user capture frames and bookmarks, stores a session evidence timeline, and generates a practical result:

- DIY safe
- Inspect only
- Shop required

## Current Screens

- `/` Home / Vehicle
- `/session` Live Session
- `/result` Result
- `/notes` Prototype Notes

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Environment

See [.env.example](/Users/jay/Documents/f150-repair-buddy/.env.example).

```bash
REPAIR_BUDDY_MODE=mock
GEMINI_API_KEY=
```

- `REPAIR_BUDDY_MODE=mock` keeps the app fully local with the mock conversation and mock diagnosis path.
- `REPAIR_BUDDY_MODE=gemini` enables the Live conversation path.
- `GEMINI_API_KEY` is read on the server only.

## Mock Mode

Mock mode is the default and requires no secrets.

- session UI works without external services
- Talk uses the mock conversation provider
- captures, bookmarks, and the evidence timeline stay local
- result generation falls back to mock logic

## Gemini Live Integration

The live Talk flow uses Gemini Live with a server-issued ephemeral token.

- `GEMINI_API_KEY` is read only in the server route
- the browser never receives the long-lived API key
- the client receives a short-lived Live token and connects directly to Gemini Live
- if `GEMINI_API_KEY` is missing or live mode is disabled, Talk fails explicitly instead of faking a live assistant

Current live scope:

- microphone audio is sent to Gemini Live
- assistant text replies appear in the compact caption layer and history drawer
- the compact caption layer wraps long replies and keeps recent messages scrollable on phone
- browser speech output can read finalized assistant guidance aloud without changing the Gemini transport path
- camera preview, capture, bookmarks, and timeline behavior stay intact
- session language is locked to `ENG` or `KOR`, and the live assistant is instructed to stay in that language for the full session
- local F-150 knowledge, curated references, and grounded inspection prompts are used to keep guidance truck-specific

## Result Generation

The end-of-session result card currently uses the local grounded result path, even when live Talk is running through Gemini.

- session evidence is fused with the local F-150 knowledge layer
- the result stays typed and truck-specific
- if a future Gemini result-analysis path is added, it should normalize into the same result model rather than replace it

## Where Live Integration Fits

- server token provisioning: [app/api/live/token/route.ts](/Users/jay/Documents/f150-repair-buddy/app/api/live/token/route.ts)
- server Gemini config: [lib/server/gemini-live.ts](/Users/jay/Documents/f150-repair-buddy/lib/server/gemini-live.ts)
- client Live provider: [lib/providers/gemini-live-session-conversation-provider.ts](/Users/jay/Documents/f150-repair-buddy/lib/providers/gemini-live-session-conversation-provider.ts)

## Curated Truck References

Add truck-only reference material in:

- [lib/references/curated-resources.ts](/Users/jay/Documents/f150-repair-buddy/lib/references/curated-resources.ts) for hand-authored owner-manual excerpts, repair notes, inspection hints, and safety warnings
- [lib/references/manual-sections.ts](/Users/jay/Documents/f150-repair-buddy/lib/references/manual-sections.ts) for structured owner-manual section entries
- [lib/references/mock-references.ts](/Users/jay/Documents/f150-repair-buddy/lib/references/mock-references.ts) for local starter references that still fit the same schema

All records use the typed schema in [lib/references/types.ts](/Users/jay/Documents/f150-repair-buddy/lib/references/types.ts) and can add language-specific overrides through `localized.en` and `localized.ko` without changing the base file structure.

## Next Best Milestones

- use the truck knowledge and reference layers to ground live session hints
- replace the Gemini result stub with a server-side evidence analysis path
- add a lightweight evidence review step before ending the session

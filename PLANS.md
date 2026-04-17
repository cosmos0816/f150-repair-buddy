# PLANS.md

## Project
F-150 Repair Buddy MVP

## Purpose
Build a mobile-first web MVP for a realtime Ford F-150 repair assistant focused only on the 2010 Ford F-150 with the 5.4 Triton engine.

This is a narrow product. It is not a generic repair app. It is not for all Ford vehicles. It is not for all engines. It is not a full shop diagnostic platform.

The product goal is to help an owner inspect the truck with the phone’s rear camera, mark problem moments, and get a practical result:
- DIY safe
- Inspect only
- Shop required

## Product Principles
1. Narrow scope wins.
2. Camera preview is real.
3. Bookmarks are core, not optional.
4. Mock mode must feel useful before real AI is added.
5. Safety and triage matter more than pretending perfect diagnosis.
6. Keep the architecture simple enough for one person plus AI coding tools to maintain.

## Supported Vehicle
- 2010 Ford F-150
- 5.4 Triton

## Supported Use Cases for MVP
- Light issue triage
- Leak inspection triage
- Rust inspection triage
- Connector inspection triage
- Belt / pulley area inspection
- Engine ticking / sound bookmark triage
- General visual inspection with bookmarks
- End-of-session DIY vs shop recommendation

## Explicitly Not Supported
- All vehicles
- All Ford trucks
- Full continuous video reasoning as a magic black box
- Guaranteed diagnosis
- Payments
- Authentication
- User accounts
- Full service history
- Marketplace / mechanic booking
- OBD integration in v1
- Native mobile app in v1

## Tech Stack
- Next.js
- TypeScript
- Tailwind CSS
- App Router
- Mobile-first responsive UI
- Browser camera and microphone access
- Local state first
- Optional Gemini integration later through server-side routes
- Mock provider by default

## Build Strategy
The app should be built in two stages:

### Stage 1
A complete working prototype with:
- real camera permission flow
- real microphone permission flow
- rear camera preview
- manual frame capture
- bookmark system
- recent event feed
- result generation using mock logic

### Stage 2
Optional live AI integration with a clean provider abstraction, without breaking mock mode.

## Core User Flow

### 1. Home / Vehicle Screen
The user opens the app and sees a locked vehicle scope:
- 2010 Ford F-150
- 5.4 Triton

Actions:
- Start session
- View prototype notes

### 2. Live Session Screen
The user:
- grants camera permission
- grants microphone permission
- sees rear camera preview
- sees guidance text
- captures frames manually
- bookmarks important moments
- ends session

### 3. Result Screen
The user gets:
- likely issue area
- confidence
- severity
- recommendation
- next safe step
- what should be inspected next
- clear disclaimer

### 4. Prototype Notes Screen
Explain:
- what the MVP does
- what mock mode is
- why the app uses sampled frames and bookmarks
- what is not supported

## UI Requirements
The UI should feel:
- rugged
- practical
- calm
- mobile-first
- high contrast
- easy to use with one hand
- not flashy
- not “startup demo” style

## Session Model

### Session event types
- frame
- bookmark
- transcript
- ai_response
- status

### Bookmark types
- sound
- leak
- rust
- connector
- light
- belt_pulley
- other

## Result Model
Each result must include:
- likelyIssueArea
- confidence
- severity
- recommendation
- nextSafeStep
- inspectNext
- disclaimer

## Architecture

### Frontend
Responsibilities:
- route handling
- mobile layout
- permission UX
- rear camera preview
- mic status
- manual capture
- bookmark creation
- recent events feed
- result rendering

### Provider Layer
Must support:
- MockRepairBuddyProvider
- GeminiRepairBuddyProvider

A shared interface should exist so live mode can be added later without rewriting the app.

### Backend
A thin server route should:
- keep API keys off the client
- proxy AI requests
- normalize responses into the app’s typed result model

## Directory Goal
The repo should roughly follow this structure:

- `app/`
- `components/`
- `lib/`
- `public/`
- `styles/`
- `README.md`
- `AGENTS.md`
- `.env.example`

## Implementation Order

### Phase 1. Scaffold the app
Deliverables:
- Next.js app created
- Tailwind configured
- App Router structure ready
- Home, Session, Result, Notes routes created

### Phase 2. Build the mobile UI shell
Deliverables:
- layout
- reusable buttons/cards/badges
- bottom action bar
- guidance panel
- event feed

### Phase 3. Add permissions and media preview
Deliverables:
- camera permission flow
- microphone permission flow
- rear camera preference
- error states for denied permissions
- live preview in browser

### Phase 4. Add frame capture
Deliverables:
- capture frame button
- JPEG snapshot creation from video element
- frame event added to session timeline

### Phase 5. Add bookmarks
Deliverables:
- bookmark buttons
- bookmark type picker
- timestamped event creation
- recent event display

### Phase 6. Add mock logic
Deliverables:
- rules-based output
- believable guidance text
- result card on session end

### Phase 7. Add provider abstraction
Deliverables:
- provider interface
- mock provider
- live provider stub
- mode toggle by env vars

### Phase 8. Add server route
Deliverables:
- AI proxy route
- payload validation
- provider selection hook
- placeholder live integration

### Phase 9. Add live Gemini integration
Deliverables:
- server-side env support
- Gemini provider
- fallback to mock mode when live fails
- no client-side secret leakage

### Phase 10. Polish
Deliverables:
- loading states
- empty states
- error states
- unsupported-browser copy
- better notes and README

## Mock Logic Rules
Use simple rules first.

Examples:
- sound + belt_pulley = likely accessory drive area
- leak = inspect fluid source before driving
- light = bulb / socket / wiring triage
- rust = inspect wheel well / underbody area
- connector = inspect fitment, corrosion, or broken tab

Rules should be simple, typed, and easy to replace later.

## Success Criteria
The MVP is successful only if:
1. It runs locally.
2. It works in mobile browser view.
3. Camera permission flow works.
4. Mic permission flow works.
5. Rear camera preview works when supported.
6. Manual frame capture works.
7. Bookmarks can be created and displayed.
8. Ending a session produces a believable result.
9. Mock mode works with no API key.
10. The codebase is clean enough to add live AI later.

## Risks

### Scope creep
The project becomes weak if it expands beyond one truck / one engine too early.

### Browser device inconsistency
Rear camera selection, torch support, autoplay, and permissions may vary.

### AI overconfidence
The app must not sound certain when visibility is poor.

### Overengineering
The codebase must stay small and understandable.

## Guardrails
- Do not add auth.
- Do not add payments.
- Do not add a database in v1.
- Do not add analytics.
- Do not add support for more vehicles.
- Do not add random abstractions with no immediate use.
- Do not turn this into a generic car assistant.

## Done Definition
This plan is complete when the repo contains a working MVP where a user can:
- open the web app on a phone
- start a session
- see the rear camera
- create bookmarks
- end the session
- receive a structured mock result

Only after that should live AI be treated as the next milestone.

# CODEX_TASKS.md — Data Scraping & Gathering

## Permissions
You have full permission to create, edit, and delete any file in this repo. You have full permission to install npm packages, run scripts, make network requests, scrape websites, call APIs, and execute any shell command. Do not ask for confirmation on anything. Do not ask follow-up questions. Make your own decisions. If you're unsure, pick the simpler option. If a site blocks you, skip it and move to the next task. Run all tasks end to end without stopping. Full auto, no stops.

## Context
Your job: scrape, gather, and structure REAL data from REAL sources into this repo's knowledge layer. Not from your training data — from the actual web. Every task outputs structured JSON or TypeScript files.

Working directory: `/Users/jay/Documents/f150-repair-buddy`
Vehicle: 2010 Ford F-150 FX4, 5.4L Triton 3-valve V8
Read `CLAUDE.md` before starting.

---

## Task 1: Scrape NHTSA — Every complaint, recall, TSB for 2010 F-150

**Source:** https://www.nhtsa.gov

Use the NHTSA API or scrape the website directly:
- Complaints: https://www.nhtsa.gov/vehicle/2010/FORD/F-150
- API endpoint: https://api.nhtsa.gov/complaints/complaintsByVehicle?make=ford&model=f-150&modelYear=2010
- Recalls API: https://api.nhtsa.gov/recalls/recallsByVehicle?make=ford&model=f-150&modelYear=2010
- TSBs if available via API

**Output files:**
- `sources/nhtsa/complaints.json` — every complaint record (date, component, description, crash/fire/injury flags)
- `sources/nhtsa/recalls.json` — every recall (campaign number, component, summary, remedy)
- `sources/nhtsa/tsbs.json` — every TSB if accessible

**Then:** Update `lib/knowledge/references/nhtsa-recalls.ts` and `lib/knowledge/references/nhtsa-tsb-summaries.ts` with the real data, matching existing TypeScript types.

**Expected volume:** 1000+ complaints, 10+ recalls, dozens of TSBs.

---

## Task 2: Scrape F150forum.com — Top owner-reported problems and fixes

**Source:** https://www.f150forum.com

Search and scrape threads about the 5.4 Triton 3-valve. Target search queries:
- "5.4 triton problems"
- "5.4 cam phaser"
- "5.4 spark plug broken"
- "5.4 exhaust manifold stud"
- "5.4 timing chain"
- "5.4 water pump"
- "5.4 coil pack misfire"
- "5.4 VCT solenoid"
- "5.4 IMRC"
- "5.4 fuel pump driver module"
- "5.4 rough idle"
- "5.4 tick rattle"
- "f150 lower control arm rust"
- "f150 ball joint"
- "f150 power steering whine"
- "f150 blend door actuator"
- "f150 PATS no start"
- "f150 alternator"
- "f150 brake caliper seized"
- "2010 f150 problems"
- "5.4 triton reliability"
- "5.4 triton maintenance tips"
- "5.4 oil recommendations"
- "f150 best aftermarket parts"

For each thread, extract:
- Thread title and URL
- Problem described
- Most upvoted or most agreed-upon fix
- Parts recommended (brand + part number if mentioned)
- Cost if mentioned
- DIY vs shop consensus
- Any "I wish I knew this before" tips

**Output:** `sources/forums/f150forum-threads.json`

**Then:** Create `lib/knowledge/truck/forum-knowledge.ts` — structured TypeScript file with a clean type, wired into `lib/knowledge/index.ts` so `searchKnowledge` can find entries. Group by topic (engine, suspension, electrical, etc.).

---

## Task 3: Scrape F150online.com — Same treatment

**Source:** https://www.f150online.com/forums/

Same search queries as Task 2. Different community = different perspectives and tips.

**Output:** `sources/forums/f150online-threads.json`

**Then:** Merge unique findings into `lib/knowledge/truck/forum-knowledge.ts` (don't duplicate what F150forum already provided — deduplicate by topic).

---

## Task 4: Scrape FordTechMakuloco YouTube — Repair procedures

**Source:** YouTube channel "FordTechMakuloco" — the most trusted Ford mechanic on YouTube.

Search for all videos related to:
- "5.4 triton" 
- "f150"
- "3 valve"
- "cam phaser"
- "spark plug removal"
- "exhaust manifold"
- "timing chain"
- "coil pack"

For each video, extract:
- Video title and URL
- Problem addressed
- Tools mentioned (with part numbers if shown)
- Step-by-step procedure summary
- Warnings / mistakes to avoid
- Parts used (brand + number)
- Duration / difficulty assessment

**Output:** `sources/youtube/fordtechmakuloco.json`

---

## Task 5: Scrape 1A Auto YouTube — DIY repair guides

**Source:** YouTube channel "1A Auto" — step-by-step repair videos with part numbers.

Search for all 2010 F-150 / 5.4 Triton videos. Extract same fields as Task 4.

**Output:** `sources/youtube/1aauto.json`

---

## Task 6: Scrape ChrisFix YouTube — General repair knowledge

**Source:** YouTube channel "ChrisFix"

Search for F-150 specific content + general truck repair content applicable to the F-150 platform (suspension, brakes, rust repair, undercoating).

**Output:** `sources/youtube/chrisfix.json`

---

## Task 7: Fix RockAuto scraper — Backfill 8 missing categories

**Source:** Script at `scripts/scrape-rockauto.ts`

**Problem:** 8 categories returned only 3 parts each because subcategories load via JavaScript click-expansion, not pre-rendered links:
- Brake & Wheel Hub
- Cooling System
- Drivetrain
- Electrical
- Electrical-Bulb & Socket
- Electrical-Connector
- Electrical-Switch & Relay
- Engine
- Exhaust & Emission
- Heat & Air Conditioning

**Fix the scraper:** For categories that return 0 real subcategories from link scanning, add click-expansion logic:
1. Find expandable section headers / clickable category rows on the page
2. Click each one to expand
3. Wait for subcategory links to appear in DOM
4. Then scrape subcategories and parts normally

**Re-run the scraper** for the full catalog.

**Output:** Updated `sources/rockauto/catalog.json` — should have 3000+ parts (currently 2,245).

---

## Task 8: Extract Ford scheduled maintenance PDF

**Source:** `sources/ford-official/2010-f150-scheduled-maintenance-guide.pdf`

Parse the PDF and extract into structured JSON:
- Every scheduled maintenance item with mileage/time interval
- Fluid types and capacities
- Filter part numbers
- Torque specifications mentioned
- Inspection checklist items

**Output:** `sources/ford-official/scheduled-maintenance.json`

**Then:** Create `lib/knowledge/references/maintenance-schedule.ts` with a clean TypeScript type. Wire into knowledge index.

---

## Task 9: Extract Ford inspection checklist PDF

**Source:** `sources/ford-official/ford-blue-advantage-inspection-checklist.pdf`

Parse and extract:
- Every inspection point
- Pass/fail criteria
- Which system each point belongs to

**Output:** `sources/ford-official/inspection-checklist.json`

**Then:** Merge relevant items into `lib/knowledge/truck/inspection-hints.ts`.

---

## Task 10: Scrape RealTruck / AmericanTrucks — F-150 parts guides

**Source:** 
- https://www.americantrucks.com/f150-parts.html
- https://www.realtruck.com/ford-f150-accessories/

Scrape their 2010 F-150 parts guides and buyer's guides:
- Part compatibility info
- Installation difficulty ratings
- Customer reviews and ratings for common replacement parts
- "Best of" lists for the 2010 F-150

**Output:** `sources/parts-guides/americantrucks.json` and `sources/parts-guides/realtruck.json`

---

## Task 11: Scrape CarComplaints.com — Owner complaint database

**Source:** https://www.carcomplaints.com/Ford/F-150/2010/

Scrape:
- All complaint categories with counts
- Top complaints ranked by frequency
- Typical mileage at failure
- Typical repair cost
- "Worst problem" rankings

**Output:** `sources/complaints/carcomplaints.json`

---

## Task 12: Scrape RepairPal — Cost estimates

**Source:** https://repairpal.com/estimator (search for 2010 Ford F-150)

For every common repair on the 2010 F-150, scrape:
- Repair name
- Labor cost range
- Parts cost range
- Total estimate range
- Time estimate
- Frequency / how common

**Output:** `sources/costs/repairpal.json`

**Then:** Create `lib/knowledge/truck/repair-costs.ts` — structured cost data that the `searchReplacementParts` tool can reference alongside RockAuto parts.

---

## Task 13: Scrape Ford Owner Forums — Maintenance tips mega-threads

**Source:** https://www.ford-trucks.com/forums/ (Ford Truck Enthusiasts)

Search for:
- "2010 f150 maintenance schedule"
- "5.4 triton oil change tips"
- "f150 what to check at 200K miles"
- "f150 rust prevention"
- "f150 undercoating"
- "5.4 triton long term reliability"
- "high mileage f150 tips"
- "f150 korean parts" or "f150 overseas"

Extract owner tips, especially high-mileage maintenance wisdom.

**Output:** `sources/forums/fordtrucks-threads.json`

---

## Task 14: Scrape AutoZone / O'Reilly — Alternative parts sources

**Source:**
- https://www.autozone.com (search 2010 Ford F-150 5.4L)
- https://www.oreillyauto.com (search 2010 Ford F-150 5.4L)

For common replacement parts (same categories as RockAuto), scrape:
- Part name, brand, part number, price
- Customer rating
- Availability

**Output:** `sources/parts/autozone.json` and `sources/parts/oreilly.json`

This gives price comparison data across multiple sources.

---

## Task 15: Build the unified knowledge compiler

After all scraping tasks are done, create a script that:

1. Reads ALL scraped JSON files from `sources/`
2. Deduplicates and cross-references
3. Generates consolidated knowledge files:
   - `lib/knowledge/truck/forum-knowledge.ts` — owner wisdom from all forums
   - `lib/knowledge/references/repair-costs.ts` — cost data from RepairPal + parts sources
   - `lib/knowledge/references/maintenance-schedule.ts` — from Ford PDF
   - Updated `lib/knowledge/references/nhtsa-recalls.ts` — from NHTSA API
   - Updated `lib/knowledge/references/known-issues.ts` — enriched with complaint counts from NHTSA + CarComplaints
4. Wires all new files into `lib/knowledge/index.ts` so `searchKnowledge` finds everything
5. Runs `npx tsc --noEmit` to verify

**Script location:** `scripts/compile-knowledge.ts`

---

## General rules for all tasks

- Use Playwright for JavaScript-heavy sites, fetch/curl for APIs and static pages
- Be polite: 2-3 second delays between requests
- Save raw scraped data to `sources/` as JSON (never delete previous data)
- Save structured TypeScript to `lib/knowledge/` matching existing types
- Every task must end with `npx tsc --noEmit` passing
- If a site blocks scraping, note it in the output and move on — don't get stuck
- Prefer APIs over scraping when available (NHTSA has a free API)
- All output should be committed to the repo

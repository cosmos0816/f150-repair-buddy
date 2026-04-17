# Sources

Authoritative reference material for the **2010 Ford F-150 5.4L 3-valve Triton**.

Anything dropped into this folder is fair game to be cited by the knowledge layer (`lib/knowledge/`) via the `source` field on parts and failure modes. The closer a piece of data sits to a real source, the more confidently the live assistant can speak about it.

## Folder layout

| Folder | What goes in it |
|---|---|
| `ford-official/` | Anything authored by Ford Motor Company. Owner's guide, Scheduled Maintenance Guide, Workshop Manual pages, Powertrain Control / Emissions Diagnosis manual, Blue Advantage inspection checklist, Motorcraft technical pages. |
| `ford-tsbs/` | Ford Technical Service Bulletins (TSBs). Name them by TSB number when you can — e.g. `08-7-6-cam-phaser-rattle.pdf`. |
| `nhtsa/` | NHTSA recall PDFs and complaint exports. Named by NHTSA campaign / action number when possible. |
| `field-knowledge/` | Notes from forums (f150forum, f150online), trusted YouTube channels (FordTechMakuloco, etc.), repair shop notes, and anything else that isn't from Ford or NHTSA but you trust. Lower confidence than `ford-official/` but still better than my training data alone. |
| `your-truck/` | Stuff specific to **your** 2010 F-150: photos of how it looks healthy, recordings of how it sounds, your maintenance log, receipts. This is the most valuable folder — it's the only place that has ground truth about the actual truck the bot will be helping repair. |

## How the knowledge layer cites these

Each `PartFailureMode` and (eventually) each `PartConditionDescriptor` carries an optional `source` string. By convention:

- `source: "sources/ford-official/2010-f150-scheduled-maintenance-guide.pdf p.6"` — file path + page when relevant
- `source: "sources/ford-tsbs/08-7-6.pdf"` — TSB number
- `source: "field knowledge — verify before acting"` — for entries written from general 3V knowledge that haven't been tied to a specific document yet
- `source: "FordTechMakuloco — cam phaser diagnosis 5.4 3V"` — when a trusted channel is the basis

And each entry carries a `confidence` field:

- `verified` — backed by an authoritative document in this folder
- `field_knowledge` — written from general engine knowledge, plausible but unverified
- `unverified` — speculative or conflicting reports

The live assistant is instructed never to state `field_knowledge` or `unverified` claims as fact — always with a "this looks like X, but check before you commit to a repair" hedge.

## Getting more sources

The cheapest high-value additions for this engine:

- **NHTSA TSB list** for the 2010 F-150 5.4 — free, by VIN, at nhtsa.gov. Several known cam phaser / plug ejection / FPDM TSBs.
- **Ford OASIS / Workshop Manual** — dealer-only paid access, but even one or two pages of the ignition system and front cover sections would be authoritative.
- **Your own truck's photos.** Healthy belt routing, healthy connector seating, healthy fluid colors — drop them in `your-truck/`. They become the visual baseline the bot can compare against.

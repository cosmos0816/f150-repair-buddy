/**
 * Knowledge grounding helpers for the Gemini provider.
 *
 * selectRelevantKnowledge() walks session evidence (bookmarks, conversation)
 * and matches against the truck knowledge base to return only the subset of
 * knowledge relevant to this session.
 *
 * buildSystemPrompt() renders that subset into a compact Markdown brief that
 * stays under ~3 KB and is safe to pass as Gemini systemInstruction.
 */

import {
  getIssueAreas,
  getInspectionHints,
  getTruckKnowledgeBase,
  type TruckIssueAreaId,
  type TruckPartId,
  type TruckSymptomId,
  type TruckKnowledgeLookup,
} from "@/lib/knowledge";
import { ABNORMAL_TRUCK_SOUND_PATTERNS } from "@/lib/knowledge/sound/abnormal-sound-patterns";
import { NORMAL_TRUCK_SOUND_BASELINES } from "@/lib/knowledge/sound/normal-sound-baselines";
import type { TruckSoundRecord } from "@/lib/knowledge/sound/types";
import { SIGNAL_KEYWORDS, type DiagnosisSignal } from "@/lib/knowledge/keywords";
import type { RepairSessionSnapshot, BookmarkType } from "@/lib/types/session";

export interface SelectedKnowledge {
  matchedIssueAreaIds: TruckIssueAreaId[];
  matchedPartIds: TruckPartId[];
  matchedSymptomIds: TruckSymptomId[];
  matchedSoundPatterns: TruckSoundRecord[];
  normalBaselines: TruckSoundRecord[];
  /** Human-readable inspection hints for the matched areas. */
  inspectForHints: string[];
  /** Dominant DiagnosisSignal inferred from bookmarks + conversation. */
  dominantSignal: DiagnosisSignal | null;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function normalizeText(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function textContains(haystack: string, needle: string) {
  const h = normalizeText(haystack);
  const n = normalizeText(needle);
  return Boolean(h) && Boolean(n) && h.includes(n);
}

function bookmarkTypeToDiagnosisSignal(
  bookmarkType: BookmarkType,
): DiagnosisSignal | null {
  if (bookmarkType === "other") return null;
  return bookmarkType as DiagnosisSignal;
}

function inferSignalsFromText(text: string): Set<DiagnosisSignal> {
  const signals = new Set<DiagnosisSignal>();
  const normalized = normalizeText(text);

  for (const [signal, keywords] of Object.entries(SIGNAL_KEYWORDS) as [
    DiagnosisSignal,
    string[],
  ][]) {
    if (keywords.some((kw) => textContains(normalized, kw))) {
      signals.add(signal);
    }
  }

  return signals;
}

function buildLookupFromSignals(signals: Set<DiagnosisSignal>): TruckKnowledgeLookup {
  const bookmarkTypes: BookmarkType[] = [];

  for (const signal of signals) {
    bookmarkTypes.push(signal as BookmarkType);
  }

  return { bookmarkTypes };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function selectRelevantKnowledge(
  session: RepairSessionSnapshot,
): SelectedKnowledge {
  const bookmarkSignals = new Set<DiagnosisSignal>();

  for (const bookmark of session.evidence.bookmarks) {
    const signal = bookmarkTypeToDiagnosisSignal(bookmark.bookmarkType);
    if (signal) bookmarkSignals.add(signal);
  }

  const conversationText = session.evidence.conversation
    .filter((m) => m.role === "user")
    .slice(-10)
    .map((m) => m.text)
    .join(" ");

  const conversationSignals = inferSignalsFromText(conversationText);
  const allSignals = new Set([...bookmarkSignals, ...conversationSignals]);

  // Dominant signal: bookmark signals take priority, then conversation.
  const dominantSignal: DiagnosisSignal | null =
    [...bookmarkSignals][0] ?? [...conversationSignals][0] ?? null;

  const lookup = buildLookupFromSignals(allSignals);
  const issueAreas = getIssueAreas(lookup);
  const inspectionTargets = getInspectionHints(lookup);

  const matchedIssueAreaIds = issueAreas.map((a) => a.id);
  const matchedPartIds = Array.from(
    new Set(issueAreas.flatMap((a) => a.relatedParts)),
  );
  const matchedSymptomIds = Array.from(
    new Set(issueAreas.flatMap((a) => a.relatedSymptoms)),
  );

  // Match sound patterns against the signals.
  const hasSoundSignal = allSignals.has("sound");
  const matchedSoundPatterns = hasSoundSignal
    ? ABNORMAL_TRUCK_SOUND_PATTERNS.filter((p) => {
        // Include patterns whose likelyIssueAreaIds overlap matched areas.
        return (
          p.likelyIssueAreaIds.length === 0 ||
          p.likelyIssueAreaIds.some((id) =>
            matchedIssueAreaIds.includes(id as TruckIssueAreaId),
          )
        );
      })
    : [];

  const normalBaselines = hasSoundSignal ? NORMAL_TRUCK_SOUND_BASELINES : [];

  // Collect inspection hints (deduplicated).
  const inspectForHints = Array.from(
    new Set(inspectionTargets.flatMap((t) => t.inspectFor ?? [])),
  ).slice(0, 6);

  return {
    matchedIssueAreaIds,
    matchedPartIds,
    matchedSymptomIds,
    matchedSoundPatterns,
    normalBaselines,
    inspectForHints,
    dominantSignal,
  };
}

// ---------------------------------------------------------------------------
// System prompt renderer
// ---------------------------------------------------------------------------

const REPAIR_RESULT_JSON_SCHEMA = `{
  "likelyIssueArea": "string — short label for the most likely problem area",
  "confidence": "low | medium | high",
  "severity": "green | yellow | red",
  "recommendation": "DIY_SAFE | INSPECT_ONLY | SHOP_REQUIRED",
  "nextSafeStep": "string — one actionable sentence",
  "inspectNext": ["string", "string", "string"],
  "disclaimer": "string — brief safety caveat",
  "matchedRule": "sound | belt_pulley | leak | rust | connector | light | frames_only | insufficient_evidence",
  "supportingEvidence": [
    { "kind": "bookmark | capture | conversation", "label": "string", "detail": "string (optional)" }
  ]
}`;

export function buildSystemPrompt(
  selected: SelectedKnowledge,
  session: RepairSessionSnapshot,
): string {
  const lines: string[] = [];

  lines.push("# F-150 Repair Buddy — Diagnosis Assistant");
  lines.push("");
  lines.push(
    "You are a conservative vehicle inspection assistant. Vehicle scope is locked to: **2010 Ford F-150 / 5.4 Triton V8 (3V)**.",
  );
  lines.push(
    "Return ONLY a single JSON object matching the schema below. Do not add prose, markdown fences, or explanation outside the JSON.",
  );
  lines.push("");

  // Vehicle context
  lines.push("## Vehicle");
  lines.push(`- Year/Make/Model: 2010 Ford F-150`);
  lines.push(`- Engine: 5.4 Triton V8 (3V, VCT cam phasers)`);
  lines.push(`- Vehicle ID: ${session.vehicleId}`);
  lines.push(`- Session language: ${session.sessionLanguage}`);
  lines.push("");

  // Matched issue areas
  if (selected.matchedIssueAreaIds.length > 0) {
    const kb = getTruckKnowledgeBase();
    lines.push("## Matched Issue Areas (focus here first)");
    for (const areaId of selected.matchedIssueAreaIds.slice(0, 5)) {
      const area = kb.issueAreas[areaId];
      if (area) {
        lines.push(`- **${area.label}**: ${area.summary}`);
      }
    }
    lines.push("");
  }

  // Sound knowledge
  if (selected.matchedSoundPatterns.length > 0) {
    lines.push("## Abnormal Sound Patterns");
    for (const p of selected.matchedSoundPatterns.slice(0, 5)) {
      lines.push(
        `- **${p.category}** (${p.pitchTags.join(", ")}): ${p.description} — ${p.inspectionHint}`,
      );
    }
    lines.push("");

    if (selected.normalBaselines.length > 0) {
      lines.push("## Normal Sound Baselines (do not over-escalate these)");
      for (const b of selected.normalBaselines) {
        lines.push(`- **${b.category}**: ${b.description}`);
      }
      lines.push("");
    }
  }

  // Inspection hints
  if (selected.inspectForHints.length > 0) {
    lines.push("## Inspection Focus Points");
    for (const hint of selected.inspectForHints) {
      lines.push(`- ${hint}`);
    }
    lines.push("");
  }

  // Escalation rules
  lines.push("## Escalation Rules");
  lines.push(
    "- Use **SHOP_REQUIRED** (red) when: fresh fluid leak, structural rust near brake/fuel lines, timing-chain/cam-phaser source confirmed, spark plug ejection risk (5.4 Triton TSB).",
  );
  lines.push(
    "- Use **INSPECT_ONLY** (yellow) when: belt-path concern, underbody surface rust, sound source not confirmed, possible misfire.",
  );
  lines.push(
    "- Use **DIY_SAFE** (green) when: bulb/socket swap, connector re-seat, surface cosmetic rust.",
  );
  lines.push(
    "- Default to **INSPECT_ONLY** when evidence is limited. Never over-escalate from sound alone without visual confirmation.",
  );
  lines.push("");

  // 5.4 Triton specific field knowledge
  lines.push("## 5.4 Triton Field Notes (apply when relevant)");
  lines.push(
    "- **Cam phaser cold-start rattle**: VCT phasers rattle on cold start until oil pressure builds (first 5–10 seconds). Normal if brief; abnormal if persistent past warm-up.",
  );
  lines.push(
    "- **Exhaust manifold bolt tick**: Passenger-side manifold bolts fail from heat cycling. Tick is cold-start, heat-cycle specific. Escalate to INSPECT_ONLY; can strip threads if left long-term.",
  );
  lines.push(
    "- **Spark plug ejection / two-piece plug (TSB 08-7-6)**: 2004–2008 5.4 Triton known issue; 2010 uses updated plug design but verify. If user mentions broken plug, stripped threads, or plug blowout: SHOP_REQUIRED.",
  );
  lines.push("");

  // JSON schema
  lines.push("## Required JSON Output Schema");
  lines.push("```json");
  lines.push(REPAIR_RESULT_JSON_SCHEMA);
  lines.push("```");
  lines.push("");
  lines.push(
    "**Critical constraints**: `confidence` must be one of: low, medium, high. `severity` must be one of: green, yellow, red. `recommendation` must be one of: DIY_SAFE, INSPECT_ONLY, SHOP_REQUIRED. `matchedRule` must be one of: sound, belt_pulley, leak, rust, connector, light, frames_only, insufficient_evidence. `supportingEvidence[].kind` must be one of: bookmark, capture, conversation.",
  );

  return lines.join("\n");
}

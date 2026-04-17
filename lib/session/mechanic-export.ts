/**
 * Generates a Korean-formatted repair summary text that the owner can show
 * to a Korean mechanic. Includes diagnosis, part numbers, torque specs,
 * and safety notes in Korean with English technical terms preserved.
 */

import { APP_CONFIG } from "@/lib/config/app-config";
import { searchTruckReferences } from "@/lib/knowledge/references/lookup";
import type { RepairResult } from "@/lib/types/result";
import type { RepairSessionSnapshot } from "@/lib/types/session";

export interface MechanicExportResult {
  title: string;
  vehicleInfo: string;
  diagnosis: string;
  severity: string;
  recommendation: string;
  inspectItems: string[];
  partNumbers: string[];
  torqueSpecs: string[];
  safetyNotes: string[];
  fullText: string;
}

const SEVERITY_KO: Record<string, string> = {
  green: "정상 (GREEN)",
  yellow: "주의 (YELLOW)",
  red: "위험 (RED)",
};

const RECOMMENDATION_KO: Record<string, string> = {
  DIY_SAFE: "자가 정비 가능",
  INSPECT_ONLY: "점검 필요",
  SHOP_REQUIRED: "정비소 수리 필요",
};

export function buildMechanicExport(
  result: RepairResult,
  session: RepairSessionSnapshot,
): MechanicExportResult {
  const vehicle = `${APP_CONFIG.vehicle.year} ${APP_CONFIG.vehicle.make} ${APP_CONFIG.vehicle.model} ${APP_CONFIG.vehicle.engine}`;
  const date = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const severity = SEVERITY_KO[result.severity] ?? result.severity;
  const recommendation = RECOMMENDATION_KO[result.recommendation] ?? result.recommendation;

  // Search for relevant references based on the diagnosis
  const searchTerms = [
    result.likelyIssueArea,
    result.matchedRule,
    ...result.inspectNext,
  ].filter(Boolean);

  const allReferences = searchTerms.flatMap((term) =>
    searchTruckReferences(term).slice(0, 3)
  );

  // Deduplicate references
  const seenIds = new Set<string>();
  const uniqueRefs = allReferences.filter((ref) => {
    if (seenIds.has(ref.record.id)) return false;
    seenIds.add(ref.record.id);
    return true;
  });

  // Extract part numbers from references
  const partNumbers: string[] = [];
  const torqueSpecs: string[] = [];
  const safetyNotes: string[] = [];

  for (const ref of uniqueRefs.slice(0, 8)) {
    const record = ref.record;

    if (record.id.startsWith("torque-spec-")) {
      torqueSpecs.push(record.excerpt);
    } else if (record.id.startsWith("fluid-spec-")) {
      torqueSpecs.push(record.excerpt);
    } else if (record.id.startsWith("repair-cost-")) {
      partNumbers.push(`${record.title}: ${record.excerpt}`);
    }

    if (record.safetyNote) {
      safetyNotes.push(record.safetyNote);
    }
  }

  const inspectItems = result.inspectNext;

  // Build the full Korean text
  const lines = [
    `═══════════════════════════════════════`,
    `  F-150 Repair Buddy — 정비 리포트`,
    `═══════════════════════════════════════`,
    ``,
    `차량: ${vehicle}`,
    `날짜: ${date}`,
    `주행거리: ${session.evidence.captures.length > 0 ? "검사 기록 있음" : "미기록"}`,
    ``,
    `──────────────────────────────────────`,
    `  진단 결과`,
    `──────────────────────────────────────`,
    ``,
    `상태: ${severity}`,
    `권장: ${recommendation}`,
    `증상: ${result.likelyIssueArea}`,
    ``,
    `다음 단계:`,
    `${result.nextSafeStep}`,
    ``,
  ];

  if (inspectItems.length > 0) {
    lines.push(`──────────────────────────────────────`);
    lines.push(`  점검 항목`);
    lines.push(`──────────────────────────────────────`);
    lines.push(``);
    inspectItems.forEach((item, i) => {
      lines.push(`  ${i + 1}. ${item}`);
    });
    lines.push(``);
  }

  if (torqueSpecs.length > 0) {
    lines.push(`──────────────────────────────────────`);
    lines.push(`  토크 & 용량 스펙`);
    lines.push(`──────────────────────────────────────`);
    lines.push(``);
    torqueSpecs.forEach((spec) => {
      lines.push(`  • ${spec}`);
    });
    lines.push(``);
  }

  if (partNumbers.length > 0) {
    lines.push(`──────────────────────────────────────`);
    lines.push(`  부품 & 비용 참고`);
    lines.push(`──────────────────────────────────────`);
    lines.push(``);
    partNumbers.forEach((part) => {
      lines.push(`  • ${part}`);
    });
    lines.push(``);
  }

  if (safetyNotes.length > 0) {
    lines.push(`──────────────────────────────────────`);
    lines.push(`  ⚠ 안전 주의사항`);
    lines.push(`──────────────────────────────────────`);
    lines.push(``);
    const uniqueNotes = [...new Set(safetyNotes)];
    uniqueNotes.forEach((note) => {
      lines.push(`  • ${note}`);
    });
    lines.push(``);
  }

  if (result.supportingEvidence.length > 0) {
    lines.push(`──────────────────────────────────────`);
    lines.push(`  검사 근거`);
    lines.push(`──────────────────────────────────────`);
    lines.push(``);
    result.supportingEvidence.forEach((ev) => {
      const detail = ev.detail ? ` — ${ev.detail}` : "";
      lines.push(`  • [${ev.kind}] ${ev.label}${detail}`);
    });
    lines.push(``);
  }

  lines.push(`──────────────────────────────────────`);
  lines.push(`${result.disclaimer}`);
  lines.push(``);
  lines.push(`Generated by F-150 Repair Buddy`);
  lines.push(`═══════════════════════════════════════`);

  return {
    title: "F-150 Repair Buddy — 정비 리포트",
    vehicleInfo: vehicle,
    diagnosis: result.likelyIssueArea,
    severity,
    recommendation,
    inspectItems,
    partNumbers,
    torqueSpecs,
    safetyNotes,
    fullText: lines.join("\n"),
  };
}

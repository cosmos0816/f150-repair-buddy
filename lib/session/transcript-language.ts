import type { SessionLanguage } from "@/lib/types/session";

export type TranscriptLanguageMatch =
  | "matched"
  | "mixed"
  | "mismatched"
  | "unknown";

function countMatches(value: string, pattern: RegExp) {
  return value.match(pattern)?.length ?? 0;
}

export function getTranscriptLanguageMatch(
  language: SessionLanguage,
  text: string,
): TranscriptLanguageMatch {
  const normalized = text.trim();

  if (!normalized) {
    return "unknown";
  }

  const hangulCount = countMatches(normalized, /[\uac00-\ud7a3]/g);
  const latinCount = countMatches(normalized, /[a-z]/gi);

  if (hangulCount === 0 && latinCount === 0) {
    return "unknown";
  }

  if (hangulCount > 0 && latinCount > 0) {
    return "mixed";
  }

  if (language === "ko") {
    return hangulCount > 0 ? "matched" : "mismatched";
  }

  return latinCount > 0 ? "matched" : "mismatched";
}

export function getTranscriptEvidenceWeight(
  language: SessionLanguage,
  text: string,
) {
  const match = getTranscriptLanguageMatch(language, text);

  // Code-mixed speech is the norm for this user (Korean sentences with English
  // automotive loanwords like 얼터네이터, and vice versa), so "mixed" is treated
  // as fully reliable grounding evidence — not penalized below "matched".
  if (match === "matched" || match === "mixed") {
    return 2;
  }

  if (match === "unknown") {
    return 1;
  }

  return 0;
}

export function isTranscriptReliableForGrounding(
  language: SessionLanguage,
  text: string,
) {
  return getTranscriptEvidenceWeight(language, text) > 0;
}

export function isTranscriptStrongForGrounding(
  language: SessionLanguage,
  text: string,
) {
  return getTranscriptEvidenceWeight(language, text) >= 2;
}

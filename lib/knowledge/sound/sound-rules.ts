import { ABNORMAL_TRUCK_SOUND_PATTERNS } from "@/lib/knowledge/sound/abnormal-sound-patterns";
import { NORMAL_TRUCK_SOUND_BASELINES } from "@/lib/knowledge/sound/normal-sound-baselines";
import type { TruckSoundCategory, TruckSoundRecord } from "@/lib/knowledge/sound/types";

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const TRUCK_SOUND_RECORDS: TruckSoundRecord[] = [
  ...NORMAL_TRUCK_SOUND_BASELINES,
  ...ABNORMAL_TRUCK_SOUND_PATTERNS,
];

export function matchTruckSoundTerms(text: string) {
  const normalized = normalize(text);

  return TRUCK_SOUND_RECORDS.map((record) => {
    const matchedAliases = record.aliases.filter((alias) => normalize(alias) && normalized.includes(normalize(alias)));
    const matchedCadence = record.cadenceTags.filter((tag) => normalize(tag) && normalized.includes(normalize(tag)));
    const matchedPitch = record.pitchTags.filter((tag) => normalize(tag) && normalized.includes(normalize(tag)));
    const score = matchedAliases.length * 3 + matchedCadence.length + matchedPitch.length;

    return {
      category: record.category,
      matchedTerms: [...matchedAliases, ...matchedCadence, ...matchedPitch],
      record,
      score,
    };
  })
    .filter((candidate) => candidate.score > 0)
    .sort((left, right) => right.score - left.score);
}

export function getTruckSoundRecord(category: TruckSoundCategory) {
  return TRUCK_SOUND_RECORDS.find((record) => record.category === category);
}

import type { SupportedVehicleId } from "@/lib/config/app-config";
import type {
  ExtendedTruckIssueAreaId,
  ExtendedTruckPartId,
  ExtendedTruckSymptomId,
  ExtendedTruckSystemId,
} from "@/lib/knowledge/types";

export type TruckReferenceVehicleScope = SupportedVehicleId;

export type TruckReferenceSourceType =
  | "owner_manual"
  | "ford_tsb"
  | "nhtsa_tsb_summary"
  | "recall"
  | "repair_note"
  | "known_issue"
  | "inspection_hint";

export interface TruckReferenceRecord {
  id: string;
  sourceType: TruckReferenceSourceType;
  sourceLabel: string;
  title: string;
  vehicleScope: TruckReferenceVehicleScope;
  systemTags: ExtendedTruckSystemId[];
  issueAreaIds: ExtendedTruckIssueAreaId[];
  partTags: ExtendedTruckPartId[];
  symptomTags: ExtendedTruckSymptomId[];
  aliases: string[];
  excerpt: string;
  inspectionHint?: string;
  safetyNote?: string;
  supportingCounts?: {
    carComplaints?: number;
    forumThreads?: number;
    nhtsaComplaints?: number;
    tsbs?: number;
    videos?: number;
  };
  sourceCitationKey: string;
  sourceUrl?: string;
}

export interface TruckReferenceSearchResult {
  record: TruckReferenceRecord;
  matchedTerms: string[];
  score: number;
}

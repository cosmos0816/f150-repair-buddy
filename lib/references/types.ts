import { SUPPORTED_VEHICLE_ID } from "@/lib/config/app-config";
import type {
  TruckIssueAreaId,
  TruckInspectionTargetId,
  TruckPartId,
  TruckSymptomId,
  TruckSystemId,
} from "@/lib/knowledge";
import type { SessionLanguage } from "@/lib/types/session";

export type ReferenceVehicleId = typeof SUPPORTED_VEHICLE_ID;

export type ReferenceSourceKind =
  | "manual_section"
  | "knowledge_entry"
  | "repair_reference";

export type ReferenceSourceDocumentKind =
  | "owner_manual"
  | "local_knowledge"
  | "external_repair_reference";

export type ReferenceSourceProviderMode = "local" | "external_adapter";

export type ReferenceContentKind =
  | "owner_manual"
  | "repair_note"
  | "known_issue"
  | "inspection_hint";

export interface ReferenceSourceProvider {
  id: string;
  label: string;
  mode: ReferenceSourceProviderMode;
}

export interface ReferenceSourceDocument {
  id: string;
  kind: ReferenceSourceDocumentKind;
  title: string;
  provider: ReferenceSourceProvider;
  editionLabel?: string;
}

export interface ManualSectionReference {
  documentId: string;
  chapterId: string;
  sectionId: string;
  sectionTitle: string;
  path: string[];
  pageHint?: string;
}

export interface ReferenceLocalizedFields {
  aliases?: string[];
  excerpts?: string[];
  notes?: string[];
  procedures?: string[];
  safetyWarnings?: string[];
  sectionLabel?: string;
  summary?: string;
  title?: string;
}

export interface ReferenceEntry {
  id: string;
  vehicleId: ReferenceVehicleId;
  sourceKind: ReferenceSourceKind;
  contentKind?: ReferenceContentKind;
  sourceDocument: ReferenceSourceDocument;
  title: string;
  summary: string;
  sectionLabel?: string;
  aliases?: string[];
  keywords: string[];
  tags: string[];
  snippets: string[];
  excerpts?: string[];
  notes?: string[];
  procedures?: string[];
  safetyWarnings?: string[];
  systemIds?: TruckSystemId[];
  issueAreaIds?: TruckIssueAreaId[];
  partIds?: TruckPartId[];
  symptomIds?: TruckSymptomId[];
  inspectionTargetIds?: TruckInspectionTargetId[];
  manualSection?: ManualSectionReference;
  localized?: Partial<Record<SessionLanguage, ReferenceLocalizedFields>>;
}

export interface ReferenceSearchResult {
  entry: ReferenceEntry;
  matchedTerms: string[];
  score: number;
}

export interface ReferenceLookupProvider {
  searchReference(query: string): ReferenceSearchResult[];
  searchManualSections(query: string): ReferenceSearchResult[];
  searchPartHints(partName: string): ReferenceSearchResult[];
  searchSymptomHints(symptomName: string): ReferenceSearchResult[];
  searchIssueAreaHints(issueAreaName: string): ReferenceSearchResult[];
  searchAliasHints(alias: string): ReferenceSearchResult[];
}

export interface RenderedReferenceEntry {
  aliases: string[];
  contentKind: ReferenceContentKind;
  excerpts: string[];
  id: string;
  inspectionTargetIds: TruckInspectionTargetId[];
  issueAreaIds: TruckIssueAreaId[];
  keywords: string[];
  language: SessionLanguage;
  notes: string[];
  partIds: TruckPartId[];
  procedures: string[];
  safetyWarnings: string[];
  sectionLabel?: string;
  snippets: string[];
  sourceDocument: ReferenceSourceDocument;
  summary: string;
  symptomIds: TruckSymptomId[];
  tags: string[];
  title: string;
}

export type ExternalReferenceQueryKind =
  | "reference"
  | "manual_section"
  | "part_hint"
  | "symptom_hint"
  | "issue_area_hint";

export interface ExternalReferenceAdapterQuery {
  kind: ExternalReferenceQueryKind;
  value: string;
  vehicleId: ReferenceVehicleId;
  maxResults?: number;
}

export interface ExternalReferenceAdapter {
  id: string;
  label: string;
  sourceDocumentKind: "external_repair_reference";
  supportsVehicle(vehicleId: ReferenceVehicleId): boolean;
  search(query: ExternalReferenceAdapterQuery): Promise<ReferenceSearchResult[]>;
}

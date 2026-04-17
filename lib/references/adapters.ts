import type {
  ExternalReferenceAdapter,
  ExternalReferenceAdapterQuery,
  ReferenceSearchResult,
  ReferenceSourceDocument,
} from "@/lib/references/types";

export function createExternalReferenceSourceDocument(params: {
  id: string;
  title: string;
  providerId: string;
  providerLabel: string;
  editionLabel?: string;
}): ReferenceSourceDocument {
  return {
    id: params.id,
    kind: "external_repair_reference",
    title: params.title,
    editionLabel: params.editionLabel,
    provider: {
      id: params.providerId,
      label: params.providerLabel,
      mode: "external_adapter",
    },
  };
}

export abstract class BaseExternalReferenceAdapter
  implements ExternalReferenceAdapter
{
  abstract readonly id: string;
  abstract readonly label: string;
  readonly sourceDocumentKind = "external_repair_reference" as const;

  supportsVehicle() {
    return true;
  }

  abstract search(
    query: ExternalReferenceAdapterQuery,
  ): Promise<ReferenceSearchResult[]>;
}

const externalReferenceAdapters: ExternalReferenceAdapter[] = [];

export function getExternalReferenceAdapters() {
  return [...externalReferenceAdapters];
}

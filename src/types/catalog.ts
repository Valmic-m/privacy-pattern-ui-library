// ============================================================================
// Privacy UI Catalog - Type Definitions
// ============================================================================

// Branded ID types for type safety
export type PatternId = `pat-${string}`;
export type ExampleId = `ex-${string}`;

export type RiskLevel = "low" | "medium" | "high";

// ============================================================================
// Metadata
// ============================================================================

export interface CatalogMeta {
  schemaVersion: string;
  generatedAt: string; // ISO 8601
  source: {
    patternsCsv: string;
    examplesCsv: string;
  };
}

export interface CatalogIndexes {
  gdprTags: string[];
  uiEvidenceTags: string[];
  heuristics: string[];
  templateCollections: string[]; // currently empty in source data
}

// ============================================================================
// GDPR Basis
// ============================================================================

export interface GdprArticle {
  articleRef: string; // "Art. 12"
  articleNumber: string; // "12"
  title: string;
  url: string | null;
  gdprTagExpectations: string[];
}

export interface GdprBasis {
  raw: string;
  articles: GdprArticle[];
  gdprTags: string[];
}

// ============================================================================
// Observable UI Conditions
// ============================================================================

export interface ObservableUiConditions {
  raw: string;
  uiEvidenceTags: string[];
}

// ============================================================================
// Evidence
// ============================================================================

export interface EvidenceBlock {
  raw: string;
  citations: string[];
}

export interface Evidence {
  useCases: EvidenceBlock;
  pitfalls: EvidenceBlock;
}

// ============================================================================
// Pitfalls
// ============================================================================

export interface PitfallItem {
  id: string; // e.g. "pat-001-pit-01"
  text: string;
  riskLevel: RiskLevel;
}

export interface Pitfalls {
  raw: string;
  items: PitfallItem[];
}

// ============================================================================
// Heuristics
// ============================================================================

export interface Heuristics {
  considerationsRaw: string;
  considerations: string[];
  sourceRaw: string;
  whyTheseMatter: string;
}

// ============================================================================
// Design Guidance
// ============================================================================

export interface DesignGuidance {
  keyDesignExpectationsAbstract: string;
  designChoicesThatSupportHeuristics: string;
  evaluativeQuestionsRaw: string;
  evaluativeQuestions: string[];
}

// ============================================================================
// Pattern
// ============================================================================

export interface Pattern {
  id: PatternId;
  slug: string;
  name: string;
  sortOrder: number;
  definition: string;
  goal: string;
  gdprBasis: GdprBasis;
  observableUiConditions: ObservableUiConditions;
  useCases: { raw: string };
  evidence: Evidence;
  pitfalls: Pitfalls;
  heuristics: Heuristics;
  designGuidance: DesignGuidance;
  exampleIds: ExampleId[];
}

// ============================================================================
// Example
// ============================================================================

export interface Example {
  id: ExampleId;
  name: string;
  url: string;
  figmaTemplateUrl: string | null;
  generalDesignTemplateCollection: string | null;
  patternIds: PatternId[];
}

// ============================================================================
// Catalog (Top-Level)
// ============================================================================

export interface Catalog {
  meta: CatalogMeta;
  patterns: Pattern[];
  examples: Example[];
  indexes: CatalogIndexes;
}

// ============================================================================
// Filter State (for UI)
// ============================================================================

export interface FilterState {
  gdprTags: string[];
  uiEvidenceTags: string[];
  heuristics: string[];
  searchQuery: string;
  templateCollections?: string[]; // optional until data is populated
}

// ============================================================================
// Catalog Access (returned by loadCatalog)
// ============================================================================

export interface CatalogAccess {
  catalog: Catalog;

  // Precomputed lookup maps
  patternById: Map<PatternId, Pattern>;
  patternBySlug: Map<string, Pattern>;
  exampleById: Map<ExampleId, Example>;
  exampleIdsByPatternId: Map<PatternId, ExampleId[]>;
  patternIdsByExampleId: Map<ExampleId, PatternId[]>;

  // Hydration helpers
  getPatternBySlug: (slug: string) => Pattern | undefined;
  getExamplesForPattern: (patternId: PatternId) => Example[];
  getPatternsForExample: (exampleId: ExampleId) => Pattern[];

  // Filtering
  applyFilters: (filters: FilterState) => FilterResult;
}

export interface FilterResult {
  patterns: Pattern[];
  examples: Example[];
}


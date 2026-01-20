// ============================================================================
// Privacy UI Catalog - Loader with Zod Validation
// ============================================================================

import { z } from "zod";
import type {
  Catalog,
  CatalogAccess,
  Example,
  ExampleId,
  FilterResult,
  FilterState,
  Pattern,
  PatternId,
} from "../types/catalog";

// Import catalog JSON - adjust path as needed for your project structure
import catalogJson from "../catalog.json";

// ============================================================================
// Zod Schemas
// ============================================================================

const RiskLevelSchema = z.enum(["low", "medium", "high"]);

const CatalogMetaSchema = z.object({
  schemaVersion: z.string(),
  generatedAt: z.string(),
  source: z.object({
    patternsCsv: z.string(),
    examplesCsv: z.string(),
  }),
});

const CatalogIndexesSchema = z.object({
  gdprTags: z.array(z.string()),
  uiEvidenceTags: z.array(z.string()),
  heuristics: z.array(z.string()),
  templateCollections: z.array(z.string()),
});

const GdprArticleSchema = z.object({
  articleRef: z.string(),
  articleNumber: z.string(),
  title: z.string(),
  url: z.string().nullable(),
  gdprTagExpectations: z.array(z.string()),
});

const GdprBasisSchema = z.object({
  raw: z.string(),
  articles: z.array(GdprArticleSchema),
  gdprTags: z.array(z.string()),
});

const ObservableUiConditionsSchema = z.object({
  raw: z.string(),
  uiEvidenceTags: z.array(z.string()),
});

const EvidenceBlockSchema = z.object({
  raw: z.string(),
  citations: z.array(z.string()),
});

const EvidenceSchema = z.object({
  useCases: EvidenceBlockSchema,
  pitfalls: EvidenceBlockSchema,
});

const PitfallItemSchema = z.object({
  id: z.string(),
  text: z.string(),
  riskLevel: RiskLevelSchema,
});

const PitfallsSchema = z.object({
  raw: z.string(),
  items: z.array(PitfallItemSchema),
});

const HeuristicsSchema = z.object({
  considerationsRaw: z.string(),
  considerations: z.array(z.string()),
  sourceRaw: z.string(),
  whyTheseMatter: z.string(),
});

const DesignGuidanceSchema = z.object({
  keyDesignExpectationsAbstract: z.string(),
  designChoicesThatSupportHeuristics: z.string(),
  evaluativeQuestionsRaw: z.string(),
  evaluativeQuestions: z.array(z.string()),
});

const PatternSchema = z.object({
  id: z.string().regex(/^pat-\d{3}$/) as z.ZodType<PatternId>,
  slug: z.string(),
  name: z.string(),
  sortOrder: z.number(),
  definition: z.string(),
  goal: z.string(),
  gdprBasis: GdprBasisSchema,
  observableUiConditions: ObservableUiConditionsSchema,
  useCases: z.object({ raw: z.string() }),
  evidence: EvidenceSchema,
  pitfalls: PitfallsSchema,
  heuristics: HeuristicsSchema,
  designGuidance: DesignGuidanceSchema,
  exampleIds: z.array(z.string().regex(/^ex-\d{3}$/) as z.ZodType<ExampleId>),
});

const ExampleSchema = z.object({
  id: z.string().regex(/^ex-\d{3}$/) as z.ZodType<ExampleId>,
  name: z.string(),
  url: z.string(),
  figmaTemplateUrl: z.string().nullable(),
  generalDesignTemplateCollection: z.string().nullable(),
  patternIds: z.array(z.string().regex(/^pat-\d{3}$/) as z.ZodType<PatternId>),
});

const CatalogSchema = z.object({
  meta: CatalogMetaSchema,
  patterns: z.array(PatternSchema),
  examples: z.array(ExampleSchema),
  indexes: CatalogIndexesSchema,
});

// ============================================================================
// Helper Functions
// ============================================================================

function normalizeQuery(q: string): string {
  return q.trim().toLowerCase();
}

function matchesSearchPattern(p: Pattern, q: string): boolean {
  if (!q) return true;
  const haystack = [
    p.name,
    p.definition,
    p.goal,
    p.gdprBasis.raw,
    p.observableUiConditions.raw,
    p.heuristics.considerationsRaw,
    p.designGuidance.evaluativeQuestionsRaw,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

function includesAll(haystack: string[], needles: string[]): boolean {
  if (!needles.length) return true;
  const set = new Set(haystack);
  return needles.every((n) => set.has(n));
}

// ============================================================================
// Catalog Loader
// ============================================================================

/**
 * Loads and validates the catalog, returning precomputed maps and helper functions.
 * Validates JSON at runtime using Zod - throws if catalog.json is malformed.
 */
export function loadCatalog(): CatalogAccess {
  // Runtime validation - throws ZodError if catalog.json doesn't match schema
  const parseResult = CatalogSchema.safeParse(catalogJson);

  if (!parseResult.success) {
    console.error("Catalog validation failed:", parseResult.error.format());
    throw new Error(
      `Invalid catalog.json: ${parseResult.error.errors.map((e) => e.message).join(", ")}`
    );
  }

  const catalog: Catalog = parseResult.data;

  // Build lookup maps
  const patternById = new Map<PatternId, Pattern>();
  const patternBySlug = new Map<string, Pattern>();
  const exampleById = new Map<ExampleId, Example>();
  const exampleIdsByPatternId = new Map<PatternId, ExampleId[]>();
  const patternIdsByExampleId = new Map<ExampleId, PatternId[]>();

  for (const p of catalog.patterns) {
    patternById.set(p.id, p);
    patternBySlug.set(p.slug, p);
    exampleIdsByPatternId.set(p.id, p.exampleIds ?? []);
  }

  for (const ex of catalog.examples) {
    exampleById.set(ex.id, ex);
    patternIdsByExampleId.set(ex.id, ex.patternIds ?? []);
  }

  // Hydration helpers
  function getPatternBySlug(slug: string): Pattern | undefined {
    return patternBySlug.get(slug);
  }

  function getExamplesForPattern(patternId: PatternId): Example[] {
    const ids = exampleIdsByPatternId.get(patternId) ?? [];
    return ids
      .map((id) => exampleById.get(id))
      .filter((ex): ex is Example => ex !== undefined);
  }

  function getPatternsForExample(exampleId: ExampleId): Pattern[] {
    const ids = patternIdsByExampleId.get(exampleId) ?? [];
    return ids
      .map((id) => patternById.get(id))
      .filter((p): p is Pattern => p !== undefined);
  }

  // Filter function with AND semantics across and within facets
  function applyFilters(filters: FilterState): FilterResult {
    const q = normalizeQuery(filters.searchQuery);

    // Filter patterns: AND across all facets, AND within each facet
    const patterns = catalog.patterns
      .filter((p) => matchesSearchPattern(p, q))
      .filter((p) => includesAll(p.gdprBasis.gdprTags, filters.gdprTags))
      .filter((p) =>
        includesAll(p.observableUiConditions.uiEvidenceTags, filters.uiEvidenceTags)
      )
      .filter((p) => includesAll(p.heuristics.considerations, filters.heuristics))
      .sort((a, b) => a.sortOrder - b.sortOrder);

    // Examples: those connected to remaining patterns (deduplicated)
    const allowedPatternIds = new Set(patterns.map((p) => p.id));
    const seenExampleIds = new Set<ExampleId>();

    const examples = catalog.examples.filter((ex) => {
      if (seenExampleIds.has(ex.id)) return false;
      const matches = ex.patternIds.some((pid) => allowedPatternIds.has(pid));
      if (matches) seenExampleIds.add(ex.id);
      return matches;
    });

    return { patterns, examples };
  }

  return {
    catalog,
    patternById,
    patternBySlug,
    exampleById,
    exampleIdsByPatternId,
    patternIdsByExampleId,
    getPatternBySlug,
    getExamplesForPattern,
    getPatternsForExample,
    applyFilters,
  };
}

// ============================================================================
// Convenience: Default empty filter state
// ============================================================================

export function createEmptyFilterState(): FilterState {
  return {
    gdprTags: [],
    uiEvidenceTags: [],
    heuristics: [],
    searchQuery: "",
    templateCollections: [],
  };
}


// ============================================================================
// GDPR Utility Functions
// ============================================================================

import type { Pattern } from "@/types/catalog";

// ============================================================================
// Types
// ============================================================================

export interface ParsedGdprTag {
  articleNumber: string;
  expectationLabel: string;
  raw: string;
}

export interface ArticleGroup {
  articleNumber: string;
  tags: string[];
}

// ============================================================================
// Article Titles (for display)
// ============================================================================

export const ARTICLE_TITLES: Record<string, string> = {
  "5": "Principles relating to processing of personal data",
  "6": "Lawfulness of processing",
  "7": "Conditions for consent",
  "12": "Transparent information, communication and modalities",
  "13": "Information to be provided where personal data are collected from the data subject",
  "14": "Information to be provided where personal data have not been obtained from the data subject",
  "15": "Right of access by the data subject",
  "16": "Right to rectification",
  "17": "Right to erasure ('right to be forgotten')",
  "18": "Right to restriction of processing",
  "20": "Right to data portability",
  "21": "Right to object",
  "25": "Data protection by design and by default",
};

// ============================================================================
// "In UI terms" Translations
// ============================================================================

export const ARTICLE_UI_TRANSLATIONS: Record<string, string> = {
  "5": "In UI terms: make data use visible and purposeful—no hidden processing, clear separation of optional vs. required data.",
  "6": "In UI terms: clearly explain the legal basis for processing data in context.",
  "7": "In UI terms: consent must be freely given and reversible—no preselection, neutral framing, and withdrawal as easy as consent.",
  "12": "In UI terms: make privacy information easy to find, easy to read, and timed to the decision.",
  "13": "In UI terms: disclose key details at the moment data is collected—purpose, retention, recipients, and user rights.",
  "14": "In UI terms: when data comes from third parties, explain the source and how it will be used.",
  "15": "In UI terms: users should be able to find and view their personal data easily, with a clear entry point and understandable summaries.",
  "16": "In UI terms: provide clear paths for users to correct or update their personal data.",
  "17": "In UI terms: make account and data deletion easy to find, with clear scope explanation.",
  "18": "In UI terms: allow users to pause processing with clear explanation of what restriction means.",
  "20": "In UI terms: offer data export in machine-readable formats with clear explanation of portability.",
  "21": "In UI terms: provide easy opt-out controls for direct marketing and objection to processing.",
  "25": "In UI terms: default settings should protect privacy—non-essential processing off by default, with clear user control.",
};

// Fallback for unlisted articles
export const DEFAULT_UI_TRANSLATION =
  "In UI terms: translate this requirement into a clear control, a clear explanation, or a clear user pathway.";

// ============================================================================
// Quick Start Presets
// ============================================================================

export const QUICK_START_PRESETS: {
  label: string;
  tag: string;
  articleNumber: string;
}[] = [
  {
    label: "Transparency (Art. 12)",
    tag: "GDPR-A12-Accessible-Notice-Presentation",
    articleNumber: "12",
  },
  {
    label: "Notice at collection (Art. 13)",
    tag: "GDPR-A13-Purpose-Explained-at-Collection",
    articleNumber: "13",
  },
  {
    label: "Consent quality (Art. 7)",
    tag: "GDPR-A7-Consent-Visually-Distinct",
    articleNumber: "7",
  },
  {
    label: "Privacy defaults (Art. 25)",
    tag: "GDPR-A25-Privacy-Protective-Defaults",
    articleNumber: "25",
  },
  {
    label: "User rights (Art. 15)",
    tag: "GDPR-A15-Data-Access-Entry-Point",
    articleNumber: "15",
  },
];

// ============================================================================
// Tag Parsing
// ============================================================================

/**
 * Parse a GDPR tag into its components.
 * Example: "GDPR-A12-Plain-Language-Notice" → { articleNumber: "12", expectationLabel: "Plain language notice", raw: "..." }
 */
export function parseGdprTag(tag: string): ParsedGdprTag {
  const raw = tag;

  // Remove "GDPR-" prefix
  let remainder = tag.replace(/^GDPR-/, "");

  // Extract article number (e.g., "A12" → "12")
  const articleMatch = remainder.match(/^A(\d+)-?/);
  let articleNumber = "";
  if (articleMatch) {
    articleNumber = articleMatch[1];
    remainder = remainder.replace(/^A\d+-?/, "");
  }

  // Convert remainder to readable label
  const expectationLabel = formatExpectationLabel(remainder);

  return { articleNumber, expectationLabel, raw };
}

/**
 * Format an expectation label from hyphenated form to title case.
 * Example: "Plain-Language-Notice" → "Plain language notice"
 */
export function formatExpectationLabel(text: string): string {
  return text
    .replace(/-/g, " ")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());
}

/**
 * Get display format for a tag: "Art. 12 · Plain language notice"
 */
export function getTagDisplayLabel(tag: string): string {
  const { articleNumber, expectationLabel } = parseGdprTag(tag);
  if (articleNumber) {
    return `Art. ${articleNumber} · ${expectationLabel}`;
  }
  return expectationLabel;
}

/**
 * Get just the expectation label (without article prefix)
 */
export function getExpectationOnlyLabel(tag: string): string {
  const { expectationLabel } = parseGdprTag(tag);
  return expectationLabel;
}

// ============================================================================
// Tag Counting & Grouping
// ============================================================================

/**
 * Build a map of tag → count of patterns containing that tag.
 */
export function buildTagCounts(patterns: Pattern[]): Map<string, number> {
  const counts = new Map<string, number>();

  for (const pattern of patterns) {
    for (const tag of pattern.gdprBasis.gdprTags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return counts;
}

/**
 * Group tags by article number, sorted numerically.
 * Returns a Map where keys are article numbers and values are arrays of tags.
 */
export function groupTagsByArticle(tags: string[]): Map<string, string[]> {
  const groups = new Map<string, string[]>();

  for (const tag of tags) {
    const { articleNumber } = parseGdprTag(tag);
    if (!articleNumber) continue;

    if (!groups.has(articleNumber)) {
      groups.set(articleNumber, []);
    }
    groups.get(articleNumber)!.push(tag);
  }

  // Sort tags alphabetically within each group
  for (const [, groupTags] of groups) {
    groupTags.sort((a, b) => {
      const labelA = getExpectationOnlyLabel(a).toLowerCase();
      const labelB = getExpectationOnlyLabel(b).toLowerCase();
      return labelA.localeCompare(labelB);
    });
  }

  // Return a new Map with keys sorted numerically
  const sortedEntries = [...groups.entries()].sort(
    (a, b) => parseInt(a[0], 10) - parseInt(b[0], 10)
  );

  return new Map(sortedEntries);
}

/**
 * Get article title by number.
 */
export function getArticleTitle(articleNumber: string): string {
  return ARTICLE_TITLES[articleNumber] ?? `Article ${articleNumber}`;
}

/**
 * Get "In UI terms" translation for an article.
 */
export function getArticleUiTranslation(articleNumber: string): string {
  return ARTICLE_UI_TRANSLATIONS[articleNumber] ?? DEFAULT_UI_TRANSLATION;
}

/**
 * Get article URL on legislation.gov.uk
 */
export function getArticleUrl(articleNumber: string): string {
  return `https://www.legislation.gov.uk/eur/2016/679/article/${articleNumber}`;
}

/**
 * Extract unique article numbers from selected tags.
 */
export function getArticleNumbersFromTags(tags: string[]): string[] {
  const numbers = new Set<string>();
  for (const tag of tags) {
    const { articleNumber } = parseGdprTag(tag);
    if (articleNumber) {
      numbers.add(articleNumber);
    }
  }
  return [...numbers].sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
}


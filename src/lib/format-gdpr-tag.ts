/**
 * Format GDPR tag for display
 * 
 * Transforms raw tag strings into human-readable format:
 * "GDPR-A12-Plain-Language-Notice" → "Art. 12 · Plain language notice"
 */
export function formatGdprTag(tag: string): { display: string; raw: string } {
  const raw = tag;

  // Remove "GDPR-" prefix
  let remainder = tag.replace(/^GDPR-/, "");

  // Extract article number (e.g., "A12" → "Art. 12")
  const articleMatch = remainder.match(/^A(\d+)-?/);
  let article = "";
  if (articleMatch) {
    article = `Art. ${articleMatch[1]}`;
    remainder = remainder.replace(/^A\d+-?/, "");
  }

  // Replace dashes with spaces and format as sentence case
  const description = remainder
    .replace(/-/g, " ")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());

  const display = article ? `${article} · ${description}` : description;

  return { display, raw };
}

/**
 * Get just the display string for a GDPR tag
 */
export function getGdprTagDisplay(tag: string): string {
  return formatGdprTag(tag).display;
}


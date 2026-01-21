import Link from "next/link";
import type { Pattern } from "@/types/catalog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { parseGdprTag } from "@/lib/gdpr";

interface PatternCardProps {
  pattern: Pattern;
  selectedTags?: string[];
}

export function PatternCard({ pattern, selectedTags = [] }: PatternCardProps) {
  // Truncate definition to ~120 chars
  const truncatedDefinition =
    pattern.definition.length > 120
      ? pattern.definition.slice(0, 120).trim() + "..."
      : pattern.definition;

  // Get unique article numbers from pattern
  const articleNumbers = [
    ...new Set(pattern.gdprBasis.articles.map((a) => a.articleNumber)),
  ].sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

  // Count examples
  const exampleCount = pattern.exampleIds.length;

  // Find which selected tags this pattern matches
  const matchedTags = selectedTags.filter((tag) =>
    pattern.gdprBasis.gdprTags.includes(tag)
  );

  return (
    <Link href={`/patterns/${pattern.slug}/`} className="group block">
      <Card className="h-full transition-all hover:shadow-md hover:ring-2 hover:ring-primary/20 group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2">
        <CardHeader>
          <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
            {pattern.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {truncatedDefinition}
          </p>

          {/* Matches Row (when expectations are selected) */}
          {matchedTags.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">
                Matches
              </p>
              <div className="flex flex-wrap gap-1">
                {matchedTags.slice(0, 3).map((tag) => {
                  const { expectationLabel } = parseGdprTag(tag);
                  return (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs px-1.5 py-0 bg-primary/10 text-primary"
                    >
                      {expectationLabel}
                    </Badge>
                  );
                })}
                {matchedTags.length > 3 && (
                  <Badge
                    variant="secondary"
                    className="text-xs px-1.5 py-0 bg-muted"
                  >
                    +{matchedTags.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            {articleNumbers.map((num) => (
              <Badge
                key={num}
                variant="outline"
                className="text-xs px-1.5 py-0"
              >
                Art. {num}
              </Badge>
            ))}
            {exampleCount > 0 && (
              <Badge variant="secondary" className="text-xs px-1.5 py-0">
                {exampleCount} {exampleCount === 1 ? "example" : "examples"}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

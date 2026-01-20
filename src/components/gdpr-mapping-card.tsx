import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { GdprBasis } from "@/types/catalog";
import { getExpectationOnlyLabel } from "@/lib/gdpr";

interface GdprMappingCardProps {
  gdprBasis: GdprBasis;
}

export function GdprMappingCard({ gdprBasis }: GdprMappingCardProps) {
  const { articles } = gdprBasis;

  if (articles.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">GDPR mapping</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {articles.map((article) => (
          <div key={article.articleNumber} className="space-y-2">
            {/* Article Header Row */}
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-sm font-medium">
                Art. {article.articleNumber} — {article.title}
              </h3>
              {article.url && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground shrink-0"
                  asChild
                >
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open article
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              )}
            </div>

            {/* Expectation Badges */}
            {article.gdprTagExpectations.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {article.gdprTagExpectations.map((tag) => {
                  const label = getExpectationOnlyLabel(tag);
                  return (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs"
                      title={tag}
                    >
                      {label}
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}


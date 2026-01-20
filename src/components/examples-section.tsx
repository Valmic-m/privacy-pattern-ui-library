"use client";

import { useState, useCallback } from "react";
import type { Example } from "@/types/catalog";
import { ExampleCard } from "@/components/example-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EyeOff, Eye } from "lucide-react";

interface ExamplesSectionProps {
  examples: Example[];
}

export function ExamplesSection({ examples }: ExamplesSectionProps) {
  const [missingIds, setMissingIds] = useState<Set<string>>(new Set());
  const [showMissingOnly, setShowMissingOnly] = useState(false);

  const handleMissingScreenshot = useCallback((exampleId: string) => {
    setMissingIds((prev) => new Set(prev).add(exampleId));
  }, []);

  const displayedExamples = showMissingOnly
    ? examples.filter((ex) => missingIds.has(ex.id))
    : examples;

  const missingCount = missingIds.size;
  const totalCount = examples.length;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          Real-World Examples ({examples.length})
        </h3>
        {missingCount > 0 && (
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-muted-foreground">
              Missing screenshots: {missingCount} / {totalCount}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMissingOnly(!showMissingOnly)}
              className="gap-2"
            >
              {showMissingOnly ? (
                <>
                  <Eye className="h-4 w-4" />
                  Show all
                </>
              ) : (
                <>
                  <EyeOff className="h-4 w-4" />
                  Show missing only
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {displayedExamples.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {displayedExamples.map((example) => (
            <ExampleCard
              key={example.id}
              example={example}
              onMissingScreenshot={handleMissingScreenshot}
            />
          ))}
        </div>
      ) : showMissingOnly && missingCount === 0 ? (
        <p className="text-muted-foreground">
          All examples have screenshots.
        </p>
      ) : (
        <p className="text-muted-foreground">
          No examples to display.
        </p>
      )}
    </section>
  );
}

